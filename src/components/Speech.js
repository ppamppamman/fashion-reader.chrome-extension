import React from 'react'

function Speech() {
  
  const textSpeech = () => {
    let target = document.querySelector("input.txt").value;
    speechSynthesis.speak(
      new SpeechSynthesisUtterance(target)
    );
  }

  return (
    <div className="Speech">
      <h1> Speech synthesiser </h1>
      <form>
        <input type="text" className="txt" />
      </form>
      <button onClick={textSpeech}>sampleSpeech</button>
    </div>
  );
}

export default Speech;