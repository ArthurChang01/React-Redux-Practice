import "jquery-validation";
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {LoginAsyncAction} from '../actionCreators/Login/LoginAsyncAction';
import Validator from '../../common/Validator';

//Component: LoginComponent
export class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this._onSubmit.bind(this);
    }

    componentDidMount() {
        let rules = {
            email: { required: true },
            password: { required: true }
        };
        
        Validator(rules);
    }

    _onSubmit(e) {
        e.preventDefault();
        if (!$(this.refs.frm).valid())
            return false;

        let email = this.refs.email.value,
            password = this.refs.password.value;
        this.props.onSubmit(email, password);
    }

    render() {
        return <div className="container body-content">
            <h2> 登入.</h2>
            <div className="row">
                <div className="col-md-8">
                    <section id="loginForm">
                        <form method="post" className="form-horizontal" role="form" onSubmit={this.onSubmit} noValidate ref="frm">
                            <h4>使用本機帳戶登入。</h4>
                            <hr />
                            <div className="form-group">
                                <label htmlFor="email" className="col-md-2 control-label">電子郵件</label>
                                <div className="col-md-10">
                                    <input type="email" name="email" className="form-control" ref="email" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">密碼</label>
                                <div className="col-md-10">
                                    <input type="password" name="password" className="form-control" ref="password" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <div className="checkbox">
                                        <input type="checkbox" />
                                        <label>記住我</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <input type="submit" value="登入" disabled={this.props.isFetching} className="btn btn-default" />
                                </div>
                            </div>
                            <p>
                                <Link to="/register">註冊為新使用者</Link>
                            </p>
                            * 請在啟用密碼重設功能的帳戶確認之後啟用此項目
                        </form>
                    </section>
                </div>
            </div>
        </div>;
    }
}

//Component: LoginComponent's propTypes define
LoginComponent.propTypes = {
    isFetching: PropTypes.bool.isRequired
};

//for connect
const mapStateToProps = (state) => {
    return {
        isFetching: state ? state.isFetching : false
    };
};

//for connect
const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (email, password) => {
            dispatch(LoginAsyncAction(email, password));
        }
    };
};

//connect
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

