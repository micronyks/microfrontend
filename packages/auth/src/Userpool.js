import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'ap-south-1_DrD3q0tJ3',
    ClientId: '3tqn3lm39q1r63gtl7nqe7n9a7',
}

export default new CognitoUserPool(poolData);