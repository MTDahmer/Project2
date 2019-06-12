import tweepy
import json
from pymongo import MongoClient
import datetime as DT

# Google developer API key
from config import consumer_key, consumer_secret, access_token, access_token_secret
 
MONGO_HOST= 'mongodb://localhost/twitterdb'  # assuming you have mongoDB installed locally
                                             # and a database called 'twitterdb'
 
WORDS = ["@realDonaldTrump" "@BernieSanders", "@JoeBiden", "@SenWarren"]
  
class StreamListener(tweepy.StreamListener):    
    #This is a class provided by tweepy to access the Twitter Streaming API. 
 
    def on_connect(self):
        # Called initially to connect to the Streaming API
        print("You are now connected to the streaming API.")
 
    def on_error(self, status_code):
        # On error - if an error occurs, display the error / status code
        print('An Error has occured: ' + repr(status_code))
        return False
 
    def on_data(self, data):
        #This is the meat of the script...it connects to your mongoDB and stores the tweet
        try:
            client = MongoClient(MONGO_HOST)
            
            # Use twitterdb database. If it doesn't exist, it will be created.
            db = client.twitterdb
    
            # Decode the JSON from Twitter
            datajson = json.loads(data)
            
            #grab the 'created_at' data from the Tweet to use for display
            created_at = datajson['created_at']

            #use these to check if tweet is re-tweeted or original tweet
            tweetID = datajson.get("id_str")
            tweetData = api.get_status(tweetID)

            #check if tweet is valid (not a retweet)
            if ( (hasattr(tweetData, 'retweeted_status')) ):
                pass
            else:
                #print out a message to the screen that we have collected a tweet
                print("Tweet collected at " + str(created_at))
                #insert the data into the mongoDB into a collection called twitter_search
                #if twitter_search doesn't exist, it will be created.
                db.twitter_search.insert(datajson)
        except Exception as e:
           print(e)
 
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
#setup api
api = tweepy.API(auth, wait_on_rate_limit=True)
#Set up the listener. The 'wait_on_rate_limit=True' is needed to help with Twitter API rate limiting.
listener = StreamListener(api) 
streamer = tweepy.Stream(auth=auth, listener=listener)
print("Tracking: " + str(WORDS))
streamer.filter(track=WORDS)