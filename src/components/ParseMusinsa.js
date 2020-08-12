import React, { useEffect, useCallback } from 'react'
// import { useDispatch } from 'react-redux';
// import { addItem, changeCurrentId } from '../modules/cart';

// 데이터 파싱
function Parse() {

  // init
  // const init = (target) => {
  //   return JSON.parse(window.localStorage.getItem(target)) ? 
  //     JSON.parse(window.localStorage.getItem(target)) : 
  //     [];
  // }
  // chrome.storage init
  // let watchListUrl, watchListImg, watchListDesc;
  // [watchListUrl, watchListImg, watchListDesc] = [init("watchListUrl"), init("watchListImg"), init("watchListDesc")];
  
  // const dispatch = useDispatch();
  // const onChange = useCallback((targetId) => {dispatch(changeCurrentId(targetId))}, [dispatch]);

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
      console.log("이미 본 제품");
      speechSynthesis.speak(new SpeechSynthesisUtterance("이미 본 제품"));
    } else {
      console.log("저장 시작");

      let target = {
        watchListUrl: window.location.href,
        watchListImg: document.getElementById('bigimg').src,
        watchListDesc: document.getElementById('bigimg').alt
      }
      window.chrome.runtime.sendMessage({method: "POST_ITEM_INFO", value: target}, function(response) {
        console.log(response.data);
      });
      // dispatch(addItem(target));

      watchListUrl.push(window.location.href);
      watchListImg.push(document.getElementById('bigimg').src);
      watchListDesc.push(document.getElementById('bigimg').alt);

      window.localStorage.setItem("watchListUrl", JSON.stringify(watchListUrl));
      window.localStorage.setItem("watchListImg", JSON.stringify(watchListImg));
      window.localStorage.setItem("watchListDesc", JSON.stringify(watchListDesc));
    }

  });

  return (null)
}

export default Parse
