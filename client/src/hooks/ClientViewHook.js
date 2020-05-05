import React, {useState, useContext, useEffect} from "react";

import { blankState } from './testVariables';
import RenderService from './RenderService';
import MyModal from './MyModal';
import AddService from './AddService';
import AddHardware from './AddHardware';
import AddClient from './AddClient';
import EditHardwareModal from './EditHardwareModal';
import { AuthConsumer } from './authContext';
import Can from './Can';
import {axiosInstance} from './helpers/axios';
import AuthConsumer

const ClientViewHook = () => {

  const { user } = useContext()



}

export default ClientViewHook;
