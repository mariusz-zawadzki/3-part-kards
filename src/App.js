import React, {Component} from 'react';
import {Route, Switch} from 'react-router'
import {NavLink} from 'react-router-dom'
import './App.css';
import TwoCards from './components/TwoCards'
import ThreeCards from './components/ThreeCards'
import Grid from './components/Grid'
const matchOrDefault = (match, location) => {
    return match || location.pathname==="/";
};
class App extends Component {
    render() {
        return (
            <div className="container">
                <ul className="nav nav-tabs">
                    <li className="nav-item"><NavLink className="nav-link" to={"/3-cards"} isActive={matchOrDefault}>Karty trójdzielne</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to={"/2-cards"}>Karty super obrazkowe</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to={"/grid"}>Siatka kodowania</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to={"/changelog"}>Co nowego</NavLink></li>
                </ul>
                <Switch>
                    <Route path="/3-cards" component={ThreeCards}/>
                    <Route path="/2-cards" component={TwoCards}/>
                    <Route path="/grid" component={Grid}/>
                    <Route path="/changelog">
                        <div className="p-3">
                            <h1>Lista zmian:</h1>
                            <div className="pb-3">
                                <ul>
                                    <li className="pb-3">
                                        25.08.2018
                                        <ul>
                                            <li>Nowe narzędzie do kadrowania w zakładcie 'Karty trójdzielne'</li>
                                            <li>Możliwość ustawienia dokładnego przybliżenia przez skopiowanie go z poprzedniej edycji pliku.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        Planowane na najbliższy czas:
                                        <ul>
                                            <li>Możliwość zapisania ustawień danego zdjęcia (przybliżenie, położenie etc.) - rozszerzenie pomysłu z zapisywaniem przybliżenia, tak by można było zapisać pojedyńczy obrazek do ponownej obróbki.</li>
                                            <li>Nowy rodzaj kart - karty językowe.</li>
                                            <li>Nowy rodzaj kart - 'karty kontynentów'.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="pb-3">
                                Planuję w krótce zacząć znów rozwijać te narzędzia.<br/>
                                Tutaj będę zamieszczał listę zmian jakie nastąpiły.
                            </div>
                            <div className="">
                                <h5 className="card-title">W razie pytań/błędów proszę o kontakt.</h5>
                                <p className="card-text">Mariusz Zawadzki</p>
                                <p className="card-text">email: <a href="mailto:mariusz.r.zawadzki@gmail.com">mariusz.r.zawadzki@gmail.com</a></p>
                                <p className="card-text">facebook: <a target="_blank"  rel="noopener noreferrer" href="https://www.facebook.com/mariusz.zawadzki.71">https://www.facebook.com/mariusz.zawadzki.71</a></p>
                            </div>
                        </div>
                    </Route>
                    <Route component={ThreeCards}/>
                </Switch>
            </div>
        );
    }
}

export default App;

