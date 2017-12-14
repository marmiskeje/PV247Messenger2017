import * as Events from '../../constants/Events';
import * as Immutable from "immutable";

export const usersEventsProcessor = (prevState = { currentUser: null, allByIds: Immutable.Map(), allByEmails: Immutable.Map() }, event) => {
    let newState = prevState;
    const updateCurrentUser = function(state){
        if (state.currentUserId){
            state.currentUser = state.allByIds.get(state.currentUserId);
        }
    };
    switch (event.type){
        case Events.UPDATED_USERS_EVENT:
            newState.allByIds = event.payload.users;
            newState.allByEmails = new Immutable.Map();
            newState.allByIds.valueSeq().forEach(function(u){
                newState.allByEmails = newState.allByEmails.set(u.email, u);
            });
            updateCurrentUser(newState);
            break;
        case Events.UPDATED_USER_EVENT:
            newState.allByIds = newState.allByIds.set(event.payload.user.id, event.payload.user);
            newState.allByEmails = newState.allByEmails.set(event.payload.user.email, event.payload.user);
            updateCurrentUser(newState);
            break;
        case Events.CREATE_SESSION_EVENT:
            newState.currentUserId = event.payload.currentUser.id;
            newState.currentUser = event.payload.currentUser;
            break;
    }
    return newState;
};
