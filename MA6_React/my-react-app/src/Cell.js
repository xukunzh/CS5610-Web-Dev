import React, { useContext, useState } from 'react';
import { CountContext } from './CountContext';

function Cell({ id }) {
    const { updateCount } = useContext(CountContext);
    const [isOn, setIsOn] = useState(false);

    const handleClick = () => {
        setIsOn(prevIsOn => {
            const newState = !prevIsOn;
            updateCount(id, newState);
            return newState;
        });
    };

    return (
        <div
            onClick={handleClick}
            style={{
                width: '100px',
                height: '100px',
                backgroundColor: isOn ? 'black' : 'white',
                border: '1px solid grey',
                display: 'inline-block',
                cursor: 'pointer'
            }}
        />
    );
}

export default Cell;
