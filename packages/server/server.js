const express = require('express');
// const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs');
// const swaggerJsDocs = YAML.load('./api.yaml');
const cors = require('cors');
const app = express();
const users = require('./users');
const vessels = require('./vessels');
const fetchFile = require('./fetchFile');
let l;

app.use(cors());

//app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.use(express.json());

app.get('/',(req, res)=>{
    try{
        Promise.all([fetchFile.getFileFromS3('mock/i.json')])
        .then((result)=>{
              res.send(result)
        })
    }catch(e){
        res.send(e);
    }  
})


app.post('/login', (req, res) => {

    if (req.body.email && req.body.password) {

        const foundUserEmail = users.find(t => t.email === req.body.email);

        if (foundUserEmail) {

            const foundUserPassword = users.find(t => t.password === req.body.password);

            if (foundUserPassword) {

                res.status(200).send({ user: foundUserPassword, token: 'nyks123' })

            } else {

                res.status(403).end('password is worng');

            }
        } else {

            res.status(403).end('email does not exist');
        }
    }
})


app.get('/vessel/:imo', (req, res) => {
    console.log(req);
    res.status(200).send(vessels);
})

const port = process.env.PORT || 5000;


app.listen(port, () => { console.log('node-express server running on 5000') });

