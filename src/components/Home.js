import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='flex flex-col'>
            <Link to='/login'>
                <button>Login</button>
            </Link>
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