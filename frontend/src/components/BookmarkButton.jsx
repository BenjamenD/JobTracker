import React, { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa'; 
import axios from '../api/axiosInstance.js';

const BookmarkButton = ({ jobId }) => {
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    const checkBookmark = async () => {
      if(localStorage.getItem("token")){
        try {
          const res = await axios.get(`/api/bookmark/isBookmarked/${jobId}`);
          setBookmark(res.data.isBookmarked);
        } catch (err) {
          console.error("Failed to check bookmark status", err);
        }
      }
    };

    checkBookmark();
  }, [jobId]);

  const handleBookmark = async (jobId) => {
    try {
      if (bookmark) {
          await axios.post(`/api/bookmark/unbookmark/${jobId}`);
      } else {
          await axios.post(`/api/bookmark/${jobId}`);
      }

      setBookmark(!bookmark);
    } catch (error) {
      console.error('Bookmark action failed:', error);
    }
};

  return (
    <div>
      <button
        className={`p-1 rounded-md transition ${bookmark ? 'text-amber-500 hover:text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}
        onClick={() => handleBookmark(jobId)}
        aria-label={bookmark ? 'Remove bookmark' : 'Bookmark'}
      >
        <FaBookmark />
      </button>
    </div>
  );
};

export default BookmarkButton;
