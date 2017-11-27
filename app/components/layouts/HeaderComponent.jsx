import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import LoginStateComponent from './LoginStatusComponent';
import { LogOutAction } from '../../redux/actionCreater/auth';
import { LOGOUT } from '../../redux/constants/AuthConstant';

//Component: HeaderComponent
const HeaderComponent = ({ isAuth, name, LogOut }) => (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
        <nav className="container w-100">
            <Link className="navbar-brand" to='/'> 應用程式名稱 </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#bd-main-nav" aria-controls="bd-main-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="bd-main-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to='/'> 首頁 </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/about'> 關於 </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/contact'> 連絡方式 </Link>
                    </li>
                </ul>
                <LoginStateComponent isAuth={isAuth} name={name} LogOut={LogOut}  />
            </div>
        </nav>
    </header>
);

//for connect
const mapStateToProps = (state) => {
    return {
        isAuth: state ? state.isAuth : false,
        name: state ? state.name : ''
    };
};

//for connect
const mapDispatchToProps = (dispatch) => {
    return {
        LogOut: () => {
            dispatch(LogOutAction());
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent));