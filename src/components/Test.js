// IMPORTS
import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Link, Redirect, Route, useRouteMatch } from "react-router-dom";

// IMPORT LOCAL COMPONENTS
import Timer from './Timer';
import QuestionCard from './Additionals/QuestionCard';
import Question from './Additionals/Question';
import questions from './Additionals/questions.json';


export default function Test(props){
    // CHOOSE QUESTION BASE BASED ON TEST LEVEL SELECTED
    let base = questions.easy;
        if(props.match.params.testLevel === 'medium'){
            base = questions.medium;
        }
        else if(props.match.params.testLevel === 'hard'){
            base = questions.hard;
        }

    let noOfQuestions = Object.keys(base).length;

    // STATE TO MANAGE TEST RESULTS
    const [testResult, setTestresult] = useState({});
    
    // STATE TO MANAGE QUESTION ATTEMPT STATUS
    const [areQuestionsAttempted, setQuestionsAttemption] = useState([]);

    // STATE TO TRACK CURRENT QUESTION NUMBER
    const [questionNo, SetCurrentQuestion] = useState(1);
    
    // STATE TO TRACK NEXT QUESTION NUMBER
    const [nextQues, setNextQues] = useState(2);
    
    // STATE TO TRACK PREVIOUS QUESTION NUMBER
    const [previousQues, setPreviousQues] = useState(noOfQuestions);

    useEffect(() => {
        if (window.performance) {
            if (performance.navigation.type == 1) {
              submitTest();
            }
          }
      }, []);

    function questionNavigation(questionNo, callbackType="neutral"){
        let prevQues = Number(questionNo) === 1 ? noOfQuestions : Number(questionNo)-1;
        let nxtQues = Number(questionNo) === noOfQuestions ? 1 : Number(questionNo)+1;
        if(callbackType === "neutral"){
            setNextQues(nxtQues);
            setPreviousQues(prevQues);
            SetCurrentQuestion(questionNo);
        }
        if(callbackType === "previous"){
            questionNavigation(previousQues);
        }
        if(callbackType === "next"){
            questionNavigation(nxtQues);
        }
    }
    
    async function GenerateReportObject(){
        let result = {};
        function Verify(arr,str){
            if(
                arr.every(option => str.split(",").includes(option.toString())) &&
                str.split(",").every(option => arr.map(opt => opt.toString()).includes(option.toString())) 
            )return true;
            return false;
        }
        Object.keys(base).map(quesNo => {
            result[quesNo] = {
                question: base[Number(quesNo)].question,
                selectedoption: Object.keys(testResult).includes(quesNo) ? testResult[Number(quesNo)].length > 0 ? testResult[Number(quesNo)].toString() : "" : "",
                actualAnswers: base[Number(quesNo)].answer,
                result: Object.keys(testResult).includes(quesNo) ? testResult[Number(quesNo)].length > 0 ? Verify(testResult[Number(quesNo)],base[Number(quesNo)].answer) ? "CORRECT": "INCORRECT" : "UNATTEMPTED" : "UNATTEMPTED"
            }
        })
        
        const myData = {
            testLevel: props.match.params.testLevel.toString(),
            ...result
        };
        return myData;
      }

      async function submitTest(){
        let report = await GenerateReportObject();
        window.opener.onSuccess("report generated", report);
        window.close(); 
      }

      function updateState(res, questionNo, questionType){
        let tempResult = {...testResult};
        if(Object.keys(tempResult).includes(questionNo)){
            if(tempResult[Number(questionNo)].includes(res)){
                tempResult[Number(questionNo)].splice(tempResult[Number(questionNo)].indexOf(res), 1);      
            }
            else {
                if(questionType !== "radio")tempResult[Number(questionNo)].push(res);
                else {
                    let temp = [res ,];
                    tempResult[Number(questionNo)] = temp;
                }
            }
        }
        else{
            let temp = {[questionNo]: [res ,]};
            tempResult = {...tempResult, ...temp};
        }
        setTestresult(tempResult);
        let renew = [...areQuestionsAttempted];
        renew[questionNo -1] = true;
        setQuestionsAttemption(renew);
      }

      
      const { url, path } = useRouteMatch();
          
      let Questions = [];
      Object.keys(base).map(quesNo =>{
              Questions.push(<Link to={`${url}/${Number(quesNo)}`} key={Number(quesNo)}><QuestionCard questionNo={Number(quesNo)} iscurrentQues={Number(quesNo) === questionNo ? true : false} callback={()=>questionNavigation(Number(quesNo), "neutral")} isQuestionAttempted={areQuestionsAttempted[Number(quesNo)-1]}/></Link>);
              if(Number(quesNo)%5===0)<hr />;  
      })
      let arr = [];
      while(Questions.length>5)arr.push(Questions.splice(0,5))
      arr.push(Questions);
      
      return (
            <div className="landing" style={{background: "slateblue"}}>
                <div>
                    {   setTimeout(()=>{
                        history.pushState(null, null, location.href);
                        window.onpopstate = function() {
                            history.go(1);
                        };
                        }, 500)
                    }
                    <div className="instructions-main dark-overlay"> 
                        <Route path={`${path}/:questionNo`}>
                            <Question 
                                callback={(res,questionNo, questionType)=> updateState(res,questionNo, questionType)} 
                                testresult={testResult}
                                base={base}
                            />
                        </Route>
                    </div>
                </div>

                <div className="instructions-side testSide">
                    <div className="test-container">
                        <hr />
                        <div className="controller">
                            <h1 className="medium text-primary">Time Remaining:</h1>
                            <Timer submit={()=> submitTest()} />
                        </div>
                        <hr />
                        <div className="controller">
                            <h1 className="medium text-primary">Questions Panel:</h1>
                                <div className="questionAttempted"><h1 className="small text-primary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:Attempted</h1></div>
                                <div className="questionUnAttempted"><h1 className="small text-primary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:Unattempted</h1></div>
                            
                            <div className="questionPanel controller">
                                {
                                    
                                    arr.map(quesArr => <div key={Math.random()} style={{display:"flex"}}>{quesArr}</div>)
                                    
                                }
                            </div>

                            <Link to={`${url}/${previousQues}`}>
                                <div className="movementCard" onClick={()=>questionNavigation(questionNo, "previous")}>Previous Question</div>
                            </Link>
                            <Link to={`${url}/${nextQues}`}>
                                <div className="movementCard" onClick={()=>questionNavigation(questionNo, "next")}>Next Question</div>
                            </Link> 
                        </div>
                        <hr />
                        <div className="buttons submitTest">
                                <input type="button" className="btn btn-primary" value="Submit Test" onClick={submitTest} />
                            </div>
                    </div>    
                </div>
                <Redirect to={`${url}/1`} />
            </div>
        );
    
}


Test.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            testLevel: PropTypes.string
        })
    }).isRequired
  };
