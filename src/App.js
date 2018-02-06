import React, { Component } from 'react';
import { Route , Switch } from 'react-router'
import { Link  } from 'react-router-dom'
import './App.css';
import TwoCards from './components/TwoCards'
import ThreeCards from './components/ThreeCards'
import Grid from './components/Grid'
class App extends Component {
  render() {
    const twoCards = this.props.location.pathname === '/2-cards'
    const threeCards = this.props.location.pathname === '/3-cards' || this.props.location.pathname === ''
    const grid = this.props.location.pathname === '/grid'
    return (
        <div className="container">
          <ul className="nav nav-tabs">
            <li className="nav-item"><Link className={"nav-link"+ (threeCards?' active':'')} to={"/3-cards"}>Karty trójdzielne</Link></li>
            <li className="nav-item"><Link className={"nav-link"+ (twoCards?' active':'')}  to={"/2-cards"}>Karty obrazkowe</Link></li>
            <li className="nav-item"><Link className={"nav-link"+ (grid?' active':'')}  to={"/grid"}>Siatka kodowania</Link></li>
          </ul>
            <Switch>
                <Route path="/3-cards" component={ThreeCards}/>
                <Route path="/2-cards" component={TwoCards}/>
                <Route path="/grid" component={Grid}/>
                <Route component={ThreeCards}/>
            </Switch>
        </div>
    );
  }
}

export default App;

