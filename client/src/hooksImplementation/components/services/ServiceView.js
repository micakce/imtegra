import React, {useContext, useEffect} from 'react';
import ClientInfo from '../ClientInfo';
import {ClientContext} from '../../contexts/ClientContext';
import {useParams} from 'react-router';
import { blankClient } from "../../../helpers/blankStates";
import ServiceDetail from './ServiceDetail';


const ServiceView = () => {
  const { client, setClient, getAndSetClient } = useContext(ClientContext);
  const { abonado, id } = useParams();

  useEffect(() => {
    console.log("solo al montar");
    if (abonado && abonado.match(/^\d{7}$/)) {
      getAndSetClient(abonado);
    } else {
      setClient(blankClient);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abonado]);

  return(
    <>
      <ClientInfo client={client} />
      <ServiceDetail client={client} />
    </>
  )
}

export default ServiceView;
