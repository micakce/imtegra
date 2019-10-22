const serviceBlankState = {
  service: '',
  plan: '',
  medium: '',
  red: '',
  ip: '',
  dg: '',
  mask: '',
  vlan: '',
  ip_mon: '',
  ip_mon_router: '',
  dg_mon: '',
  mask_mon: '',
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
  interface: '',
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

const rogerState = {
    abonado: 4680000,
    name: "Roger SA",
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
    hardware: [
        {
            device: "SG350",
            code: "74500",
            model: "SG350",
            serial: "PSZ430190BY"
        },
        {
            device: "SFP",
            code: "74500",
            model: "OSI-D20K",
            serial: "ZZ1802022"
        },
        {
            device: "PATCH",
            code: "74500",
            model: "5M",
            serial: "171645221"
        }
    ],
    pm: "cmontero",
    im: "rmontilla",
    status: "Creado"
}

const ADIConfigTemplate = (props) => {
    const { abonado, service} = props;
    var output = `conf t
hostname CPE-SG350-${abonado}
username telecentro privilege 15 password Inst4l4c10n3s
username backups privilege 15 password c0rp0backup!
enable password Inst4l4c10n3s
banner login #
!
!
Este sistema es propiedad de Telecentro S.A.
ESTA PROHIBIDO EL ACCESO A PERSONAL NO AUTORIZADO.
Ud. debe  tener permiso explicito para acceder a este
equipo.  Todas las actividades son monitoreadas y re-
gistradas. Cualquier violacion de acceso resultara en
acciones legales.
-----------------------------------------------------
#
ip ssh server
ip ssh-client username telecentro
ip ssh-client password Inst4l4c10n3s
ip access-list extended 152
permit ip 192.168.0.0 0.0.255.255 any
permit ip 10.210.0.0 0.0.255.255 any
deny ip any any
!
vlan 152
!
vlan ${service.vlan}
!
interface vlan 152
name MONITORIA-CPE
ip address ${service.ip_mon} ${service.mask_mon}
!
ip default-gateway ${service.dg_mon}
!
interface gigabitethernet9
no macro auto smartport
description ##CLIENTE##Link-to-HUB-${service.hub}_SW-${service.nexus}(Eth${service.nexus_port})
switchport mode trunk
switchport trunk allowed vlan add 152,${service.vlan}
no macro auto smartport
no shutdown
!
interface gigabitethernet1
description ##CLIENTE##${service.service}-${service.plan}Mbps${service.sites ? `Contra ${service.sites}`: ''}
switchport mode access
switchport access vlan ${service.vlan}
no macro auto smartport
no shutdown
!
interface gigabitethernet2
shutdown
interface gigabitethernet3
shutdown
interface gigabitethernet4
shutdown
interface gigabitethernet5
shutdown
interface gigabitethernet6
shutdown
interface gigabitethernet7
shutdown
interface gigabitethernet8
shutdown
interface vlan 1
shutdown
snmp-server server
snmp-server community TELECENTRO-${abonado} ro view Default
sntp server 192.168.15.74
clock source sntp
clock timezone 1 -3
exit`
    return output
}
export { dangeloState, blankState, serviceBlankState, ADIConfigTemplate };

