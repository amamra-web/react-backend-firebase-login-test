import React, { Component } from 'react';
import io from 'socket.io-client';
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import Footer from '../partial/footer';
import firebase, { auth, provider } from '../firebase.js';

var socket = null; 
var history;
class quiz extends Component {
   constructor() 
   {
      super();
      this.state = {
        currentItem: '',
        userName: '',
        quizzes: [],
        quizObjects: '',
        user: null
      }
      this.handleChange = this.handleChange.bind(this);
      this.login = this.login.bind(this); 
      this.logout = this.logout.bind(this);
      
    }
    componentDidMount() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        } 
      });
      const itemsRef = firebase.database().ref('quizzes');
      itemsRef.on('value', (callback) => {
        let quizList = callback.val();
        console.log(quizList);
        let data_list = [];
        for (var quiz in quizList){
          var quizName = quiz;
          if(quizList.hasOwnProperty(quiz)) {
            var val = quizList[quiz];
            data_list.push(
              {
                quizName: val,
                id: quizName,
              });      
          
            }
            this.setState({
              quizzes:data_list,
              quizObjects: quizList
            });
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

    startQuiz = (quizKey, history) => e => {
      console.log(this.state.quizObjects)
      history.push({
        pathname:'/quizRoom',
        state: {
          // quiz: this.state.quizObjects.
        }
      });
    }
   
    render() {
  return <div >
    <div className='app'>
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

      {this.state.user ?
      <div>
         <h1>Quizzes</h1> 
         <div>
            <ul style={{display:'block', textAlign: 'center'}}>
            {this.state.quizzes.map((item) => {
              return (
                <li key={item.id}>
                  <h2 style={{textAlign:'center'}}>{item.id}</h2>
                  <Route render={({history}) => (
                    <button onClick={this.startQuiz(item.id, history)} style={{margin:'0 auto'}} type='button'>Start Quiz</button>
                  )}/>
                  
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