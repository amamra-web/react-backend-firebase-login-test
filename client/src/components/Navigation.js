import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div class="topnav" id="myTopnav">
          {/* <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/competition">Competition</NavLink>
          <NavLink to="/project">Projects</NavLink> */}
          {/* <NavLink to="/homework">Homework</NavLink> */}
          <NavLink to="/quiz">Quiz</NavLink>
           {/* <NavLink to="/graph">Graph</NavLink>
          <NavLink to="/labs">Labs</NavLink>
          <NavLink to="/about">FAQ</NavLink> */}
          <NavLink to="/chat">Chat</NavLink>
          <NavLink to="/editQuiz">Create new Quiz Question</NavLink>
       </div>
    );
}
 
export default Navigation;
