# JobTracker

A full-stack MERN job board application that scrapes and aggregates developer job listings from multiple online sources. Users can register, log in, and save or track jobs they are interested in.

**Live Demo:** [jobtracker-umsb.onrender.com](https://jobtracker-umsb.onrender.com)

## Features

- **Job Scraping Automation**
  - Python scrapers pull listings from multiple job boards.
  - Managed by **GitHub Actions**, automatically running weekly.

- **User Authentication & State**
  - Authentication via **bcrypt** and **JWT tokens**.
  - Users can:
    - Save jobs
    - Track which jobs they've applied to

- **Backend**
  - Built with **Node.js** and **Express**
  - Authenticated routes are protected via custom middleware.
  - MongoDB for persistent storage.

- **Frontend**
  - Built with **React**
  - Frontend user pages are protected via a wrapper route for authenticated access.
  - **Lazy scrolling** displays job listings dynamically as the user scrolls.

- **Deployment**
  - Deployed using **Render**
  - Server and client hosted for full-stack functionality

---

## Tech Stack

- **Frontend:** React, JavaScript, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** bcrypt, JWT
- **Job Scraping:** Python
- **Automation:** GitHub Actions
- **Deployment:** Render
