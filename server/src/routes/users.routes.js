const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");

const Client = require("../models/client");
const Service = require("../models/service");
const User = require("../models/user");
// const Hardware = require('../models/hardware');

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ auth: false, message: "Email o constraseña incorrecto" });
  }
  const validPassword = await user.validatePassword(password);
  if (!validPassword) {
    return res.status(404).json({
      auth: false,
      token: null,
      message: "Email o constraseña incorrecto",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  res.json({ auth: true, role: user.role, token });
});

router.post("/signup", verifyToken, async (req, res) => {
  const test_user = await User.findOne({ username: req.body.username });
  if (test_user) {
    return res.status(401).json({ message: "User already exists" });
  }
  const { name, lastname, username, email, password, role } = req.body;
  const user = new User({
    name,
    lastname,
    username,
    email,
    password,
    role,
  });
  user.password = await user.encryptPassword(user.password);

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24,
    }
  );

  await user.save();

  console.log(user);
  console.log(token);
  res.json({ auth: true, role: user.role, token });
});

router.get("/token_test", verifyToken, (req, res) => {
  res.json({ user: req.userId, meesage: "Pasa el verify" });
});

router.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
});

router.get("/clients/all", verifyToken, async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

router.get("/clients/check/:abonado", verifyToken, async (req, res) => {
  const client = await Client.findOne({ abonado: req.params.abonado });
  console.log(client, "desde router.js 93");
  if (client) {
    res.json({ valid: true });
  }
  res.json({ valid: false });
});

router.get("/clients/implementacion", verifyToken, async (req, res) => {
  const clients = await Client.find({ status: "Implementacion" });
  res.json(clients);
});

router.get("/clients/:id", verifyToken, async (req, res) => {
  const client = await Client.findOne({ abonado: req.params.id });
  res.json(client);
});

router.get("/clients/:id", verifyToken, async (req, res) => {
  const client = await Client.findById(req.params.id);
  res.json(client);
});

router.post("/clients", verifyToken, async (req, res) => {
  // const { abonado, name, email, telefono, address, services, pm, im, status } = req.body;
  // const client = new Client({ abonado, name, email, telefono, address, services, pm, im, status });
  const clientExists = await Client.findOne({abonado: req.body.abonado});
  if (clientExists) {
    return res.status(403).json({ message: "Client already exists" })
  }
  const client = new Client({ ...req.body });
  await client.save();
  return res.json(client);
});

router.put("/clients/:id", verifyToken, async (req, res) => {
  const {
    abonado,
    name,
    email,
    telefono,
    address,
    services,
    pm,
    im,
    status,
  } = req.body;
  const newClient = {
    abonado,
    name,
    email,
    telefono,
    address,
    services,
    pm,
    im,
    status,
  };
  await Client.findByIdAndUpdate(req.params.id, newClient);
  res.json(newClient);
});

router.delete("/clients/:id", verifyToken, async (req, res) => {
  // const { client_id, service_id, what } = req.body;
  // if (what) {
  //   await Client.findByIdAndUpdate(client_id, {
  //     $pull: {
  //       services: { _id: service_id },
  //     },
  //   });
  //   res.json({ message: `Service ${req.body.name} was deleted succesfully` });
  // } else {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: `Client ${req.body.abonado} was deleted succesfully` });
});

router.put("/clients/service/:id", verifyToken, async (req, res) => {
  const newService = new Service(req.body);
  await Client.findOneAndUpdate(
    { abonado: req.params.id },
    { $push: { services: newService } }
  );
  res.send("Servicio agregado!");
});

router.put("/clients/service/edit/:id", verifyToken, async (req, res) => {
  const newService = new Service(req.body);
  Client.findOne({ abonado: req.params.id }, function (err, client) {
    var service = client.services.id(req.body._id);
    service.set(newService);

    client
      .save()
      // eslint-disable-next-line no-unused-vars
      .then(function (savedService) {
        res.json({ message: "Servicio editado!" });
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });
});

router.delete(
  "/clients/:abonado/service/:id",
  verifyToken,
  async (req, res) => {
    const { abonado, id } = req.params;
    const client = await Client.findOne({ abonado });
    client.services.id(id).remove();
    await client.save();
    res.send("Service Deleted");
  }
);

router.put("/clients/device/:id", verifyToken, async (req, res) => {
  const { device, model, code, serial, description } = req.body;
  const newDevice = { device, model, code, serial, description };
  const response = await Client.findOneAndUpdate(
    { abonado: req.params.id },
    { $push: { hardware: newDevice } }
  );
  res.send(response);
});

router.put("/clients/device/edit/:id", verifyToken, async (req, res) => {
  const { device, model, code, idx, serial, description } = req.body;
  const newDevice = { device, model, code, serial, description };
  const client = await Client.findOne({ abonado: req.params.id });
  client.hardware[idx] = newDevice;
  await client.save();
  res.json(client);
});

router.get("/clients/:abonado/service/:id", verifyToken, async (req, res) => {
  const { abonado, id } = req.params;
  const client = await Client.findOne({ abonado });
  const service = client.service.id(id)
  res.json({client, service})
});

router.delete("/clients/:abonado/device/:id", verifyToken, async (req, res) => {
  const { abonado, id } = req.params;
  const client = await Client.findOne({ abonado });
  client.hardware.id(id).remove();
  await client.save();
  res.send("Device Deleted correctamente");
});

module.exports = router;
