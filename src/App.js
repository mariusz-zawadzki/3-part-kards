import React, { Component } from 'react';
import { Route , Switch } from 'react-router'
import { Link  } from 'react-router-dom'
import './App.css';
import TwoCards from './components/TwoCards'
import ThreeCards from './components/ThreeCards'
class App extends Component {
  render() {
    return (
        <div>
          <div>Menu goes here</div>
          <div>
            <Link to={"/3-cards"}>Three cards</Link>
            <Link to={"/2-cards"}>Two cards</Link>
          </div>
            <Switch>
                <Route path="/3-cards" component={ThreeCards}/>
                <Route path="/2-cards" component={TwoCards}/>
                <Route component={ThreeCards}/>
            </Switch>
        </div>
    );
  }
}

export default App;
