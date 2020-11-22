// IMPORTS
import React from 'react';
import PropTypes from "prop-types";


export default class Instructions extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            testLevel:"easy",
            agreement: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        if(this.state.agreement){
            this.setState(
            () => {
              this.props.history.push({
                pathname: `/test/${this.props.match.params.fullName}/${this.props.match.params.email}/${this.props.match.params.contact}/${this.state.testLevel}`
              });
            }
          );}
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }

    render(){
        const startTestButton = <input type="button" className="btn btn-primary" value="Submit Details and Start the Test" onClick={this.handleSubmit} disabled={!this.state.agreement}/>; 
        return (
            <div className="landing">
                <div className="">
                    <div className="instructions-main dark-overlay">
                        <h1 className="x-large">Test Instructions</h1>
                    
                        <ol>
                            <li>Following quiz contains 5 questions. You can choose among 3 levels of Test: Easy, Medium, Hard.</li>
                            <li>The given time for this quiz is 5 minutes. After that, the form will be closed for you.</li>
                            <li>The Test will be automatically submitted on completion of time, and the given responses will be recorded as your solution.</li>
                            <li>You can only submit your answers once. At any time if you wish to submit your solution you can use the SUBMIT option and the test will be submitted.</li>
                            <li>On both Manual or Automatic quiz Submission your Response Sheet will be automatically downloaded.</li>
                            <li>If you have any technical problem during the quiz, please take a screenshot or screen recording and send at archc.indus0777@gmail.com.</li>
                            <li>TIMER WILL START AS SOON AS YOU START THE TEST. BEST OF LUCK !!!</li>
                        </ol>
                    
                    </div>
                </div>
                <div className="instructions-side">
                    <div className="container">
                        <h1 className="large text-primary">Agreement</h1>
                        <form className="form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <select name="testLevel" onChange={e => this.handleChange(e)}>
                                    <option defaultValue value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                            <div className="form-group">
                            <label>
                                <input
                                    name="agreement"
                                    type="radio"
                                    onChange={e=> this.handleChange(e)}
                                />
                                &nbsp; I agree to follow the test instructions during the test.
                            </label>
                            </div>
                            <div className="buttons">
                                {(this.state.agreement) && startTestButton}
                            </div>
                        </form>
                        
                    </div>    
                    
                </div>
            </div>
        );
    }
}

Instructions.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params : PropTypes.shape({
            fullName: PropTypes.string,
            email: PropTypes.string,
            contact: PropTypes.string
        })
        }).isRequired
  };