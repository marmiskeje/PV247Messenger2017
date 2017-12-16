import { connect } from 'react-redux';
import { ProfileDialogView } from '../../components/profile/ProfileDialogView.jsx';
import {saveProfileAction} from "../../actions/profile/saveProfileAction";


const mapDispatchToProps = (dispatch) => ({
    onSaveProfile: (updateProfileData) => dispatch(saveProfileAction(updateProfileData))
});

const mapStateToProps = (state) => ({
    currentUser: state.users.currentUser
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(ProfileDialogView);

export { connectedComponent as ProfileDialogView };
