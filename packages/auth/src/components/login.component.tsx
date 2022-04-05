
import { Link, useNavigate } from 'react-router-dom'
import './login.component.css';

// custom imports
import { ROUTE } from '../core/constants/route.constant';
import Button from '@mui/material/Button/Button';
import { useDispatch } from 'react-redux';
import { authActions } from '../core/store/auth.store';
import { useRef, useState } from 'react';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { authenticateUser } from '../core/apis/authentication';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
            const result = await authenticateUser({ email: enteredEmail, password: enteredPassword })
            if (result.status === 200) {
                setEnteredEmail('');
                setEnteredEmailTouched(false);
                setEnteredPasswordTouched(false);
                dispatch(authActions.login());
            }else{
                alert('Username or Password not matched !');
            }
        }
    };


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
                >
                    Login
                </Button>

            </Typography>

        </form>
    </div>
}

export default LoginComponent;