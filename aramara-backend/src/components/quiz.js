import React, { Component } from 'react';
import io from 'socket.io-client';

import Footer from '../partial/footer';
import firebase, { auth, provider } from '../firebase.js';

var socket = null;
 
class quiz extends Component {
   constructor() 
   {
      super();
      this.state = {
        currentItem: '',
        userName: '',
        questions: [],
        user: null
      }
      this.handleChange = this.handleChange.bind(this);
      this.login = this.login.bind(this); 
      this.logout = this.logout.bind(this);
      
    }
    componentDidMount() {
      socket = io('http://localhost:8880/communication')
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        } 
      });
      const itemsRef = firebase.database().ref('quizzes/quiz2');
      itemsRef.on('value', (callback) => {
      let questions = callback.val();
      let data_list = [];
      
      for (let item in questions){
        data_list.push(
          {
            id: item,
            question: questions[item].questionText,
            questionType: questions[item].questionType,
            choice1: questions[item].choice1,
            choice2: questions[item].choice2,
            choice3: questions[item].choice3,
            choice4: questions[item].choice4,
            answer: questions[item].answer
          });      
          
        }
        this.setState({
          questions:data_list
        });
          });
        }
    
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
      
    }
    logout() {
      auth.signOut()
        .then(() => {
          this.setState({
            user: null
          });
        });
    }
    login() {
      auth.signInWithPopup(provider) 
        .then((result) => {
          const user = result.user;
          this.setState({
            user
          });
        });
    }

    componentWillUnmount() {
      socket.disconnect();
    }
   
    render() {
  return <div>
    <div className='app'>
      <header>
        <div className="wrapper">
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

      {this.state.user ?
      <div>
         <h1>Quiz</h1>
         <p> insert information</p>
         <div>
            <ul>
            {this.state.questions.map((item) => {
            return (
            <li key={item.id}>
            <p>{item.question}</p>
            {/* <p>Question Type: {item.questionType}</p> */}
            
            
            {(item.questionType == 1) ?
              <form>
                {/* <p>Choices:</p> */}
                <button type="button">{item.choice1}</button>           
                <button type="button">{item.choice2}</button>   
                <button type="button">{item.choice3}</button>   
                <button type="button">{item.choice4}</button>    
              </form>       
            
            : 
            
              <form>
                <input type="text" name="answer" placeholder="Your response?"  />
              </form>
            }
            
            
            
            
                   
            {/* <p>Answer: {item.answer}</p> */}
            </li>)
              })}
            </ul>
          </div>
        
        <Footer />
      </div>
      :
      <div className='wrapper'>
         <p>You must be logged in to see the classroom content.</p>
         <Footer />
      </div>

  }
  </div>
</div>

       
  }
}
 
 
export default quiz;