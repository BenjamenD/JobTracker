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
    <div className="space-y-6">
      <div>
        <h2 className='text-xl font-semibold text-center text-slate-900'>Bookmarked jobs</h2>
        <ul className="mt-3 grid grid-cols-1 gap-3">
          {bookmarkedJobs.map((job) => (
            <li key={job._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">{job.title}</h3>
                  <p className="mt-0.5 text-sm text-slate-600">{job.company}</p>
                </div>
                <div className="flex items-center gap-1 text-lg text-slate-500">
                  <BookmarkButton jobId={job._id}/>
                  <ApplyButton jobId={job._id}/>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {job.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] sm:text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition"
                >
                  View role
                </a>
                <p className="text-xs text-slate-500">Posted {new Date(job.date_posted).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className='text-xl font-semibold text-center text-slate-900'>Applied jobs</h2>
        <ul className="mt-3 grid grid-cols-1 gap-3">
          {appliedJobs.map((job) => (
            <li key={job._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">{job.title}</h3>
                  <p className="mt-0.5 text-sm text-slate-600">{job.company}</p>
                </div>
                <div className="flex items-center gap-1 text-lg text-slate-500">
                  <BookmarkButton jobId={job._id}/>
                  <ApplyButton jobId={job._id}/>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {job.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] sm:text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition"
                >
                  View role
                </a>
                <p className="text-xs text-slate-500">Posted {new Date(job.date_posted).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserPage