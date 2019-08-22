const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hola tu como estas?")
});

// const Client = require('../models/client.js')


