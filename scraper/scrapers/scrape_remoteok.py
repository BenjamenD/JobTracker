import requests
import json

def scrape_remoteok():
    try:
        url = "https://remoteok.com/api"
        headers = {"User-Agent": "Mozilla/5.0"}

        response = requests.get(url, headers=headers)
        response.raise_for_status()

        jobs_data = response.json()

        #skip the first item, it has irrelevant info
        job_postings = jobs_data[1:]

        jobs = []
        for job in job_postings:
            title = job.get("position")
            company = job.get("company")
            jobUrl = job.get("url")
            tags = job.get("tags")
            date_posted = job.get("date")

            if not all([title, company, jobUrl, tags, date_posted]):
                continue
    
            job_info = {
                "title": title,
                "company": company,
                "url": jobUrl,
                "tags": tags,
                "date_posted": date_posted
            }
            jobs.append(job_info)

        return jobs
    except Exception as e:
        print(f"Error scraping jobs from Remoteok: {e}")
        exit(1)

if __name__ == "__main__":
    print(scrape_remoteok())