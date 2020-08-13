import React, { useState } from 'react'

function CartItem({ each, onToggle }) {

  let target, utterance;
  let synth = speechSynthesis;

  const onClickRepeat = (targetId) => {

    console.log("targetId : ", targetId);
    synth.cancel(utterance);

    window.chrome.runtime.sendMessage({method: "GET_SPECIFIC_ITEM", targetId: targetId}, async (response) => {
      await console.log("메세지 확인", response)
      await console.log("메세지 확인 itemInfo : ", response.item.itemInfo)
      
      target = response.item.itemInfo.watchListDesc;
      utterance = new SpeechSynthesisUtterance(target);
      await synth.speak(utterance);
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
            <h1> id: {each.id} </h1>
            <h1> {each.itemInfo.watchListDesc} </h1>
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
