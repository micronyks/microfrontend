const AWS = require('aws-sdk');
import CryptoJS from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';

class CongnitoService {
    cognitoIdentity;
    config = {
        region: `${process.env.AWS_REGION}`
    };
    secretHash = 'a0qe80tcvas4n6pdg19dekddjvntsuf0ge4rmsrsi7jdqc1eq3d';
    clientId = '15b3eut8d9sfdnaluqt1b296j2';

    constructor() {
        this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
    }

    async signUp(username, password) {

        const params = {
            ClientId: this.clientId,
            Password: password,
            Username: username,
            SecretHash: this.generateHash(username),
            UserAttributes: []
        }

        try {
            const data = await this.cognitoIdentity.signUp(params).promise();
            if(data){
                console.log(data)
            }else{
                console.log('went wrong')
            }
        } catch (error) {
            console.log(error);
        }
    }

    async signInUser(username, password) {
        const params = {
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: this.clientId,
            AuthParameters: {
                "USERNAME": username,
                "PASSWORD": password,
                "SECRET_HASH": this.generateHash(username)
            }
        }

        try {
            console.log('params', params);
            const data = await this.cognitoIdentity.initiateAuth(params).promise();
            console.log(data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

    generateHash(username) {
        // return crypto.createHmac('SHA256', this.secretHash)
        //     .update(username + this.clientId)
        //     .digest('base64')

        return Base64.stringify(CryptoJS.HmacSHA256(username + this.clientId, this.secretHash));
    }

}

// module.exports = CongnitoService;

export default CongnitoService;

