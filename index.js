const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const varejao = require("./model/varejao");
const macapa = require("./model/macapa");
const { decode } = require('punycode');
require('dotenv').config()
app.use(bodyParser.json());
app.use(express.json());

try {
    console.log("Creating database!")
    macapa.mysql_up().then(function () {console.log("ok")});
    varejao.postgres_up().then(function () {console.log("ok")});
} catch(e) {
    console.log("Error creating database!")
    if(e) console.log(e);
}
client = {
    "varejão": varejao.UploadContacts,
    "macapá": macapa.UploadContacts
}
app.post('/', function(req, res) {
    try {
        result = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        client[result.client](req.body.contacts).then((r)=>{
            res.status(r.status);
            res.json(r.json)
        });
    } catch(e) {
        if(e) {
            res.status(403);
            if(e) res.json({
                "job_done": false
            })
        }

    }
});

app.get('/', function(req, res) {
    res.setHeader('Allow', 'POST')
    res.status(405);
    res.json({
        "status": 405,
        "message": 'Unsuported method used!',
        "allowedMethods": 'POST'
    });
});

app.delete('/', function(req, res) {
    res.setHeader('Allow', 'POST')
    res.status(405);
    res.json({
        "status": 405,
        "message": 'Unsuported method used!',
        "allowedMethods": 'POST'
    });
});

/*
  Return not allowed method
*/
app.put('/', function(req, res) {
    res.setHeader('Allow', 'POST')
    res.status(405);
    res.json({
        "status": 405,
        "message": 'Unsuported method used!',
        "allowedMethods": 'POST'
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});