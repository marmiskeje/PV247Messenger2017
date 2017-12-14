import * as React from 'react';
import * as PropTypes from 'prop-types';

class MenuView extends React.Component {
    static propTypes = {
        currentUser: PropTypes.any.isRequired,
        channels: PropTypes.any.isRequired,
        onAddChannel: PropTypes.func.isRequired,
        onUpdateChannelName: PropTypes.func.isRequired,
        onDeleteChannel: PropTypes.func.isRequired,
        onChannelSelected: PropTypes.func.isRequired,
        onInviteUser: PropTypes.func.isRequired,
    }

    constructor(props){
        super(props);
    }

    render() {
        const channels = this.props.channels.valueSeq().map(c =>
            <p key={c.id}>
                <span onClick={() => this.props.onChannelSelected(c)}>{c.name}</span>
                <button type="submit" className="btn" onClick={() => this.props.onInviteUser(c)}>I</button>
                <button type="submit" className="btn" onClick={() => this.props.onUpdateChannelName(c)}>U</button>
                {c.ownerId === this.props.currentUser.id &&
                <button type="submit" className="btn" onClick={() => this.props.onDeleteChannel(c.id)}>X</button>
                }
            </p>
        );
        return <div>
                <div>
                    <button type="submit" className="btn btn-primary" onClick={this.props.onAddChannel}>Add channel</button>
                </div>
                {channels}
            </div>;
    }
}

export { MenuView };