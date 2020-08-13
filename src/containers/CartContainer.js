/* 08/13 
  익스텐션에서 자체적으로 상태를 다루는게 훨씬 이득.
  왜냐하면, 리덕스 상태를 초기화 하는 과정에서 크롬 스토리지의 async한 환경을
  리액트가 기다리게 해야 하는데 아직 이를 처리하기가 어렵기 때문.
  이에 따라 1차에서 리덕스 사용을 중지.
*/

import React, { useState, useEffect } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
// import { addItem, deleteItem, changeCurrentId, syncWithStorage } from '../modules/cart';
import Cart from '../components/Cart';

function initStorageData() {
  window.chrome.runtime.sendMessage({method: "INIT_CART"}, (response) => {
    window.localStorage.setItem("watchListUrl", JSON.stringify([]));
    console.log("메세지 결과: ", response.data);
  });
}

function getStorageData(cart, setCart){
  window.chrome.runtime.sendMessage({method: "GET_CART"}, (response) => {
    console.log("메세지 결과: ", response.data);
    console.log("메세지 cart: ", response.cart);
    
    setCart(response.cart);
    return response.cart;
  });
}

function CartContainer() {
  let initialState = {
    currentId: 1,
    items: []
  };
  var [cart, setCart] = useState(initialState);
  
  useEffect(() => {
    console.log("cart 값은 : ", cart);
  }, [cart]);

  if (cart?.items.length == 0) {
    setCart(getStorageData(cart, setCart));
    console.log("cart update ? ", cart);
  }
  console.log("CartContainer cart :", cart);
  return (
    <>
      <h1>FASHION-READER CART</h1>
      <button onClick={ () => getStorageData(cart, setCart) }>체크</button>
      <button onClick={ initStorageData }>init</button>
      <br />
      <Cart cart={cart} />
    </>
  )
}

export default CartContainer;