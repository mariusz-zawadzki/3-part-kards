import React, {Component} from 'react';
import {Route, Switch} from 'react-router'
import {Link} from 'react-router-dom'
import './App.css';
import TwoCards from './components/TwoCards'
import ThreeCards from './components/ThreeCards'
import Grid from './components/Grid'

class App extends Component {
    render() {
        const pathname = this.props.location ? this.props.location.pathname : '';
        const twoCards = pathname === '/2-cards'
        const threeCards = pathname === '/3-cards' || pathname === ''
        const grid = pathname === '/grid'
        return (
            <div className="container">
                <ul className="nav nav-tabs">
                    <li className="nav-item"><Link className={"nav-link" + (threeCards ? ' active' : '')}
                                                   to={"/3-cards"}>Karty trójdzielne</Link></li>
                    <li className="nav-item"><Link className={"nav-link" + (twoCards ? ' active' : '')} to={"/2-cards"}>Karty
                        obrazkowe</Link></li>
                    <li className="nav-item"><Link className={"nav-link" + (grid ? ' active' : '')} to={"/grid"}>Siatka
                        kodowania</Link></li>
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

