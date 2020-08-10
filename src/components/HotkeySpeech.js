//rfce
import React, { useEffect } from 'react'

// 단축키 설정 
function Hotkey() {
  let keysPressed = {};

  const init = () => {
    // keydown
    window.chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
      //console.log(message, ":", sender,  ":", sendResponse);
      speechSynthesis.speak(new SpeechSynthesisUtterance("크롬 백그라운드 메세지 테스트"));
    });

    document.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true;
      let target;
      if (keysPressed['Shift']) {
        console.log(event.key, keysPressed[event.key]);
        switch (event.key) {
          case '!': // 확인
            console.log("확인");
            window.chrome.runtime.sendMessage({method: "GET_CURRENT_ITEM"}, async (response) => {
              await console.log("메세지 확인", response)
              await console.log("메세지 확인 itemInfo : ", response.item.itemInfo)
              await speechSynthesis.speak(new SpeechSynthesisUtterance(response.item.itemInfo.watchListDesc));
            });
            break;
          case '@': // 취소
            console.log("취소");
            break;
          case "ArrowLeft": // 로컬 스토리지 선택 포인트 좌측 이동
            console.log("이전 상품");
            window.chrome.runtime.sendMessage({method: "PATCH_CURRENT_ID_LEFT"}, async (response) => {
              await console.log("메세지 확인", response)
              // await console.log("메세지 확인 2", response.item.itemInfo.watchListDesc)
              // await speechSynthesis.speak(new SpeechSynthesisUtterance(response.item.itemInfo.watchListDesc));
            });
            break;
          case "ArrowRight": // 로컬 스토리지 선택 포인트 우측 이동
            console.log("최근 상품");
            window.chrome.runtime.sendMessage({method: "PATCH_CURRENT_ID_RIGHT"}, async (response) => {
              await console.log("메세지 확인", response)
              // await console.log("메세지 확인 2", response.item.itemInfo.watchListDesc)
              // await speechSynthesis.speak(new SpeechSynthesisUtterance(response.item.itemInfo.watchListDesc));
            });
            break;
          case 'H': // 커맨드 읽어주기
            console.log("단축키 목록");
            target = "알트키와 숫자 1은 확인, 알트키와 숫자 2는 취소, 알트키와 왼쪽화살표는 이전에 본 상품, 알트키와 오른쪽 화살표는 최근에 본 상품, 알트키와 H는 단축키 읽어주기입니다.";
            break;
          default:
            break;
        }
      }
      
      // 읽기
      speechSynthesis.speak(new SpeechSynthesisUtterance(target));
    
    });
    
    // keyup kedown flag에 대한 해제
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