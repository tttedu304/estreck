// src/index.js
const  { postCode, removeCode, fetchCode} = require("./utils/index");
const { connect } = require("./db/connection");
const { mongouri } = require("../../config");
const Code = require("./db/schema/codeList");
const express = require("express");
const levenshtein = require("js-levenshtein");
let app = express();

connect(mongouri);

app.get("/", async(req, res) => {
    res.send('Hello world!');
});

app.get("/codes", async(req, res) => {
    const Codes = await Code.find({});
        res.send(Codes);
});

app.get("/codes/:id", async(req, res) => {
   const id = req.params.id;
   const code = await Code.find({_id: id});
   res.send(code);
});

app.get("/codes/search/:name", async(req, res) => {
    const name = req.params.name;

    const setDistance = (records, query) => records.map((record => ({ ...record, distance: levenshtein(record.name, query)})));

    const leinshteinedRecords = setDistance(await Code.find({}), name);
    const searchResults =  leinshteinedRecords
        .filter(record => record.distance <= 3)
        .sort((a, b) => a.distance - b.distance);
   res.json(searchResults);
});

app.post("/codes/add", async(req, res) => {
    const { name, desc, content } = req.body;
    postCode(name, desc, content);
});

app.listen(3000);

console.log(`Started!\n🚀 Ready to fire on port: 3000`);
