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
client = MongoClient(mongodb, "mongo//:localhost:27017/db_twitter_handle")
# MONGODB_HOST = 'localhost'
# MONGODB_PORT = 27017
# DBS_NAME = 'db_twitter_handle'
# COLLECTION ="Tweets_from_@BernieSanders"
candidates = ["@realDonaldTrump", "@BernieSanders", "@JoeBiden", "@SenWarren", "@GovBillWeld", "@JohnDelaney", "@KamalaHarris"]
# FIELDS = {'created_at': True, 'text': True, 'favourite_count': True, 'tweet_count': True, 'user': True}


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/data/<chosenCandidate>")
def data(chosenCandidate):
    db = client.db_twitter_handle
    collection1 = "Tweets_from_" + chosenCandidate
    holder = db.collection1
    print(holder)
    return(holder)


if __name__ == "__main__":
    app.run()
