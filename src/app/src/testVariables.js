// const blankState = {
//     abonado: "",
//     name: "",
//     telefono: "",
//     email: "",
//     address: {
//         street: "",
//         apto: "",
//         location: "",
//         city: ""
//     },
//     services: [
//         {
//             service: "",
//             speed: "",
//         }
//     ],
//     pm: "",
//     im: "",
//     status: ""
// }

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
    services: [
        {
            name: "",
            speed: "",
            tech: "",
            ip: "",
            mask: "",
            vlan: "",
            ip_mon: "",
            ip_mask: "",
        },
        {
            name: "",
            speed: "",
            tech: "",
            vlan:"",
            type: "",
            contra: "",
            cm: "",
            mac: "",
        },
        {
            name: "",
            type: "",
            tech: "",
            type: "",
            contra: "",
            vlan: "",
            cm: "",
            mac: "",
        },
    ],
    hardware: {
        switch: {
            code: "",
            model: "",
            serial: ""
        },
        sfp: {
            code: "",
            model: "",
            serial: ""
        },
        patch: {
            code: "",
            model: "",
            serial: ""
        }
    },
    pm: "",
    im: "",
    status: ""
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
            name: "ADI",
            speed: "50",
            tech: "FO",
            ip: "180.80.8.2",
            mask: "255.255.255.252",
            vlan: "2152",
            ip_mon: "10.252.1.23",
            ip_mask: "255.255.255.240",
        },
        {
            name: "L2VPN",
            speed: "15",
            tech: "CO",
            vlan:"2122",
            type: "PaP",
            contra: "4545432",
            cm: "FASTV3.1",
            mac: "34.fd.34.df.43.er",
        },
        {
            name: "TTT",
            type: "30/100",
            tech: "CO",
            type: "PaP",
            contra: "4545432",
            vlan: "2152",
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

export { dangeloState, blankState };