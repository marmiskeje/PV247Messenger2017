import { connect } from 'react-redux';
import { MenuView } from '../../components/app/MenuView.jsx';
import * as Immutable from 'immutable';
import {addChannelAction} from '../../actions/app/addChannelAction';
import {updateChannelNameAction} from '../../actions/app/updateChannelNameAction';
import {removeChannelAction} from '../../actions/app/removeChannelAction';
import {selectChannelAction} from "../../actions/app/selectChannelAction";
import {inviteUserToChannelAction} from "../../actions/app/inviteUserToChannelAction";


const mapDispatchToProps = (dispatch) => ({
    onAddChannel: () => dispatch(addChannelAction()),
    onUpdateChannelName: channel => dispatch(updateChannelNameAction(channel)),
    onDeleteChannel: channelId => dispatch(removeChannelAction(channelId)),
    onChannelSelected: channel => dispatch(selectChannelAction(channel)),
    onInviteUser: channel => dispatch(inviteUserToChannelAction(channel))
});

const mapStateToProps = (state) => ({
    channels: state.channels || Immutable.Map(),
    currentUser: state.users.currentUser
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(MenuView);

export { connectedComponent as MenuView };
