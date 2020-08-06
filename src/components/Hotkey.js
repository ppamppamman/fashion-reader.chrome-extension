//rfce
import React, { useEffect } from 'react'

function Hotkey() {
  let keysPressed = {};

  const init = () => {
    // keydown
    window.chrome.runtime.onMessage.addListener(
      (message, sender, sendResponse) => {
      console.log(message, ":", sender,  ":", sendResponse);
      speechSynthesis.speak(new SpeechSynthesisUtterance("e"));
    });

    document.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true;
      if (keysPressed['Control'] && event.key == '=') {
          console.log("재생");
          //let target = document.querySelector("input.txt").value;
          let target = JSON.parse(window.localStorage.getItem('watchListDesc')).slice(-1)[0];
          speechSynthesis.speak(new SpeechSynthesisUtterance(target));
      }
    });
    
    // keyup
    document.addEventListener('keyup', (event) => {
        keysPressed[event.key] = false;
    });
  }

  useEffect(() => {
    init();
  });
  
  return (null);
}

export default Hotkey;