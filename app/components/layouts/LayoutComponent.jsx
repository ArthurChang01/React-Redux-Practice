import React from 'react';
import {
    Router,
    Route,
    Link
  } from 'react-router-dom';

import history from '../../common/history';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import {HomeComponent, ContactComponent, AboutComponent} from '../contents';
import {LoginComponent, RegisterComponent} from '../auth';

const LayoutComponent = () => (
    <Router history={history}>
        <div>
            <HeaderComponent />
            <div className = "container">
                <Route exact path="/" component={HomeComponent} />
                <Route path="/contact" component={ContactComponent} />
                <Route path="/about" component={AboutComponent} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/register" component={RegisterComponent} />
                <hr />
                <FooterComponent />
            </div>
        </div>
    </Router>   
);

export default LayoutComponent;