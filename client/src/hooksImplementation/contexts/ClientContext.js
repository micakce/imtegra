/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";
import { axiosInstance } from "../../helpers/axios";
import { blankClient } from "../../helpers/blankStates";
import { useHistory } from "react-router-dom";

export const ClientContext = createContext();

const ClientContextProvider = (props) => {
  const [client, setClient] = useState(blankClient);
  const history = useHistory();

  const getClient = async (abonado) => {
    const response = await axiosInstance.get(`/clients/${abonado}`);
    return response;
  };

  const getAndSetClient = async (abonado) => {
    const response = await axiosInstance.get(`/clients/${abonado}`);
    console.log("Se ejecuta desde el context");
    if (response.data) {
      setClient(response.data);
    }
  };

  const addClient = (abonado, data) => {
    axiosInstance
      .post(`/clients`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  const editClient = (id, data) => {
    axiosInstance
      .put(`/clients/${id}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  const deleteClient = (client_id) => {
    if (window.confirm("Seguro quieres eliminar este cliente?")) {
      axiosInstance
        .delete(`/clients/${client_id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
      history.replace("/clients/all");
    }
  };

  const deleteService = (serviceId, clientAbonado) => {
    if (window.confirm("Seguro que quieres eliminar este servicio?")) {
      axiosInstance
        .delete(`/clients/${clientAbonado}/service/${serviceId}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const deleteDevice = (serviceId, clientAbonado) => {
    if (window.confirm("Seguro que quieres eliminar este dispositivo?")) {
      axiosInstance
        .delete(`/clients/${clientAbonado}/device/${serviceId}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <ClientContext.Provider
      value={{
        client,
        setClient,
        addClient,
        editClient,
        getClient,
        getAndSetClient,
        deleteClient,
        deleteService,
        deleteDevice,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientContextProvider;
