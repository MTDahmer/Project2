from flask import Flask, jsonify, render_template
# from flask_pymongo import PyMongo
import os
import pandas as pd
import numpy as np


app = Flask(__name__)

# mMONGODB_HOST = 'localhost'
# MONGODB_PORT = 27017
# DBS_NAME = 'db_twitter_handle'
# COLLECTION_NAME = 'Tweet_from_@BernieSanders'
# FIELDS = {'created_at': True, 'text': True, 'favourite_count': True, 'tweet_count': True, 'user': True}


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

# @app.route("/d")
# def data():
#     connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
#     collection = connection[DBS_NAME][COLLECTION_NAME]
#     projects = collection.find(projection=FIELDS)
#     json_projects = []
#     for project in projects:
#         json_projects.append(project)
#     json_projects = json.dumps(json_projects, default=json_util.default)
#     connection.close()
#     return json_projects


if __name__ == "__main__":
    app.run()
