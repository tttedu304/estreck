// src/index.js
const  { postCode, removeCode} = require("./utils/index");
const { connect } = require("./db/connection");
const { mongouri } = require("../config");

connect(mongouri);

console.log("Started!");