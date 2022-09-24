const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
// import fetch from "node-fetch";
const fetch = require("node-fetch");
let pems = {};

class AuthMiddleWare {
    region = "ap-south-1";
    userPoolId = "ap-south-1_mEM0xXlRM";

    constructor() { this.setUp()}


    verifyToken(req, res, next) {
        console.log('header', req.headers.authorization);
        const token = req.headers.authorization;
        console.log('token', token);

        if (!token) {
            res.status(401).end();
            return;
        }

        let decodeJWT = jwt.decode(token, { complete: true })
        console.log('decodeJWT', decodeJWT);
        if (!decodeJWT) {
            res.status(401).end();
            return;
        }


        let kid = decodeJWT.header.kid;
        let pem = pems[kid]

        if (!pem) {
            res.send(401).end();
        }

        jwt.verify(token, pem, (err, payload) => {
            if (err) {
                console.log('error occured');
                res.status(401).end()
            }

            next();
        })

    }

    async setUp() {

        const URL = `https://cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

        try {
            const response = await fetch(URL);

            if (response.status !== 200) {
                throw "request was not successful"
                return;
            }

            const data = await response.json();
            const { keys } = data;

            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                const key_id = key.kid;
                const modulus = key.n;
                const exponent = key.e;
                const key_type = key.kty;
                const jwk = { kty: key_type, n: modulus, e: exponent };

                const pem = jwkToPem(jwk);

                pems[key_id] = pem;

            }

            console.log('get all pems');
        } catch (error) {
            console.log("sorry couldn't fetch JWT");

        }

    }
}

module.exports = AuthMiddleWare;