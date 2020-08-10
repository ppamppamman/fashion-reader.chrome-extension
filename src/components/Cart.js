import React, { useState } from 'react'

function CartItem({ each, onToggle }) {
  return (
    <li>
      {each.id}:
      {each.itemInfo.watchListDesc}:
      <img width="50px" src={each.itemInfo.watchListImg} />
    </li>
  )
}

function CartItemList({cart}) {
  console.log("카트에 담길 items : ", cart);
  return (
    <ul>
      {
        cart?.items.map((item, idx) => (
          <CartItem each={item} key={idx} />  
        ))
      }
      
    </ul>
  );
}

function Cart({cart, onCreate, onDelete}) {
  // const [itemInfo, setItemInfo] = useState([]);
  // const onChange = e => setItemInfo(e.target.value);
  // const onCreate = 
  // const onDelete = 

  // console.log("ccc", cart) // undefined
  
  console.log("cart : ", cart);
  return (
    <div>
      <CartItemList cart={cart} />
    </div>
  );
}

export default Cart
