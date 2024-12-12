import React, { useContext } from 'react';
import { CountContext } from './CountContext';
import Cell from './Cell';

function Grid() {
    const { blackCellCount } = useContext(CountContext);

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Count: {blackCellCount}
            </h1>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 100px)', 
                gap: '5px' 
            }}>
                 <Cell id={0} />
                <Cell id={1} />
                <Cell id={2} />
                <Cell id={3} />
            </div>
        </div>
    );
}

export default Grid;