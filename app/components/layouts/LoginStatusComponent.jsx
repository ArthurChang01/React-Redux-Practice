import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Link
  } from 'react-router-dom'

const NotYetLogin = () => (
    <ul className="nav navbar-nav navbar-right">
        <li><Link className="nav-link" to="/register"> 註冊 </Link></li>
        <li><Link className="nav-link" to="/login"> 登入 </Link></li>
    </ul>
);

const LoginSuccess = ({name, logOutFunc}) => (
    <form id="logoutForm" className="navbar-right">
        <ul className="nav navbar-nav navbar-right">
            <li><a className="nav-link" title="Manage">Hello {name}!</a></li>
            <li><a className="nav-link" href="javascript:void(0);" onClick={logOutFunc}> 登出 </a></li>
        </ul>
    </form>
);

LoginSuccess.propTypes = {
    name: PropTypes.string,
    logOutFunc: PropTypes.func
};

const LoginStateComponent = ({isAuth, name , LogOut}) => {
    let rightSide = isAuth ?
        <LoginSuccess name={name} logOutFunc={LogOut} />    
        :
        <NotYetLogin />;
        
    return rightSide;
};

//LoginStateComponent's props define
LoginStateComponent.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    name: PropTypes.string,
    LogOut: PropTypes.func
};

export default LoginStateComponent;