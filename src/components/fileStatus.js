import React, { useEffect, useState } from 'react';
import { socket } from '../socket';

const FlightStatus = () => {
    const [status, setStatus] = useState({});

    useEffect(() => {
        socket.on('flightStatus', (data) => {
            setStatus(data);
        });
        return () => socket.disconnect();
    }, []);

    return (
        <div>
            <h2>Flight Status</h2>
            <p>Status: {status.current}</p>
            <p>Gate: {status.gate}</p>
        </div>
    );
};

export default FlightStatus;
