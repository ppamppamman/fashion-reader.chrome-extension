export const ADD_ITEM = "cart/ADD_ITEM";
export const DELETE_ITEM = "cart/DELETE_ITEM";
export const SYNC_WITH_STORAGE = "cart/SYNC_WITH_STORAGE";
export const CHANGE_CURRENT_ID = "cart/CHANGE_CURRNET_ID";

let itemId = 0;
export const syncWithStorage = (cart) => ({
  type: SYNC_WITH_STORAGE,
  cart: cart
});

export const addItem = (itemInfo) => ({
  type: ADD_ITEM,
  item: {
    id: ++itemId,
    info: itemInfo
  }
});

export const deleteItem = (targetItemId) => ({
  type: DELETE_ITEM,
  item: {
    id: targetItemId
  }
})

export const changeCurrentId = (targetId) => ({
  type: CHANGE_CURRENT_ID,
  currentId: targetId
})

let initialState = {
  currentId: 1,
  items: []
};
console.log("초기값 initialState : ", initialState)

const init = (initialState) => {
  let protocol = window.location.protocol;
  if(!protocol.includes("chrome-extension"))
    return;
  
  window.chrome.runtime.sendMessage({method: "GET_CART"}, (response) => {
    console.log("메세지 결과: ", response.data);
    let cart = response.cart;
    if (cart?.items != undefined ) {
      initialState = {
        currentId: cart.currentId,
        items: cart?.items
      };
      console.log("로컬 스토리지에 자리 O", initialState);
    } else {
      
      initialState = {
        currentId: 0,
        items: [
          //{id: 0, itemInfo: []}
        ]
      };
      console.log("로컬 스토리지에 자리 X", initialState);
    }
  
  });
    
};
init();

export default function cart( state = initialState, action ) {
  switch(action.type){
    case ADD_ITEM:
      console.log("ADD_ITEM 진행");
      console.log("state : ", state)
      console.log("action.item", action.item);
      return state.items.concat(action.item);
    case DELETE_ITEM:
      return state.items.map(
        item => item.id === action.id 
        ? {...item, done: !item.done } 
        : item
      )
    case CHANGE_CURRENT_ID:
      return {
        ...state,
        currentId: action.currentId
      }
    case SYNC_WITH_STORAGE:
      return state = action.cart;
    default:
      return state;
  }
}