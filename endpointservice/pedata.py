import json
import requests

def fetch_token(url, username, password):
    payload = {'login': username, 'password': password, 'label': 'pe-manager', 'description': 'PE manager', 'lifetime': '7200' }
    response = requests.post(url, data = json.dumps(payload), verify=False)
    tokenjson = response.json()
    return tokenjson['token']

def pe_status(token):
    url = 'https://10.0.0.252:4433/status/v1/services'
    headers = {'X-Authentication': token}
    response = requests.get(url, headers=headers, verify=False)
    return response.json()

def update_node():
    tokendata = fetch_token('https://10.0.0.252:4433/rbac-api/v1/auth/token','admin','puppetlabs')
    pdburl = 'https://10.0.0.252:8081/pdb/query/v4/facts'
    print(tokendata)
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


def sync_endpoint():
    tokendata = fetch_token('https://jf2701master0.classroom.puppet.com:4433/rbac-api/v1/auth/token','admin','puppetlabs')
    print(tokendata)
    # Puppet Master Facts
    pdburl = "%s:8081/pdb/query/v4/inventory" % ('https://jf2701master0.classroom.puppet.com')
    headers = {}
    headers['X-Authentication'] = tokendata
    headers['Content-Type'] = 'application/json'
    payload = '{"query": ["~", "facts.is_pe", "true"]}'
    #payload = 'query=["=", "facts.operatingsystem", "Darwin"]'
    response = requests.post(pdburl, headers=headers, data=payload, verify=False)
#    print(response.text)
#    # Node count
#    nodeurl = "%s:8081/pdb/query/v4/nodes" % (peurl)
#    headers = {'X-Authentication': pecredentials}
#    payload = '["=", "certname", "peserver01.grt.local"]'
#    noderesponse = requests.get(nodeurl, headers=headers, data=payload, verify=False)
#    app.logger.info(len(json.loads(noderesponse.text)))
#    output = json.loads(response.text)
#    payload = {}
#    payload['endpoints'] = []
#    endpoint = {}
#    endpoint['name'] = name
#    endpoint['description'] = "production pe"
#    endpoint['data'] = {}
#    endpoint['data']['architecture'] = "standard"
#    endpoint['data']['nodecount'] = len(json.loads(noderesponse.text))
#    print(output[0]['facts'])
#    endpoint['data']['peversion'] = output[0]['facts']['pe_build']
#    endpoint['facts'] = output[0]['facts']
#    payload['endpoints'].append(endpoint)
#    return payload


if __name__ == "__main__":
    tokendata = fetch_token('https://boltwsmaster0.classroom.puppet.com:4433/rbac-api/v1/auth/token','admin','puppetlabs')
    print(tokendata)
