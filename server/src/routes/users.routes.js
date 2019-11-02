const express = require('express');
const router = express.Router();

const Client = require('../models/client');
const Service = require('../models/service');
const Hardware = require('../models/hardware');

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/clients', async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

router.get('/clients/implementacion', async (req, res) => {
  const clients = await Client.find({status: 'Implementacion'});
  res.json(clients);
});

router.get('/clients/client/:id', async (req, res) => {
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
  const { client_id , service_id, what} = req.body
  if (what) {
    await Client.findByIdAndUpdate( client_id, {
      $pull: {
        services: { _id: service_id }
      }
    });
    res.send(`Service ${req.body.name} was deleted succesfully`)
  } else {
    await Client.findByIdAndDelete(req.params.id);
    res.send(`Client ${req.body.name} was deleted succesfully`)
  }
});

router.put('/clients/service/:id', async (req, res) => {
  const newService = new Service(req.body);
  await Client.findOneAndUpdate({ abonado: req.params.id }, { $push: { services: newService } });
  res.send("Servicio agregado!");
});

router.put('/clients/service/edit/:id', async (req, res) => {
  const newService = new Service(req.body);
  Client.findOne(
    { abonado: req.params.id},
    function (err, client) {
      var service = client.services.id(req.body._id)
      service.set(newService)

      client.save().then(function(savedService) {
        res.json({ message: "Servicio editado!" });
      })
        .catch(function(err) {
          res.status(500).send(err);
        })

    }
  );
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
