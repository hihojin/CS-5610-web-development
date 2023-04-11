import React, {useState, useEffect } from "react";
import axios from 'axios';
import CatLogo from './assets/cat.svg'
import './CatFacts.css';

// Hyojin Kwak

function CatFacts() {
    const [catData, setData] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function generateCatFact() {
        setIsLoading(true);
        const response = await axios.get('https://catfact.ninja/fact');
        setData(response.data.fact);
        setIsLoading(false);
    }

    // on reloading page, new api request,
    useEffect(() => {
        generateCatFact();
    }, []);

    if (isLoading) {return (<div className="loading-font">Loading...</div>)}

    return (
        <div className="App">
            <div className='catFactsText'>
                {/* The cat fact should be displayed here*/}
                {catData} 
            </div>
            <div>
                <button onClick={generateCatFact} className="catFactBtn">
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
