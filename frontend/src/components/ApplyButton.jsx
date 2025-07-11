import React from 'react'
import { useState, useEffect } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import axios from '../api/axiosInstance.js';

const ApplyButton = ({jobId}) => {
    const [apply, setApply] = useState(false);

    useEffect(() => {
      const checkApply = async () => {
        try {
          const res = await axios.get(`/api/application/isApplied/${jobId}`);
          setApply(res.data.isApplied);
        } catch (err) {
          console.error("Failed to check application status", err);
        }
    };

    checkApply();
  }, [jobId]);

    const handleApply = async (jobId) => {
        try {
        if (apply) {
            await axios.post(`/api/application/unapply/${jobId}`);
        } else {
            await axios.post(`/api/application/${jobId}`);
        }

        setApply(!apply);
        } catch (error) {
        console.error('Application action failed:', error);
        }
  };
  return (
    <div>
      <button className={`pl-2 ${apply? 'text-green-400' : 'text-black-800'}`} onClick={() => handleApply(jobId)}><IoIosCheckmarkCircle /></button>
    </div>
  )
}

export default ApplyButton