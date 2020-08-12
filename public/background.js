/*global chrome*/ // eslint처리

// 커맨드 예제
chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
  speechSynthesis.speak(new SpeechSynthesisUtterance("백그라운드"));
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {});

});

let CURRENT_ID = 0;
// onMessage
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  switch(request.method){
    case "POST_ITEM_INFO":
      console.log("request.value", request.value);
      chrome.storage.local.get(["cart"], async (result) => {
        console.log(result.cart)
        await chrome.storage.local.set({cart: 
          {
            currentId: result.cart?.currnentId == undefined ? 0 : result.cart?.currnentId+1,
            items: result.cart.items.concat({id: CURRENT_ID, itemInfo: request.value})
          }
        });
        await sendResponse({data: "POST 넘어갔다 이말이야", cart:result.cart});
      });
      return true;
    case "GET_CART":
      chrome.storage.local.get(["cart"], (result) => {
        sendResponse({data:"GET 되었다 이말이야", cart: result.cart});
      });
      return true;
    case "INIT_CART":
      chrome.storage.local.set({cart:{currentId:0,items:[]} }, () => {
        sendResponse({data: "카트 INIT 되었다 이말이야"});
      });
      return true;
    case "GET_CURRENT_ITEM":
      chrome.storage.local.get(["cart"], (result) => {
        sendResponse({data: "GET 마지막 요소됐다 이말이야", item: result.cart.items[result.cart.currentId]})
      });
      return true;
    case "PATCH_CURRENT_ID_LEFT":
      chrome.storage.local.get(["cart"], async (result) => {
        if(result.cart.currentId <= 0){
          await sendResponse({data: "currentID가 맨앞이다 이말이야", currentId: result.cart.currentId });
        } else {
          await chrome.storage.local.set({
            cart: { currentId: result.cart.currentId-=1, items: result.cart.items }
          });
          await sendResponse({data: "currentID를 -1 한다 이말이야", currentId: result.cart.currentId});
        }
      });
      return true;
    case "PATCH_CURRENT_ID_RIGHT":
      chrome.storage.local.get(["cart"], async (result) => {
        if(result.cart.currentId >= result.cart.items.length-1){
          await sendResponse({data: "currentID가 맨뒤다 이말이야", currentId: result.cart.currentId });
        } else {
          await chrome.storage.local.set({
            cart: { currentId: result.cart.currentId+=1, items: result.cart.items }
          });
          await sendResponse({data: "currentID를 +1 한다 이말이야", currentId: result.cart.currentId});
        }
      });
      return true;
    default:
      console.log("background default message. 아마도 오류일것이니 개발자에게 문의하세요");
      return true;
  }
});