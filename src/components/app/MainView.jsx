import React from 'react';
import {MenuView} from '../../containers-redux/app/MenuView.jsx';
import {Notification} from '../shared/Notification';
import {MessagesView} from "../../containers-redux/app/MessagesView.jsx";
import * as PropTypes from "prop-types";
import {ProfileDialogView} from "../../containers-redux/app/ProfileDialogView.jsx";

class MainView extends React.Component {
    static propTypes = {
        onMount: PropTypes.func,
        onLogout: PropTypes.func.isRequired,
        currentUser: PropTypes.any.isRequired
    }

    constructor(props){
        super(props);
    }

    componentDidMount() {
        if (this.props.onMount){
            this.props.onMount();
        }
    }

    render() {
        return <div className="container-fluid h-100">
            <div className="row align-items-center webpage-header">
                <div className="col-4">
                </div>
                <div className="col-2">
                    <div>
                        <div id="webpage-progressbar" className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                Server communication in progress...
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                </div>
                <div className="col-1">
                    <span>{this.props.currentUser.nickname || this.props.currentUser.email}</span>
                </div>
                <div className="col-1">
                    <button type="submit" className="btn btn-secondary" data-toggle="modal" data-target="#profileDialog">Profile</button>
                </div>
                <div className="col-1">
                    <button type="submit" className="btn btn-danger" onClick={this.props.onLogout}>Logout</button>
                </div>
            </div>
            <div className="row h-100">
                <div className="col-2 webpage-menu">
                    <MenuView />
                </div>
                <div className="col-10">
                    <MessagesView />
                </div>
                <Notification/>
                <ProfileDialogView />
            </div>
        </div>;
    }
}
export { MainView };