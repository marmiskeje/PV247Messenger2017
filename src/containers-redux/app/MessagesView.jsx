import { connect } from 'react-redux';
import { MessagesView } from '../../components/app/MessagesView.jsx';
import * as Immutable from 'immutable';
import {createMessageAction} from "../../actions/app/createMessageAction";
import {removeMessageAction} from "../../actions/app/removeMessageAction";
import {voteMessageAction} from "../../actions/app/voteMessageAction";

const mapDispatchToProps = (dispatch) => ({
    onCreateMessage: (channelId, text) => dispatch(createMessageAction(channelId, text)),
    onDeleteMessage: (channelId, messageId) => dispatch(removeMessageAction(channelId, messageId)),
    onVoteMessage: (channelId, messageId, newRate) => dispatch(voteMessageAction(channelId, messageId, newRate))
});

const mapStateToProps = (state) => ({
    messages: state.currentChannel.messages || Immutable.OrderedMap(),
    users: state.users.allByIds || Immutable.Map(),
    currentUser: state.users.currentUser,
    currentChannel: state.currentChannel
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(MessagesView);

export { connectedComponent as MessagesView };
