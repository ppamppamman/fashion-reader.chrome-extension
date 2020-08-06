//rfce
import React, { useEffect } from 'react'

// 단축키 설정 
function Hotkey() {
  let keysPressed = {};

  const init = () => {
    // keydown
    window.chrome.runtime.onMessage.addListener(
      (message, sender, sendResponse) => {
      //console.log(message, ":", sender,  ":", sendResponse);
      speechSynthesis.speak(new SpeechSynthesisUtterance("크롬 백그라운드 메세지 테스트"));
    });

    document.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true;
      let target;
      if (keysPressed['Alt']) {
        switch (event.key) {
          case '1': // 확인
            console.log("확인");
            break;
          case '2': // 취소
            console.log("취소");
            break;
          case "ArrowLeft": // 로컬 스토리지 선택 포인트 좌측 이동
            console.log("이전 상품");
            break;
          case "ArrowRight": // 로컬 스토리지 선택 포인트 우측 이동
            console.log("최근 상품");
            break;
          case 'h': // 커맨드 읽어주기
            console.log("단축키 목록");
            target = "알트키와 숫자 1은 확인, 알트키와 숫자 2는 취소, 알트키와 왼쪽화살표는 이전에 본 상품, 알트키와 오른쪽 화살표는 최근에 본 상품, 알트키와 H는 단축키 읽어주기입니다.";
            break;
          default:
            target = "잘못 입력된 단축키 입니다."
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