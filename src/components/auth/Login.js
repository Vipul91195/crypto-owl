import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import googleLogo from '../../assets/img/googleLogo.svg'
import { loginFetchAPi } from '../../Redux/auth/loginSlice'
import { LoginValidationSchema } from '../../utils/FormValidations'
import CustomButton from '../forms/CustomButton'
import { InputField } from '../forms/InputField'
import AuthMiddleware from '../AuthMiddleware'

const Login = () => {
    const { isLoading, token } = useSelector((state) => ({
        isLoading: state.loginSlice.isLoading,
        token: state.loginSlice.allData?.token?.access,
    }));
    const initialValues = { username: "", password: "", keepMeLogin: false };
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const handleLoginSubmit = (values) => {
        dispatch(loginFetchAPi(values));
    }
    // useEffect(() => {
    //     token && navigate('/');
    // }, [navigate, token])
    return (
        <AuthMiddleware >
            <div className='bg-[#171717] flex flex-col items-center h-screen 2xl:min-h-[680px] lg:min-h-none justify-center font-Sans w-full'>
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
                            <div className='text-2xl leading-[45px] tracking-[-0.02em] lg:text-3xl 2xl:text-4xl text-pink-light 2xl:leading-[56px] 2xl:tracking-[-0.02em] font-bold text-left'>Sign In</div>
                            <div className='text-base leading-4 font-normal tracking-tight text-[#737373] text-left lg"pt-1 pb-6 2xl:pt-2 2xl:pb-9'>Enter your email and password to sign in!</div>
                            <a href='google' >
                                <div className="flex justify-center items-center gap-3 h-[40px] text-sm w-full lg:max-w-[350px]  2xl:max-w-[410px] sm:h-[50px] rounded-2xl text-pink-light bg-[#000000]">
                                    <img src={googleLogo} height="20px" width="20px" alt="googleLogo" />
                                    Sign in with Google
                                </div>
                            </a>
                            <div className='flex py-5 2xl:py-6 items-center'>
                                <div className='border-b w-full border-[#FFFFFF]/[10%]'></div>
                                <div className='px-4 text-[#ADADAD] text-sm leading-5 tracking-tight font-medium'>or</div>
                                <div className='border-b w-full border-[#FFFFFF]/[10%]'></div>
                            </div>
                            <div className='text-base pb-1 sm:text-sm font-medium tracking-tight text-pink-light 2xl:pb-3'>Email<span className='text-[#DD69AA]'>*</span></div>
                            <InputField
                                inputstyle='w-full text-[#737373] text-xs 2xl:text-sm outline-none py-[14px]  2xl:py-[18px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-xs 2xl:placeholder:text-sm placeholder:text-[#737373] pl-5 2xl:pl-6'
                                borderstyle='w-full text-[#737373] text-xs 2xl:text-sm outline-none py-[14px] 2xl:py-[18px] rounded-2xl border border-red-800 bg-transparent placeholder:text-xs 2xl:placeholder:text-sm placeholder:text-[#737373] pl-5 2xl:pl-6'
                                type='text'
                                id='username'
                                name='username'
                                placeholder='mail@simmmple.com' />
                            <div className='text-sm font-medium tracking-tight text-pink-light pt-5 lg:pt-4 2xl:pt-6 pb-1 2xl:pb-3'>Password<span className='text-[#DD69AA]'>*</span></div>
                            <InputField
                                inputstyle='w-full text-[#737373] text-xs 2xl:text-sm outline-none py-[14px] 2xl:py-[18px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-xs 2xl:placeholder:text-sm placeholder:text-[#737373] pl-5 2xl:pl-6'
                                borderstyle='w-full text-[#737373] text-xs 2xl:text-sm outline-none py-[14px] 2xl:py-[18px] rounded-2xl border border-red-800 bg-transparent placeholder:text-xs 2xl:placeholder:text-sm placeholder:text-[#737373] pl-5 2xl:pl-6'
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Min. 8 characters' />
                            <div className='flex py-7 lg:py-6 2xl:py-8 justify-between'>
                                <div className='flex gap-2 sm:gap-3'>
                                    <InputField
                                        inputstyle='h-[14px] w-[14px] sm:h-[18px] sm:w-[18px] rounded-sm outline-none'
                                        type='checkbox'
                                        id='keepMeLogin'
                                        name='keepMeLogin' />
                                    <p className='text-xs whitespace-nowrap sm:text-sm font-normal tracking-tight text-pink-light'>Keep me logged in</p>
                                </div>
                                <Link to="/forgot">
                                    <p className='text-xs  sm:text-sm font-medium tracking-tight text-pink-light text-left'>Forget password?
                                    </p>
                                </Link>
                            </div>
                            <CustomButton
                                type='submit'
                                disabled={isLoading}
                                buttonStyle="lg:w-[350px] 2xl:w-[410px] w-full py-[14px] 2xl:py-5 text-base sm:text-sm font-bold rounded-2xl text-pink-light bg-[#DD69AA]"
                                loaderSize={20}
                                showLoader>
                                Sign in
                            </CustomButton >
                        </div>
                    </form>)}
                </Formik>
            </div >
        </AuthMiddleware>
    )
}

export default Login;