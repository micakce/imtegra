
const ADIConfigTemplate = (props) => {
  const { abonado, service} = props;
  console.log(service.sites);
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
description ##CLIENTE##${service.service}-${service.plan}Mbps${service.sites.lenght > 0 ? `_Contra ${service.sites}`: ''}
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


const CO_ADIConfigTemplate = (props) => {
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
description ##CLIENTE##Link-to-${service.cmts}
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


export { ADIConfigTemplate, CO_ADIConfigTemplate }
