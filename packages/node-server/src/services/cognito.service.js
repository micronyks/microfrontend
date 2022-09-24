const AWS = require('aws-sdk');
const crypto = require('crypto');

class CongnitoService {
    cognitoIdentity;
    config = {
        region: `ap-south-1`
    };
    secretHash = 'a0qe80tcvas4n6pdg19dekddjvntsuf0ge4rmsrsi7jdqc1eq3d';
    clientId = '15b3eut8d9sfdnaluqt1b296j2';

    constructor() {
        this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
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
        return crypto.createHmac('SHA256', this.secretHash)
            .update(username + this.clientId)
            .digest('base64')
    }

}

module.exports = CongnitoService;

