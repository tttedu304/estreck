<p align="center"><img align="center" src="https://media.discordapp.net/attachments/546760912384688160/570382812960784394/unknown.png?width=1280&height=640" title="estreck logo"></p>

# **Estreck**

>Estreck is a Base Code Extractor which you can get a base/basic code to use in your application.

## **Main Goal**

>The main goal of Estreck is to optimize the speed in which you code having at hand codes commonly used but that you could forget at some point, so you have everything in one place and with an unparalleled speed

## **How it works**

>Estreck is encoded in JavaScript, using Node.js and Express, and uses the mongoose database to save all the codes. Making a request to our API, using the Levenshtein algorithm among other search functions we can know exactly what code you are referring to 99.9% of the Sometimes, at least.

## **how to use**

This API is very simple to use simply send a GET request:
- `https://estreck.ml/codes` - for all codes
- `https://estreck.ml/codes/ID_HERE` - to get a code by ID
- `https://estreck.ml/codes/search/SEARCH_HERE` - to get by name or description

## **Exmaple**

```bash

$ curl -H "Accept:application/json" http://estreck/codes/5cc4c9f9f46ab31904b11595
[{
        "description":"desc test",
        "content":"null code",
        "date":"2019-4-27",
        "_id":"5cc4c9f9f46ab31904b11595",
        "name":"testing",
        "__v":0
}]
```