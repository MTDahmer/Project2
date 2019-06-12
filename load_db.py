import tweepy
from pymongo import MongoClient
import datetime as DT

# Google developer API key
from config import consumer_key, consumer_secret, access_token, access_token_secret

def get_all_tweets(screen_name): 
    client = MongoClient()
    db = client.db_twitter
    tweets = db.Tweets

    # Creating the authentication object
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    # Setting your access token and secret
    auth.set_access_token(access_token, access_token_secret)

    # Creating the API object while passing in auth information
    api = tweepy.API(auth, wait_on_rate_limit=True)

    language = "en"
    today = DT.date.today()
    week_ago = today - DT.timedelta(days=7)

    alltweets = []
    new_tweets = api.search(q=screen_name, lang=language, since=week_ago, count=100)
    alltweets.extend(new_tweets)
    oldest = alltweets[-1].id - 1   
    while len(new_tweets) > 0:
        new_tweets = api.search(q=screen_name, lang=language, since=week_ago, count=100, max_id=oldest)
        alltweets.extend(new_tweets)
        oldest = alltweets[-1].id - 1

        for tweet in alltweets: 
            if (tweet.retweeted):
                pass
            else:
                tweets.insert_one(tweet._json)
                print("Method execution is finished.")

# The Twitter users who we want to get tweets from
# name = "@GovBillWeld"
candidates = ["@realDonaldTrump", "@BernieSanders", "@JoeBiden", "@SenWarren"]

for name in candidates:
    get_all_tweets(name)

