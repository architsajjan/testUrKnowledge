// IMPORTS
import React from 'react';
import PropTypes from 'prop-types';

export default function QuestionCard(props) {
    let questionStatus = (props.isQuestionAttempted) ? "questionAttempted" : "questionUnAttempted";
    
    return (
        <div className={questionStatus} onClick={props.callback} style={{border: props.iscurrentQues ? "2px solid white": ""}}>
            {props.questionNo}
        </div>
    )
}

QuestionCard.propTypes = {
    isQuestionAttempted: PropTypes.bool,
    questionNo: PropTypes.number,
    callback: PropTypes.func,
    iscurrentQues: PropTypes.bool
  };