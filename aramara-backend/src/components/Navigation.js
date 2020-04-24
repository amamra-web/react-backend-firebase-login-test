import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div class="topnav" id="myTopnav">
          <NavLink to="/">Questions</NavLink>
          <NavLink to="/competition">Competition</NavLink>
          <NavLink to="/project">Projects</NavLink>
          <NavLink to="/homework">Homework</NavLink>
          <NavLink to="/quiz">Quiz</NavLink>
          <NavLink to="/labs">Labs</NavLink>
          <NavLink to="/about">FAQ</NavLink>
          <NavLink to="/chat">Chat</NavLink>
          
       </div>
    );
}
 
export default Navigation;