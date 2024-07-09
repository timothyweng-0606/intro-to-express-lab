const express = require('express')

const app = express()

app.get('/greetings/:username', (req, res) => {
    res.send(`<h1>Hello there,${req.params.username}!</h1>`)
})

app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number, 10)
    if(isNaN(number)){
        res.send(`<h1>You must specify a number</h1>`)
    }
    else{
        res.send(`<h1>You rolled a ${number}</h1>`)
    }
})

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10)
    if(collectibles[index]){
        let goods = collectibles[index]
        res.send(`<h1>So you want the ${goods.name}? For ${goods.price}, it can be yours!</h1>`)
    }
    else{
        res.send(`<h1>The item is not yet in stock.Check back soon!</h1>`)
    }
})

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query

    let filteredShoes = shoes

    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice))
    }

    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice))
    }

    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type)
    }

    res.json(filteredShoes)
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
  })