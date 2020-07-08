let L_QsID="";
let  Div_qs="";
let  c1="";
let c2="";
let c3="";
let c4="";
let clickQ=false;
let clickA=false;
let processState=true;
let questions=[];
let answersList=[];
let count=0;
let  corr=null;
let question ={
  "question":null,
  "text":"",
  "img":[],
  "qid":""
};
let questionBody ;
let quest = null;
let answer;
let finish=false;
const qLists = Array.from(document.querySelectorAll('.qsb-div'));
const chooses=Array.from(document.querySelectorAll('.ans-let'));
let answerNum=Math.floor(Math.random() * chooses.length)+1;  
answerNum=1;

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
    "text":document.getElementById("Div_qs").innerText,
    "imgs":[],
    "qid":document.getElementById("L_QsID").innerText.replace("Nº ",""),
    "explanation":document.getElementById("TabPanel_Exp").innerHTML,
    "subareaid":getCookie("subareaid"),
  }
  for (let index = 0; index <  Array.from(document.querySelectorAll('#Panel_Figures img')).length; index++) {
    question.imgs.push( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src);
    //console.log( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src)  ;                 
  }
  setTimeout( () => { document.getElementById("tr_answer"+answerNum).click(); }, 2000);  
  clickA=true;
}
chrome.runtime.onMessage.addListener(runRequestScript);


function runRequestScript(message) {
    if(message=="tamam"){
        answerNum=1;
        if (qLists.length>0 && count+1>qLists.length && !finish) {
          setTimeout( () => { 
              question={
                "text":document.getElementById("Div_qs").innerText,
                "imgs":[],
                "qid":document.getElementById("L_QsID").innerText.replace("Nº ",""),
                "explanation":document.getElementById("TabPanel_Exp").innerHTML,
                "subareaid":getCookie("subareaid"),
              }
                questionBody={  "shuffleanswers": "1",   "single": "true",  "answernumbering": "abc","_type": "multiplechoice", "answer":[] ,"img":[] };
                c1=document.getElementById("tr_answer1").children[1].innerHTML;
                c2=document.getElementById("tr_answer2").children[1].innerHTML;
                c3=document.getElementById("tr_answer3").children[1].innerHTML;
                answer={ "text":c1,"_fraction":0};
                if(document.getElementById("tr_answer1").className.indexOf("tr-ans-corr") !== -1){
                  answer._fraction=100;
                }
                questionBody.answer.push(answer);
                answer={ "text":c2,"_fraction":0};
                if(document.getElementById("tr_answer2").className.indexOf("tr-ans-corr") !== -1){
                  answer._fraction=100;
                }
                questionBody.answer.push(answer);
                answer={ "text":c3,"_fraction":0};
                if(document.getElementById("tr_answer3").className.indexOf("tr-ans-corr") !== -1){
                  answer._fraction=100;
                }
                questionBody.answer.push(answer);
                if(chooses.length==4){
                  c4=document.getElementById("tr_answer4").children[1].innerHTML;
                  answer={ "text":c4,"_fraction":0};
                  if(document.getElementById("tr_answer4").className.indexOf("tr-ans-corr") !== -1){
                    answer._fraction=100;
                  }
                  questionBody.answer.push(answer);
                }
                

                question.question=questionBody;
                for (let index = 0; index <  Array.from(document.querySelectorAll('#Panel_Figures img')).length; index++) {
                  question.imgs.push( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src);
                  console.log( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src)   ;                 
                }
                questions.push(question);

                questions.forEach(element => {

                  var xhr = new XMLHttpRequest();
                  var url = "https://ws.mehmetemindemir.com/questions";
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
                  xhr.send(data);
                });
              console.log(questions.length);
              //console.log("questions :"+JSON.stringify(questions));
              console.log("Bitti");
              finish=true;
            }, 5000);   

        } 
        //last question check answer
        if (qLists.length>0 && count+1==qLists.length) {
          count++;
          setTimeout( () => {
          document.getElementById("tr_answer"+answerNum).click(); 
          }, 5000);  
        
        }
        if (qLists.length>0 && count+1<qLists.length) {

            if(clickA){               
                      console.log("get answer and next question ")
                setTimeout( () => { 
                  questionBody={  "shuffleanswers": "1",   "single": "true",  "answernumbering": "abc","_type": "multiplechoice", "answer":[],"img":[]  };
                  
                  c1=document.getElementById("tr_answer1").children[1].innerHTML;
                  c2=document.getElementById("tr_answer2").children[1].innerHTML;
                  c3=document.getElementById("tr_answer3").children[1].innerHTML;
                  try {
                    answer={ "text":c1,"_fraction":0};
                  if(document.getElementById("tr_answer1").className.indexOf("tr-ans-corr") !== -1){
                    answer._fraction=100;
                  }
                  questionBody.answer.push(answer);
                  answer={ "text":c2,"_fraction":0};
                  if(document.getElementById("tr_answer2").className.indexOf("tr-ans-corr") !== -1){
                    answer._fraction=100;
                  }
                  questionBody.answer.push(answer);
                  answer={ "text":c3,"_fraction":0};
                  if(document.getElementById("tr_answer3").className.indexOf("tr-ans-corr") !== -1){
                    answer._fraction=100;
                  }
                  questionBody.answer.push(answer);
                  if(chooses.length==4){
                    c4=document.getElementById("tr_answer4").children[1].innerHTML;
                    answer={ "text":c4,"_fraction":0};
                    if(document.getElementById("tr_answer4").className.indexOf("tr-ans-corr") !== -1){
                      answer._fraction=100;
                    }
                    questionBody.answer.push(answer);
                  }
                  } catch (error) {
                    
                  }
                  
                  
                    for (let index = 0; index <  Array.from(document.querySelectorAll('#Panel_Figures img')).length; index++) {
                      question.imgs.push( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src);
                      console.log( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src)   ;                 
                    }
                  question.question=questionBody;
                  questions.push(question);
                  
                  count++; 
                  qLists[count].children[0].click();
                  clickA=!clickA;   
                }, 5000);     
              
          } else if(!clickA){
              setTimeout( () => { 
                console.log("get question and next answer ")
                question={
                  "text":document.getElementById("Div_qs").innerText,
                  "imgs":[],
                  "qid":document.getElementById("L_QsID").innerText.replace("Nº ",""),
                  "explanation":document.getElementById("TabPanel_Exp").innerHTML,
                  "subareaid":getCookie("subareaid"),
                }
                for (let index = 0; index <  Array.from(document.querySelectorAll('#Panel_Figures img')).length; index++) {
                  question.imgs.push( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src);
                  console.log( Array.from(document.querySelectorAll('#Panel_Figures img'))[index].src);                 
                }
              
                document.getElementById("tr_answer"+answerNum).click();
                clickA=!clickA;
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
