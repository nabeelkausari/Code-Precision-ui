import React from 'react';
import { Router } from "react-router-dom";

import { createBrowserHistory } from "history";
import {Provider} from 'react-redux';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from "../config/store"

import LightRoutes from './themes/light';
import DarkRoutes from './themes/dark';


toast.configure({autoClose:1000})

export const history = createBrowserHistory();

export default (props) => {
  const dark = localStorage.getItem('theme') && localStorage.getItem('theme') === 'dark'
    return (
      <Provider store={store}>
          <Router history={history}>
              <ToastContainer  transition={Slide}/>
            {dark ? <DarkRoutes/> : <LightRoutes/>}
          </Router>
        </Provider>
    );
};

