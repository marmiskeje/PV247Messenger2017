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
            <div className="row channel-row align-items-center" key={c.id} onClick={() => this.props.onChannelSelected(c)}>
                <div className="col-7">
                    <span>{c.name}</span>
                </div>
                <div className="col-1">
                    <i className="fa fa-user-plus" onClick={() => this.props.onInviteUser(c)}>
                    </i>
                </div>
                <div className="col-1">
                    <i className="fa fa-edit" onClick={() => this.props.onUpdateChannelName(c)}>
                    </i>
                </div>
                <div className="col-1">
                    {c.ownerId === this.props.currentUser.id &&
                    <i className="fa fa-trash" onClick={() => this.props.onDeleteChannel(c.id)}>
                    </i>
                    }
                </div>
            </div>
        );
        return <div className="container wrapper">
                <div className="row">
                    <div className="col text-right">
                        <button type="submit" className="btn btn-primary" onClick={this.props.onAddChannel}>Add channel</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        &nbsp;
                    </div>
                </div>
                {channels}
            </div>;
    }
}

export { MenuView };