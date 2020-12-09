// IMPORTS 
import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

export default function Question(props){
    // TRACKS CURRENT QUESTION NUMBER 
    let { questionNo } = useParams();
    let questionType = (props.base[questionNo].answer.split(",").length > 1) ? "checkbox" : "radio";

    // const [ option1, option2, option3, option4 ]= props.base[questionNo].options.split(",");
    let element = props.base[questionNo].options.split(",").map(option => 
        <div className="form-group" key={option}>
        <label> 
            <input name={questionNo} value={option} checked={Object.keys(props.testresult).includes(questionNo) && props.testresult[Number(questionNo)].includes(option)} onChange={() => handleClick(option)} type={questionType} /> 
                &nbsp; {option} 
        </label>
        </div>
        );
    
    
    function handleClick(option){
        let res = {...props.testresult};
        // if(Object.keys(res).includes(questionNo)){
        //     if(res[Number(questionNo)].includes(option)){
        //         res[Number(questionNo)].splice(res[Number(questionNo)].indexOf(option), 1);    
        //     }
        //     else res[Number(questionNo)].push(option);
        // }
        // else{
        //     let temp = {[questionNo]: [option ,]};
        //     res = {...res, ...temp};
        // }
//        res[questionNo][option] = !res[questionNo][option];        
console.log(res);        
props.callback(option, questionNo, questionType);
    }

    return (
      <div>
        <h2>{props.base[questionNo].question}</h2>
        {element}
        {/* <div className="form-group">
            <label> 
                <input name={questionNo} value={option1} checked={props.testresult[questionNo][1]} onChange={() => handleClick(1)} type={questionType} /> 
                    &nbsp; {option1} 
            </label>
        </div>
        <div className="form-group">
            <label> 
                <input name={questionNo} value={option2} checked={props.testresult[questionNo][2]} onChange={() => handleClick(2)} type={questionType} /> 
                    &nbsp; {option2} 
            </label>
        </div>
        <div className="form-group">
            <label> 
                <input name={questionNo} value={option3} checked={props.testresult[questionNo][3]} onChange={() => handleClick(3)} type={questionType} /> 
                    &nbsp; {option3} 
            </label>
        </div>
        <div className="form-group">
            <label> 
                <input name={questionNo} value={option4} checked={props.testresult[questionNo][4]} onChange={() => handleClick(4)} type={questionType} /> 
                    &nbsp; {option4} 
            </label>
        </div> */}
        
      </div>
    );
  }

  Question.propTypes = {
    callback: PropTypes.func,
    testresult: PropTypes.object,
    base: PropTypes.object
  };