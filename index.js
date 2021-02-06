const bodyParser = require('body-parser')
const express = require('express')
const bod = require('body-Parser')
const app = express()
const mongoose = require('mongoose');
const Country = require('./models/country');
const { json } = require('body-parser');

app.use(bod.json())

mongoose.connect('mongodb+srv://infoplus:12345@cluster0.kc09o.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

var produits = [{ ref: '1A2', designation: 'imprimante', prix: 900 }]

app.post('/', async (req, res) => {
    let newCountry = req.body.country;
    await Country.create(newCountry)
        .then(addedDocument => {
            res.json(addedDocument)
        })
        .catch(error => {
            res.send(error)
        })
})
app.listen(5000, () => {
    console.log('server mrigel wel port mrigel', 5000)
})
app.put('/:identifiant', async (req, res) => {
    let identifiant = req.params.identifiant;
    let updateBody = req.body.country;

    await Country.findByIdAndUpdate(identifiant, updateBody)
        .then(updatedDoc => {
            res.json(updatedDoc)
        })
        .catch(error => {
            res.send(error)
        })
})

app.delete('/:id', async (req, res) => {
    let id = req.params.id
    await Country.findByIdAndDelete(id)
        .then(deltedDoc => {
            res.json(deltedDoc)
        })
        .catch(error => {
            res.send(error)
        })
})
app.get('/', async (req, res) => {
    await Country.find({})
        .then(docs => {
            res.json(docs)
        })
        .catch(error => {
            res.send(error)
        })
})