import React from 'react';
import FlightStatus from './components/FlightStatus';
import NotificationSettings from './components/NotificationSettings';

function App() {
    return (
        <div className="App">
            <h1>Flight Status Updates</h1>
            <FlightStatus />
            <NotificationSettings />
        </div>
    );
}

export default App;
