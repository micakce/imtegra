import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import ClientInfo from "./components/ClientInfo";
import ClientServices from "./components/services/ClientServices";
import ClientHardware from "./components/ClientHardware";
import { ClientContext } from "./contexts/ClientContext";
import { blankClient } from "../helpers/blankStates";

const ClientView = () => {
  const { abonado } = useParams();

  const { client, setClient, getAndSetClient } = useContext(ClientContext);

  useEffect(() => {
    console.log("solo al montar");
    if (abonado && abonado.match(/^\d{7}$/)) {
      getAndSetClient(abonado);
    } else {
      setClient(blankClient);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abonado]);

  return (
    <>
      <h1>This is the add client hook</h1>
      <ClientInfo client={client} />
      <ClientServices services={client.services} />
      <ClientHardware />
    </>
  );
};

export default ClientView;
