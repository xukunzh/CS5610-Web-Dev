import React, { createContext, useState } from 'react';

export const CountContext = createContext();

export function CountProvider({ children }) {
    // Use set to store the ids of Active Cells
    const [cells, setCells] = useState(new Set());

    const updateCount = (id, isActive) => {
        setCells(prev => {
            const newCells = new Set(prev);
            if (isActive) {
                newCells.add(id);
            } else {
                newCells.delete(id);
            }
            return newCells;
        });
    };

    return (
        <CountContext.Provider value={{ 
            blackCellCount: cells.size, 
            updateCount 
        }}>
            {children}
        </CountContext.Provider>
    );
}