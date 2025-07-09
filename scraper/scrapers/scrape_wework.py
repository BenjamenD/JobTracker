import requests

def scrape_wework():
    try:
        url = "https://remoteok.com/api"
        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        response = requests.get(url, headers=headers)
        response.raise_for_status()

        jobs_data = response.json()

        #skip the first item, it has irrelevant info
        jobs_data = jobs_data[1:]

        jobs = []

        for row in jobs_data:
            job = {
                "title": row.get("position"),
                "company": row.get("company"),
                "url": "https://remoteok.com" + row.get("url"),
                "tags": row.get("tags"),
                "date_posted": row.get("date")
            }

            jobs.append(job)

        return jobs
    except Exception as e:
        print(f"Error scraping data from Wework: {e}")
        exit(1)

if __name__ == "__main__":
    print(scrape_wework())