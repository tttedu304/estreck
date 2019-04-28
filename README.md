<p align="center"><img align="center" src="https://media.discordapp.net/attachments/546760912384688160/570382812960784394/unknown.png?width=1280&height=640" title="estreck logo"></p>

# **Estreck**

>Estreck is a Base Code Extractor which you can get a base/basic code to use in your application.
>Estreck is made in JavaScript, using Node.js and Express, and uses the mongoose database to store all the codes, using the Levenshtein algorithm among other search functions we can know exactly what code you are referring to 99.9% of the time.

## **how to use**

This API is very simple to use simply send a GET request:
- `https://estreck.ml/codes` - for all codes
- `https://estreck.ml/codes/ID_HERE` - to get a code by ID
- `https://estreck.ml/codes/search/SEARCH_HERE` - to get by name or description

## **Main Goal**

The main objective of Estreck is to optimize the speed in which you code. having at hand common code that you could forget at some point, so Estreck allows you to have everything in one place and with unparalleled speed.

## **Exmaple**

>Here is a example of how [Estreck](https://estreck.ml/codes) will work, Note: you dont have to use curl or do it by a command line going to the same website will still work.
>
>```bash
>$ curl -H "Accept:application/json" http://estreck/codes/5cc4c9f9f46ab31904b11595
>[
>    {
>        "name":"testing",
>        "description":"desc test",
>        "content":"null code",
>        "date":"2019-4-27",
>        "_id":"5cc4c9f9f46ab31904b11595",
>        "__v":0
>    }
>]
>```