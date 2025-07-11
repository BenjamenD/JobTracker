import React from 'react'
import { FaBookmark } from 'react-icons/fa'; 
import { useState, useEffect } from 'react';
import axios from '../api/axiosInstance.js';

const BookmarkButton = ({jobId}) => {
    const [bookmark, setBookmark] = useState(false);

    useEffect(() => {
        const checkBookmark = async () => {
        try {
            const res = await axios.get(`/api/bookmark/isBookmarked/${jobId}`);
            setBookmark(res.data.isBookmarked);
        } catch (err) {
            console.error("Failed to check bookmark status", err);
        }
    };

    checkBookmark();
  }, [jobId]);

    const handleBookmark = async () => {
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
        <button className={`pl-2 ${bookmark? 'text-yellow-400' : 'text-black-800'}`} onClick={() => handleBookmark(jobId)}><FaBookmark /></button>
    </div>
  )
}

export default BookmarkButton