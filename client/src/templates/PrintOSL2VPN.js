import React, {useRef, Component} from 'react';
import ReactToPrint from 'react-to-print';
import { Button } from 'react-bootstrap';
import Logo from './logoTLC.jpg';

function getCode(model) {
  switch(model) {
    case "SG350":
      return "49203";
    case "C881":
      return "49095";
    case "D20Km":
      return "70315";
    case "FO":
      return "47057";
    case "UTP":
      return "";
    default:
      return "";
  }
}


class PrintOS extends Component {

  render(){

    const { abonado,  clientName, clientAddress, service, hardware  } = this.props;
    let d = new Date();

    return (
      <div style={{fontSize:"16px", marginTop:"30px", textAlign:"justify"}} >
        <table style={{margin:"auto", width:"80%"}} ><tbody><tr>
          <td><img src={Logo} alt="TLC Logo" width="150"/></td>
          <td style={{textAlign:"right"}}><b>N° VISITA:.....</b></td>
        </tr></tbody></table>
        <br/>
        <br/>
        <br/>
        <table style={{margin:"0px 0px 0px 100px", width:"80%", fontSize:"17px"}} >
          <tbody>
            <tr style={{marginTop:"30px"}}>
              <td colspan="2">
                <b>
                  ORDEN DE INSTALACION / SERVICE
                </b>
              </td>
            </tr>
            <tr>
              <td>Abonado: {abonado}</td>
            </tr>
            <tr>
              <td>Razon Social: {clientName} </td>
            </tr>
            <tr>
              <td>Servicio: { `${service.service} - ${service.plan}` }</td>
            </tr>
            <tr>
              <td>Domicilio: {clientAddress.street}</td>
            </tr>
            <tr>
              <td>Localidad: {clientAddress.location}</td>
            </tr>
            <tr>
              <td>Telefonos:</td>
            </tr>
            <tr>
              <td><br/> REALIZACION:<br/><br/> </td>
            </tr>
            <tr>
              <td>Tecnico:........................</td>
            </tr>
          </tbody>
        </table>
        <br/> <br/>
        <div style={{width:"80%", margin:"auto"}}>
          Sr. Cliente:  Se le recuerda que el personal de Telecentro S.A. no se encuentra autorizado para realizar cobro alguno por los servicios de instalaciones y/o reparaciones que realice en su domicilio. A fin de evitar este tipo de irregularidades, de presentársele una situación así, le pedimos su estimada colaboración informando este hecho, llamando al Nº 3977-3456 / 57.
        </div>
        <br/> <br/>
        <table className="mainTable">
          <thead >
            <tr>
              <th>CONFORME INSTALACION</th>
              <th>CONFORME NAVEGACION</th>
              <th>FECHA</th>
            </tr>
          </thead>
          <tbody >
            <tr>
              <td >______________________________</td>
              <td>______________________________</td>
              <td>___/{d.getMonth() + 1}/{d.getFullYear()}</td>
            </tr>
            <tr>
              <td style={{border:"none"}}>Cumplido SI / NO</td>
              <td style={{border:"none"}}>Cumplido SI / NO</td>
              <td style={{border:"none"}}></td>
            </tr>
          </tbody>
        </table>
        <br/> <br/> <br/>
        <div style={{textAlign:"center"}}>MATERIALES UTILIZADOS</div>
        <table className="mainTable">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Descripcion</th>
                <th>Cantidad</th>
              </tr>
            </thead>
          <tbody style={{textAlign:"center"}}>
            {hardware.map( device => {
              return(
                <tr>
                  <td >{ getCode(device.model) }</td>
                  <td style={{textAlign:"left"}}>{`${device.device} - ${device.model}`}</td>
                  <td >1</td>
                </tr>
              )
            } )}
            <tr>
              <td >47062</td>
              <td style={{textAlign:"left"}}>Pigtail-Coleta-Latiguillo conector SC/APC, longitud de 1,5mts, monomodo.</td>
              <td >2</td>
            </tr>
            <tr>
              <td >97070</td>
              <td style={{textAlign:"left"}}>Bastido de FO. Conector de 12 pelos p rack de 19"  y 23"</td>
              <td >1</td>
            </tr>
          </tbody>
        </table>
        <br/> <br/> <br/>
        <table className="mainTable">
          <tbody>
            <tr>
              <td colspan="6">
                En mi carácter de Instalador, declaro que el domicilio en el cual se realiza esta instalación es de tipo:                                                             (marcar con una X donde corresponda)
              </td>
            </tr>
            <tr>
              <td>Local Industrial</td>
              <td>Oficina</td>
              <td>Local Comercial</td>
              <td>Vivienda residencial Única</td>
              <td>Vivienda residencial Edificio Dptos</td>
              <td>Otro (especificar)</td>
            </tr>
            <tr>
              <td>.................</td>
              <td>.................</td>
              <td>.................</td>
              <td>.................</td>
              <td>.................</td>
              <td>.................</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const PrintOSADI = props => {
  const componentRef = useRef();
  console.log("this is in Print Example");
  console.log(props);
  return (
    <div>
      <ReactToPrint
        trigger={() => <Button variant="warning">Print this out!</Button>}
        content={() => componentRef.current}
        pageStyle=""
      />
      <PrintOS {...props} ref={componentRef} />
    </div>
  );
}

export default PrintOSADI;

