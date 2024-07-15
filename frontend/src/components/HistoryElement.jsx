import React from 'react'

export default function HistoryElement({transcript, time }) {

  function handleCopy(){
    // navigator.clipboard.writeText()
    const textToCopy = transcript;
    console.log("textToCopy", textToCopy);
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Text copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

function handleDownload(){
    const textToDownload = transcript;
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcription.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// function handleDelete(){

// }


  return (
    <div className="flex justify-between items-center p-4 mb-4 rounded-lg border-2 border-[#313131] hover:bg-[#313131] text-gray-500 hover:text-white transition-colors duration-200">
      <div>
        <p className="text-sm font-medium text-white w-[1300px]">{transcript}</p>
        <p className="text-xs 0">{time}</p>
      </div>
      <div className="flex flex-row space-x-2 items-center justify-center">
        <button className="hover:text-blue-500" onClick={handleCopy}>
          copy 
        </button>
        <span> &nbsp;|&nbsp;</span>
        <button className="hover:text-blue-500" onClick={handleDownload}>
          download
        </button>
        {/* <span> &nbsp;|&nbsp;</span>
        <button className="hover:text-blue-500" onClick={handleDelete}>
          delete
        </button> */}
      </div>
    </div>
  )
}
