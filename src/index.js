// src/index.js
const mongoose = require("mongoose");
const  { postCode, removeCode} = require("./utils/index");
const { connect } = require("./db/connection");
const { mongouri } = require("../config");

connect(mongouri);

console.log("Started!");

postCode("A test name", "Just testing the post system", "Testing");