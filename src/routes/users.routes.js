const express = require('express');
const router = express.Router();

const Client = require('../models/client.js')

router.get('/', (req, res) => {
    // res.send('Hola desde /');
    res.json({status: "API is good for it, from /"});
});

router.get('/clients', async (req, res) => {
    const clients = await Client.find();
    res.json(clients)
});

router.post('/clients', async (req, res) => {
    const { abonado, name, address, services } = req.body;
    const client = new Client({ abonado, name, address, services })
    await client.save()
    res.json({status: "Task saved"});
});

router.put('/clients/:id', async (req, res) => {
    const { abonado, name, address, services } = req.body;
    const newClient = { abonado, name, address, services };
    Task.findByIdAndUpdate(req.params.id, newClient);
    res.send(newClient);
});



module.exports = router;
// const Client = require('../models/client.js')


