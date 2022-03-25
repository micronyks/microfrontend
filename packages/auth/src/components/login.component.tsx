
import { useNavigate } from 'react-router-dom'
import './login.component.css';

// custom imports
import { ROUTE } from '../core/constants/route.constant';
import Button from '@mui/material/Button/Button';
import { useDispatch } from 'react-redux';
import { authActions } from '../core/store/auth.store';
import { useRef, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { authenticateUser } from '../core/apis/authentication';

const isEmpty = (value: string) => value.trim() === '';

const LoginComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = () => {
        dispatch(authActions.login());
        navigate(ROUTE.DASHBOARD);
    }

    const forgetPasswordHandler = () => {
        navigate(ROUTE.AUTH.FORGET_PASSWORD);
    }

    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    // const [isEmailValid, setIsEmailValid] = useState(false);
    // const [isPasswordValid, setIsPasswordValid] = useState(false);

    const [formValidity, SetFormValidity] = useState({
        email: true,
        password: true,
    });

    // const checkEmailValidity = (event: any) => {
    //     setIsEmailValid(!isEmpty(inputEmailRef.current!.value));
    // }

    const confirmHandler = async (event: any) => {
        event.preventDefault();

        const enteredEmailIsValid = !isEmpty(inputEmailRef.current!.value);
        const enteredPasswordIsValid =
            !isEmpty(inputPasswordRef.current!.value);

        SetFormValidity({
            email: enteredEmailIsValid,
            password: enteredPasswordIsValid,
        });

        const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;

        if (!formIsValid) {
            return;
        } else {

            const result = await authenticateUser({ email: inputEmailRef.current!.value, password: inputPasswordRef.current!.value })
            console.log(result);
            dispatch(authActions.login());
           // dispatch(authActions.navigateTo());
            // navigate(ROUTE.DASHBOARD);
            // make API call to fetch & validate login detail

        }
    };


    return <div className="login-app-container">

        <form onSubmit={confirmHandler}>
            <div>
                <TextField type="text"
                    id="email"
                    label="Email"
                    variant="outlined"
                    inputRef={inputEmailRef}
                    margin="normal"
                    error={!formValidity.email}
                    helperText={!formValidity.email ? "Pleae enter valid email" : ''}
                //  onChange={checkEmailValidity} 
                />
            </div>

            <div>
                <TextField type="text"
                    id="password"
                    label="password"
                    variant="outlined"
                    inputRef={inputPasswordRef}
                    margin="normal"
                    error={!formValidity.password}
                    helperText={!formValidity.password ? "Pleae enter password" : ''}
                //  onChange={checkEmailValidity} 
                />
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