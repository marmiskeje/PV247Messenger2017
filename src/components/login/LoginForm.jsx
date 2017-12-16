import * as React from 'react';
import * as PropTypes from 'prop-types';
import { uuid } from '../../utils/uuidGenerator';

class LoginForm extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props){
        super(props);
        this.state = { email: 'test@test.com'};
    }

    componentWillMount() {
        this.setState(() => ({ componentId: uuid() }));
    }

    render() {
        const { componentId } = this.state;
        const loginId = `${componentId}_login`;

        return (
            <form className="justify-content-center">
                <div className="decent-bottom-space">
                    <input type="email" id={loginId}  maxLength="30" placeholder="email address" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                </div>
                <div className="loginButtonsContainer">
                    <button type="submit" className="btn btn-primary" onClick={() => this.props.onSubmit(this.state.email)}>Login</button>
                </div>
            </form>
        );
    }
}

export { LoginForm };