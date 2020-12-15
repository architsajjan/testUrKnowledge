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
        props.callback(option, questionNo, questionType);
    }

    return (
      <div>
        <h2>{props.base[questionNo].question}</h2>
        {element}
      </div>
    );
  }

  Question.propTypes = {
    callback: PropTypes.func,
    testresult: PropTypes.object,
    base: PropTypes.object
  };