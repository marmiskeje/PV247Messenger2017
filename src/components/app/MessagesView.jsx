import * as React from 'react';
import * as PropTypes from 'prop-types';
import noProfileImg from '../../../static/assets/no-profile.png';

class MessagesView extends React.Component {
    static propTypes = {
        messages: PropTypes.any.isRequired,
        users: PropTypes.any.isRequired,
        currentUser: PropTypes.any.isRequired,
        currentChannel: PropTypes.any.isRequired,
        onCreateMessage: PropTypes.func.isRequired,
        onDeleteMessage: PropTypes.func.isRequired,
        onVoteMessage: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        this.state = { messageText: ''};
        this.createMessageHandler = this.createMessageHandler.bind(this);
    }

    createMessageHandler(){
        this.props.onCreateMessage(this.props.currentChannel.id, this.state.messageText);
        this.setState({ messageText: '' });
    }

    render() {
        const users = this.props.users;
        const messages = this.props.messages.valueSeq().map(m =>
            <div className="messenger-message" key={m.id}>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-6">
                            <img className="messenger-user-picture" alt={users.get(m.createdBy).nickname || users.get(m.createdBy).email} src={users.get(m.createdBy).pictureUrl ? users.get(m.createdBy).pictureUrl : noProfileImg} />
                            <span className="messenger-user-nickname">{users.get(m.createdBy).nickname || users.get(m.createdBy).email}</span>
                        </div>
                        <div className="col-6 text-right">
                            <span>{m.createdAt.toLocaleDateString() + " " + m.createdAt.toLocaleTimeString()}</span>
                            <div className="hor-separator">
                            </div>
                            {m.createdBy !== this.props.currentUser.id &&
                            <i className="fa fa-minus-square fa-lg" onClick={() => this.props.onVoteMessage(this.props.currentChannel.id, m.id, m.rate - 1)}>
                            </i>
                            }
                            <span className="messenger-message-rate">{m.rate}</span>
                            {m.createdBy !== this.props.currentUser.id &&
                            <i className="fa fa-plus-square fa-lg" onClick={() => this.props.onVoteMessage(this.props.currentChannel.id, m.id, m.rate + 1)}>
                            </i>
                            }
                            {m.createdBy === this.props.currentUser.id &&
                            <i className="fa fa-trash fa-lg" onClick={() => this.props.onDeleteMessage(this.props.currentChannel.id, m.id)}>
                            </i>
                            }
                        </div>
                    </div>
                    <div className={"row messenger-message-text align-items-center" + (m.createdBy === this.props.currentUser.id ? " messenger-message-text-own" : "")}>
                        <div className="col">
                            <span>{m.text}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
        return <div className="container-fluid h-100">
            <div className="row">
                <div className="col text-center">
                    <h3>{this.props.currentChannel.name}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col messenger-messages-area pre-scrollable">
                    {messages}
                </div>
            </div>
            {this.props.currentChannel.id &&
                <div className="row send-message-area">
                    <div className="col-10">
                        <textarea value={this.state.messageText} onChange={(e) => this.setState({messageText: e.target.value})}>
                        </textarea>
                    </div>
                    <div className="col-2">
                        <button type="submit" className="btn btn-primary" disabled={this.state.messageText === ""}
                                onClick={this.createMessageHandler}>Send
                        </button>
                    </div>
                </div>
            }
        </div>;
    }
}

export { MessagesView };