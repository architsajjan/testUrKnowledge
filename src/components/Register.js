// IMPORTS
import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            fullName:"",
            email:"",
            contact:"",
        };
        this.enableSubmit = false;                 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    // VALIDATE INPUTS AND ENABLE SUBMIT BUTTON
    validateForm(){
        const { fullName, email, contact } = this.state;
        if( fullName.length > 3 &&
            email.length > 7 &&
            contact.length > 9
        ){
            this.enableSubmit = true;
        }
        else {
            this.enableSubmit = false;
        }
        
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(){
        const {fullName, email, contact} = this.state;
        this.validateForm();

        if(this.enableSubmit)
            this.setState(
                () => {
                this.props.history.push({
                    pathname: `/test-instructions`,
                    state: {fullName, email, contact}
                });
                }
            );
        
    }

    render(){        
        return (
            <div className="landing">
                <div className="">
                    <div className="landing-main dark-overlay">
                    <h1 className="x-large">Test Ur Knowledge</h1>
                    <p className="lead">
                    Enter your Details to Continue with the test:
                    </p>
                    </div>
                </div>
                <div className="landing-side">
                    <div className="container">
                        <h1 className="large text-primary">Register</h1>
                        <form className="form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" placeholder="Full Name" name="fullName" onChange={this.handleChange} spellCheck={false} required autoFocus/>
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Email Address" name="email" onChange={this.handleChange} required/>
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Contact No." name="contact" onChange={this.handleChange} minLength="10" max="10000000000" required/>
                            </div>
                            <div className="buttons">
                                <input type="button" className="btn btn-primary" onClick={this.handleSubmit} value="Submit Details" />
                            </div>
                        </form>
                        
                    </div>    
                    
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    history: PropTypes.object,
  };