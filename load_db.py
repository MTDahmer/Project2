import tweepy
import pymongo
from pymongo import MongoClient
import time
import datetime as DT

# Google developer API key
from config import consumer_key, consumer_secret, access_token, access_token_secret

def get_all_tweets(screen_name): 
    client = MongoClient()
    db = client.db_twitter
    col = "Tweets_"+screen_name
    tweets = db[col]

    # Creating the authentication object
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    # Setting your access token and secret
    auth.set_access_token(access_token, access_token_secret)

    # Creating the API object while passing in auth information
    api = tweepy.API(auth, wait_on_rate_limit=True)

    language = "en"
    today = DT.date.today()
    # day_ago = today - DT.timedelta(days=1)
    week_ago = today - DT.timedelta(days=7)
    
    # new_tweets = api.search(q=screen_name +"since:2019-06-11 until:2019-06-12", lang=language, since=day_ago, count=100)

    page_count = 0  
    for page in tweepy.Cursor(api.search, q=screen_name, lang=language, since=week_ago, until=today, count=100).pages():
        page_count += 1
        print("     >>>>> now on page ", page_count)

        for tweet in page: 
            # if (tweet.retweeted):
            if ( (hasattr(tweet, 'retweeted_status')) ):
                pass
            else:
                tweets.insert_one(tweet._json)
                print("Method execution is finished.")

        time.sleep(5)
        print ("    ...%s tweets downloaded so far" % (len(page)))
        if page_count >= 200:  
            break

# The Twitter users who we want to get tweets from
candidates = ["@realDonaldTrump", "@BernieSanders", "@JoeBiden", "@SenWarren", "@GovBillWeld", "@JohnDelaney", "@KamalaHarris"]


for name in candidates:
    try:
        get_all_tweets(name)
    except pymongo.errors.DuplicateKeyError:
        print("DuplicateKeyError")
        continue

