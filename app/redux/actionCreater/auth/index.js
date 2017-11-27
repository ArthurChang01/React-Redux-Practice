//login
import LoginAsyncAction from './login/LoginAsyncAction';
import LoginFailAction from './login/LoginFailAction';
import LoginRequestAction from './login/LoginRequestAction';
import LoginSuccessAction from './login/LoginSuccessAction';

//logout
import LogOutAction from './logout/LogOutAction';

//register
import RegisterAsyncAction from './register/RegisterAsyncAction';
import RegisteRequestActin from './register/RegisteRequestActin';
import RegisterFailAction from './register/RegisterFailAction';
import RegisterSuccessAction from './register/RegisterSuccessAction';

module.exports = {
    //login
    LoginAsyncAction, LoginFailAction, LoginRequestAction, LoginSuccessAction,
    //logout
    LogOutAction,
    //register
    RegisterAsyncAction, RegisteRequestActin, RegisterFailAction, RegisterSuccessAction
};