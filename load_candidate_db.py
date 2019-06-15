import tweepy
import pymongo
from pymongo import MongoClient
import time

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

    # setting up name and count variables for metadata collection
    candidate_meta_dict = {}
    candidate_name = ""
    tweet_count = 0
    tweet_favorites = 0
    tweet_retweets = 0

    page_count = 0  
    for page in tweepy.Cursor(api.user_timeline, screen_name=screen_name, count=200).pages(100):
        page_count += 1
        print("     >>>>> now on page ", page_count)

        for tweet in page: 
            # add tweet to this candidate collection
            tweets.insert_one(tweet._json)
            # collect stats for this candidate to be added to a metadata collection
            candidate_name = tweet.user.name
            tweet_count += 1
            tweet_favorites += tweet.favorite_count
            tweet_retweets += tweet.retweet_count

        time.sleep(1)
        print ("    ...%s tweets downloaded so far" % (len(page)))
    candidate_meta_dict["candidate"] = candidate_name
    candidate_meta_dict["retweetAvg"] = tweet_retweets/tweet_count
    candidate_meta_dict["favoriteAvg"] = tweet_favorites/tweet_count
    return candidate_meta_dict


def add_to_metadata(candidateDictionary): 
    client = MongoClient()
    db = client.db_twitter_handle
    col = "metadata"
    meta = db[col]

    # Update the Mongo database using update and upsert=True
    meta.insert_one(candidateDictionary)
 

# The Twitter users who we want to get tweets from
candidates = ["@realDonaldTrump", "@BernieSanders", "@JoeBiden", "@SenWarren", "@GovBillWeld", "@JohnDelaney", "@KamalaHarris"]

for name in candidates:
    try:
        meta_dict = get_all_tweets(name)
        add_to_metadata(meta_dict)
    except pymongo.errors.DuplicateKeyError:
        print("DuplicateKeyError")
        continue

