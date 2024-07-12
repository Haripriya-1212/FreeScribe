import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/HomePage'
import Header from './components/Header'
import FileDisplay from './components/FileDisplay'
import Infromation from './components/Infromation'
import Transcribing from './components/Transcribing'
import { MessageTypes } from './utils/presets'
import TestProxy from './components/TestProxy'

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const [downloading, setDownloading] = useState(false);

  
  const isAudioAvailable = file || audioStream;
  
  function handleAudioReset(){
    setFile(null);
    setAudioStream(null);
  }

  const worker = useRef(null);

  useEffect(() =>{
    if(!worker.current){
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url),{type:'module'})
    }

    const onMessageReceived = async (e) => {
      switch(e.data.type){
        case 'DOWNLOADING':
          setDownloading(true)
          console.log('DOWNLOADING')
          break;
        case 'LOADING':
          setLoading(true)
          console.log('LOADING')
          break;
        case 'RESULT':
          setOutput(e.data.results)
          console.log('RESULT')
          break;
        case 'INFERENCE_DONE':
          setFinished(true)
          console.log('FINISHED')
          break;
      }
    }

    worker.current.addEventListener('message', onMessageReceived)
    // cleanup 
    return () => worker.current.removeEventListener('message', onMessageReceived)
  }, [])


  async function readAudioFrom(file){
    const sampling_rate = 16000
    const audioCTX = new AudioContext({sampleRate: sampling_rate})
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio
  }

  async function handleFormSubmission(){
    if(!file && !audioStream){ return }

    let audio = await readAudioFrom(file ? file : audioStream)
    const model_name = "openai/whisper-tiny.en"

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name
    })
  }
  
  return (
    <div className='flex flex-col max-w-[1000px] mx-auto w-full'>
      <section className='min-h-screen flex flex-col'>
        <Header/>
        {/* <TestProxy/> */}

        {output ? (<Infromation output/>) : 
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

export default App