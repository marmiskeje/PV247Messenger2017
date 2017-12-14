import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LoginForm } from '../../components/login/LoginForm.jsx';
import {authenticateAction} from '../../actions/shared/authenticateAction';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (email) => dispatch(authenticateAction(ownProps.from, email))
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(LoginForm);

connectedComponent.propTypes = {
    from: PropTypes.object.isRequired
};

export { connectedComponent as LoginForm };
