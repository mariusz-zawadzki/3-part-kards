import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Router} from "react-router-dom";
import {Route} from "react-router";


describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Route component={App}/>
            </BrowserRouter>, div);
    });
});
