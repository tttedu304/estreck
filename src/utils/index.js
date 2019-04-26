// src/utils/index.js
const connect = require("../db/connection");
const  Code  = require("../db/schema/codeList");
const  { mongouri }  = require("../../config");
const mongoose = require("mongoose");

let date = new Date();

module.exports.utils = class {
    constructor() {
        this.connection = connect(mongouri);
        this.time = date.toLocaleDateString()
    }

    async postCode(name, desc, content, date = this.time) {
        const newCode = new Code({
            name: name,
            content: content,
            description: desc,
            date: date
        });
        await newCode.save();
    }

    async removeCode(id) {
        let deleteCode = await Code.findByIdAndDelete(id);
        deleteCode.save();
    }
};