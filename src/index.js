// src/index.js
const mongoose = require("mongoose");
const { utils } = require("./utils/index");
const { connect } = require("./db/connection");
const { mongouri } = require("../config");

connect(mongouri);

console.log("Started!");

new utils().postCode()("A test name", "Just testing the post system", "Testing");