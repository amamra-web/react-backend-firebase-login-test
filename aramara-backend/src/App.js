import React, { Component } from 'react';
import { BrowserRouter,  Switch,  Route} from 'react-router-dom';

import './App.css';

import Question from './components/questions';
import About from './components/about';
import Compete from './components/compete';
import CompeteSummary from './components/summary';
import Project from './components/project';
import Homework from './components/homework';
import Quiz from './components/quiz';
import Labs from './components/labs';
import Chat from './components/chat';
import Error from './components/error';
import Navigation from './components/Navigation';
import graph from "./components/graph";

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" exact component={Question} />
             <Route path="/about" component={About}/>
             <Route path="/competition" component={Compete}/>
             <Route path="/competition/summary" component={CompeteSummary}/>
             <Route path="/project" component={Project}/>
             <Route path="/homework" component={Homework}/>
             <Route path="/quiz" component={Quiz}/>
             <Route path="/labs" component={Labs}/>
             <Route path="/chat" component={Chat}/>
             <Route path="/graph" component={graph}/>


            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  
  }
}

export default App;
