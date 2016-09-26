import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import LoginStateComponent from '../login/components/LoginStateComponent';
import {LogOutAction} from '../login/actionCreators/Logout/LogOutAction';
import {LOGOUT} from '../login/constants/LoginConstant';

//Component: HeaderComponent
export class HeaderComponent extends Component {
    constructor(Props){
        super(Props);
    }
    
    render() {
        return <div className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to="/">應用程式名稱</Link>
                </div>
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li> <Link to="/">首頁</Link> </li>
                        <li> <Link to="/about">關於</Link> </li>
                        <li> <Link to="/contact">連絡方式</Link> </li>
                    </ul>
                    <LoginStateComponent isAuth={this.props.isAuth} name={this.props.name} LogOut={this.props.LogOut}  />
                </div>
            </div>
        </div>;
    }
};

//HeaderComponent's props define
HeaderComponent.propTypes={
    isAuth: PropTypes.bool.isRequired,
    LogOut : PropTypes.func.isRequired
};

//for connect
const mapStateToProps = (state) => {
    return {
        isAuth: state? state.isAuth : false,
        name: state? state.name : ''
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

//connect
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);