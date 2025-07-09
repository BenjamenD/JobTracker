from scrapers.scrape_remoteok import scrape_remoteok
from scrapers.scrape_wework import scrape_wework
from pymongo import MongoClient
from datetime import datetime, timedelta, timezone
from dateutil import parser
from dotenv import load_dotenv
import os

load_dotenv()

try:
    DB_NAME = os.getenv("DB_NAME")
    COLLECTION_NAME = os.getenv("COLLECTION_NAME")

    client = MongoClient(os.getenv("MONGO_URI"))

    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    # uncomment this code to delete the db and collection so it can be recreated
    # client.drop_database(DB_NAME)
    # db.drop_collection(COLLECTION_NAME)
    
except Exception as e:
    print(f"Could not connect to MongoDB: {e}")
    exit(1)

jobs = scrape_wework() + scrape_remoteok()

#add job if duplicate isnt found
for job in jobs:
    if not collection.find_one({
    "title": job["title"],
    "company": job["company"],
    "date_posted": job["date_posted"]
    }):
        collection.insert_one(job)

#remove jobs posted over 30 days ago
deadline = datetime.now(timezone.utc) - timedelta(days=30)

for job in collection.find():
    date_posted = parser.isoparse(job["date_posted"])
    if date_posted < deadline:
        collection.delete_one({"_id": job["_id"]})
    