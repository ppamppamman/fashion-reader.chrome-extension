import React, { useEffect } from 'react'

function Parse() {;

  // init
  const init = (target) => {
    return JSON.parse(window.localStorage.getItem(target)) ? 
      JSON.parse(window.localStorage.getItem(target)) : 
      [];
  }
  let watchListUrl, watchListImg, watchListDesc;
  [watchListUrl, watchListImg, watchListDesc] = [init("watchListUrl"), init("watchListImg"), init("watchListDesc")];
  

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
      //speechSynthesis.speak(new SpeechSynthesisUtterance("이미 본 제품"));
    } else {
      console.log("저장 시작");
      watchListUrl.push(window.location.href);
      watchListImg.push(document.getElementById('bigimg').src);
      watchListDesc.push(document.getElementById('bigimg').alt);

      window.localStorage.setItem("watchListUrl", JSON.stringify(watchListUrl));
      window.localStorage.setItem("watchListImg", JSON.stringify(watchListImg));
      window.localStorage.setItem("watchListDesc", JSON.stringify(watchListDesc));

      //speechSynthesis.speak(new SpeechSynthesisUtterance(document.getElementById('bigimg').alt));
    }

  });

  return (null)
}

export default Parse
