// src/db/schema/codeList.js
const mongoose = require("mongoose");

let codeListSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
    },
    content: {
        type: String,
        default: "No code I can display\n\nOh oh, try with another"

    }
});

let codes = mongoose.model("Code List", codeListSchema);
module.exports = codes;