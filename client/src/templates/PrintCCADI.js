import React, {useRef, Component} from 'react';
import ReactToPrint from 'react-to-print';
import { Button } from 'react-bootstrap';
import Logo from './logoTLC.jpg';
import '../App.css';

class PrintCC extends Component {
  render(){

    let d = new Date();
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    return (
      <div className="myContainer">
        <table className="secondaryTable header">
          <tbody>
            <tr>
              <td style={{width:"50%"}}><img src={Logo} alt="TLC Logo" width="150"/></td>
              <td style={{width:"50%", textAlign:"right"}}><b>CONTRATO COMODATO N°......</b></td>
            </tr>
          </tbody>
        </table>
        <div>
          Entre TeleCentro S.A. (en adelante TeleCentro), con domicilio en Av. Brig. Gral. J.M. de Rosas 2860, de la localidad de San Justo, partido de La Matanza, Pcia. de Buenos Aires,   por  una  parte, y por la otra,  el Sr/Sra.:<b>{this.props.clientName}</b> ,
          cuyos datos se especifican al pié del presente, (en adelante el Cliente), convienen en celebrar este Contrato de Comodato que se regirá por las siguientes cláusulas y condiciones:
        </div>
        <div>
          <b><u>Primera</u></b><br/>
          El Cliente recibe de TeleCentro, en este acto, en carácter de “Comodato” y de plena conformidad el/los siguiente/s equipo/s, en adelante el Equipo y/o equipos, indistintamente:
        </div>
        <table className="mainTable">
          <thead>
            <th>Denominacion</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>S/N</th>
          </thead>
          <tbody>
            {this.props.hardware.map( device =>{
              return (
                <tr>
                  <td>{device.device}</td>
                  <td>{device.model}</td>
                  <td>nada</td>
                  <td>{device.serial}</td>
                </tr>)
            } )}
          </tbody>
        </table>
        <div>
          <b><u>Segunda</u></b><br/>
          El Cliente declara conocer que la propiedad del Equipo pertenece a TeleCentro y que el uso del mismo se regirá por las normas del “Comodato” conforme los artículos 2255 y subsiguientes del Código Civil. Sin perjuicio de otras obligaciones emergentes del “Comodato”, el Cliente se compromete   a mantener el Equipo en el mismo estado de uso y conservación en que le fue entregado, haciéndose responsable por cualquier daño ocasionado por el uso indebido o por falta de debida diligencia en su conservación. Asimismo se compromete y obliga a restituirlo a TeleCentro dentro de las 48 horas a partir del momento que le sea formalmente exigida su restitución, para lo cual, el Cliente acepta que, entre las 8 y las 19 horas de lunes a sábado, permitirá el ingreso del personal de TeleCentro -debidamente identificado- con el fin de desconectar y retirar el Equipo en cuestión.
        </div>
        <div>
          <b><u>Tercerta</u></b><br/>
          El “comodato” permanecerá vigente mientras el cliente mantenga su situación de abonado a los servicio detelecentro.
        </div>
        <div>
          <b><u>Cuarta</u></b><br/>
          En virtud del principio de autonomía de la voluntad consagrado en el Art. 1197 del Código Civil, ambas partes convienen en modificar el régimen del Art. 2269 del citado Código, asumiendo el Cliente, tal lo autoriza el Art. 513 del mismo cuerpo legal, en todos los casos, las consecuencias del caso fortuito   y fuerza mayor acaecidos en el equipo dado en  comodato, ya sea por el mero uso del mismo e incluso por los hechos de terceros (hurto, robo, daño  total o parcial, etc)
        </div>
        <div>
          <b><u>Quinta</u></b><br/>
          El Cliente declara conocer que cada equipo comprende tanto el decodificador, su fuente de alimentación eléctrica y su control remoto como así también cualquier otro elemento adicional que se entregue junto a los mismos. Por ello si se produjere la pérdida y/o deterioro total o parcial del Equipo por cualquier causa, atento lo establecido en la cláusula precedente, el Cliente deberá pagar a TeleCentro el valor del mismo dentro de las 48 horas de ser requerido el pago. A todo evento el Cliente declara tomar conocimiento y aceptar, que el valor de reposición de cada equipo es de dólares estadounidenses trescientos (U$S 300.) por el modelo de Decodificador DVR; dólares estadounidenses ciento cincuenta (U$S 150.) por el modelo de Decodificador HD; y dólares estadounidenses cien (U$S 100.) por el modelo de Decodificador Digital / Cable Modem; dichos valores no incluyen el IVA. En caso que el Cliente no devuelva alguno de los componentes del Equipo, deberá abonar el valor de los mismos, estipulándose en U$S 7 el valor del control remoto del decodificador. Queda a criterio del Cliente la contratación a su exclusivo costo y cargo de un seguro que cubra el valor del Equipo por todos los riesgos posibles (daño total o parcial por cualquier causal, robo, hurto, etc.); dicha póliza deberá tener como beneficiario a TeleCentro S.A.. La contratación del mentado seguro no exime al Cliente de su responsabilidad como obligado principal pagador.
        </div>
        <div>
          <b><u>Sexta</u></b><br/>
          Cualquier incumplimiento total o parcial por parte del Cliente a sus obligaciones asumidas en este Contrato y/o en la Solicitud de Suscripción, facultará a TeleCentro de pleno derecho a rescindir el “comodato” y exigir la restitución del Equipo en el plazo y forma que trata la Cláusula Segunda del presente. La falta de restitución del Equipo producirá los efectos de la retención indebida, tanto por los supuestos contemplados en el artículo 2274 del Código  Civil y concordantes, como en las demás normas civiles y penales aplicables al caso.
        </div>
        <div>
          <b><u>Séptima</u></b><br/>
          Sin perjuicio de lo expuesto y en concepto de Cláusula Penal, en caso que el Cliente no devolviera el Equipo en tiempo y forma fijados en la  interpelación pertinente, el Cliente queda obligado al pago de una multa de Dólares Estadounidenses diez (U$S 10.) por cada día de demora en la efectiva devolución. El importe resultante será independiente del que deba pagar por el valor del equipo fijado en la Cláusula Quinta y las restantes deudas líquidas y exigibles por servicios y/u otros cargos ya devengados.
        </div>
        <div>
          <b><u>Octava</u></b><br/>
          Ante cualquier controversia judicial que de lugar el presente Contrato, las partes se somete voluntariamente a  la jurisdicción de los  Tribunales Ordinarios en lo Comercial de la Ciudad de Buenos Aires, renunciando expresamente a cualquier otro fuero o jurisdicción que pudiere corresponder, constituyendo a tales efectos los domicilios que cada parte declara en este Contrato.
        </div>
        <div>
          <b><u>Novena</u></b><br/>
          Ante un eventual incumplimiento contractual, el cliente podrá realizar denuncia y/o solicitar asesoramiento ante los siguientes organismos gubernamentales:<br/>
          *Subsecretaría de Defensa del Consumidor – Av. Julio A. Roca 651 (1322) Piso 4 Sector 22 Ciudad Autónoma de Buenos  Aires o Línea  Gratuita de Información al Consumidor 0800-666-1518 – Lunes a viernes 08 a 20 hs.<br/>
          *Defensa y Protección del Consumidor 0800-999-2727<br/>
          *Oficina Provincial de Defensa al Consumidor – Torre Gubernamental 2, Piso 12, Calle 12 Esq.53, La Plata - Buenos Aires – TEL 0800-222-9042
        </div>
        <div>
          <u>Cierre</u><br/>
          De plena conformidad con las nueve (9) cláusulas que anteceden, se firma este Contrato el día.......... del mes de <b>{months[d.getMonth()]}</b>  del año <b>{d.getFullYear()}</b>, recibiendo el Cliente una copia del presente.
        </div>
        <table className="secondaryTable">
          <tbody>
            <tr>
              <td><b>Firma del cliente:</b>.................................................</td>
              <td>Por Telecentro</td>
            </tr>
            <tr>
              <td><b>Aclaracion:</b>..........................................................</td>
            </tr>
            <tr>
              <td><b>Tipo y N° Documento:</b>.........................................</td>
            </tr>
            <tr>
              <td><b>Telefono:</b>.............................................................</td>
              <td>..............................................................</td>
            </tr>
            <tr>
              <td><b>Email:</b>.................................................................</td>
              <td>Firma y Aclaración</td>
            </tr>
            <tr>
              <td><b>Abonado: {this.props.abonado}</b> </td>
            </tr>
          </tbody>
        </table>
      </div>
    )};}

const PrintCCADI = props => {
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
      <PrintCC {...props} ref={componentRef} />
    </div>
  );
}

export default PrintCCADI;
