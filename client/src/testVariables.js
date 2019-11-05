const serviceBlankState = {
  service: '',
  plan: '',
  medium: '',
  red: '',
  ip: '',
  dg: '',
  mask: '',
  vlan: '',
  ip_mon: '10.252.',
  ip_mon_router: '10.252',
  dg_mon: '10.252',
  mask_mon: '255.255.255.',
  vlan_mon: '152',
  lan_red: '',
  lan_ip: '',
  lan_dg: '',
  lan_mask: '',
  mode: '',
  sites: {hub: '', spokes: ''},
  device: '',
  device_router: '',
  nhead: '112120',
  ntale: '112120',
  hub: '',
  obra: '',
  rack: '',
  patchera: '',
  position: '',
  nexus: 'N93180-',
  nexus_port: '',
  dist: '',
  att: '',
  cmts: '',
  mac: '',
  interface: 'G1',
  interface_router: '',
  pm: '',
  im: '',
  status: 'Init',
};

const blankState = {
    abonado: "",
    name: "",
    telefono: "",
    email: "",
    address: {
        street: "",
        apto: "",
        location: "",
        city: ""
    },
    services: [],
    hardware: [],
    pm: "",
    im: "",
    status: "Implementacion",
    validation: {
        abonado: { valid: false, invalid: false, message: '', editable: true }
    },
    hideEditButton: true
}

const dangeloState = {
    abonado: 4681829,
    name: "Dangelo SA",
    telefono: "(011) 58160533",
    email: "dguanipa@telecentro.net.ar",
    address: {
        street: "Mendoza 2152",
        apto: "1B",
        location: "Belgrano",
        city: "CABA"
    },
    services: [
        {
            service: "ADI",
            plan: "50",
            tech: "FO",
            red: "180.80.8.0/30",
            ip: "180.80.8.1",
            dg: "180.80.8.2",
            mask: "255.255.255.252",
            vlan: "2152",
            ip_mon: "10.252.1.23",
            dg_mon: "10.252.1.30",
            mask_mon: "255.255.255.240",
            vlan_mon: "152" //default 152
        },
        {
            service: "L2VPN",
            plan: "15",
            tech: "CO",
            vlan: "2122",
            type: "PaP",
            contra: "4545432",
            cm: "FASTV3.1",
            mac: "34.fd.34.df.43.er",
        },
        {
            service: "TTT",
            plan: "30/100",
            tech: "CO",
            red: "180.80.8.0/30",
            ip: "180.80.8.1",
            dg: "180.80.8.2",
            mask: "255.255.255.252",
            vlan: "2152",
            head: 1121200000,
            tale: 1121200099,
            cm: "FASTV3.1",
            mac: "34.fd.34.df.43.er",
        },
    ],
    hardware: {
        switch: {
            code: "74500",
            model: "SG350",
            serial: "PSZ430190BY"
        },
        sfp: {
            code: "74500",
            model: "OSI-D20K",
            serial: "ZZ1802022"
        },
        patch: {
            code: "74500",
            model: "5M",
            serial: "171645221"
        }
    },
    pm: "cmontero",
    im: "rmontilla",
    status: "Creado"
}


export { dangeloState, blankState, serviceBlankState };

