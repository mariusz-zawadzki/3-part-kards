import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Router} from "react-router-dom";
import {Route} from "react-router";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <Route component={App}/>
        </BrowserRouter>, div);
});
