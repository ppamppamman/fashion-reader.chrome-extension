import React, { useEffect, useCallback } from 'react'
// import { useDispatch } from 'react-redux';
// import { addItem, changeCurrentId } from '../modules/cart';

// 데이터 파싱
function Parse() {

  let synth = speechSynthesis;
  let voiceIdx, utterance;
  // synthVoice 임시조치
  setTimeout(() => {
    for(let [idx, synthVoice] of synth.getVoices().entries()){
      
      if (synthVoice.name == "Google 한국의") {
        voiceIdx = idx;
        break;
      }
    }
  });

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
      
      utterance = new SpeechSynthesisUtterance("이미 본 상품입니다.");
      utterance.voice = synth.getVoices()[voiceIdx];
      utterance.rate = 1.3;
      synth.speak(utterance);
    } else {
      console.log("저장 시작");

      // 무신사 productInfo 탐색 시작
      let brandName, season, gender, viewCount, sellTotalCount, likeCount, reviewCount, reviewSatisfaction, hashTags;
      let productInfos = [ "성별", "브랜드", "시즌", "조회수", "누적판매", "좋아요", "구매후기", "#"];
      let productInfoNodeList = document.querySelector("div.product_info_section").querySelectorAll("ul > li");
      let tempDesc=[];
      tempDesc.push(`상품 이름 : ${document.querySelector(".product_title > span").innerText}`)
      tempDesc.push(`가격 : ${document.querySelector("#goods_price").innerText+"원"}`)
      tempDesc.push(`카테고리 : ${document.querySelector(".item_categories").innerText.split(">").join()}`)
      
      for (let i=0; i < productInfos.length; i++) {
        switch(productInfos[i]){
          case "브랜드":
            for (let [idx, e] of productInfoNodeList.entries()) {
              if (e.innerText.includes("브랜드")) {
                brandName = productInfoNodeList[idx].querySelector("strong")?.childNodes[0].innerText;
                if (brandName) { tempDesc.push(`브랜드 이름 : ${brandName}.`) }
              }
            }
            break;
          case "시즌":
            for (let [idx, e] of productInfoNodeList.entries()) {
              if (e.innerText.includes("시즌")) {
                season = productInfoNodeList[idx].querySelector("strong")?.innerText;
                if (season) { tempDesc.push(`시즌 : ${season}.`) }
              }
            }
            break;
          case "성별":
            gender = document.querySelector("div.product_info_section").querySelector(".txt_gender")?.innerText;
            if (gender) { tempDesc.push(`성별 : ${gender}.`) }
            break;
          case "조회수":
            viewCount = document.querySelector("div.product_info_section").querySelector("#pageview_1m")?.innerText;
            if (viewCount) { tempDesc.push(`상품 조회수 : ${viewCount}.`) }
            break;
          case "누적판매":
            sellTotalCount = document.querySelector("div.product_info_section").querySelector("#sales_1y_qty")?.innerText;
            if (sellTotalCount) { tempDesc.push(`상품 판매수 : ${sellTotalCount}.`) }
            break;
          case "좋아요":
            likeCount = document.querySelector("div.product_info_section").querySelector(".prd_like_cnt")?.innerText;
            if (likeCount) { tempDesc.push(`상품 좋아요수 : ${likeCount}.`) }
            break;
          case "구매후기":
            for (let [idx, e] of productInfoNodeList.entries()) {
              if (e.innerText.includes("구매후기")) {
                reviewCount = document.querySelector("div.product_info_section").querySelectorAll(".product_article_contents")[idx]?.innerText.split("/")[0].split("건")[0];
                if (reviewCount) { tempDesc.push(`상품 리뷰수 : ${reviewCount}.`) }
                reviewSatisfaction = document.querySelector("div.product_info_section").querySelectorAll(".product_article_contents")[idx]?.innerText.split("/")[1];
                if (reviewSatisfaction) { tempDesc.push(`상품 만족도 : ${reviewSatisfaction}.`) }
              }
            }
            break;
          case "#":
            for (let [idx, e] of productInfoNodeList.entries()) {
              if (e.innerText.includes("#")) {
                hashTags = document.querySelector("div.product_info_section").querySelectorAll("ul > li")[idx]?.innerText.split('\n').join().split("#").join("");
                if (hashTags) { tempDesc.push(`상품 해시태그 : ${hashTags}.`) }
              }
            }
            break;
          default:
            console.log("default");
        }
      }
      // productInfo 탐색 끝
      console.log("tempDesc", tempDesc)

      // 넘길 데이터 할당 시작
      //let brandName, season, gender, viewCount, sellTotalCount, likeCount, reviewCount, reviewSatisfaction, hashTags;

      let target = {
        watchListUrl: window.location.href,
        watchListImg: document.getElementById('bigimg').src,
        watchListTitle: document.querySelector(".product_title > span").innerText,
        watchListDesc: tempDesc.join(". , "),
        watchListPrice: document.querySelector("#goods_price").innerText+"원",
        watchListCategory: document.querySelector(".item_categories").innerText.split(">").join(),
        watchListBrandName: brandName === undefined ? undefined : brandName,
        watchListSeason: season === undefined ? undefined : season,
        watchListGender: gender === undefined ? undefined : gender,
        watchListViewCount: viewCount === undefined ? undefined : viewCount,
        watchListSellTotalCount: sellTotalCount === undefined ? undefined : sellTotalCount,
        watchListLikeCount: likeCount === undefined ? undefined : likeCount,
        watchListReviewCount: reviewCount === undefined ? undefined : reviewCount,
        watchListReviewSatisfaction: reviewSatisfaction === undefined ? undefined : reviewSatisfaction,
        watchListHashTags: hashTags === undefined ? undefined : hashTags
      }

      window.chrome.runtime.sendMessage({method: "POST_ITEM_INFO", value: target}, function(response) {
        console.log(response.data);
        utterance = new SpeechSynthesisUtterance("준비 완료.");
        utterance.voice = synth.getVoices()[voiceIdx];
        utterance.rate = 1.3;
        synth.speak(utterance);
      });

      // checkWatchListUrl을 위한 레거시
      watchListUrl.push(window.location.href);
      window.localStorage.setItem("watchListUrl", JSON.stringify(watchListUrl));
    }
  });

  return (null);
}

export default Parse;