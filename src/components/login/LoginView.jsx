import * as React from 'react';
import * as routes from '../../constants/Routes';
import { LoginForm } from '../../containers-redux/login/LoginForm.jsx';
import {Notification} from '../shared/Notification.jsx';

const LoginView = ({ from }) => {
    const originalLocation = from || { pathname: routes.ROOT };

    return [
        <div className="container h-100" key="loginLayout">
            <div className="row h-100 align-items-center">
                <div className="col-sm-10 offset-sm-1 text-center">
                    <h1>Welcome to PV247 project!</h1>
                    <br />
                    <LoginForm from={originalLocation} />
                    <Notification/>
                </div>
            </div>
        </div>
    ];
};

export { LoginView };