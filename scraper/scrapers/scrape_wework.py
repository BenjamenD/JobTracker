import requests
import json

def scrape_wwr():
    try:
        url = "https://weworkremotely.com/categories/remote-programming-jobs.json"
        headers = {"User-Agent": "Mozilla/5.0"}

        response = requests.get(url, headers=headers)
        response.raise_for_status()

        jobs_data = response.json()
        job_postings = jobs_data.get("jobs", [])

        jobs = []
        for job in job_postings:
            title = job.get("title")
            company = job.get("company_name")
            jobUrl = "https://weworkremotely.com" + job.get("url", "")
            tags = job.get("category", "").split(",")  # You can parse this better
            date_posted = job.get("publication_date")

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
        print(f"Error scraping jobs from We Work Remotely: {e}")
        exit(1)

if __name__ == "__main__":
    print(scrape_wwr())
