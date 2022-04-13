const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml');
const cors = require('cors');
const app = express();
const users = require('./users');
const vessels = require('./vessels');

app.use(cors());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.use(express.json());

app.get('/login'), (req, res) => {
    res.status(200).send(users);
}

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


app.listen(5000, () => { console.log('node-express server running on 5000') });

