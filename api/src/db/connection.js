// src/db/connection.js
const mongoose = require("mongoose");
exports.connect = (mongouri, options) => mongoose.connect(mongouri, { ...options, useNewUrlParser: true });