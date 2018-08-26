import React, {Component} from 'react';
import {Route, Switch} from 'react-router'
import {NavLink} from 'react-router-dom'
import './App.css';
import TwoCards from './components/TwoCards'
import ThreeCards from './components/ThreeCards'
import Grid from './components/Grid'
import ReleaseNotes from './components/ReleaseNotes'
const matchOrDefault = (match, location) => {
    return match || location.pathname==="/";
};
class App extends Component {
    render() {
        return (
            <div className="container">
                <ul className="nav nav-tabs">
                    <li className="nav-item"><NavLink className="nav-link" to={"/3-cards"} isActive={matchOrDefault}>Karty trójdzielne</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to={"/2-cards"}>Karty obrazkowe</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to={"/grid"}>Siatka kodowania</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to={"/changelog"}>Co nowego</NavLink></li>
                </ul>
                <Switch>
                    <Route path="/3-cards" component={ThreeCards}/>
                    <Route path="/2-cards" component={TwoCards}/>
                    <Route path="/grid" component={Grid}/>
                    <Route path="/changelog" component={ReleaseNotes}/>
                    <Route component={ThreeCards}/>
                </Switch>
            </div>
        );
    }
}

export default App;

