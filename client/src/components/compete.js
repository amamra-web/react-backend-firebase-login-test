import React, { Component } from 'react';

import Footer from '../partial/footer';
import firebase, { auth, provider } from '../firebase.js';
 
class compete extends Component {
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
  
      const itemsRef = firebase.database().ref('items');
      itemsRef.on('value', (callback) => {
      let items = callback.val();
      let newState = [];
      for (let item in items){
      newState.push({
        id: item,
        title: items[item].title,
        user: items[item].user
    });
    }
    this.setState({
      items: newState
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
    handleSubmit(event) {
      event.preventDefault();
      const itemsRef = firebase.database().ref('items');
      const item = {
        title: this.state.currentItem,
        user: this.state.user.displayName || this.state.user.email
      }
      itemsRef.push(item);
      this.setState({
        currentItem: '',
        userName: ''
      }
      
      )
      
    }
    removeItem(itemId) {
      const itemRef = firebase.database().ref(`/items/${itemId}`);
      itemRef.remove();
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
         <h1>In-Class Activitity</h1>
         
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
 
 
export default compete;