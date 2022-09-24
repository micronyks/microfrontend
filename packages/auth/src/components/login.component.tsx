
import { Link, useNavigate } from 'react-router-dom'
import './login.component.css';

// custom imports
import { ROUTE } from '../core/constants/route.constant';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { authActions } from '../core/store/auth.store';
import { useRef, useState } from 'react';
import { IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material';
import { authenticateUser } from '../core/apis/authentication';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"
import UserPool from "../Userpool";

import { Amplify, Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';


import CongnitoService from "../cognito.service";



Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: `${process.env.AWS_COGNITO_IDENTITY_POOL_ID}`,

        // REQUIRED - Amazon Cognito Region
        region: `${process.env.AWS_REGION}`,

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: `${process.env.AWS_REGION}`,

        // OPTIONAL - Amazon Cognito User Pool IDhSure. iYYou
        userPoolId: `${process.env.AWS_COGNITO_USER_POOL_ID}`,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: `${process.env.AWS_COGNITO_CLIENT_ID}`,

        // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: 'mfe.auth.ap-south-1.amazoncognito.com',
            //  scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: 'http://localhost:3001',
            redirectSignOut: 'http://localhost:3001',
            responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    }
});



const isEmpty = (value: string) => value.trim() === '';
const isEmailValid = (value: string) => new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(value);

const LoginComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const forgetPasswordHandler = () => {
        navigate(ROUTE.AUTH.FORGET_PASSWORD);
    }

    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const showPasswordHandler = () => setShowPassword(!showPassword);
    const passwordMouseDownHandler = () => setShowPassword(!showPassword);

    const enteredEmailValid = !isEmpty(enteredEmail.trim()) && isEmailValid(enteredEmail.trim());
    const enteredPasswordValid = !isEmpty(enteredPassword.trim());

    const emailInputIsInvalid = !enteredEmailValid && enteredEmailTouched;
    const passwordInputIsInvalid = !enteredPasswordValid && enteredPasswordTouched;

    const emailBlurHandler = (e: any) => {
        setEnteredEmailTouched(true);
    }

    const emailChangeHandler = (e: any) => {
        setEnteredEmail(e.target.value);
    }

    const passwordBlurHandler = (e: any) => {
        setEnteredPasswordTouched(true);
    }

    const passwordChangeHandler = (e: any) => {
        setEnteredPassword(e.target.value);
    }

    const confirmHandler = async (event: any) => {
        event.preventDefault();
        setEnteredEmailTouched(true);
        setEnteredPasswordTouched(true);

        if (!enteredEmailValid && !enteredPasswordValid) {
            return;
        } else {

            // UserPool.signUp(enteredEmail, enteredPassword, [], [], (err, data) => {
            //     if (err) {
            //         console.log(err)
            //     }

            //     console.log(data);



            // })


            // const user = new CognitoUser({
            //         Username: enteredEmail,
            //         Pool: UserPool
            //     });

            //     const authDetails = new AuthenticationDetails({
            //         Username: enteredEmail,
            //         Password: enteredPassword,
            //     })

            //     user.authenticateUser(authDetails, {
            //         onSuccess: (data) => {
            //             console.log('onSuccess', data);
            //         },
            //         onFailure(err) {
            //             console.log('onFailure', err);
            //         },
            //         newPasswordRequired(userAttributes, []) {
            //             delete userAttributes.email_verified;
            //             user.completeNewPasswordChallenge(
            //                 'Amin@123',
            //                 userAttributes,
            //                 this
            //             );
            //         }
            //     })


            // const cognito = new CongnitoService();
            // cognito.signUp(enteredEmail, enteredPassword).then((data) => {
            //     console.log('check', data)
            // })




            // const cognito = new CongnitoService();
            // try {
            //     const data = await cognito.signInUser(enteredEmail, enteredPassword);
            //     if (data) {
            //         console.log('data', data);
            //     } else {
            //     }
            // } catch (error) {
            //     console.log(error);
            // }



            const response = await authenticateUser({ email: enteredEmail, password: enteredPassword })

            if (response.status === 200) {
                const result = await response.json();
                setEnteredEmail('');
                setEnteredEmailTouched(false);
                setEnteredPasswordTouched(false);
                dispatch(authActions.login(result));
            } else {
                alert('Username or Password not matched !');
            }
        }
    };

    const fbLogin = () => {
        Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook }).then(credentials => {
            console.log('get aws credentials', credentials);
        }).catch(e => {
            console.log(e);
        });
    }

    const azureLogin = () => {
        Auth.federatedSignIn();
    }


    return <div className="login-app-container">
        <form onSubmit={confirmHandler} className="form" noValidate autoComplete="off">
            <div>
                <TextField type="text"
                    name='email'
                    id="email"
                    label="Email"
                    variant="outlined"
                    inputRef={inputEmailRef}
                    margin="normal"
                    error={emailInputIsInvalid}
                    helperText={emailInputIsInvalid ? "Pleae enter valid email" : ''}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                />
            </div>

            <div>
                <TextField
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    label="password"
                    variant="outlined"
                    inputRef={inputPasswordRef}
                    margin="normal"
                    error={passwordInputIsInvalid}
                    helperText={passwordInputIsInvalid ? "Pleae enter password" : ''}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={showPasswordHandler}
                                    onMouseDown={passwordMouseDownHandler}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>

            <div className="lgn-forgot-password">
                <div><Link to="/auth/forgetpassword">Forgot Password</Link></div>
            </div>

            <Typography align='center'>
                <Button
                    color='primary'
                    type='submit'
                    variant='contained'
                    id="signInButton"
                >
                    Sign in
                </Button>

            </Typography>

        </form>

        <button onClick={fbLogin}> Facebook Login</button>

        <button onClick={azureLogin}> Azure Login</button>
    </div>
}

export default LoginComponent;