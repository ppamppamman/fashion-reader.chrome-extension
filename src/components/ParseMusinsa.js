import React, { useEffect, useCallback } from 'react'
// import { useDispatch } from 'react-redux';
// import { addItem, changeCurrentId } from '../modules/cart';

// 데이터 파싱
function Parse() {

  // init
  const init = (target) => {
    return JSON.parse(window.localStorage.getItem(target)) ? 
      JSON.parse(window.localStorage.getItem(target)) : 
      [];
  }
  let watchListUrl = init("watchListUrl"); // 리팩토링 필요 -> 로컬스토리지가 아닌 크롬스토리지에서 받아서 처리하도록
  
  const checkValidUrl = (link) => {
    let targetUrl = "store.musinsa.com/app/product/detail/";
    return link.includes(targetUrl);
  }

  const checkWatchListUrl = (link) => {
    return watchListUrl.includes(link);
  }

  useEffect(() => {
    if ( !checkValidUrl(window.location.href) ) {
      return;
    }

    if ( checkWatchListUrl(window.location.href) ) {
      console.log("이미 본 상품");
      speechSynthesis.speak(new SpeechSynthesisUtterance("이미 본 상품입니다."));
    } else {
      console.log("저장 시작");
      let target = {
        watchListUrl: window.location.href,
        watchListImg: document.getElementById('bigimg').src,
        watchListDesc: document.getElementById('bigimg').alt
      }
      window.chrome.runtime.sendMessage({method: "POST_ITEM_INFO", value: target}, function(response) {
        console.log(response.data);
        speechSynthesis.speak(new SpeechSynthesisUtterance("준비 완료."));
      });

      // checkWatchListUrl을 위한 레거시
      watchListUrl.push(window.location.href);
      window.localStorage.setItem("watchListUrl", JSON.stringify(watchListUrl));
    }
  });

  return (null);
}

export default Parse;