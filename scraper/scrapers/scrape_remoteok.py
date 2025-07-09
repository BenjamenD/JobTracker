import requests
import json

def scrape_remoteok():
    url = "https://remoteok.com/api"
    headers = {"User-Agent": "Mozilla/5.0"}

    response = requests.get(url, headers=headers)
    response.raise_for_status()

    jobs_data = response.json()

    #skip the first item, it has irrelevant info
    job_postings = jobs_data[1:]

    jobs = []
    for job in job_postings:
        job_info = {
            "title": job.get("position"),
            "company": job.get("company"),
            "url": job.get("url"),
            "tags": job.get("tags"),
            "date_posted": job.get("date")
        }
        jobs.append(job_info)

    return jobs

if __name__ == "__main__":
    print(scrape_remoteok())