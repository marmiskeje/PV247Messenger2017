import {addChannelAction} from "./addChannelAction";
import {MockNotificationService} from "../../services/NotificationService";
import {MockChannelsService} from "../../services/mock/MockChannelsService";
import {updatedChannelsEvent} from "../../events/updatedChannelsEvent";
import * as Immutable from "immutable";

test('Add channel action test', () => {
    global.prompt = () => 'success';
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

    const dispatchable = addChannelAction(getState(), MockNotificationService, MockChannelsService);
    dispatchable(dispatch, getState);

    expect(calledWith).toBeDefined();
    expect(dispatch).toHaveBeenCalledWith(updatedChannelsEvent(calledWith.payload.channels));
});