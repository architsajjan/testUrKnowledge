import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component{
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            isTimerOn : false,  
            time : {},
            seconds : 300,
          };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    componentDidMount(){
        this._isMounted = true;
        this.setState({time: this.secondsToTime(this.state.seconds)});
        this.startTimer();
      }

    componentWillUnmount(){
      this._isMounted = false;
    }
    
      secondsToTime(time){
        let mins = Math.floor(time / 60);
        let secs= time % 60;
    
        let obj = {
          "min": mins,
          "sec": secs
        }
        return obj;
      }
    
      startTimer(){
        if(this.timer === 0 && this.state.seconds > 0){
          this.setState({isTimerOn: true});
          this.timer = setInterval(this.countDown, 1000);
        }
      }
    
      countDown(){
        let timeLeft = this.state.seconds - 1;
        this.setState({
          time : this.secondsToTime(timeLeft),
          seconds : timeLeft
        });
    
        if(timeLeft === 0){
          this.stopTimer();
        }
      }
    
      stopTimer(){
        clearInterval(this.timer);
        this.submitTest();
      }
    
    
      submitTest(){
        this.props.submit();
      }

    render(){
        return(
            <div className="timer">
                <span>
                    <h1 className="large text-primary">{this.state.time.min}</h1>
                </span>
                <span>
                    <h1 className="large text-primary">:</h1>
                </span>
                <span>
                    <h1 className="large text-primary">{this.state.time.sec}</h1>
                </span>
            </div>
        );  
    }
}

export default Timer;


Timer.propTypes = {
  submit: PropTypes.func
};

