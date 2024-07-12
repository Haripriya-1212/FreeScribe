import React from 'react'

export default function Transcription(props) {
    const { output } = props;
    console.log(output);
    const final_text = output.map(val => val.text)

  return (
    <div>{final_text}</div>
  )
}
