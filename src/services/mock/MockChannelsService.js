class MockChannelsServiceImplementation{

    addChannel(channel, onSuccess, onError){
        if (channel.name === 'success'){
            onSuccess({ channels: [{id: 'mock', name: channel.name, customData: channel.customData}]});
        } else {
            onError({});
        }
    }

    updateChannel(channel, onSuccess, onError){
        if (channel.name === 'success'){
            onSuccess({ channels: [{id: 'mock', name: channel.name, customData: channel.customData}]});
        } else {
            onError({});
        }
    }

    removeChannel(channelId, onSuccess, onError){
        if (channelId === 'success'){
            onSuccess({ channels: []});
        } else {
            onError({});
        }
    }

}

export const MockChannelsService = new MockChannelsServiceImplementation();