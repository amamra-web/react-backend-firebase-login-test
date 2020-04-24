import React, { Component } from 'react';

import Footer from '../partial/footer';
import firebase, { auth, provider } from '../firebase.js';
 
class question extends Component {
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
        <div className='container'>
          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="username" placeholder="What's your name?" value={this.state.user.displayName || this.state.user.email} />
              <input type="text" name="currentItem" placeholder="What is your question?" onChange={this.handleChange} value={this.state.currentItem} />
              <button>Add Item</button>
            </form>
          </section>
          <section className='display-item'>
            <div className="wrapper">
            <ul>
            {this.state.items.map((item) => {
            return (
            <li key={item.id}>
            <h3>{item.title}</h3>
            <p>asked by: {item.user}
            {item.user === this.state.user.displayName || item.user === this.state.user.email ?
            <button onClick={() => this.removeItem(item.id)}>Remove Item</button> : null}
            </p>
            </li>)
              })}
            </ul>
          </div>
          <Footer />
        </section>
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
 
export default question;