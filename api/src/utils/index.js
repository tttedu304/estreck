// src/utils/index.js
const Code = require("../db/schema/codeList");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
let d = new Date();
let today = d.toLocaleDateString();

exports.postCode = async (name, desc, content, date = today) => {
    const newCode = new Code({
        _id: ObjectId(),
        name: name,
        content: content,
        description: desc,
        date: date
    });
    await newCode.save();
    return console.log(`El codigo, Con nombre ${name} ha sido guardado correctamente, Con ID: ${ObjectId()}, Con la descripcion: ${desc}, Y si contenido es: ${content}`)
};

exports.removeCode = async(id) => {
    let deleteCode = await Code.findByIdAndDelete(id);
    await deleteCode.save();
    return console.log(`El codigo con ID: ${id}, Ha sido borrado exitosamente`)
};

exports.fetchCode = async(name) => {
    let fetchedCode = await Code.findOne({ name: name});
    return console.log(`${fetchedCode.name}\n${fetchedCode.description}\n\n${fetchedCode.content}\n\n\n${fetchedCode.date}\n\n\n\n${fetchedCode._id}`)
};
