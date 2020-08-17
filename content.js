let L_QsID="";
let  Div_qs="";
let  c1="";
let c2="";
let c3="";
let c4="";
let clickA=false;
let processState=true;
let questions=[];
let answersList=[];
let count=0;
let  corr=null;
let question ={
  "QuestionDetail":null,
  "QuestionBody":"",
  "OriginalId":""
};
let questionBody;
let quest = null;
let answer;
let finish=false;
let auto=true;
let nextTabActive=false;
let clickTabCount=0;
let tabArray=Array.from(document.querySelectorAll('#ctl00_CPH_Main_LT1_Pager_LV a'));
let tabCount=0;
if(tabArray.length>0){
  tabCount=tabArray.length-2;
  
}
console.log("tab Count : "+tabCount);

let qLists = Array.from(document.querySelectorAll('.qsb-div'));
let chooses=Array.from(document.querySelectorAll('.ans-let'));
let answerNum=Math.floor(Math.random() * chooses.length)+1;  
answerNum=1;

//cookie
if(document.getElementById("ctl00_CPH_Main_TestSettings_LB_StartTest")){
  var btn = document.getElementById("ctl00_CPH_Main_TestSettings_LB_StartTest");
  btn.addEventListener('click', function() {
    var checkedBoxes = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
    if(checkedBoxes.length<2){
      console.log("checkedBoxes vaule: "+checkedBoxes[0].getAttribute("subareaid"))
      setCookie("subareaid",checkedBoxes[0].getAttribute("subareaid"), 365);
    }
    console.log("checkedBoxes: "+checkedBoxes.length);
});
}


if(qLists.length>0 && count<qLists.length && answersList.length<1){
  question={
    "QuestionBody":document.getElementById("Div_qs").innerText,
    "ImageList":[],
    "OriginalId":document.getElementById("L_QsID").innerText.replace("Nº ",""),
    "Explanation":document.getElementById("TabPanel_Exp").innerHTML,
    "QuestionClassRoot":getCookie("subareaid"),
  }
  questionBody={  "shuffleanswers": "1",   "single": "true",  "answernumbering": "abc", "answer":[]  };
                  
  c1=document.getElementById("tr_answer1").children[1].innerHTML;
  c2=document.getElementById("tr_answer2").children[1].innerHTML;
  c3=document.getElementById("tr_answer3").children[1].innerHTML;
  if(chooses.length==4){
    c4=document.getElementById("tr_answer4").children[1].innerHTML;
    
  }
  for (let index = 0; index <  Array.from(document.querySelectorAll('#Panel_Figures img')).length; index++) {
    question.ImageList.push( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src);
    //console.log( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src)  ;                 
  }
  setTimeout( () => { document.getElementById("tr_answer"+answerNum).click(); }, 2000);  
  clickA=true;
}
chrome.runtime.onMessage.addListener(runRequestScript);


function runRequestScript(message) {
    if(message==="tamam" && auto){

        answerNum=1;
        if(nextTabActive){
          nextTabActive=false;
          questions=[];
          answersList=[];
          qLists = Array.from(document.querySelectorAll('.qsb-div'));
          chooses=Array.from(document.querySelectorAll('.ans-let'));
          answersList=[];

          if(qLists.length>0 && count<qLists.length && answersList.length<1){
            question={
              "QuestionBody":document.getElementById("Div_qs").innerText,
              "ImageList":[],
              "OriginalId":document.getElementById("L_QsID").innerText.replace("Nº ",""),
              "Explanation":document.getElementById("TabPanel_Exp").innerHTML,
              "QuestionClassRoot":getCookie("subareaid"),
            }
            questionBody={  "shuffleanswers": "1",   "single": "true",  "answernumbering": "abc", "answer":[]  };
                            
            c1=document.getElementById("tr_answer1").children[1].innerHTML;
            c2=document.getElementById("tr_answer2").children[1].innerHTML;
            c3=document.getElementById("tr_answer3").children[1].innerHTML;
            if(chooses.length==4){
              c4=document.getElementById("tr_answer4").children[1].innerHTML;
              
            }
            for (let index = 0; index <  Array.from(document.querySelectorAll('#Panel_Figures img')).length; index++) {
              question.ImageList.push( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src);
              //console.log( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src)  ;                 
            }
            setTimeout( () => { document.getElementById("tr_answer"+answerNum).click(); }, 2000);  
            clickA=true;
          }

        }


        if (qLists.length>0 && count+1>qLists.length && !finish) {
          setTimeout( () => { 
              question={
                "QuestionBody":document.getElementById("Div_qs").innerText,
                "ImageList":[],
                "OriginalId":document.getElementById("L_QsID").innerText.replace("Nº ",""),
                "Explanation":document.getElementById("TabPanel_Exp").innerHTML,
                "QuestionClassRoot":getCookie("subareaid"),
              }
                questionBody={  "shuffleanswers": "1",   "single": "true",  "answernumbering": "abc", "answer":[]  };
                c1=document.getElementById("tr_answer1").children[1].innerHTML;
                c2=document.getElementById("tr_answer2").children[1].innerHTML;
                c3=document.getElementById("tr_answer3").children[1].innerHTML;
                answer={ "text":c1,"fraction":0};
                if(document.getElementById("tr_answer1").className.indexOf("tr-ans-corr") !== -1){
                  answer.fraction=100;
                }
                questionBody.answer.push(answer);
                answer={ "text":c2,"fraction":0};
                if(document.getElementById("tr_answer2").className.indexOf("tr-ans-corr") !== -1){
                  answer.fraction=100;
                }
                questionBody.answer.push(answer);
                answer={ "text":c3,"fraction":0};
                if(document.getElementById("tr_answer3").className.indexOf("tr-ans-corr") !== -1){
                  answer.fraction=100;
                }
                questionBody.answer.push(answer);
                if(chooses.length==4){
                  c4=document.getElementById("tr_answer4").children[1].innerHTML;
                  answer={ "text":c4,"fraction":0};
                  if(document.getElementById("tr_answer4").className.indexOf("tr-ans-corr") !== -1){
                    answer.fraction=100;
                  }
                  questionBody.answer.push(answer);
                }
                

                question.QuestionDetail=questionBody;
                for (let index = 0; index <  Array.from(document.querySelectorAll('#Panel_Figures img')).length; index++) {
                  question.ImageList.push( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src);
                  console.log( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src)   ;                 
                }
                questions.push(question);

                questions.forEach(element => {

                  var xhr = new XMLHttpRequest();
                  var url = "https://ws.mehmetemindemir.com/questions";
                  //var url = "https://api.cbtroom.com/api/Question";
                  xhr.open("POST", url, true);
                  xhr.setRequestHeader("Content-Type", "application/json");
                  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                  xhr.setRequestHeader("Access-Control-Allow-Methods","POST, GET, OPTIONS, PUT, DELETE");
                  xhr.setRequestHeader("Access-Control-Allow-Headers","Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
                  xhr.onreadystatechange=function() {
                    if(xhr.readyState==4 && xhr.status==400){
                      console.log(xhr.responseText);
                    }
                  }
                  var data = JSON.stringify(element);
                   console.log("questions :"+JSON.stringify(element));
                  xhr.send(data);
                });
              console.log(questions.length);
              //console.log("questions :"+JSON.stringify(questions));
              if(tabCount>0 && clickTabCount<tabCount+1){
                nextTabActive=true;
                clickTabCount++;
                tabArray[clickTabCount].click();
              }else{
                console.log("Bitti");      
                finish=true;
              }
              

            }, 3000);   

        } 
        //last question check answer
        if (qLists.length>0 && count+1==qLists.length) {
          count++;
          setTimeout( () => {
          document.getElementById("tr_answer"+answerNum).click(); 
          },3000);  
        
        }
        if (qLists.length>0 && count+1<qLists.length) {

            if(clickA){              
              clickA=!clickA;   
                //console.log("get answer and next question ")
                setTimeout( () => { 
                 
                  try {
                    answer={ "text":c1,"fraction":0};
                  if(document.getElementById("tr_answer1").className.indexOf("tr-ans-corr") !== -1){
                    answer.fraction=100;
                  }
                  questionBody.answer.push(answer);
                  answer={ "text":c2,"fraction":0};
                  if(document.getElementById("tr_answer2").className.indexOf("tr-ans-corr") !== -1){
                    answer.fraction=100;
                  }
                  questionBody.answer.push(answer);
                  answer={ "text":c3,"fraction":0};
                  if(document.getElementById("tr_answer3").className.indexOf("tr-ans-corr") !== -1){
                    answer.fraction=100;
                  }
                  questionBody.answer.push(answer);
                    if(chooses.length==4){
                      answer={ "text":c4,"fraction":0};
                      if(document.getElementById("tr_answer4").className.indexOf("tr-ans-corr") !== -1){
                        answer.fraction=100;
                      }
                      questionBody.answer.push(answer);
                    }
                  } catch (error) {
                    
                  }
                  
                  
                    for (let index = 0; index <  Array.from(document.querySelectorAll('#Panel_Figures img')).length; index++) {
                      question.ImageList.push( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src);
                      console.log( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src)   ;                 
                    }
                  question.QuestionDetail=questionBody;
                  questions.push(question);
                  
                  count++; 
                  console.log('Question Number : '+count);
                  qLists[count].children[0].click();
                   
                }, 3000);     
              
          } else if(!clickA){
            clickA=!clickA;
              setTimeout( () => { 
                chooses=Array.from(document.querySelectorAll('.ans-let'));
                //console.log("get question and next answer ")
                question={
                  "QuestionBody":document.getElementById("Div_qs").innerText,
                  "ImageList":[],
                  "OriginalId":document.getElementById("L_QsID").innerText.replace("Nº ",""),
                  "Explanation":document.getElementById("TabPanel_Exp").innerHTML,
                  "QuestionClassRoot":getCookie("subareaid"),
                }
                questionBody={  "shuffleanswers": "1",   "single": "true",  "answernumbering": "abc", "answer":[]  };
                  
                  c1=document.getElementById("tr_answer1").children[1].innerHTML;
                  c2=document.getElementById("tr_answer2").children[1].innerHTML;
                  c3=document.getElementById("tr_answer3").children[1].innerHTML;

                  if(chooses.length==4){
                    c4=document.getElementById("tr_answer4").children[1].innerHTML;                   
                  }
                  try {
                    for (let index = 0; index <  Array.from(document.querySelectorAll('#Panel_Figures img')).length; index++) {
                      question.ImageList.push( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src);
                      console.log( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src);                 
                    }
                  } catch (error) {
                    
                  }
                
              
                document.getElementById("tr_answer"+answerNum).click();
                
            }, 1000);   
           
          }
            
        }
    }
    
      
}



   function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

addEvent(document, "keypress", function (e) {
    e = e || window.event;
    console.log(" if Keypress   :"+e.keyCode);
    qLists = Array.from(document.querySelectorAll('.qsb-div'));
    chooses=Array.from(document.querySelectorAll('.ans-let'));
    if(e.keyCode===49){
        auto=false;
    }else if(e.keyCode===50){
        auto=true;
        clickA=false;
        qLists[count].children[0].click();

    }else if(e.keyCode===51){
        //console.log(" if Keypress   :"+e.keyCode);

        if(qLists.length>0 && count<qLists.length && answersList.length<1){
            question={
                "QuestionBody":document.getElementById("Div_qs").innerText,
                "ImageList":[],
                "OriginalId":document.getElementById("L_QsID").innerText.replace("Nº ",""),
                "Explanation":document.getElementById("TabPanel_Exp").innerHTML,
                "QuestionClassRoot":getCookie("subareaid"),
            }
            questionBody={  "shuffleanswers": "1",   "single": "true",  "answernumbering": "abc", "answer":[]  };
            c1=document.getElementById("tr_answer1").children[1].innerHTML;
            c2=document.getElementById("tr_answer2").children[1].innerHTML;
            c3=document.getElementById("tr_answer3").children[1].innerHTML;
            answer={ "text":c1,"fraction":0};
            if(document.getElementById("tr_answer1").className.indexOf("tr-ans-corr") !== -1){
                answer.fraction=100;
            }
            questionBody.answer.push(answer);
            answer={ "text":c2,"fraction":0};
            if(document.getElementById("tr_answer2").className.indexOf("tr-ans-corr") !== -1){
                answer.fraction=100;
            }
            questionBody.answer.push(answer);
            answer={ "text":c3,"fraction":0};
            if(document.getElementById("tr_answer3").className.indexOf("tr-ans-corr") !== -1){
                answer.fraction=100;
            }
            questionBody.answer.push(answer);
            if(chooses.length==4){
                c4=document.getElementById("tr_answer4").children[1].innerHTML;
                answer={ "text":c4,"fraction":0};
                if(document.getElementById("tr_answer4").className.indexOf("tr-ans-corr") !== -1){
                    answer.fraction=100;
                }
                questionBody.answer.push(answer);
            }


            question.QuestionDetail=questionBody;
            for (let index = 0; index <  Array.from(document.querySelectorAll('#Panel_Figures img')).length; index++) {
                question.ImageList.push( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src);
                console.log( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src)   ;
            }
            var xhr = new XMLHttpRequest();
            var url = "https://ws.mehmetemindemir.com/questions";
            //var url = "https://api.cbtroom.com/api/Question";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.setRequestHeader("Access-Control-Allow-Methods","POST, GET, OPTIONS, PUT, DELETE");
            xhr.setRequestHeader("Access-Control-Allow-Headers","Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
            xhr.onreadystatechange=function() {
                if(xhr.readyState==4 && xhr.status==400){
                    console.log(xhr.responseText);
                }
            }
            var data = JSON.stringify(question);
            console.log("questions :"+JSON.stringify(question));
            xhr.send(data);

        }


    }
    //console.log("Keypress  :"+e.keyCode);

});

function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    } else {
        element["on" + eventName] = callback;
    }
}
