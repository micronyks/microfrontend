
import { useNavigate } from 'react-router-dom'
import './login.component.css';


// custom imports
import { ROUTE } from '../core/constants/route.constant';
import Button from '@mui/material/Button/Button';
import { useDispatch } from 'react-redux';
import { authActions } from '../core/store/auth.store';


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

    return <div className="login-app-container">
        <div className="login-app">
            <Button variant="contained"  onClick={loginHandler}> Login </Button>
        </div>
    </div>
}

export default LoginComponent;