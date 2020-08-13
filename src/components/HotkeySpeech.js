//rfce
import React, { useEffect } from 'react'

// 단축키 설정 
function Hotkey() {
  let keysPressed = {};

  const init = () => {
    // keydown
    let synth = speechSynthesis;
    let utterance;
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
          case '!': // 재생
            console.log("확인");
            window.chrome.runtime.sendMessage({method: "GET_CURRENT_ITEM"}, async (response) => {
              await console.log("메세지 확인", response)
              await console.log("메세지 확인 itemInfo : ", response.item.itemInfo)
              target = response.item.itemInfo.watchListDesc;
              utterance = new SpeechSynthesisUtterance(target);
              await synth.speak(utterance);
              // await speechSynthesis.speak(new SpeechSynthesisUtterance(target));
            });
            break;
          case '@': // 상세 재생
            console.log("상세 재생");
            target = "취소합니다."
            speechSynthesis.speak(new SpeechSynthesisUtterance(target));
            break;
          case '#': // 취소
            console.log("취소");
            event.preventDefault();
            synth.cancel(utterance);
            //synth.speak(utterance);
            target = "취소합니다."
            speechSynthesis.speak(new SpeechSynthesisUtterance(target));
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
            console.log("이후 상품");
            window.chrome.runtime.sendMessage({method: "PATCH_CURRENT_ID_RIGHT"}, async (response) => {
              await console.log("메세지 확인", response)
              // await console.log("메세지 확인 2", response.item.itemInfo.watchListDesc)
              // await speechSynthesis.speak(new SpeechSynthesisUtterance(response.item.itemInfo.watchListDesc));
            });
            break;
          case 'H': // 커맨드 읽어주기 영어일 때
            console.log("단축키 목록");
            target = `
              쉬프트키와 숫자 1은 기본 재생. 쉬프트키와 숫자 2는 상세 재생. 쉬프트키와 숫자 3은 멈춤. 
              쉬프트키와 왼쪽키는 이전 상품을 선택. 쉬프트키와 오른쪽키는 다음 상품을 선택. 
              쉬프트와 H는 단축키 읽어주기입니다.`;
              speechSynthesis.speak(new SpeechSynthesisUtterance(target));
            break;
          case 'ㅗ': // 커맨드 읽어주기 한글일 때
            console.log("단축키 목록");
            target = `
              쉬프트키와 숫자 1은 기본 재생. 쉬프트키와 숫자 2는 상세 재생. 쉬프트키와 숫자 3은 멈춤. 
              쉬프트키와 왼쪽키는 이전 상품을 선택. 쉬프트키와 오른쪽키는 다음 상품을 선택. 
              쉬프트와 H는 단축키 읽어주기입니다.`;
              speechSynthesis.speak(new SpeechSynthesisUtterance(target));
            break;
          default:
            break;
        }
      }
    
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