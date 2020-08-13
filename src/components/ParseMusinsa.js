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

      // 무신사 productInfo 탐색 시작
      let brandName, season, gender, viewCount, sellTotalCount, likeCount, reviewCount, reviewSatisfaction, hashTags;
      // let brandName = document.querySelector("div.product_info_section").querySelectorAll("ul > li")[0].querySelector("strong").childNodes[0].innerText;
      // let season = document.querySelector("div.product_info_section").querySelectorAll("ul > li")[1].querySelector("strong").innerText;
      // let gender = document.querySelector("div.product_info_section").querySelector(".txt_gender").innerText;
      // let viewCount = document.querySelector("div.product_info_section").querySelector("#pageview_1m").innerText;
      // let sellTotalCount = document.querySelector("div.product_info_section").querySelector("#sales_1y_qty").innerText;
      // let likeCount = document.querySelector("div.product_info_section").querySelector(".prd_like_cnt").innerText;
      // let reviewCount = document.querySelector("div.product_info_section").querySelector(".link_type").innerText;
      // let reviewSatisfaction = document.querySelector("div.product_info_section").querySelectorAll(".product_article_contents")[5].innerText.split("/")[1];
      // let hashTags = document.querySelector("div.product_info_section").querySelectorAll("ul > li")[6].innerText.split("\n").join().split("#").join("");
      let productInfos = ["브랜드", "시즌", "성별", "조회수", "누적판매", "좋아요", "구매후기", "#"];
      let productInfoNodeList = document.querySelector("div.product_info_section").querySelectorAll("ul > li");
      
      for (let i=0; i < productInfos.length; i++) {
        switch(productInfos[i]){
          case "브랜드":
            for (let [idx, e] of productInfoNodeList.entries()) {
              if (e.innerText.includes("브랜드")) {
                brandName = productInfoNodeList[idx].querySelector("strong")?.childNodes[0].innerText;
              }
            }
            break;
          case "시즌":
            for (let [idx, e] of productInfoNodeList.entries()) {
              if (e.innerText.includes("시즌")) {
                season = productInfoNodeList[idx].querySelector("strong")?.innerText;
              }
            }
            break;
          case "성별":
            gender = document.querySelector("div.product_info_section").querySelector(".txt_gender")?.innerText;
            break;
          case "조회수":
            viewCount = document.querySelector("div.product_info_section").querySelector("#pageview_1m")?.innerText;
            break;
          case "누적판매":
            sellTotalCount = document.querySelector("div.product_info_section").querySelector("#sales_1y_qty")?.innerText;
            break;
          case "좋아요":
            likeCount = document.querySelector("div.product_info_section").querySelector(".prd_like_cnt")?.innerText;
            break;
          case "구매후기":
            for (let [idx, e] of productInfoNodeList.entries()) {
              if (e.innerText.includes("구매후기")) {
                reviewCount = document.querySelector("div.product_info_section").querySelectorAll(".product_article_contents")[idx]?.innerText.split("/")[0].split("건")[0];
                reviewSatisfaction = document.querySelector("div.product_info_section").querySelectorAll(".product_article_contents")[idx]?.innerText.split("/")[1];
              }
            }
            break;
          case "#":
            for (let [idx, e] of productInfoNodeList.entries()) {
              if (e.innerText.includes("#")) {
                hashTags = document.querySelector("div.product_info_section").querySelectorAll("ul > li")[idx]?.innerText.split('\n').join().split("#").join("");
              }
            }
            break;
          default:
            console.log("default");
        }
      }
      // productInfo 탐색 끝

      // 넘길 데이터 할당 시작
      //let brandName, season, gender, viewCount, sellTotalCount, likeCount, reviewCount, reviewSatisfaction, hashTags;
      let target = {
        watchListUrl: window.location.href,
        watchListImg: document.getElementById('bigimg').src,
        watchListDesc: document.querySelector(".product_title > span").innerText,
        watchListPrice: document.querySelector("#goods_price").innerText+"원",
        watchListCategory: document.querySelector(".item_categories").innerText.split(">").join(),
        watchListBrandName: brandName === undefined ? null : brandName,
        watchListSeason: season === undefined ? null : season,
        watchListGender: gender === undefined ? null : gender,
        watchListViewCount: viewCount === undefined ? null : viewCount,
        watchListSellTotalCount: sellTotalCount === undefined ? null : sellTotalCount,
        watchListLikeCount: likeCount === undefined ? null : likeCount,
        watchListReviewCount: reviewCount === undefined ? null : reviewCount,
        watchListReviewSatisfaction: reviewSatisfaction === undefined ? null : reviewSatisfaction,
        watchListHashTags: hashTags === undefined ? null : hashTags
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