/* eslint-disable comma-dangle */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
"use strict";

const functions = require("firebase-functions");
const {WebhookClient} = require("dialogflow-fulfillment");
const {Card, Suggestion} = require("dialogflow-fulfillment");

// data base

const admin = require("firebase-admin");
const firebaseConfig = {
  apiKey: "AIzaSyDDO3GizOXHNf3GEun7lAENIfHLZHSShYg",
  authDomain: "tesis-adl.firebaseapp.com",
  projectId: "tesis-adl",
  storageBucket: "tesis-adl.appspot.com",
  messagingSenderId: "905089372783",
  appId: "1:905089372783:web:d887e475354f5be0a0f39a"
};


admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({request, response});
  console.log("Dialogflow Request headers: " + JSON.stringify(request.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(request.body));


  function fallback(agent) {
    agent.add(`Disculpa no te entendí, me podrías repetir  ?`)
    agent.add(`Recuerda que fui entrenada para dar indicaciones en la cocina`);
  }

 
  const intentMap = new Map();

  intentMap.set("Default Fallback Intent", fallback);
  agent.handleRequest(intentMap);
});
