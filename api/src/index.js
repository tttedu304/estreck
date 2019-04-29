// src/index.js
const { postCode, removeCode, fetchCode, setDistance, validateCode } = require("./utils/index");
const { connect } = require("./db/connection");
const mongouri = process.env.mongouri;
const Code = require("./db/schema/codeList");
const express = require("express");
const path = require("path");
const levenshtein = require("js-levenshtein");
const bodyParser = require("body-parser");
const cors = require("cors");
let app = express();

connect(mongouri);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.send(
        'Hello world!\n<ul><li><a href="/codes">Codes</a></li><li><a href="/nocodes">Unvalidated Codes</a></li><li><a href="/addcode">Add</a></li><li><a href="/removecode">Remove (Requires token)</a></li><li><a href="/validate">Validate (Requires token)</a></li></ul>'
    );
});

app.get("/codes", async (req, res) => {
    const Codes = await Code.find({ isValidate: true });
    res.send(Codes);
});

app.get("/nocodes", async (req, res) => {
    const Codes = await Code.find({ isValidate: false });
    res.send(Codes);
});

app.get("/codes/:id", async (req, res) => {
    const id = req.params.id;
    const code = await Code.find({ _id: id, isValidate: true });
    res.send(code);
});

app.get("/codes/search/:name", async (req, res) => {
    const searchRegex = new RegExp(req.params.name, "i");
    let Codes = await Code.find({ isValidate: true })
        .or([{ name: searchRegex }, { description: searchRegex }, { content: searchRegex }]);
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

app.get("/validate", async(req, res) => {
    const pathToFile = await path.join(__dirname, "../../web/validateCode.html");
    res.sendFile(pathToFile);
});

app.post("/codes/add", async (req, res) => {
    const { name, desc, content, token } = req.body;
    await postCode(name, desc, content);
    if(!name) return res.send("You forgot the name");
    if(!desc) return res.send("You forgot description");
    if(!desc) return res.send("You forgot the content");
    res.redirect("/codes");
});

app.post("/codes/remove", async (req, res) => {
    const { id, token } = req.body;
    if (token === process.env.addRemoveToken) {
        await removeCode(id);
        res.redirect("/codes");
    } else {
        res.send("Ooh, you missed the token :l")
    }
});

app.post("/codes/validate", async(req, res) => {
   const { id, token } = req.body;
    if (token === process.env.addRemoveToken) {
        await validateCode(id);
        res.redirect("/codes")
    } else {
        res.send("Ooh, you missed the token :l")
    }
});

app.listen(2000);

console.log(`Started!\n🚀 Ready to fire on port: 2000`);

