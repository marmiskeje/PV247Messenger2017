class MockMessageServiceImplementation{

    createMessage(channelId, message, onSuccess, onError){
        if (message.value === "success") {
            const newMessage = JSON.parse(JSON.stringify(message)); // create copy
            newMessage.id = 'mock';
            newMessage.createdBy = 'test@test.com';
            newMessage.createdAt = '2017-12-12T20:52:21.903Z';
            newMessage.updatedBy = 'test@test.com';
            newMessage.updatedAt = '2017-12-12T20:52:21.90;3Z';
            onSuccess(newMessage);
        } else {
            onError({});
        }
    }

}

export const MockMessagesService = new MockMessageServiceImplementation();