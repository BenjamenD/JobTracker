import React, { useEffect, useState } from 'react'
import axios from '../api/axiosInstance.js'
import BookmarkButton from '../components/BookmarkButton';
import ApplyButton from '../components/ApplyButton';

const UserPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const getApplied = async () => {
      const applyRes = await axios.get('/api/application/getApplied');
      const bookmarkRes = await axios.get('/api/bookmark/getBookmarked')
      const appliedJobs = applyRes.data.jobs;
      const bookmaredJobs = bookmarkRes.data.jobs
      setAppliedJobs(appliedJobs);
      setBookmarkedJobs(bookmaredJobs);
    }
    getApplied()
  }, []);

  return (
    <div>
      <div className='text-2xl py-3 text-center'>Bookmarked Jobs</div>
        <ul className="space-y-2 max-w-8/9 mx-auto">
          {bookmarkedJobs.map((job) => (
            <li key={job._id} className="border-2 p-4 rounded-lg bg-white shadow">
              <h2 className="text-lg font-bold">{job.title} <BookmarkButton jobId={job._id}/> <ApplyButton jobId={job._id}/></h2>
              <p className="text-sm text-gray-700">{job.company}</p>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Job
              </a>
              <div className="mt-2 flex flex-wrap gap-2">
                {job.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Posted: {new Date(job.date_posted).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>

      <div className='text-2xl py-3 text-center'>Applied Jobs</div>
        <ul className="space-y-2 max-w-8/9 mx-auto">
          {appliedJobs.map((job) => (
            <li key={job._id} className="border-2 p-4 rounded-lg bg-white shadow">
              <h2 className="text-lg font-bold">{job.title} <BookmarkButton jobId={job._id}/> <ApplyButton jobId={job._id}/></h2>
              <p className="text-sm text-gray-700">{job.company}</p>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Job
              </a>
              <div className="mt-2 flex flex-wrap gap-2">
                {job.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Posted: {new Date(job.date_posted).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default UserPage