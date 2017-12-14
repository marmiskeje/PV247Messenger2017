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
            <p key={m.id}>
                <img alt={users.get(m.createdBy).nickname || users.get(m.createdBy).email} src={users.get(m.createdBy).pictureUrl ? users.get(m.createdBy).pictureUrl : noProfileImg} style={{width: "30px", height: "30px"}} />
                <span>{users.get(m.createdBy).nickname || users.get(m.createdBy).email}</span><br />
                <span>{m.text}</span>
                {m.createdBy === this.props.currentUser.id &&
                <button type="submit" className="btn" onClick={() => this.props.onDeleteMessage(this.props.currentChannel.id, m.id)}>X</button>
                }
                {m.createdBy !== this.props.currentUser.id &&
                <button type="submit" className="btn" onClick={() => this.props.onVoteMessage(this.props.currentChannel.id, m.id, m.rate - 1)}>-</button>
                }
                <span>{m.rate}</span>
                {m.createdBy !== this.props.currentUser.id &&
                <button type="submit" className="btn" onClick={() => this.props.onVoteMessage(this.props.currentChannel.id, m.id, m.rate + 1)}>+</button>
                }
            </p>
        );
        return <div>
            {messages}
            {this.props.currentChannel.id &&
                <div>
                <textarea value={this.state.messageText} onChange={(e) => this.setState({messageText: e.target.value})}>

                </textarea>
                    <button type="submit" className="btn btn-primary" disabled={this.state.messageText === ""}
                            onClick={this.createMessageHandler}>Send
                    </button>
                </div>
            }
        </div>;
    }
}

export { MessagesView };