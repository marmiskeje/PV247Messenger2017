import {createMessageAction} from "./createMessageAction";
import {MockNotificationService} from "../../services/NotificationService";
import {MockMessagesService} from "../../services/mock/MockMessagesService";
import {newMessageCreatedEvent} from "../../events/newMessageCreatedEvent";
import * as Immutable from "immutable";

test('Create message action test', () => {
    let calledWith = null;
    const dispatch = jest.fn().mockImplementation(x => {
        calledWith = x;
    });
    let getState = () => ({
        users: {
            allByIds: Immutable.Map().set('1', { id: '1', email: 'test@test.com'}),
            allByEmails: Immutable.Map().set('test@test.com', { id: '1', email: 'test@test.com'})
        },
        currentChannel: {
            messages: Immutable.OrderedMap()
        }
    });

    const dispatchable = createMessageAction('ChannelId', 'success', getState(), MockNotificationService, MockMessagesService);
    dispatchable(dispatch, getState);

    expect(calledWith).toBeDefined();
    expect(dispatch).toHaveBeenCalledWith(newMessageCreatedEvent(calledWith.payload.message));
});