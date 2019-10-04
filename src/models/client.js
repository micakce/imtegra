const mongoose = require('mongoose');

const { Schema } = mongoose;

const ServiceSchema = new Schema({
    service: { type: String, required: true },
    plan: { type: String, required: true },
    medium: String,
    red: String,
    ip: String,
    dg: String,
    mask: String,
    vlan: String,
    ip_mon: String,
    ip_mon_router: String,
    dg_mon: String,
    mask_mon: String,
    vlan_mon: { type: String, default: '152' },
    lan_red: String,
    lan_ip: String,
    lan_dg: String,
    lan_mask: String,
    mode: String,
    sites: String,
    device: String,
    device_router: String,
    nhead: String,
    ntale: String,
    hub: { type: String, uppercase: true },
    obra: { type: String, uppercase: true },
    rack: String,
    patchera: String,
    position: String,
    nexus: { type: String, default: 'N93180-' },
    nexus_port: String,
    dist: String,
    att: String,
    cmts: { type: String, uppercase: true },
    mac: { type: String, uppercase: true },
    interface: String,
    interface_router: String,
    pm: String,
    im: String,
    status: { type: String, default: 'Init' },
    date: { type: Date, default: Date.now }
});

const HardwareSchema = new Schema({
    device: String,
    model: String,
    code: String,
    serial: String,
    description: String,
    date: { type: Date, default: Date.now }
})

const ClientSchema = new Schema({
    abonado: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String },
    telefono: { type: String },
    address: {
        street: String,
        apto: String,
        location: String,
        city: String,
    },
    services: [ServiceSchema],
    hardware: [HardwareSchema],
    status: { type: String, default: 'Implementacion' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', ClientSchema);
