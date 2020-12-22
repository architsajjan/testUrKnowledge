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
        this.nameMsg = "";
        this.emailMsg = "";
        this.contactMsg = "";
    }

    // VALIDATE INPUTS AND ENABLE SUBMIT BUTTON
    validateForm(){
        const { fullName, email, contact } = this.state;
        if( fullName.length > 2 &&
            email.length > 9 &&
            contact.length > 9  &&
            this.nameMsg==="" &&
            this.emailMsg==="" &&
            this.contactMsg===""
        ){
            this.enableSubmit = true;
        }
        else {
            if( fullName === "" )
            this.nameMsg="Required Field";
            if( email === "" )
            this.emailMsg="Required Field";
            if( contact === "" )
            this.contactMsg="Required Field";
            this.setState({...this.state});
            this.enableSubmit = false;
        }
        
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        if(event.target.name==="fullName" && event.target.value.length > 0){
            if(event.target.value.length < 3)this.nameMsg = "Name must be atleast 3 characters";
            else this.nameMsg ="";
        }
        else if(event.target.name==="email" && event.target.value.length > 2){
            if((!event.target.value.includes("@")) || 
               (!event.target.value.includes(".co") && 
                !event.target.value.includes(".in") && 
                !event.target.value.includes(".org")
               )
              )this.emailMsg = "Invalid email";
            else this.emailMsg ="";
        }
        else if(event.target.name==="contact" && event.target.value.length > 2){
            if(event.target.value.length != 10)this.contactMsg = "only 10 characters allowed"
            else this.contactMsg ="";
        }
        
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
                    Enter your Details to Continue with the test
                    </p>
                    </div>
                </div>
                <div className="landing-side">
                    <div className="container">
                        <h1 className="large text-primary">Register</h1>
                        <form className="form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" placeholder="Full Name" name="fullName" onChange={this.handleChange} spellCheck={false} required autoFocus autoComplete="off"/>
                                <p className="errPara">{this.nameMsg}</p>
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Email Address" name="email" onChange={this.handleChange} required autoComplete="off"/>
                                <p className="errPara">{this.emailMsg}</p>
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Contact No." name="contact" onChange={this.handleChange} minLength="10" max="10000000000" required autoComplete="off"/>
                                <p className="errPara">{this.contactMsg}</p>
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