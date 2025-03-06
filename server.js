// Import Express
const express = require('express')

// Create an Express app
const app = express()

// Define routes here:

// 1. Be Polite, Greet the User

app.get('/greetings/:username', (req, res) => {
    const username = req.params.greetings;
    res.send(`Hello there, What a delight to see you again ${username}!`);
});

// 2. Rolling the Dice

app.get('/roll/:number', (req, res) => {
    const rolledDie = req.params.number;

    if (isNaN(rolledDie)) {
        res.send('Please enter a number only.');
    } else {
        const randomNumber = Math.floor(Math.random() * rolledDie)
        res.send(`You rolled a ${randomNumber}!`);
    }
});

// 3. I Want THAT One!

app.get('/collectibles/:index', (req, res) => {
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ];

    if (!Number.isInterger(parseInt(req.params.index)) || parseInt(req.params.index) > (collectibles.length - 1)) {
        res.send('That item isn\'t in stock yet. Check back soon!');
    } else {
        const item = collectibles[req.params.index];
        res.send(`So, you want the ${item.name}? That'll be ${item.price}.`);
    }
});

// 4. Filter Shoes by Query Parameters

app.get('/shoes', (req, res) => {
    const shoes = [
        { name: 'Birkenstocks', price: 50, type: 'sandal' },
        { name: 'Air Jordans', price: 500, type: 'sneaker' },
        { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
        { name: 'Utility Boots', price: 20, type: 'boot' },
        { name: 'Velcro Sandals', price: 15, type: 'sandal' },
        { name: 'Jet Boots', price: 1000, type: 'boot' },
        { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
    ];

    const results = [];

    shoes.forEach((shoe) => {
        if (
            !(req.query['max-price'] && shoe.price > req.query['max-price']) &&
            !(req.query['min-price'] && shoe.price < req.query['min-price']) &&
            !(req.query['type'] && shoe.type !== req.query['type'])
        ) {
            results.push(shoe);
        }
    });
    res.send(results);
});