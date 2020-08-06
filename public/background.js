// 커맨드 예제
chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
  speechSynthesis.speak(new SpeechSynthesisUtterance("백그라운드"));
  
  chrome.runtime.sendMessage({greeting: "hello"}, (response)  => {
    // alert(response);
  });

  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //});

  // 스토리지 예제
  chrome.storage.sync.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
    alert(result);
  });
});

