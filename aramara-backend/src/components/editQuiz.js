import React, { Component } from 'react';

import Footer from '../partial/footer';
import firebase, { auth, provider } from '../firebase.js';
 
class editQuiz extends Component {
    constructor() {
        super();
        this.state = {
          currentItem: '',
          userName: '',
          items: [],
          user: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this); 
        this.logout = this.logout.bind(this);
    }
    
      componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({ user });
          } 
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
      handleSubmit(event) {
        event.preventDefault();
        const itemsRef = firebase.database().ref('quizzes');
        const quizq = {
            
                questionTest: this.state.question,
                questionType: this.state.qtype,
                answer: this.state.answer,
                choice1: this.state.c1,
                choice2: this.state.c2,
                choice3:this.state.c3,
                choice4: this.state.c4
        }
        itemsRef.push(quizq);
        this.setState({
            questionTest: '',
            questionType: '',
            answer:'' ,
            choice1:'' ,
            choice2:'' ,
            choice3:'',
            choice4: ''
        }
        
        )
        
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
            <div className='container'>
              <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                  
                  <input type="text" name="quizID" placeholder="Quiz ID" onChange={this.handleChange} value={this.state.qid} />
                  <input type="text" name="questionNumber" placeholder="Question Number" onChange={this.handleChange} value={this.state.qnum} />
                  <input type="text" name="questionType" placeholder="Question Type" onChange={this.handleChange} value={this.state.qtype} />
                  <input type="text" name="question" placeholder="Question" onChange={this.handleChange} value={this.state.question} />
                  <input type="text" name="answer" placeholder="Answer" onChange={this.handleChange} value={this.state.answer} />
                  <input type="text" name="choice1" placeholder="Choice 1 ..." onChange={this.handleChange} value={this.state.c1} />
                  <input type="text" name="choice2" placeholder="Choice 2 ..." onChange={this.handleChange} value={this.state.c2} />
                  <input type="text" name="choice3" placeholder="Choice 3 ..." onChange={this.handleChange} value={this.state.c3} />
                  <input type="text" name="choice4" placeholder="Choice 4 ..." onChange={this.handleChange} value={this.state.c4} />

                  <button>Add Question</button>
                </form>
              </section>
              
              <Footer />
           
          </div>
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
 
 
export default editQuiz;