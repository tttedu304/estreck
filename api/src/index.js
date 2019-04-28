// src/index.js
console.log(process.env)
const { postCode, removeCode, fetchCode, setDistance } = require("./utils/index");
const { connect } = require("./db/connection");
const { mongouri } = process.env;
const Code = require("./db/schema/codeList");
const express = require("express");
const path = require("path");
const levenshtein = require("js-levenshtein");
const bodyParser = require("body-parser");
let app = express();
/*
connect(mongouri);
*/
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
    const nameP = new RegExp(req.params.name, 'i');

    let Codes = await Code.find()
        .or([{ name: nameP }, { description: nameP }, { content: nameP }]);
    res.json(Codes)
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
    const { name, desc, content, token } = req.body;
    if (token === procces.env.addRemoveToken) {
        await postCode(name, desc, content);
        res.redirect("/codes");
    } else {
        res.send("Ooh, you missed the token :l")
        return;
    }
});

app.post("/codes/remove", async (req, res) => {
    const { id, token } = req.body;
    if (token === procces.env.addRemoveToken) {
        await removeCode(id);
        res.redirect("/codes");
    } else {
        res.send("Ooh, you missed the token :l")
        return;
    }
});

app.listen(2000);

console.log(`Started!\n🚀 Ready to fire on port: 2000`);

