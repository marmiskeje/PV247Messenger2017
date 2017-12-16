import { combineReducers } from 'redux';
import { sharedEventsProcessor } from './sharedEventsProcessor.js';
import {channelsEventsProcessor} from './channelsEventsProcessor.js';
import {usersEventsProcessor} from "./usersEventsProcessor";
import {currentChannelEventsProcessor} from "./currentChannelEventsProcessor";

export const app = combineReducers({
    shared: sharedEventsProcessor,
    channels: channelsEventsProcessor,
    users: usersEventsProcessor,
    currentChannel: currentChannelEventsProcessor
});
