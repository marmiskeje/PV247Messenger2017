import { combineReducers } from 'redux';
import { sharedEventsProcessor } from './shared/sharedEventsProcessor.js';
import {channelsEventsProcessor} from './shared/channelsEventsProcessor.js';
import {usersEventsProcessor} from "./shared/usersEventsProcessor";
import {currentChannelEventsProcessor} from "./shared/currentChannelEventsProcessor";

export const app = combineReducers({
    shared: sharedEventsProcessor,
    channels: channelsEventsProcessor,
    users: usersEventsProcessor,
    currentChannel: currentChannelEventsProcessor
});
