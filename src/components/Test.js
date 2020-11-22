// IMPORTS
import React, { useState } from 'react';
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

    // STATE TO MANAGE TEST RESULTS
    const [testResult, setTestresult] = useState({
        1: {
            1: false,
            2: false,
            3: false,
            4: false,
        },
        2: {
            1: false,
            2: false,
            3: false,
            4: false,
        },
        3: {
            1: false,
            2: false,
            3: false,
            4: false,
        },
        4: {
            1: false,
            2: false,
            3: false,
            4: false,
        },
        5: {
            1: false,
            2: false,
            3: false,
            4: false,
        }
    });
    
    // STATE TO MANAGE QUESTION ATTEMPT STATUS
    const [areQuestionsAttempted, setQuestionsAttemption] = useState([false,false,false,false,false]);

    // STATE TO TRACK CURRENT QUESTION NUMBER
    const [questionNo, SetCurrentQuestion] = useState(1);
    
    // STATE TO TRACK NEXT QUESTION NUMBER
    const [nextQues, setNextQues] = useState(2);
    
    // STATE TO TRACK PREVIOUS QUESTION NUMBER
    const [previousQues, setPreviousQues] = useState(5);

    function questionNavigation(questionNo, callbackType="neutral"){
        let previousQues = Number(questionNo) === 1 ? 5 : Number(questionNo)-1;
            setPreviousQues(previousQues);
        let nextQues = Number(questionNo) === 5 ? 1 : Number(questionNo)+1;
            setNextQues(nextQues);
        if(callbackType === "previous")
            SetCurrentQuestion(previousQues);
        else if(callbackType === "next")
            SetCurrentQuestion(nextQues);
        else
            SetCurrentQuestion(questionNo);
    }
    
    async function downloadFile(){
        let finalSoln =["", "", "", "", ""];
        for(let questionNo = 1; questionNo<=5;++questionNo){
        for (let option= 1; option<=4;++option) {
            if (testResult[questionNo][option] === true) {
                finalSoln[questionNo-1] +=  (finalSoln[questionNo-1]==="") ? option.toString() : ","+option.toString();
            }
        }}
        const myData = {
            fuLLName: props.match.params.fullName.toString(),
            testLevel: props.match.params.testLevel.toString(),
            email: props.match.params.email.toString(),
            contact: props.match.params.contact.toString(),
            question1: {
                question: base[1].question,
                selectedoption: finalSoln[0],
                actualAnswers: base[1].answer,
                result: (finalSoln[0] === base[1].answer) ? "CORRECT":"INCORRECT"
            },
            question2: {
                question: base[2].question,
                selectedoption: finalSoln[1],
                actualAnswers: base[2].answer,
                result: (finalSoln[1] === base[2].answer) ? "CORRECT":"INCORRECT"
            },
            question3: {
                question: base[3].question,
                selectedoption: finalSoln[2],
                actualAnswers: base[3].answer,
                result: (finalSoln[2] === base[3].answer) ? "CORRECT":"INCORRECT"
            },
            question4: {
                question: base[4].question,
                selectedoption: finalSoln[3],
                actualAnswers: base[4].answer,
                result: (finalSoln[3] === base[4].answer) ? "CORRECT":"INCORRECT"
            },
            question5: {
                question: base[5].question,
                selectedoption: finalSoln[4],
                actualAnswers: base[5].answer,
                result: (finalSoln[4] === base[5].answer) ? "CORRECT":"INCORRECT"
            }

        };
        const date = new Date();
        const fileName = props.match.params.fullName.toString() +"_"+ (date.getDate().toString() + (date.getMonth()+1).toString() + date.getFullYear().toString() + date.getHours().toString() +date.getMinutes().toString());
        const json = JSON.stringify(myData);
        const blob = new Blob([json], { type: "application/json" });
        const href = await URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = `${fileName}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      function submitTest(){
        downloadFile();
        props.history.push({
            pathname: `/submit-test`
        });
      }

      function updateState(res,questionNo){
        setTestresult(res);
        let renew = [...areQuestionsAttempted];
        renew[questionNo -1] = true;
        setQuestionsAttemption(renew);
      }

    const { url, path } = useRouteMatch();
        return (
            <div className="landing">
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
                                callback={(res,questionNo)=> updateState(res,questionNo)} 
                                testresult={testResult}
                                base={base}
                            />
                        </Route>
                    </div>
                </div>

                <div className="instructions-side">
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
                                <Link to={`${url}/1`}><QuestionCard questionNo={1} callback={()=>questionNavigation(1)} isQuestionAttempted={areQuestionsAttempted[0]}/></Link>
                                <Link to={`${url}/2`}><QuestionCard questionNo={2} callback={()=>questionNavigation(2)} isQuestionAttempted={areQuestionsAttempted[1]}/></Link>
                                <Link to={`${url}/3`}><QuestionCard questionNo={3} callback={()=>questionNavigation(3)} isQuestionAttempted={areQuestionsAttempted[2]}/></Link>
                                <Link to={`${url}/4`}><QuestionCard questionNo={4} callback={()=>questionNavigation(4)} isQuestionAttempted={areQuestionsAttempted[3]}/></Link>
                                <Link to={`${url}/5`}><QuestionCard questionNo={5} callback={()=>questionNavigation(5)} isQuestionAttempted={areQuestionsAttempted[4]}/></Link>
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
                                <input type="button" className="btn primary-btn" value="Submit Test" onClick={submitTest} />
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
          fullName: PropTypes.string,
          email: PropTypes.string,
          contact: PropTypes.string,
          testLevel: PropTypes.string
        })
      }).isRequired
  };
