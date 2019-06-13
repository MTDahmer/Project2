import tweepy
import pymongo
from pymongo import MongoClient
import time
import datetime as DT

# Google developer API key
from config import consumer_key, consumer_secret, access_token, access_token_secret

def get_all_tweets(screen_name): 
    client = MongoClient()
    db = client.db_twitter_handle
    col = "Tweets_from_"+screen_name
    tweets = db[col]

    # Creating the authentication object
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    # Setting your access token and secret
    auth.set_access_token(access_token, access_token_secret)

    # Creating the API object while passing in auth information
    api = tweepy.API(auth, wait_on_rate_limit=True)

    page_count = 0  
    for page in tweepy.Cursor(api.user_timeline, screen_name=screen_name, count=200).pages():
        page_count += 1
        print("     >>>>> now on page ", page_count)

        for tweet in page: 
            tweets.insert_one(tweet._json)
            print("Method execution is finished.")

        time.sleep(5)
        print ("    ...%s tweets downloaded so far" % (len(page)))
        if page_count >= 100:  
            break

# The Twitter users who we want to get tweets from
candidates = ["@realDonaldTrump", "@BernieSanders", "@JoeBiden", "@SenWarren", "@GovBillWeld", "@JohnDelaney", "@KamalaHarris"]


for name in candidates:
    try:
        get_all_tweets(name)
    except pymongo.errors.DuplicateKeyError:
        print("DuplicateKeyError")
        continue

