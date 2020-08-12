import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from '../components/Cart';
import { addItem, deleteItem, changeCurrentId, syncWithStorage } from '../modules/cart';

//var [cart, setCart] = useState(0); // 오류남

function initStorageData() {
  window.chrome.runtime.sendMessage({method: "INIT_CART"}, (response) => {
    console.log("메세지 결과: ", response.data);
  });
}

function getStorageData(cart, setCart){
  window.chrome.runtime.sendMessage({method: "GET_CART"}, (response) => {
    console.log("메세지 결과: ", response.data);
    console.log("메세지 cart: ", response.cart);
    
    setCart(response.cart);
    
    return response.cart;
    // const dispatch = useDispatch();
    // dispatch(syncWithStorage(cart)); //동기화 필요
  });
}

function CartContainer() {
  let initialState = {
    currentId: 1,
    items: []
  };
  var [cart, setCart] = useState(initialState);
  
  useEffect(() => {
    //await setCart(getStorageData(cart));
    console.log("cart 값은 : ", cart);
  }, [cart]);

  if (cart?.items.length == 0) {
    setCart(getStorageData(cart, setCart));
    console.log("cart update ? ", cart);
  }
  // console.log("state : ", useSelector(state => state));
  // cart = useSelector( state => state.cart );
  // cart = getStorageData(cart, setCart);
  
  // const onCreate = useCallback((item) => { dispatch(addItem(item)) }, [dispatch]);
  // const onDelete = useCallback((id) => { dispatch(deleteItem(id)) }, [dispatch]);
  // const onChange = useCallback((targetId) => {dispatch(changeCurrentId(targetId))}, [dispatch]);
  console.log("CartContainer cart :", cart);
  return (
    <>
      <h1>FASHION-READER CART</h1>
      <button onClick={ () => getStorageData(cart, setCart) }>체크</button>
      <button onClick={ initStorageData }>init</button>
      <br />
      <Cart 
        cart={cart}
        // onCreate={onCreate}
        // onDelete={onDelete}
        // onChange={onChange}
      />
    </>
  )
}

export default CartContainer;