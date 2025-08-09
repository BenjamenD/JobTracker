import React, { useState, useEffect, useRef } from 'react';
import axios from '../api/axiosInstance.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import ApplyButton from '../components/ApplyButton.jsx';
import BookmarkButton from '../components/BookmarkButton.jsx';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Keep an imperative page reference to avoid stale closures
  const pageRef = useRef(1);
  // Prevent double initial fetch in React StrictMode (dev)
  const initialFetchDoneRef = useRef(false);

  const LIMIT = 20;

  const fetchJobs = async (pageToFetch) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/jobs?page=${pageToFetch}&limit=${LIMIT}`);
      const newItems = Array.isArray(res.data.jobs) ? res.data.jobs : [];

      setItems((prev) => {
        const merged = [...prev, ...newItems];
        const seenIds = new Set();
        return merged.filter((job) => {
          if (!job || !job._id) return false;
          if (seenIds.has(job._id)) return false;
          seenIds.add(job._id);
          return true;
        });
      });

      if (newItems.length < LIMIT) {
        setHasMore(false);
      } else {
        const nextPage = pageToFetch + 1;
        pageRef.current = nextPage;
        setPage(nextPage);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialFetchDoneRef.current) return;
    initialFetchDoneRef.current = true;
    pageRef.current = 1;
    setPage(1);
    fetchJobs(1);
  }, []);

  const loadMore = () => {
    if (loading || !hasMore) return;
    fetchJobs(pageRef.current);
  };

  return (
    <div className="p-4">
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<p className="text-center text-gray-500">Loading...</p>}
        endMessage={<p className="text-center text-gray-400">No more jobs.</p>}
      >
        <ul className="space-y-2 max-w-8/9 mx-auto">
          {items.map((job) => (
            <li key={job._id} className="border-2 p-4 rounded-lg bg-white shadow">
              <h2 className="text-lg font-bold">
                {job.title} <BookmarkButton jobId={job._id} /> <ApplyButton jobId={job._id} />
              </h2>
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
              <p className="text-xs text-gray-400 mt-2">
                Posted: {new Date(job.date_posted).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
