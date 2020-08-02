//rfce
import React from 'react'

function Hotkey() {
  const init = () => {
    document.addEventListener("keydown", (e) => {
      switch (e.key){
        case "y":
          alert("y keydown")
        break;
      }
        
    });
  }
  
  // const onInputCommand = () => {

  // }
  init();
  return (null);
}

export default Hotkey;