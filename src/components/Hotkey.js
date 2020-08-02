//rfce
import React, { useEffect } from 'react'

function Hotkey() {
  let keysPressed = {};

  const init = () => {
    // keydown
    document.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true;
      if (keysPressed['Control'] && event.key == '=') {
          console.log("재생");
          let target = document.querySelector("input.txt").value;
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