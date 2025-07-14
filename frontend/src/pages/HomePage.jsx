import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../api/axiosInstance.js'
import { FaBookmark } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import ApplyButton from '../components/ApplyButton.jsx';
import BookmarkButton from '../components/BookmarkButton.jsx';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadItems = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/jobs?page=${page}&limit=20`);
      const newItems = res.data.jobs;

      setItems((prev) => [...prev, ...newItems]);     
      setPage((prev) => prev + 1);

      if (newItems.length < 20) setHasMore(false);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      hasMore &&
      !loading
    ) {
      loadItems();
    }
  };

  useEffect(() => {
    loadItems();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="p-4">
      <ul className="space-y-2 max-w-8/9 mx-auto">
        {items.map((job) => (
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

      {loading && <p className="mt-4 text-center text-gray-500">Loading...</p>}
      {!hasMore && <p className="mt-4 text-center text-gray-400">No more items.</p>}
    </div>
  );
}

export default HomePage