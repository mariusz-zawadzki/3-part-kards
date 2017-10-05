import React, { Component } from 'react';
import { Route , Switch } from 'react-router'
import { Link  } from 'react-router-dom'
import './App.css';
import TwoCards from './components/TwoCards'
import ThreeCards from './components/ThreeCards'
class App extends Component {
  render() {
    const threeCards = this.props.location.pathname !== '/new/2-cards'
    return (
        <div className="container">
          <ul className="nav nav-tabs">
            <li className="nav-item"><Link className={"nav-link"+ (threeCards?' active':'')} to={"/new/3-cards"}>Karty trójdzielne</Link></li>
            <li className="nav-item"><Link className={"nav-link"+ (!threeCards?' active':'')}  to={"/new/2-cards"}>Karty obrazkowe</Link></li>
          </ul>
            <Switch>
                <Route path="/new/3-cards" component={ThreeCards}/>
                <Route path="/new/2-cards" component={TwoCards}/>
                <Route component={ThreeCards}/>
            </Switch>
        </div>
    );
  }
}

export default App;

