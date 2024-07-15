import React from 'react'
import { UserContext } from '../UserContext';
import { useContext, useState, useEffect } from 'react';
import HistoryElement from './HistoryElement';

export default function HistoryPage() {
  const {userInfo} = useContext(UserContext);
  const usr_id = userInfo._id;

  const [transcripts, setTranscripts] = useState([]);

  useEffect(() => {
    async function fetchTranscripts() {
      try {
        const response = await fetch(`http://localhost:3000/transcripts?userId=${userInfo._id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Got data : ", data)
        setTranscripts(data);
      } catch (error) {
        console.error('Error fetching transcripts:', error);
        setError(error);
      }
    }

    if (userInfo._id) {
      fetchTranscripts();
    }
  }, [userInfo._id]);

  return (
    <div className='mt-20'>
      <h1 className='font-semibold text-3xl sm:text-4xl md:text-5xl mb-10'>History</h1>
      <ul>
        {transcripts.length > 0 ? (
          transcripts.map((transcript) => (
            <li key={transcript._id}>
              
              <HistoryElement transcript={ transcript.transcript} time={new Date(transcript.createdAt).toLocaleString()}/>
            </li>
          ))
        ) : (
          <p>No transcripts yet!</p>
        )}
      </ul>
    </div>
    
  );
}
