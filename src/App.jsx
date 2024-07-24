import { useState } from "react";


let questionsOrders = [{
  questions: "1.What does CPU stand for?",
  options: ["Computer Processing Unit", "Central Processing Unit", "Computer Processing User", "Central Processing User"],
  answer: "Central Processing Unit"
},
{
  questions: "2.Which device is used to input data into a computer?",
  options: ["Monitor", "Printer", "Keyboard", "Speaker"],
  answer: "Keyboard"
},
{
  questions: "3.What is the full form of USB?",
  options: ["Universal Serial Bus", "United States of America Business", "User Serial Business", "Universal Serial Battery"],
  answer: "Universal Serial Bus"
},
];
function Main(){
  return(
    <button className="mainContainer" onClick={<App/>}>Start</button>
  );
}
function Options({ optionsList, settingTheInputValue }) {
  return (
    <div id="radioBtn">
      <input type="radio" className="radio-sty" name="ques" value={optionsList} onClick={() => { settingTheInputValue(optionsList) }} />
      <label for="html" className="label-sty">{optionsList}</label>
    </div>
  );
  // console.log();
}

// function changeIndexValue(funName,indexValue) {
//   funName(indexValue += 1);
// }
function checkTheAns(userAnswer, correctAnswer, setTheAnswerMsg,
  settingTheScore,scoreVar,setColoring) {
  if (userAnswer === correctAnswer) {
    setTheAnswerMsg("Answer is correct.Good job!");
    settingTheScore(scoreVar+1);
    setColoring("successMsg");
  }
  else if(userAnswer=== undefined){
    setTheAnswerMsg("Oops! you skip the question");
    setColoring("warning-msg");
  }
  else {
    setTheAnswerMsg("Oops! Answer wrong.Try again");
    setColoring("failMsg");
  }
};

function Questions({ i, questionsList, settingTheIndex ,scoreFunction,scoreVaraiable}) {
  let [showMsg, setShowMsg] = useState();
  let [inputValue, setInputValue] = useState();
  let [colorValue,setColor] = useState();
  let arrVal = questionsList.options;
  let [nextBtnDisable,setNextBtnDisable] = useState(true);
  return (
    <div className="questions-container">
      <h1>{questionsList.questions}</h1>
      {arrVal.map((item) => {
        return <Options optionsList={item} 
        settingTheInputValue={setInputValue}
         isRadioButtonClick={showMsg} />
      }
      )}
      <button id="checkBtn" onClick={() => {
         document.getElementById("checkBtn").disabled = true;
        document.getElementById("checkBtn").classList.add("disableBtn");
        checkTheAns(inputValue, questionsList.answer, setShowMsg,
          scoreFunction,scoreVaraiable,setColor)
        setNextBtnDisable(false);
        document.getElementById("nextButton").style = "background-color: #7925d3;"
      }
      }>Check button</button>
      <button className="nextBtn" id="nextButton" disabled={nextBtnDisable} onClick={() => {
        document.getElementsByName("ques").forEach(element => {
          element.checked = false
        });
        {(i < questionsOrders.length-1) ? settingTheIndex(i + 1) : settingTheIndex()};
        document.getElementById("checkBtn").disabled = false;
        document.getElementById("checkBtn").classList.remove("disableBtn");
        setShowMsg();
        document.getElementById("nextButton").style = "background-color: gray;"
      }}>
        Next button
      </button>
      <br />
      <button className="restartBtn">Re start</button>
      <h2 className={colorValue}>{showMsg}</h2>
      {/* {console.log(inputValue===undefined && document.getElementById("checkBtn").disabled != true)}; */}
      {/* {(inputValue===undefined && document.getElementById("checkBtn").disabled != true) ? 
      (<h2 className={showMsg ? "successMsg" : "failMsg"}>
          {showMsg ? "Your answer is correct" :
          "Your answer is wrong"}</h2>)
          : <h2 className={ inputValue===undefined && document.getElementById("checkBtn").disabled === true ? "warning-msg" : ""}>
             { inputValue===undefined && document.getElementById("checkBtn").disabled === true ? "you skip the question" : ""}
            </h2>} */}

    </div>
  );
}

function Result({userScore}){
  return(
    <div className={questionsOrders.length === userScore ? "bgimg-sty" : "bg-result"}>
  <h2 className="score-sty">Full score is : {questionsOrders.length}</h2>
  <h2 className={questionsOrders.length === userScore ? "successMsg" : "failMsg"} id="showMsgAns">
  {questionsOrders.length === userScore ? "Your answer is excellent! All the time give your 100 percentage" 
  : `Your Score is : ${userScore}. Keep working!dont quit your goal`}
  </h2>
  </div>
  );
}

function App() {
  let [indexValue, setIndex] = useState(0);
  let [scoreValue,setScoreValue] = useState(0);
  return (
    <div>
      <header>
        <h1>Quiz Game</h1>
      </header>
        <main className="fullContainer">
          {indexValue===undefined && <Result userScore={scoreValue}/>}
          {indexValue!=undefined && <Questions i={indexValue} 
          questionsList={{ ...questionsOrders[indexValue] }} settingTheIndex={setIndex} scoreFunction={setScoreValue} scoreVaraiable = {scoreValue}/>}
          {/* <Questions {...questionsOrders[1]} />
        <Questions {...questionsOrders[2]} /> */}
        </main>
    </div>
  );
}

export default App;
