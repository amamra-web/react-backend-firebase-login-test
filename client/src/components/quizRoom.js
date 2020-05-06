import React, { Component } from 'react';
import io from 'socket.io-client';
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import Footer from '../partial/footer';
import firebase, { auth, provider } from '../firebase.js';

var socket = null;

class QuizRoom extends Component {
    constructor() {
        super();
        this.state = {
            currentQuestion: ''
        }
    }


    componentDidMount() {
      socket = io('http://localhost:8880/communication')
      var quizKey = this.props.history.quizKey;
      socket.emit('enable-quiz-up', quizKey);
      console.log(this.props.history.quizKey);
      //console.log(this.history.state);
    }

    componentWillUnmount() {
        socket.disconnect();
    }

    render() {
        return(
            <header>
        <div> 
          <h1>Amamra's Classroom</h1>

          {this.state.user ?

          <div className='user-profile' style={{float: 'right'}}>
            
            <img src={this.state.user.photoURL}
            style={{ width: 50, height: 50, borderRadius: 100 / 2 }}
            />
            <button onClick={this.logout}>Logout</button>
          </div>         
          :
          <button onClick={this.login} style={{float: 'right'}}>Log In</button>              
          }
        </div>
      </header>
        )
            
    }
}

export default QuizRoom;