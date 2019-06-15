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

app.config['MONGO_URI'] = os.environ.get('DATABASE_URL', '') or "mongodb://localhost:27017/db_twitter_handle"
mongo = PyMongo(app)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/data/<chosenCandidate>", methods=['GET'])
def data(chosenCandidate):
    tweet = mongo.db["Tweets_from_" + chosenCandidate]

    # tweet = mongo.db.collection
    output = []
    for t in tweet.find():
      output.append({'id' : t['id'], 'created' : t['created_at'], 'tweet' : t['text']})
    return jsonify({'result' : output})


if __name__ == "__main__":
    app.run()
