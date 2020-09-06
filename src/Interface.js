import React from 'react';
import App from './App';

class Interface extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    submit() {
        alert('Hlllloo0');
    }

    render() {
        return(
            <div className='no-bord'>
                
                <App />
                
            </div>
        )
    }
}

export default Interface;