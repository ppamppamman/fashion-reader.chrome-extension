import React, { useState } from 'react'

function CartItem({ each, onToggle }) {

  let target, utterance;
  let desc = [];
  let synth = speechSynthesis;
  let voiceIdx;
  
  console.log("카트아이템")
  for(let [idx, synthVoice] of synth.getVoices().entries()){
    console.log("synthVoice.name", synthVoice.name);
    if (synthVoice.name == "Google 한국의") {
      voiceIdx = idx;
      break;
    }
  }

  const onClickRepeat = (targetId) => {

    console.log("targetId : ", targetId);
    synth.cancel(utterance);

    window.chrome.runtime.sendMessage({method: "GET_SPECIFIC_ITEM", targetId: targetId}, async (response) => {
      await console.log("메세지 확인", response)
      await console.log("메세지 확인 itemInfo : ", response.item.itemInfo)
      
      target = response.item.itemInfo.watchListDesc;
      
      let limit = Math.ceil(target.length/100);
      for(let i =0; i<limit; i++){
        let tempTarget = target.substring(i*100, i*100+100);
        utterance = new SpeechSynthesisUtterance(tempTarget);
        utterance.voice = synth.getVoices()[59];
        await console.log("target", i, tempTarget);
        await synth.speak(utterance);
      }
    });
  }

  const onClickRedirect = (targetId) => {
    console.log("targetId : ", targetId);
    synth.cancel(utterance);
    target = "상품 창이 열립니다.";
    utterance = new SpeechSynthesisUtterance(target);
    window.chrome.runtime.sendMessage({method: "GET_SPECIFIC_ITEM", targetId: targetId}, async (response) => {
      await synth.speak(utterance);
      await window.open(response.item.itemInfo.watchListUrl);
    });
  }

  return (
    <>
      <div className="divider" style={{"width": "90%", "height": "0", "margin": "2%", "overflow": "hidden", "border-top": "1px solid #e1e6ea" }}></div>
      <div className="cartItem" style={{"width":"85%", "margin":"2%", "padding":"2%"}}>
          <div className="cartItem-text">
            <h1> {each.itemInfo.watchListTitle} </h1>
            <h4> 
              {(undefined !== each.itemInfo.watchListCategory ) ? 
                ("카테고리 : "+each.itemInfo.watchListCategory).split('\n').map(
                  text => { desc.push(text); return ( <> {text}<br/> </> ) }
                ) : (null) 
              }
              {(undefined !== each.itemInfo.watchListGender) ? 
                ("성별 : "+each.itemInfo.watchListGender).split('\n').map(
                  text => { desc.push(text); return ( <> {text}<br/> </> ) }
                ) : (null) 
              }
              {(undefined !== each.itemInfo.watchListBrandName) ? 
                ("브랜드이름 : "+each.itemInfo.watchListBrandName).split('\n').map(
                  text => { desc.push(text); return ( <> {text}<br/> </> )}
                ) : (null) 
              }
              {(undefined !== each.itemInfo.watchListSeason) ? 
                ("시즌 : "+each.itemInfo.watchListSeason).split('\n').map(
                  text => { desc.push(text); return ( <> {text}<br/> </> )}
                ) : (null) 
              }
              {(undefined !== each.itemInfo.watchListViewCount) ? 
                ("상품 조회수 : "+each.itemInfo.watchListViewCount).split('\n').map(
                  text => { desc.push(text); return ( <> {text}<br/> </> )}
                ) : (null) 
              }
              {(undefined !== each.itemInfo.watchListSellTotalCount) ? 
                ("상품 판매수 : "+each.itemInfo.watchListSellTotalCount).split('\n').map(
                  text => { desc.push(text); return ( <> {text}<br/> </> )}
                ) : (null) 
              }
              {(undefined !== each.itemInfo.watchListLikeCount) ? 
                ("상품 좋아요수 : "+each.itemInfo.watchListLikeCount).split('\n').map(
                  text => { desc.push(text); return ( <> {text}<br/> </> )}
                ) : (null) 
              }
              {(undefined !== each.itemInfo.watchListReviewCount) ? 
                ("상품 리뷰수 : "+each.itemInfo.watchListReviewCount).split('\n').map(
                  text => { desc.push(text); return ( <> {text}<br/> </> )}
                ) : (null) 
              }
              {(undefined !== each.itemInfo.watchListReviewSatisfaction) ? 
                ("상품 만족도 : "+each.itemInfo.watchListReviewSatisfaction).split('\n').map(
                  text => { desc.push(text); return ( <> {text}<br/> </> )}
                ) : (null) 
              }
              {(undefined !== each.itemInfo.watchListHashTags) ? 
                ("상품 해시태그 : "+each.itemInfo.watchListHashTags).split('\n').map(
                  text => { desc.push(text); return ( <> {text}<br/> </> )}
                ) : (null) 
              }
            </h4>
            <br />
          </div>
          <div className="cartItem-img" style={{ "text-align": "center" }}>
            <img width="200px" src={each.itemInfo.watchListImg} />
            <br /> <br />
          </div>
          <div className="cartItem-buttons" style={{"width": "100%"}}>
            <button onClick={ () => {onClickRepeat(each.id)} } className="cartItem-button-repeat" style={{"border-radius":"30px", "border-color":"#4CAF50","font-size:": "20px", "background-color":"#4CAF50", "width":"100%", "color":"white" }}> 
              <span style={{"font-size":"2em"}}>다시 듣기</span>
            </button>
            <br /> <br />
            <button onClick={ () => {onClickRedirect(each.id)} } className="cartItem-button-repeat" style={{"border-radius":"30px", "border-color":"#FC6F53","font-size:": "20px", "background-color":"#FC6F53", "width":"100%", "color":"white" }}> 
              <span style={{"font-size":"2em"}}>사러 가기</span>
            </button>
          </div>
      </div>
    </>
  )
}

function CartItemList({cart}) {
  console.log("카트에 담길 items : ", cart);
  return (
    <>
      {
        cart?.items.map((item, idx) => (
          <CartItem each={item} key={idx}/>  
        ))
      }
    </>
  );
}

function Cart({cart, onCreate, onDelete}) {
  console.log("cart : ", cart);
  return (
    <div className="cart">
      <CartItemList cart={cart} />
    </div>
  );
}

export default Cart
