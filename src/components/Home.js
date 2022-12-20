import Cookies from 'js-cookie';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logOut } from '../Redux/auth/loginSlice';

const Home = () => {
    const { token } = useSelector((state) => ({
        token: state.loginSlice.allData?.token?.access,
    }));
    const dispatch = useDispatch();
    return (
        <div className='flex flex-col'>
            {token ? (
                <button className='border-none w-max' onClick={() => dispatch(logOut())}>
                    logout
                </button>
            ) : (
                <Link to='/login'>
                    <button>Login</button>
                </Link>
            )}
            <Link to='/forgot'>
                <button>Forgot</button>
            </Link>
            <Link to='/verify-otp'>
                <button>VerifyOtp</button>
            </Link>
            <Link to='/reset-password'>
                <button> ResetPassword</button>
            </Link>
        </div>
    )
}

export default Home