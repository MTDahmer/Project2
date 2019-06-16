from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
import os
import pandas as pd
import numpy as np
from pymongo import MongoClient
import json


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
    output = []
    for t in tweet.find():
      output.append({'created_at': t['created_at'], 'text': t['full_text'], 'favourite_count': t['favorite_count'], 'retweet_count': t['retweet_count'], 'followers': t['user']['followers_count']})
    return jsonify({'result' : output})

@app.route("/metadata", methods=['GET'])
def metadata():
    favorites = mongo.db["metadata"]

    output = []
    for f in favorites.find():
        output.append({'name' : f['candidate'], 'screenName' : f['screenName'], 'retweets' : f['retweetAvg'], 'favorites': f['favoriteAvg']})
    return jsonify(output)

@app.route("/names", methods=['GET'])
def names():
    favorites = mongo.db["metadata"]
    output = []
    for f in favorites.find():
        output.append(f['candidate'])
    return jsonify(output)

if __name__ == "__main__":
    app.run()
