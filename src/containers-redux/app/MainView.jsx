import { connect } from 'react-redux';
import { MainView } from '../../components/app/MainView.jsx';
import {initDataAction} from "../../actions/app/initDataAction";
import {destroySessionAction} from "../../actions/shared/destroySessionAction";

const mapDispatchToProps = (dispatch) => ({
    onMount: () => dispatch(initDataAction()),
    onLogout: () => dispatch(destroySessionAction())
});

const mapStateToProps = (state) => ({
    currentUser: state.users.currentUser
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(MainView);

export { connectedComponent as MainView };
