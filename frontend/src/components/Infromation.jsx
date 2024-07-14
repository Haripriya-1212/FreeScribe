import React, { useState } from 'react'
import Transcription from './Transcription';
import Translation from './Translation';
import { useLocation } from 'react-router-dom';

export default function Infromation(props) {
    // const {output } = props;
    const location = useLocation();
    const { output } = location.state;
    const [tab, setTab] = useState('transcription');

    function handleCopy(){
        // navigator.clipboard.writeText()
        const textToCopy = output;
        console.log("textToCopy", textToCopy);
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    function handleDownload(){
        const textToDownload = output;
        const blob = new Blob([textToDownload], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${tab}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

  return (
    <div className='flex flex-col max-w-[1000px] mx-auto w-full'>

      <section className='min-h-screen flex flex-col'>

    <main className='flex-1 flex flex-col gap-3 sm:gap-4 justify-center p-4 text-center pb-20 w-72 max-w-prose w-full mx-auto'>
        <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl items-center whitespace-nowrap pb-6'>Your <span className='text-blue-400 bold'>Transcrpition</span></h1>

        <div className='grid-cols-2 items-center mx-auto bg-white border-1 border-solid border-blue-3 00 shadow rounded-full overflow-hidden'>
            <button 
            className={'px-5 py-2 font-medium duration-200' + (tab === 'transcription' ? ' bg-blue-400 text-white' : ' text-blue-400 hover:text-blue-600')}
            onClick={() => setTab('transcription')}
            >Transcrpition</button>            
            <button 
            className={'px-5 py-2 font-medium duration-200' + (tab === 'translation' ? ' bg-blue-400 text-white' : ' text-blue-400 hover:text-blue-600')}
            onClick={() => setTab('translation')}
            >Translation</button>            
        </div>
        
        <div className='my-8 flex flex-col'>

        {tab === 'transcription' ? <Transcription output={output}/> : <Translation output={output}/>}
        </div>

        <div className='flex items-center gap-4 mx-auto'>
            <button title="Copy" 
            className='bg-white px-2 text-blue-300 hover:text-blue-400 duration-200 rounded aspect-square grid place-items-center'
            onClick={handleCopy}
            >
                <i className="fa-solid fa-copy"></i>
            </button>
            <button title="Download" 
            className='bg-white px-2 text-blue-300 hover:text-blue-400 duration-200 rounded aspect-square grid place-items-center'
            onClick={handleDownload}
            >
                <i className="fa-solid fa-download"></i>
            </button>
        </div>
    </main>
                </section>
                </div>
  )
}
