function rollDice(input) {
    const [numDice, numSides] = input.toLowerCase().split('d').map(Number);

    if (isNaN(numDice) || isNaN(numSides)) {
        return 'Invalid input format. Use the format NdM, e.g., 3d6.';
    }
    
    if (numDice < 1 || numDice > 100) {
        return 'The number of dice should be between 1 and 100.';
    }
    
    if (numSides < 2 || numSides > 100) {
        return 'The number of sides should be between 2 and 100.';
    }

    let total = 0;
    for (let i = 0; i < numDice; i++) {
        total += Math.floor(Math.random() * numSides) + 1;
    }

    return total;
}

console.log(rollDice('3d6'));

