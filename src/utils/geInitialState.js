import * as keys from '../constants/LocalStorageKeys';
import * as Immutable from 'immutable';

const token = localStorage.getItem(keys.TOKEN);
const currentUserId = localStorage.getItem(keys.CURRENT_USER_ID);
// USER_VIEW_MODEL: { id: firstId, email: 'test@test.com', nickname: 'Test User', pictureUrl: 'http://test.com/test.jpg' }
// CHANNEL_VIEW_MODEL: { id: firstId, name: 'Channel 1', ownerId: firstId, memberIds: [firstId, secondId] }
// MESSAGE_VIEW_MODEL: { id: firstId, createdBy: firstId, createdAt: new Date('2017-12-12T20:52:21.903Z'), updatedBy: firstId, updatedAt: new Date('2017-12-12T20:52:21.903Z'), text: 'Message text', rate: 1 }
export const getInitialState = () => ({
    shared: {
        token: token
    },
    users: {
        currentUserId: currentUserId,
        currentUser: { nickname: '', email: '', pictureUrl: ''},
        allByIds: Immutable.Map(),
        allByEmails: Immutable.Map()
    },
    channels: Immutable.OrderedMap(),
    currentChannel: {
        id: null,
        messages: Immutable.OrderedMap()
    }
});
