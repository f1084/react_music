import React,{ Component } from 'react';
import { render } from 'react-dom';

import { HashRouter,Router,Route,hashHistory,Link } from 'react-router-dom'

import Home from "./pages/home";

import Login from "./pages/login";

render((
    <HashRouter>
        <div>
            <ul>
                <li><Link to='/'>Home page</Link></li>
                <li><Link to='/login'>Login page</Link></li>
            </ul>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
        </div>
    </HashRouter>
),document.getElementById('content'));

if (module.hot) {
    module.hot.accept();
}
