const express = require('express');
const router = express.Router();

const Client = require('../models/client.js')
// const Device = require('../models/client')

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
    // const { service, plan, red, ip, dg, mask, vlan, vlan_mon, medium, ip_mon, dg_mon, mask_mon, sites, mode, device, nhead, ntale, hub, cmts, mac } = req.body;
    // const newService = { hub, cmts, mac, service, plan, red, ip, dg, mask, vlan, vlan_mon, medium, ip_mon, dg_mon, mask_mon, sites, mode, device, nhead, ntale };
    const newService = { ...req.body };
    const response = await Client.findOneAndUpdate({ abonado: req.params.id }, { $push: { services: newService } });
    res.send(response);
});

router.put('/clients/service/edit/:id', async (req, res) => {
    // const { idx, service, plan, red, ip, dg, mask, vlan, vlan_mon, medium, ip_mon, dg_mon, mask_mon, sites, mode, device, nhead, ntale, hub, cmts, mac } = req.body;
    // const newService = { service, plan, red, ip, dg, mask, vlan, vlan_mon, medium, ip_mon, dg_mon, mask_mon, sites, mode, device, nhead, ntale, hub, cmts, mac };
    const { idx } = req.body;
    const newService = { ...req.body };
    const client = await Client.findOne({ abonado: req.params.id });
    client.services[idx] = newService;
    await client.save();
    res.json(client);
});

router.delete('/clients/service/:id', async (req, res) => {
    const client = await Client.findOne({ abonado: req.body.abonado })
    client.services.id(req.params.id).remove();
    await client.save();
    res.send("Service Deleted");
});

router.put('/clients/device/:id', async (req, res) => {
    const { device, model, code, serial, description } = req.body;
    const newDevice = { device, model, code, serial, description };
    const response = await Client.findOneAndUpdate({ abonado: req.params.id }, { $push: { hardware: newDevice } });
    res.send(response);
});

router.put('/clients/device/edit/:id', async (req, res) => {
    const { device, model, code, idx, serial, description } = req.body;
    const newDevice = { device, model, code, serial, description };
    const client = await Client.findOne({ abonado: req.params.id });
    client.hardware[idx] = newDevice;
    await client.save();
    res.json(client);
});

router.delete('/clients/device/:id', async (req, res) => {
    const client = await Client.findOne({ abonado: req.body.abonado })
    client.hardware.id(req.params.id).remove();
    await client.save();
    res.send("Service Deleted");
});

module.exports = router;