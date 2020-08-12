import React, { useState } from 'react'

function CartItem({ each, onToggle }) {
  return (
    <>
      <div className="divider" style={{"width": "90%", "height": "0", "margin": "2%", "overflow": "hidden", "border-top": "1px solid #e1e6ea" }}></div>
      <div className="cartItem" style={{"width":"85%", "margin":"2%", "padding":"2%"}}>
          <div className="cartItem-text">
            <h1> {each.id, ' : ', each.itemInfo.watchListDesc} </h1>
            <br />
          </div>
          <div className="cartItem-img" style={{ "text-align": "center" }}>
            <img width="200px" src={each.itemInfo.watchListImg} />
            <br/><br/>
          </div>
          <div className="cartItem-buttons" style={{"width": "100%"}}>
            <button className="cartItem-button-repeat" style={{"border-radius":"30px", "border-color":"#4CAF50","font-size:": "20px", "background-color":"#4CAF50", "width":"100%", "color":"white" }}> 
              <span style={{"font-size":"2em"}}>다시 듣기</span>
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
  // const [itemInfo, setItemInfo] = useState([]);
  // const onChange = e => setItemInfo(e.target.value);
  // const onCreate = 
  // const onDelete = 

  // console.log("ccc", cart) // undefined
  
  console.log("cart : ", cart);
  return (
    <div className="cart">
      <CartItemList cart={cart} />
    </div>
  );
}

export default Cart
