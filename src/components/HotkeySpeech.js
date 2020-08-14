//rfce
import React, { useEffect } from 'react'

// 단축키 설정 
function Hotkey() {
  let keysPressed = {};

  const init = () => {
    // keydown
    let synth = speechSynthesis;
    let voiceIdx, utterance;
    // synthVoice 임시조치
    setTimeout(() => {
      for(let [idx, synthVoice] of synth.getVoices().entries()){
        console.log("synthVoice.name", synthVoice.name);
        if (synthVoice.name == "Google 한국의") {
          voiceIdx = idx;
          break;
        }
      }  
    }, 500);


    window.chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
      //console.log(message, ":", sender,  ":", sendResponse);
      speechSynthesis.speak(new SpeechSynthesisUtterance("크롬 백그라운드 메세지 테스트"));
    });

    document.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true;
      let target;
      if (keysPressed['Shift']) {
        console.log(event.key, keysPressed[event.key]);
        if (event.key == 'X' || event.key == 'ㅌ'){
            console.log("확인");
            event.preventDefault();
            synth.cancel(utterance);
            window.chrome.runtime.sendMessage({method: "GET_CURRENT_ITEM"}, async (response) => {
              await console.log("메세지 확인", response);
              await console.log("메세지 확인 itemInfo : ", response.item?.itemInfo);
              target = response.item.itemInfo.watchListDesc;
              // 타겟 분할
              let limit1 = Math.ceil(target.length/100);
              for(let i =0; i<limit1; i++){
                let tempTarget = target.substring(i*100, i*100+100);
                utterance = new SpeechSynthesisUtterance(tempTarget);
                utterance.voice = synth.getVoices()[voiceIdx];
                await console.log("target", i, tempTarget);
                await synth.speak(utterance);
              }
              // utterance = new SpeechSynthesisUtterance(target);
              // await synth.speak(utterance);
            });
        } else if (event.key == 'C' || event.key == 'ㅊ'){
            console.log("추가 정보 재생");
            event.preventDefault();
            synth.cancel(utterance);
            window.chrome.runtime.sendMessage({method: "GET_CURRENT_ITEM"}, async (response) => {
              await console.log("메세지 확인", response);
              await console.log("메세지 확인 itemInfo : ", response.item?.itemInfo);
              target = response.item.itemInfo.watchListAdditionalDesc;
              utterance = new SpeechSynthesisUtterance(target);
              utterance.voice = synth.getVoices()[voiceIdx];
              await synth.speak(utterance);
            });
        }
        else if (event.key == 'V' || event.key == 'ㅍ'){
          console.log("취소");
            event.preventDefault();
            synth.cancel(utterance);
            target = "재생 취소."
            utterance = new SpeechSynthesisUtterance(target);
            utterance.voice = synth.getVoices()[voiceIdx];
            synth.speak(utterance);
        }
        else if (event.key == 'B' || event.key == 'ㅠ'){
          console.log("단축키 목록");
            event.preventDefault();
            synth.cancel(utterance);
            target = `
              쉬프트키와 숫자 1은 기본 재생. 쉬프트키와 숫자 2는 추가정보 재생. 쉬프트키와 숫자 3은 멈춤. 
              쉬프트키와 왼쪽키는 이전 상품을 선택. 쉬프트키와 오른쪽키는 다음 상품을 선택. 
              쉬프트와 H는 단축키 읽어주기입니다.`;
            // 타겟 분할
            let limit2 = Math.ceil(target.length/100);
            for(let i =0; i<limit2; i++){
              let tempTarget = target.substring(i*100, i*100+100);
              utterance = new SpeechSynthesisUtterance(tempTarget);
              utterance.voice = synth.getVoices()[voiceIdx];
              synth.speak(utterance);
            }
        }
        else if (event.key == 'Q' || event.key == 'ㅃ'){
          console.log("이전 상품");
            window.chrome.runtime.sendMessage({method: "PATCH_CURRENT_ID_LEFT"}, async (response) => {
              await console.log("메세지 확인", response)
              event.preventDefault();
              synth.cancel(utterance);
              target = `현재 상품은 ${response.itemCount}개 중 ${response.currentId+1}개 째 상품입니다.`
              utterance = new SpeechSynthesisUtterance(target);
              utterance.voice = synth.getVoices()[voiceIdx];
              await synth.speak(utterance);
            });
        }
        else if (event.key == 'W' || event.key == 'ㅉ'){
          console.log("다음 상품");
            window.chrome.runtime.sendMessage({method: "PATCH_CURRENT_ID_RIGHT"}, async (response) => {
              await console.log("메세지 확인", response);
              event.preventDefault();
              synth.cancel(utterance);
              target = `현재 상품은 ${response.itemCount}개 중 ${response.currentId+1}개 째 상품입니다.`
              utterance = new SpeechSynthesisUtterance(target);
              utterance.voice = synth.getVoices()[voiceIdx];
              await synth.speak(utterance);
            });
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