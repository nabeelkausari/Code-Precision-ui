import React, { Component } from 'react';
import { Router } from "react-router-dom";

import { createBrowserHistory } from "history";
import {Provider} from 'react-redux';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from "../config/store"

import {MainRoutes} from './main';

import '../styles/main.scss'


toast.configure({autoClose:1000})

export const history = createBrowserHistory();


export default class AppRoutes extends Component {
    state = {
        theme: 'dark'
    };

    changeTheme = () => {

        if(this.state.theme === 'dark')
            this.setState({ theme: 'light'})
        else
            this.setState({theme : 'dark'})
    }

    render() {
        const { theme } = this.state;
        return (

            <Provider store={store}>
                <Router history={history}>
                    <ToastContainer  transition={Slide}/>
                    <button onClick={this.changeTheme}>Change Theme</button>
                    <div className={`body--${theme}`}>
                        <MainRoutes/>
                    </div>
                </Router>
            </Provider>
        )
    }

}
