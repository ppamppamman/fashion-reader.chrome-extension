import React from 'react'

function Speech() {
  const sampleSpeech = () => {
    alert("sampleSpeech !");
  }

  return (
    <div className="Speech">
      <h1> Speech synthesiser </h1>
      <form>
        <input type="text" class="txt" />
      </form>
      <button onClick={sampleSpeech}>sampleSpeech</button>
    </div>
  );
}

export default Speech;