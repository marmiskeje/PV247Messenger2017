import {updateChannelNameAction} from "./updateChannelNameAction";
import {MockNotificationService} from "../../services/NotificationService";
import {MockChannelsService} from "../../services/mock/MockChannelsService";
import {updatedChannelsEvent} from "../../events/updatedChannelsEvent";
import * as Immutable from "immutable";

test('Update channel name action test', () => {
    const channelName = 'success';
    global.prompt = () => channelName;
    let calledWith = null;
    const dispatch = jest.fn().mockImplementation(x => {
        calledWith = x;
    });
    let getState = () => ({
        users: {
            currentUserId: '1',
            allByIds: Immutable.Map().set('1', { id: '1', email: 'test@test.com'}),
            allByEmails: Immutable.Map().set('test@test.com', { id: '1', email: 'test@test.com'})
        },
        currentChannel: {
            messages: Immutable.OrderedMap()
        }
    });

    const dispatchable = updateChannelNameAction({id: 'test', name: channelName, ownerId: '1', memberIds: ['1']}, getState(), MockNotificationService, MockChannelsService);
    dispatchable(dispatch, getState);

    expect(calledWith).toBeDefined();
    expect(dispatch).toHaveBeenCalledWith(updatedChannelsEvent(calledWith.payload.channels));
});