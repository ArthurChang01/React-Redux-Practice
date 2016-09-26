import "jquery-validation";
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {RegisterAsyncAction} from '../actionCreators/Register/RegisterAsyncAction';
import Validator from '../../common/Validator';

//Component: RegisterComponent
export class RegisterComponent extends Component {
    constructor(Props) {
        super(Props);
        this.onSubmit = this._onSubmit.bind(this);
    }
    
    componentDidMount() {
        let rules = {
            email: { required: true },
            password: { required: true },
            confirm_password: { required: true }
        };
        
        Validator(rules);
    }

    _onSubmit(e) {
        e.preventDefault();
        if (!$(this.refs.frm).valid()) {
            return false;
        }

        let email = this.refs.email.value,
            password = this.refs.password.value,
            confirm_password = this.refs.confirm_password.value;

        this.props.onSubmit(email, password, confirm_password);
    }

    render() {
        return <div>
            <h2> 註冊.</h2>
            <div className="row">
                <div className="col-md-8">
                    <section id="loginForm">
                        <form method="post" className="form-horizontal" role="form" noValidate ref="frm" onSubmit={this.onSubmit}>
                            <h4>建立新的帳戶。</h4>
                            <hr />
                            <div className="form-group">
                                <label className="col-md-2 control-label">電子郵件</label>
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
                                <label className="col-md-2 control-label">確認密碼</label>
                                <div className="col-md-10">
                                    <input type="password" name="confirm_password" className="form-control" ref="confirm_password" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <input type="submit" value="註冊" disabled={this.props.isFetching} className="btn btn-default" />
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>;
    }
}

//RegisterComponent'prop define
RegisterComponent.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired
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
        onSubmit: (email, password, confirm_password) => {
            dispatch(RegisterAsyncAction(email, password, confirm_password));
        }
    };
};

//connect
export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);