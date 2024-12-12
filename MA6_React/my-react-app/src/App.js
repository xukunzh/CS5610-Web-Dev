import React from 'react';
import Grid from './Grid';
import { CountProvider } from './CountContext';

function App() {
    return (
        <CountProvider>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                marginTop: '20px' 
            }}>
                <Grid />
            </div>
        </CountProvider>
    );
}

export default App;