import React, { Component } from 'react';
import { Router } from "react-router-dom";

import { createBrowserHistory } from "history";
import {Provider} from 'react-redux';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from "../config/store"
import MainRoutes from './main';

import '../styles/main.scss'


toast.configure({autoClose:1000})

export const history = createBrowserHistory();


class AppRoutes extends Component {


    render() {
        return (

            <Provider store={store}>
                <Router history={history}>
                    <ToastContainer  transition={Slide}/>
                        <MainRoutes/>
                </Router>
            </Provider>
        )
    }

}

export default AppRoutes