console.log("background runn");


  chrome.webRequest.onCompleted.addListener(  
    function(details) {
      if(details.method=="POST"){
        chrome.tabs.sendMessage(details.tabId,"tamam");
        //console.log(details);
      }
      
      return details;
  },
  {urls: ["https://www.aviationexam.com/UI/Pages/Members/Test.aspx"]});

