import React, { Component } from 'react';

import Footer from '../partial/footer';
import firebase, { auth, provider } from '../firebase.js';
import Dashboard from './Dashboard';
 
class chat extends Component {
   constructor() {
      super();
      this.state = {

        userName: '',
  
        user: null
      }

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
         <h1>Socket Chat</h1>
         <Dashboard username= {this.state.user.displayName}/>
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
 
 
export default chat;