// src/index.js
const  { postCode, removeCode, fetchCode} = require("./utils/index");
const { connect } = require("./db/connection");
const { mongouri } = require("../config");
const Code = require("./db/schema/codeList");
const express = require("express");
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
   const code = await Code.find({name: name});
   res.send(code);
});

app.post("/codes/add", async(req, res) => {

});

app.listen(3000);

console.log(`Started!\nListening in port: 3000`);
