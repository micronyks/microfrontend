// import { users } from './users'

const express = require('express');
const cors = require('cors');
const app = express();

const myuser = [
    { id: 1, email: 'a@b.com', password: 'a' },
    { id: 1, email: 'b@c.com', password: 'b' }
]

app.use(cors());
app.use(express.json());

app.post('/authentication', (req, res) => {
    console.log('authentication servic called', req.body);

    if (req.body.email && req.body.password) {

        const foundUserEmail = myuser.find(t => t.email === req.body.email);

        if (foundUserEmail) {

            const foundUserPassword = myuser.find(t => t.password === req.body.password);

            if (foundUserPassword) {

                res.status(200).send({ token: 'nyks123' })

            } else {

                res.status(403).end('password is worng');

            }
        } else {

            res.status(403).end('email does not exist');
        }
    }
})

app.listen(5000, () => { console.log('node-express server running on 5000') });

