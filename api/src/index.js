// src/index.js
const { postCode, removeCode, fetchCode } = require("./utils/index");
const { connect } = require("./db/connection");
const { mongouri } = require("../../config");
const Code = require("./db/schema/codeList");
const express = require("express");
const path = require("path");
const levenshtein = require("js-levenshtein");
const bodyParser = require("body-parser");
let app = express();

connect(mongouri);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.send(
      'Hello world!\n<ul><li><a href="/codes">Codes</a></li><li><a href="/addcode">Add</a></li><li><a href="/removecode">Remove</a></li></ul>'
    );
});

app.get("/codes", async (req, res) => {
    const Codes = await Code.find({});
    res.send(Codes);
});

app.get("/codes/:id", async (req, res) => {
    const id = req.params.id;
    const code = await Code.find({ _id: id });
    res.send(code);
});

app.get("/codes/search/:name", async (req, res) => {
    const name = req.params.name;
    const setDistance = (records, query) =>
      records.map(record => ({
          ...record,
          distance: levenshtein(record.name, query)
      }));
    const leinshteinedRecords = setDistance(await Code.find({}), name);
    const searchResults =
      leinshteinedRecords
        .filter(record => record.distance <= 3)
        .sort((a, b) => a.distance - b.distance);

    let codeJson = await searchResults.map(x => x._doc);

    res.json(codeJson)
});

app.get("/addcode", async (req, res) => {
    const pathToFile = await path.join(__dirname, "../../web/addCode.html");
    res.sendFile(pathToFile);
});

app.get("/removecode", async (req, res) => {
    const pathToFile = await path.join(__dirname, "../../web/removeCode.html");
    res.sendFile(pathToFile);
});

app.post("/codes/add", async (req, res) => {
    const { name, desc, content } = req.body;
    await postCode(name, desc, content);
    res.redirect("/codes");
});

app.post("/codes/remove", async (req, res) => {
    const { id } = req.body;
    await removeCode(id);
    res.redirect("/codes");
});

app.listen(3000);

console.log(`Started!\n🚀 Ready to fire on port: 3000`);