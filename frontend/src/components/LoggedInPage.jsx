import { useState, useRef, useEffect, useContext } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import HomePage from './HomePage'
import Header from './Header'
import FileDisplay from './FileDisplay'
import Infromation from './Infromation'
import Transcribing from './Transcribing'
// import TestProxy from './components/TestProxy'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext';

export default function LoggedInPage() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const {userInfo} = useContext(UserContext);

  const usr_id = userInfo._id;

  const navigate = useNavigate();

  
  const isAudioAvailable = file || audioStream;
  
  function handleAudioReset(){
    setFile(null);
    setAudioStream(null);
  }


  async function readAudioFrom(file){
    console.log("reading file")
    const sampling_rate = 16000
    const audioCTX = new AudioContext({sampleRate: sampling_rate})
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio
  }

  async function handleFormSubmission(){
    if(!file && !audioStream){ return }
    let audioBuffer = await readAudioFrom(file ? file : audioStream);

    const formData = new FormData();

    if(audioStream){

      formData.append('audio', audioStream, 'audio');
      
      setLoading(true);
      
      try {
        
        const response = await axios.post('http://localhost:3000/transcribe', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        setOutput(response.data.transcription);
        console.log("Received transcription output")
        console.log("response:",response)
        console.log("data:",response.data.transcription)
        // console.log("output:",output)
        setLoading(false);
        setFinished(true);
        handleStoring(response.data.transcription);
        navigate('/info', { state: { output: response.data.transcription } });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    else{
      formData.append('audio', file);

      setLoading(true);

      try {
        const response = await axios.post('http://localhost:3000/transcribe-mp3', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        setOutput(response.data.transcription);
        console.log('Transcription:', response.data.transcription);
        setLoading(false);
        setFinished(true);
        handleStoring(response.data.transcription);
        navigate('/info', { state: { output: response.data.transcription } });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

  }

  async function handleStoring(transcript) {
    try {
      const response = await fetch('http://localhost:3000/save-transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: usr_id, transcript })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Transcript saved successfully:', responseData);
    } catch (error) {
      console.error('Error saving transcript:', error);
    }
  }


  
  return (
    <div className='flex flex-col max-w-[1000px] mx-auto w-full'>
      <section className='min-h-screen flex flex-col'>
        {/* <TestProxy/> */}

        {
        // output ? (<Infromation output={output}/>) : 
        loading ? <Transcribing/> : 
        
        isAudioAvailable ? (
          <FileDisplay handleFormSubmission={handleFormSubmission} handleAudioReset={handleAudioReset} file={file} audioStream={audioStream}/>
        ) : (
        <HomePage setFile={setFile} setAudioStream={setAudioStream}/>
        )}
      
      </section>
      {/* <h1 className='text-green-600 font-bold'>Hello</h1> */}
      <footer></footer>
    </div>
  )
}






