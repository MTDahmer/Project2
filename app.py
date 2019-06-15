from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
import os
import pandas as pd
import numpy as np
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps


app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'db_twitter_handle'
candidates = ["@realDonaldTrump", "@BernieSanders", "@JoeBiden", "@SenWarren", "@GovBillWeld", "@JohnDelaney", "@KamalaHarris"]
FIELDS = {'created_at': True, 'text': True, 'favourite_count': True, 'tweet_count': True, 'user': True}


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/d")
def data():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    for candidate in candidates:
        collection = connection[DBS_NAME]["Tweets_from_" + candidate[i]]
        projects = collection.find(projection=FIELDS)
        json_projects = []
        for project in projects:
            json_projects.append(project)
        json_projects = json.dumps(json_projects, default=json_util.default)
        connection.close()
    print(json_projects)
    return json_projects


if __name__ == "__main__":
    app.run()
