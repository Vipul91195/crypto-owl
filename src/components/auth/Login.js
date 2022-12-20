import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import googleLogo from '../../assets/img/googleLogo.svg'
import { loginFetchAPi } from '../../Redux/auth/loginSlice'
import { LoginValidationSchema } from '../../utils/FormValidations'
import CustomButton from '../forms/CustomButton'
import { InputField } from '../forms/InputField'

const Login = () => {
    const { isLoading, token } = useSelector((state) => ({
        isLoading: state.loginSlice.isLoading,
        token: state.loginSlice.allData?.token?.access,
    }));
    const initialValues = { username: "", password: "", keepMeLogin: false };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLoginSubmit = (values) => {
        dispatch(loginFetchAPi(values));
    }
    useEffect(() => {
        token && navigate('/');
    }, [navigate, token])
    return (
        <div className='bg-[#171717] flex flex-col items-center h-screen sm:min-h-[680px] lg:min-h-none justify-center font-Sans w-full'>
            <Formik
                initialValues={initialValues}
                validationSchema={LoginValidationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleLoginSubmit}
            >
                {({ handleSubmit }) =>
                (<form onSubmit={handleSubmit} >
                    <div className='max-w-[410px]'>
                        <div className='text-2xl leading-[45px] tracking-[-0.02em] sm:text-4xl text-pink-light sm:leading-[56px] sm:tracking-[-0.02em] font-bold text-left'>Sign In</div>
                        <div className='text-base leading-4 font-normal tracking-tight text-[#737373] text-left pb-6 sm:pt-2 sm:pb-9'>Enter your email and password to sign in!</div>
                        <a href='google' >
                            <div className="flex justify-center items-center gap-3 h-[40px] text-sm w-full smax-w-[332px]  sm:max-w-[410px] sm:h-[50px] rounded-2xl text-pink-light bg-[#000000]">
                                <img src={googleLogo} height="20px" width="20px" alt="googleLogo" />
                                Sign in with Google
                            </div>
                        </a>
                        <div className='flex py-5 sm:py-6 items-center'>
                            <div className='border-b w-full border-[#FFFFFF]/[10%]'></div>
                            <div className='px-4 text-[#ADADAD] text-sm leading-5 tracking-tight font-medium'>or</div>
                            <div className='border-b w-full border-[#FFFFFF]/[10%]'></div>
                        </div>
                        <div className='text-base pb-1 sm:text-sm  font-medium tracking-tight text-pink-light sm:pb-3'>Email<span className='text-[#DD69AA]'>*</span></div>
                        <InputField
                            inputstyle='w-full text-[#737373] text-xs sm:text-sm outline-none py-[14px] sm:py-[18px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-xs sm:placeholder:text-sm placeholder:text-[#737373] pl-5 sm:pl-6'
                            borderstyle='w-full text-[#737373] text-xs sm:text-sm outline-none py-[14px] sm:py-[18px] rounded-2xl border border-red-800 bg-transparent placeholder:text-xs sm:placeholder:text-sm placeholder:text-[#737373] pl-5 sm:pl-6'
                            type='text'
                            id='username'
                            name='username'
                            placeholder='mail@simmmple.com' />
                        <div className='text-sm font-medium tracking-tight text-pink-light pt-5 sm:pt-6 pb-1 sm:pb-3'>Password<span className='text-[#DD69AA]'>*</span></div>
                        <InputField
                            inputstyle='w-full text-[#737373] text-xs sm:text-sm outline-none py-[14px] sm:py-[18px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-xs sm:placeholder:text-sm placeholder:text-[#737373] pl-5 sm:pl-6'
                            borderstyle='w-full text-[#737373] text-xs sm:text-sm outline-none py-[14px] sm:py-[18px] rounded-2xl border border-red-800 bg-transparent placeholder:text-xs sm:placeholder:text-sm placeholder:text-[#737373] pl-5 sm:pl-6'
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Min. 8 characters' />
                        <div className='flex py-7 sm:py-8 justify-between'>
                            <div className='flex gap-2 sm:gap-3'>
                                <InputField
                                    inputstyle='h-[14px] w-[14px] sm:h-[18px] sm:w-[18px] rounded-sm outline-none'
                                    type='checkbox'
                                    id='keepMeLogin'
                                    name='keepMeLogin' />
                                <div className='text-xs sm:text-sm font-normal tracking-tight text-pink-light'>Keep me logged in</div>
                            </div>
                            <Link to="/forgot">
                                <div className='text-xs  sm:text-sm font-medium tracking-tight text-pink-light text-left'>Forget password?
                                </div>
                            </Link>
                        </div>
                        <CustomButton
                            type='submit'
                            disabled={isLoading}
                            buttonStyle="sm:w-[410px] w-full py-[14px] sm:py-5 text-base sm:text-sm font-bold rounded-2xl text-pink-light bg-[#DD69AA]"
                            loaderSize={20}
                            showLoader>
                            Sign in
                        </CustomButton >
                    </div>
                </form>)}
            </Formik>
        </div >
    )
}

export default Login;