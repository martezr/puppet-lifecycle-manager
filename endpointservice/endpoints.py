import json
import flask
from flask import Flask, render_template, request, session, redirect, jsonify, url_for, Response
import pymongo
from flask_cors import CORS,cross_origin
import requests

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True
app.config["SECRET_KEY"] = "OCML3BRawWEUeaxcuKHLpw"

# Create a database connection
myclient = pymongo.MongoClient('mongodb://root:dbpassword@database:27017/')
db = myclient["pemanager"]
endpoints = db["endpoints"]

def fetch_token(url, username, password):
    payload = {'login': username, 'password': password, 'label': 'pe-manager', 'description': 'PE manager', 'lifetime': '7200' }
    response = requests.post(url, data = json.dumps(payload), verify=False)
    tokenjson = response.json()
    return tokenjson['token']


def update_node():
    tokendata = fetch_token('https://10.0.0.252:4433/rbac-api/v1/auth/token','admin','puppetlabs')
    pdburl = 'https://10.0.0.252:8081/pdb/query/v4/facts'
    headers = {'X-Authentication': tokendata}
    app.logger.info(pe_status(tokendata))
    payload = '["=", "certname", "peserver01.grt.local"]'
    response = requests.get(pdburl, headers=headers, data=payload, verify=False)
    print(response)
    pepayload = {}
    osdata = {}
    for data in response.json():
        app.logger.info(data['name'])
        if data['name'] == 'pe_server_version':
            pepayload['version'] = data['value']
        if data['name'] == 'physicalprocessorcount':
            pepayload['processors'] = data['value']
        if data['name'] == 'memorysize':
            pepayload['memory'] = data['value']
        if data['name'] == 'operatingsystem':
            osdata['os'] = data['value']
        if data['name'] == 'operatingsystemrelease':
            osdata['version'] = data['value']
    pepayload['os'] = osdata['os'] + " " + osdata['version']
    nodes.insert_one(pepayload)


@app.route('/api/v1/endpoints', methods=['GET'])
def get_endpoints():
    output = []
    for endpoint in endpoints.find({},{ "_id": 0, "name": 1, "url": 1, "description": 1, "endpointdata": 1 }):
        output.append(endpoint)
    return jsonify({"endpoints": output})


@app.route('/api/v1/endpoints/<name>', methods=['DELETE'])
def delete_endpoint(name):
    myquery = { "name": name }
    endpoints.delete_one(myquery)
    return jsonify({'result': True})


@app.route('/api/v1/endpoints/<name>', methods=['GET'])
def endpoint_data(name):
    myquery = { "name": name }
    nodes = endpoints.find(myquery, { "_id": 0, "name": 1, "url": 1, "description": 1, "endpointdata": 1 })
    print(nodes)
    return json.dumps(nodes[0])
    

@app.route('/api/v1/dashboard', methods=['GET'])
def generate_dashboard():
    nodecount = 0
    healthy_servers = 0
    endpointinfo = endpoints.find({},{ "_id": 0, "name": 1, "url": 1, "description": 1, "endpointdata": 1 })
    for endpoint in endpointinfo:
        nodecount = nodecount + int(endpoint['endpointdata']['data']['nodecount'])
        services = endpoint['endpointdata']['servicestatus']
        healthy_count = 0
        unhealthy_count = 0
        for service in services:
            app.logger.info(service + ": " + services[service]['state'])
            if services[service]['state'] == "running":
                healthy_count = healthy_count + 1
            else:
                unhealthy_count = unhealthy_count + 1
        app.logger.info("number of services: " + str(len(services)))
        if healthy_count == len(services):
            healthy_servers = healthy_servers + 1
    
    payload = {}
    payload['servers'] = endpoints.count_documents({})
    payload['nodecount'] = nodecount
    payload['healthy_servers'] = str(healthy_servers) + " of " + str(endpoints.count_documents({}))
    return json.dumps(payload)

@app.route('/api/v1/endpoints/<name>/sync', methods=['POST'])
def sync_endpoint(name):
    myquery = { "name": name }
    endpointdata = endpoints.find(myquery)
    peurl = ""
    pecredentials = ""
    for data in endpointdata:
        peurl = data['url']
        pecredentials = data['token']
        description = data['description']

    # Puppet Master Facts
    pdburl = "%s:8081/pdb/query/v4/inventory" % (peurl)
    headers = {}
    headers['X-Authentication'] = pecredentials
    headers['Content-Type'] = 'application/json'
    payload = '{"query": ["~", "facts.is_pe", "true"]}'
    response = requests.post(pdburl, headers=headers, data=payload, verify=False)
    # Service Status
    serviceurl = "%s:4433/status/v1/services" % (peurl)
    headers = {}
    headers['X-Authentication'] = pecredentials
    headers['Content-Type'] = 'application/json'
    serviceresponse = requests.get(serviceurl, headers=headers, verify=False)
    servicestatus = serviceresponse.json()
    # Node count
    nodeurl = "%s:8081/pdb/query/v4/nodes" % (peurl)
    headers = {'X-Authentication': pecredentials}
    payload = '["=", "certname", "*"]'
    noderesponse = requests.get(nodeurl, headers=headers, data=payload, verify=False)
    output = json.loads(response.text)
    app.logger.info(output)
    endpoint = {}
    endpoint['name'] = name
    endpoint['description'] = description
    endpoint['data'] = {}
    endpoint['data']['architecture'] = "standard"
    endpoint['data']['nodecount'] = len(json.loads(noderesponse.text))
    endpoint['data']['peversion'] = output[0]['facts']['pe_build']
    endpoint['facts'] = output[0]['facts']
    endpoint['servicestatus'] = servicestatus

    # Values to be updated. 
    newvalues = { "$set": { 'endpointdata': endpoint } } 
  
    # Using update_one() method for single  
    # updation. 
    endpoints.update_one(myquery, newvalues)
    return payload


@app.route('/api/v1/endpoints', methods=['POST'])
@cross_origin()
def create_endpoint():
    app.logger.info(request.content_type)
    app.logger.info(request.data)
    app.logger.info(request.json)
    endpoint = {"name": request.json['name'], "url": request.json['url'], "description": request.json['description'], "token": request.json['token'], "certificate": request.json['certificate']}
    endpoint_output = endpoints.insert_one(endpoint)
    sync_endpoint(request.json['name'])
    return jsonify({"status":"endpoint added successfuly"})

@app.route('/api/v1/nodes', methods=['GET'])
@cross_origin()
def list_nodes():
    output = []
    return jsonify({"nodes": output })


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8090)
