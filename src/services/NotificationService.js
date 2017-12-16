import { toast } from 'react-toastify';

class NotificationServiceImplementation {

    show(message, severity) {
        let method = toast.info;
        switch (severity){
            case 'success':
                method = toast.success;
                break;
            case 'warning':
                method = toast.warn;
                break;
            case 'error':
                method = toast.error;
                break;
        }
        method(message);
    }
}

class MockNotificationServiceImplementation {

    show(message, severity) {
        return console.log(`Mock notification - Severity: ${severity}. Message: ${message}`);
    }
}

export const NotificationService = new NotificationServiceImplementation();
export const MockNotificationService = new MockNotificationServiceImplementation();