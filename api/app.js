// import express from 'express';
const express = require('express');
// import { initialize } from 'express-openapi';
const { initialize } = require('express-openapi');
// import v1WorldsService from './tutorial/services/worldsService';
const v1WorldsService = require('./tutorial/services/worldsService');
// import v1ApiDoc from './tutorial/api-doc.yml';
const v1ApiDoc = require('./tutorial/api-doc.yml');


const app = express();
initialize({
  app,
  // NOTE: If using yaml you can provide a path relative to process.cwd() e.g.
  // apiDoc: './api-v1/api-doc.yml',
  apiDoc: v1ApiDoc,
  dependencies: {
    worldsService: v1WorldsService
  },
  paths: './tutorial/paths'
});

app.listen(3000);
