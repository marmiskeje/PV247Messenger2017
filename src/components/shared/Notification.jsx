import * as React from 'react';
import { ToastContainer } from 'react-toastify';

class Notification extends React.Component {
    render(){
        return (
            <div>
                <ToastContainer />
            </div>
        );
    }
}

export { Notification };