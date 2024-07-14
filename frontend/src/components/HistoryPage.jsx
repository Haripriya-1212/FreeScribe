import React from 'react'
import { UserContext } from '../UserContext';
import { useContext, useState, useEffect } from 'react';

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
      <h1>History</h1>
      <ul>
        {transcripts.length > 0 ? (
          transcripts.map((transcript) => (
            <li key={transcript._id}>
              <p>Transcript: {transcript.transcript}</p>
              <p>Time: {new Date(transcript.time).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <p>No transcripts yet!</p>
        )}
      </ul>
    </div>
    
  );
}
