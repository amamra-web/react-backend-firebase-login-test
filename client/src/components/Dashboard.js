import React, { Component } from 'react';
import io from 'socket.io-client';
import firebase, { auth, provider } from '../firebase.js';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: null
        }}
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
              this.setState({ user });
            } 
          });
        const socket = io('http://localhost:8880')
        const messageContainer = document.getElementById('message-container')
        const messageForm = document.getElementById('send-container')
        const messageInput = document.getElementById('message-input')
        
        
        
        //const name =  prompt("What is your desired screen name?");
        
        var name = this.state.user;
        //.then(response =>response.json()).then(json => name = json.displayName)
        
        
        socket.emit('new-user', name)
        
        socket.on('chat-message', data => {
        appendMessage(`${data.name}: ${data.message}`)
        })
        
        socket.on('user-connected', name => {
        appendMessage(`${name} connected`)
        })
        
        socket.on('user-disconnected', name => {
        appendMessage(`${name} disconnected`)
        })
        
        messageForm.addEventListener('submit', e => {
        e.preventDefault()
        const message = messageInput.value
        appendMessage(`You: ${message}`)
        socket.emit('send-chat-message', message)
        messageInput.value = ''
        })
        
        function appendMessage(message) {
        const messageElement = document.createElement('div')
        messageElement.innerText = message
        messageContainer.append(messageElement)
        }
    }
    render(){
        return(
            <div>
                <div id="message-container"></div>
                <form id="send-container">
                    <input type="text" id="message-input" />
                    <button type="submit" id="send-button">Send</button>
                </form>  
            </div>);
    }
    
  };
  
 
export default Dashboard;   