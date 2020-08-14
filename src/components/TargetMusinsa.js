import React, { useEffect, useCallback } from 'react'

// 시나리오 타겟일 때
function TargetMusinsa() {
  // init
  const init = (target) => {
    return JSON.parse(window.localStorage.getItem(target)) ? 
      JSON.parse(window.localStorage.getItem(target)) : 
      [];
  }
  let watchListUrl = init("watchListUrl"); // 리팩토링 필요 -> 로컬스토리지가 아닌 크롬스토리지에서 받아서 처리하도록
  let scenarios = [
    "1021325/0", "1063709/0", "1370841/0", "1305013/0", 
    "412702/0", "454584/0", "949615/0", "412704/0", "624632/0",
    "840830/0", "987352/0", "1103286/0"
  ];
  let scenarioIdx = scenarios.indexOf(window.location.pathname.split("/app/product/detail/")[1]);
  let scenarioDesc = [
    `
    상품 이름 : Polo Knit top [LEOPARD/BROWN].
    가격 : 36,800 원.
    성별 : 여성.
    카테고리 : 상의.
    아이템 : 카라티.
    패턴 : 호피 패턴.
    색상 : 탁한 황갈색.
    패턴색 : 밝은 갈색, 검정색.
    핏 : 슬림핏.
    기장 : 크롭 기장.
    소매 : 반팔.
    넥라인 : 스탠다드 카라.
    소재 : 니트.
    디테일 : 단추.
    로고 : 상의 왼쪽 가슴, 작은 크기, 글자 그림 혼합.
    `,
    `
    상품 이름 : [SSS]글리터 니트 크롭 티 [멀티 피치].
    가격 : 23,800 원.
    성별 : 여성.
    카테고리 : 상의.
    아이템 : 반팔티.
    패턴 : 가로 스트라이프.
    색상 : 베이지 그레이.
    패턴색 : 자줏빛 분홍, 올리브색.
    핏 : 슬림핏.
    기장 : 크롭 기장.
    소매 : 반팔.
    넥라인 : 라운드넥.
    소재 : 니트.
    디테일 : 없음.
    로고 : 상의 왼쪽 가슴, 작은 크기, 글자 그림 혼합.
    `,
    `
    상품 이름 : [SSS]글리터 니트 크롭 티 [멀티 피치].
    가격 : 46,550 원.
    성별 : 여성.
    카테고리 : 상의.
    아이템 : 반팔티.
    패턴 : 없음.
    색상 : 보랏빛 회색.
    핏 : 노멀핏.
    기장 : 중간 기장.
    소매 : 반팔.
    넥라인 : 라운드넥.
    소재 : 면.
    디테일 : 없음.
    로고 : 없음.
    `,
    `
    상품 이름 : (CTC1) 니트 에디션 카라 포인트 반팔탑 블루.
    가격 : 55,100 원.
    성별 : 여성.
    카테고리 : 상의.
    아이템 : 반팔티.
    패턴 : 없음.
    색상 : 흐린 파랑색.
    핏 : 노멀핏.
    기장 : 중간 기장.
    소매 : 반팔.
    넥라인 : 스탠다드 카라.
    소재 : 니트.
    디테일 : 단추.
    로고 : 없음.
    `,
    `
    상품 이름 : 드롭 숄더 싱글 코트 [블랙].
    가격 : 129,900 원.
    성별 : 남성.
    카테고리 : 아우터 코트.
    아이템 : 싱글버튼 코트.
    패턴 : 없음.
    색상 : 검정색.
    핏 : 노멀핏.
    기장 : 롱 기장.
    소재 : 울.
    디테일 : 단추.
    로고 : 없음.
    `,
    `
    상품 이름 : 8/20 배송 오버핏 더블 롱코트 - 블랙 (FL-009).
    가격 : 198,500 원.
    성별 : 남성.
    카테고리 : 아우터 코트.
    아이템 : 더블버튼 코트.
    패턴 : 없음.
    색상 : 검정색.
    핏 : 오버핏.
    기장 : 롱 기장.
    소재 : 울.
    디테일 : 단추.
    로고 : 없음.
    `,
    `
    상품 이름 : 밀 M-51 피쉬테일 야상 코트 카키.
    가격 : 68,600 원.
    성별 : 남성.
    카테고리 : 아우터 자켓.
    아이템 : 사파리 자켓.
    패턴 : 없음.
    색상 : 어두운 녹갈색.
    핏 : 오버핏.
    기장 : 롱 기장.
    소재 : 면.
    디테일 : 지퍼, 포켓, 드롭숄더.
    로고 : 없음.
    `,
    `
    상품 이름 : 드롭 숄더 싱글 코트 [베이지].
    가격 : 129,900 원.
    성별 : 남성.
    카테고리 : 아우터 코트.
    아이템 : 싱글 버튼 코트.
    패턴 : 없음.
    색상 : 회황색.
    핏 : 노멀 핏.
    기장 : 롱 기장.
    소재 : 울.
    디테일 : 단추, 포켓.
    로고 : 없음.
    `,
    `
    상품 이름 : 드롭 숄더 싱글 코트 [베이지].
    가격 : 208,000 원.
    성별 : 남성.
    카테고리 : 아우터 코트.
    아이템 : 떡볶이 코트.
    패턴 : 없음.
    색상 : 검정색.
    핏 : 노멀 핏.
    기장 : 롱 기장.
    소재 : 울.
    디테일 : 단추, 포켓.
    로고 : 없음.
    `,
    `
    상품 이름 : 코튼 오버롤 (블랙).
    가격 : 71,100 원.
    성별 : 여성.
    카테고리 : 하의.
    아이템 : 멜빵 바지.
    패턴 : 없음.
    색상 : 검정색.
    핏 : 와이드 핏.
    기장 : 긴바지.
    소재 : 면.
    디테일 : 단추, 포켓, 스터드.
    로고 : 없음.
    `,
    `
    상품 이름 : [2020NEW]BCG 반팔 원피스 CESBGTS07BL.
    가격 : 47,200 원.
    성별 : 여성.
    카테고리 : 원피스.
    아이템 : PK 원피스.
    패턴 : 없음.
    색상 : 밝은 파랑색.
    핏 : 슬림핏.
    기장 : 미니 원피스.
    허리 : 미들 웨이스트.
    넥라인 : 스탠다드 카라.
    소매 : 반팔.
    소재 : 면.
    디테일 : 없음.
    로고1 : 흰색, 상의 왼쪽 가슴, 작은 크기, 글자.
    로고2 : 흰색, 상의 오른쪽 가슴, 작은 크기, 글자.
    `,
    `
    상품 이름 : 플라워 원피스_블랙.
    가격 : 70,300 원.
    성별 : 여성.
    카테고리 : 원피스.
    아이템 : 플레어 원피스, 뷔스티에 원피스.
    패턴 : 플라워 패턴.
    색상 : 검정색.
    패턴 색상 : 진한 초록색, 밝은 자주색.
    핏 : 노멀핏.
    기장 : 미니 원피스.
    허리 : 미들 웨이스트.
    넥라인 : V넥.
    소매 : 민소매.
    소재 : 면.
    디테일 : 스트랩, 프릴.
    `
  ];

  let scenarioAdditionalDesc = [
    `크롭 기장 : 아랫선이 잘린 듯 허리가 드러나는 짧은 형태의 상의.`,
    `크롭 기장 : 아랫선이 잘린 듯 허리가 드러나는 짧은 형태의 상의.`,
    `추가정보 없음.`,
    `추가정보 없음.`,
    `싱글버튼 코트 : 정면의 여미는 단추가 세로 한 줄인 코트.`,
    `더블버튼 코트 : 정면의 여미는 단추가 세로 두 줄인 코트.`,
    `사파리 자켓 : 간편하고 투박한스타일의 포켓이 많이 달린 재킷, 야상. , 드롭숄더 : 어깨선의 경계 없이 흘러내리는 디자인의 어깨라인.`,
    `싱글 버튼 코트 : 정면의 여미는 단추가 세로 한 줄인 코트.`,
    `떡볶이 코트 : 목 부분에 모자가 달리고, 작은 통나무 모양의 단추를 장식 끈으로 잠가 입는 코트.`,
    `스터드 : 금속의 징 장식.`,
    `PK원피스 : 넥라인에 카라가 있는 원피스.`,
    `플레어 원피스 : 끝단이 풍성하여 아래통이 넓게 디자인된 원피스. , 뷔스티에 원피스 : 얇은 끈으로 어깨와 팔이 드러난 원피스. , 프릴 : 주름을 잡아 물결 모양으로 만든 옷 가장자리의 디테일.`
  ]

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
      let scenarioTarget = {
        watchListUrl: window.location.href,
        watchListImg: document.getElementById('bigimg').src,
        watchListTitle: document.querySelector(".product_title > span").innerText,
        watchListDesc: scenarioDesc[scenarioIdx],
        watchListAdditionalDesc: scenarioAdditionalDesc[scenarioIdx]
      }
      let target = {
        watchListUrl: window.location.href,
        watchListImg: document.getElementById('bigimg').src,
        watchListTitle: document.querySelector(".product_title > span").innerText,
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
        watchListHashTags: hashTags === undefined ? null : hashTags,
      }

      window.chrome.runtime.sendMessage({method: "POST_SCENARIO_ITEM_INFO", value: target, scenarioTarget: scenarioTarget}, function(response) {
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

export default TargetMusinsa