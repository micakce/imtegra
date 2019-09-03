const express = require('express');
const router = express.Router();

const Client = require('../models/client.js')

// router.get('/', (req, res) => {
//     // res.send('Hola desde /');
//     res.json({status: "API is good for it, from /"});
// });

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/clients', async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
});

router.get('/clients/search/:id', async (req, res) => {
    const client = await Client.findOne({ abonado: req.params.id });
    res.json(client);
});

router.get('/clients/:id', async (req, res) => {
    const client = await Client.findById(req.params.id);
    res.json(client);
});

router.post('/clients', async (req, res) => {
    const { abonado, name, email, telefono, address, services, pm, im, status } = req.body;
    const client = new Client({ abonado, name, email, telefono, address, services, pm, im, status });
    await client.save();
    res.json(client);
});

router.put('/clients/:id', async (req, res) => {
    const { abonado, name, email, telefono, address, services, pm, im, status } = req.body;
    const newClient = { abonado, name, email, telefono, address, services, pm, im, status };
    await Client.findByIdAndUpdate(req.params.id, newClient);
    res.json(newClient);
});

router.delete('/clients/:id', async (req, res) => {
    await Client.findByIdAndDelete(req.params.id);
    res.send(`Client ${req.body.name} was deleted succesfully`)
});

router.put('/clients/service/:id', async (req, res) => {
    const { service, plan, red, ip, dg, mask, vlan } = req.body;
    const newService = { service, plan, red, ip, dg, mask, vlan };
    await Client.findOneAndUpdate({ abonado: req.body.id }, { $push: { services: newService}  });
    res.json();
});

module.exports = router;