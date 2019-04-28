// src/db/schema/codeList.js
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

let codeListSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        default: ObjectId(),
    },
    name: {
        type: String,
    },
    description: {
        type: String,
        default: "No description provided for this code."
    },
    content: {
        type: String,
        default: "No code I can display\n\nOh oh, try with another."

    },
    date: {
        type: String,
        default: "No date provided for this code."
    },
    isValidate: {
        type: Boolean,
        default: false
    }
});

let Code = mongoose.model("CodeList", codeListSchema);
module.exports = Code;