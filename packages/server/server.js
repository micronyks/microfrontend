

const express = require('express');
const cors = require('cors');
const app = express();

const users = require('./users');



app.use(cors());
app.use(express.json());

app.post('/authentication', (req, res) => {
    console.log('authentication servic called', req.body);

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

app.listen(5000, () => { console.log('node-express server running on 5000') });

