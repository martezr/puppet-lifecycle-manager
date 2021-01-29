import json
import flask
import rule_engine
from flask import Flask, render_template, request, session, redirect, jsonify, url_for, Response
#import pymongo
from flask_cors import CORS
import requests

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True
app.config["SECRET_KEY"] = "OCML3BRawWEUeaxcuKHLpw"


@app.route('/api/v1/recommendations', methods=['GET'])
def endpoint_data():
    with open('recommendations.json') as f:
      data = json.load(f)

    response = requests.get('http://endpointservice:8090/api/v1/endpoints')
    endpointdata = response.json()

    proposals = []
    for endpoint in endpointdata['endpoints']:
        app.logger.info(endpoint['name'])
        endpointmatches = {}
    #    print(rule.matches(endpoint))
        for recommendation in data['recommendations']:
            rule = rule_engine.Rule(recommendation['condition'])
            if rule.matches(endpoint):
                payload = recommendation
                payload['server'] = endpoint['name']
                app.logger.info(payload)
                proposals.append(payload.copy())
                app.logger.info(proposals)
    output = json.dumps({"recommendations": proposals})
    return output


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
