import React, { useState, useEffect, useRef} from 'react'

export default function HomePage(props) {
    const { setFile, setAudioStream } = props

    const [recordingStatus, setRecordingStatus] = useState('inactive');
    const [audioChunks, setAudioChunks] = useState([]);
    const [duration, setDuration] = useState(0);

    const mediaRecorder = useRef(null);
    const mimeType = 'audio/webm'

    async function startRecording(){
        let tempStream

        console.log('Start Recording');
        try{
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })
            tempStream = streamData
        }
        catch(err){
            console.log(err.message)
            return
        }
        setRecordingStatus('recording')

        // create a new Media recorder instance using stream
        const media = new MediaRecorder(tempStream, {type: mimeType})
        mediaRecorder.current = media

        mediaRecorder.current.start()
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (event) => {
            if(typeof event.data === 'undefined'){ return }
            if(event.data.size === 0){ return }
            localAudioChunks.push(event.data)
        }

        setAudioChunks(localAudioChunks)
    }


    async function stopRecording(){
        setRecordingStatus('inactive')
        console.log("stopped recording")

        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, {type: mimeType})
            setAudioStream(audioBlob)
            setAudioChunks([])
            setDuration(0)
        }
    }


    useEffect(() => {
        if(recordingStatus === 'inactive'){ return }

        const interval = setInterval(() => {
            setDuration(curr => curr+1)
        }, 1000)

        return () => clearInterval(interval)
    })


  return (
    <main className='flex-1 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center p-4 text-center pb-40'>
        {/* FREESCRIBE */}
        <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Free<span className='text-blue-600 bold'>Scribe</span></h1>
        {/* RECORD -> TRANSCRIBE -> TRANSLATE */}
        <h3 className='font-medium md:text-lg'>Record <span className='text-blue-400'>&rarr; </span>Transcribe</h3>
        {/* START RECORDING */}
        <button className='flex items-center text-base justify-between gap-4 mx-auto w-72 w-max-full my-4 specialBtn1 px-4 py-2 rounded-xl' onClick={recordingStatus === 'recording' ? stopRecording : startRecording}>
            <p className='text-blue-600'>{recordingStatus === 'inactive' ? 'Record' : 'Stop recording'}</p>
            <div className='flex items-center gap-2'>
                {duration && (
                    <p className='text-sm text-black'>{duration}s</p>
                )}
                <i className={`fa-solid duration-200 fa-microphone ${recordingStatus === "recording" ? 'text-rose-300' : 'text-black'}`}></i>
                {/* <i class={"fa-solid duration-200 fa-microphone" + (recordingStatus === "recording" ? 'text-rose-300' : "")}></i> */}
            </div>
        </button>

        {/* FILE UPLOAD */}
        <p className='text-base'>Or <label className='text-blue-400 cursor-pointer hover:text-blue-800 duration-200'>upload <input className='hidden' type='file' accept='.mp3,.wave' onChange={(e) => {
            const tempFile = e.target.files[0]
            setFile(tempFile)
        }}/></label>a mp3 file</p>

        
        <p className='italic text-slate-400'>Free now free forever</p>
    </main>
  )
}
