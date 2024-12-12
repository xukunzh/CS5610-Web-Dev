import axios from 'axios';
import CatLogo from './assets/cat.svg'
import './CatFacts.css';
import { useState, useEffect } from 'react';

// insert your name here
// Xukun Zhang

function CatFacts() {
    // you may need to add other code elsewhere!
    // State to store the current cat fact and loading status
    const [catFact, setCatFact] = useState('Loading...');
    const [isLoading, setIsLoading] = useState(true);

   // Function to fetch a cat fact from the API
    const generateCatFact = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://catfact.ninja/fact');
            setCatFact(response.data.fact);
        } catch (error) {
            console.error('Error fetching cat fact:', error);
            setCatFact('Failed to fetch cat fact. Please try again!');
        }
        setIsLoading(false);
    };

    // Fetch a fact when the component mounts
    useEffect(() => {
        generateCatFact();
    }, []);

    return (
        <div className="App">
            <div className='catFactsText'>
                {isLoading ? 'Loading...' : catFact}
            </div>
            <div>
                <button onClick={generateCatFact} className="catFactBtn" disabled={isLoading}>
                    Click me for a cat fact!
                </button>
            </div>
            <div>
                <img src={CatLogo} className="catFactImg" />
            </div>
        </div>
    )
}

export default CatFacts
