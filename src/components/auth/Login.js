// import { Formik } from 'formik'
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import googleLogo from '../../assets/img/googleLogo.svg'
// import { loginFetchAPi } from '../../Redux/auth/loginSlice'
// import { LoginValidationSchema } from '../../utils/FormValidations'
// import CustomButton from '../forms/CustomButton'
// import { InputField } from '../forms/InputField'

// const Login = () => {
//     const { isLoading } = useSelector((state) => ({
//         isLoading: state.loginSlice.isLoading,
//     }));
//     const dispatch = useDispatch();
//     return (
//         <div className='bg-[#171717] flex flex-col items-center py-10 h-screen justify-center font-Sans w-screen'>
//             <Formik
//                 initialValues={{ username: "", password: "" }}
//                 validationSchema={LoginValidationSchema}
//                 validateOnBlur={false}
//                 validateOnChange={false}
//                 onSubmit={(values) => {
//                     dispatch(loginFetchAPi(values));
//                 }}
//             >
//                 {(formik) =>
//                 (<form
//                     onSubmit={formik.handleSubmit}
//                 >
//                     <div className='max-w-[410px]'>
//                         <div className='ms:text-2xl ms:leading-[45px] sm:text-4xl text-pink-light sm:leading-[56px] tracking-[-0.02em] font-bold text-left'>Sign In</div>
//                         <div className='text-base leading-4 font-normal tracking-tight text-[#737373] text-left ms:pb-[26.12px] sm:pb-9'>Enter your email and password to sign in!</div>
//                         <a href='google' >
//                             <div className="flex justify-center items-center gap-3 ms:max-w-[332.11px]  sm:max-w-[410px] ms:h-[40px] sm:h-[50px] rounded-2xl text-pink-light bg-[#000000] text-sm">
//                                 <img src={googleLogo} height="18px" width="18px" alt="googleLogo" />
//                                 Sign in with Google
//                             </div>
//                         </a>
//                         <div className='flex ms:py-5 sm:py-6 items-center'>
//                             <div className='border-b w-full border-[#FFFFFF]/[10%]'></div>
//                             <div className='px-4 text-[#ADADAD] ms:text-xs sm:text-sm leading-5 tracking-tight font-medium'>or</div>
//                             <div className='border-b w-full border-[#FFFFFF]/[10%]'></div>
//                         </div>
//                         <div className='ms:text-base sm:text-sm font-medium tracking-tight text-pink-light ms:pb-1 sm:pb-3'>Email<span className='text-[#DD69AA]'>*</span></div>
//                         <InputField
//                             inputstyle='w-full text-[#737373] text-sm outline-none ms:h-[40px] sm:h-[50px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent ms:placeholder:text-xs sm:placeholder:text-sm placeholder:text-[#737373] ms:pl-5 sm:pl-6'
//                             borderstyle='w-full text-[#737373] text-sm outline-none ms:h-[40px] sm:h-[50px] rounded-2xl border border-red-800 bg-transparent ms:placeholder:text-xs sm:placeholder:text-sm placeholder:text-[#737373] ms:pl-5 sm:pl-6'
//                             type='text'
//                             id='username' border-red-800
//                             name='username'
//                             placeholder='mail@simmmple.com' />
//                         <div className='ms:text-base text-sm font-medium tracking-tight text-pink-light ms:pt-5 pt-7 sm:pb-3'>Password<span className='text-[#DD69AA]'>*</span></div>
//                         <InputField
//                             inputstyle='w-full text-[#737373] text-sm outline-none ms:h-[40px] sm:h-[50px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent ms:placeholder:text-xs sm:placeholder:text-sm placeholder:text-[#737373] ms:pl-5 sm:pl-6'
//                             borderstyle='w-full text-[#737373] text-sm outline-none ms:h-[40px] sm:h-[50px] rounded-2xl border border-red-800 bg-transparent ms:placeholder:text-xs sm:placeholder:text-sm placeholder:text-[#737373] ms:pl-5 sm:pl-6'
//                             type='password'
//                             id='password'
//                             name='password'
//                             placeholder='Min. 8 characters' />
//                         <div className='flex ms:py-[26px] sm:py-8 justify-between items-center'>
//                             <div className='flex gap-3 items-center'>
//                                 <InputField
//                                     inputstyle='ms:h-[14px] ms:w-[14px] sm:h-[18px] sm:w-[18px] rounded-sm outline-none flex'
//                                     type='checkbox'
//                                     id='checkbox'
//                                     name='checkbox' />
//                                 <div className='ms:text-xs sm:text-sm font-normal tracking-tight text-pink-light'>Keep me logged in</div>
//                             </div>
//                             <Link to="/forgot">
//                                 <div className='ms:text-xs sm:text-sm font-normal tracking-tight text-pink-light'>Forget password?
//                                 </div>
//                             </Link>
//                         </div>
//                         <CustomButton
//                             type='submit'
//                             disabled={isLoading}
//                             buttonStyle="w-full max-w-[410px] ms:h-[44px] sm:h-[54px] text-sm font-bold rounded-2xl text-white bg-[#DD69AA] tracking-tight"
//                             loaderSize={20}
//                             showLoader>
//                             Sign in
//                         </CustomButton >
//                     </div>
//                 </form>)}
//             </Formik>
//         </div >
//     )
// }

// export default Login

import { Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import googleLogo from '../../assets/img/googleLogo.svg'
import { loginFetchAPi } from '../../Redux/auth/loginSlice'
import { LoginValidationSchema } from '../../utils/FormValidations'
import CustomButton from '../forms/CustomButton'
import { InputField } from '../forms/InputField'

const Login = () => {
    const { isLoading } = useSelector((state) => ({
        isLoading: state.loginSlice.isLoading,
    }));
    const dispatch = useDispatch();
    return (
        <div className='bg-[#171717] flex flex-col items-center h-screen sm:min-h-[680px] lg:min-h-none justify-center font-Sans w-screen'>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={LoginValidationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={(values) => {
                    dispatch(loginFetchAPi(values));
                }}
            >
                {(formik) =>
                (<form
                    onSubmit={formik.handleSubmit}
                >
                    <div className='max-w-[410px]'>
                        <div className='text-2xl leading-[45px] tracking-[-0.02em] sm:text-4xl text-pink-light sm:leading-[56px] sm:tracking-[-0.02em] font-bold text-left'>Sign In</div>
                        <div className='text-base leading-4 font-normal tracking-tight text-[#737373] text-left pb-6 sm:pt-2 sm:pb-9'>Enter your email and password to sign in!</div>
                        <a href='google' >
                            <div className="flex justify-center items-center gap-3 h-[40px] text-sm w-full smax-w-[332px]  sm:max-w-[410px] sm:h-[50px] rounded-2xl text-pink-light bg-[#000000]">
                                <img src={googleLogo} height="20px" width="20px" alt="googleLogo" />
                                Sign in with Google
                            </div>
                        </a>
                        <div className='flex sm:py-6 items-center'>
                            <div className='border-b w-full border-[#FFFFFF]/[10%]'></div>
                            <div className='px-4 text-[#ADADAD] text-sm leading-5 tracking-tight font-medium'>or</div>
                            <div className='border-b w-full border-[#FFFFFF]/[10%]'></div>
                        </div>
                        {/* <div className='text-sm font-medium tracking-tight text-pink-light pb-3'>Email<span className='text-[#DD69AA]'>*</span></div>
                        <InputField
                            inputstyle='w-full text-[#737373] text-sm outline-none py-[18px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#737373] pl-6'
                            borderstyle='w-full text-[#737373] text-sm outline-none h-[50px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#737373]  pl-6'
                            type='text'
                            id='username'
                            name='username'
                            placeholder='mail@simmmple.com' />
                        <div className='text-sm font-medium tracking-tight text-pink-light pt-6 pb-3'>Password<span className='text-[#DD69AA]'>*</span></div>
                        <InputField
                            inputstyle='w-full text-[#737373] outline-none py-[18px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#737373] pl-6'
                            borderstyle='w-full text-[#737373] outline-none h-[50px] rounded-2xl border border-red-800  bg-transparent placeholder:text-sm placeholder:text-[#737373] pl-6'
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Min. 8 characters' />
                        <div className='flex py-8 justify-between'>
                            <div className='flex gap-3'>
                                <InputField
                                    inputstyle='h-[18px] w-[18px] rounded-sm outline-none'
                                    type='checkbox'
                                    id='checkbox'
                                    name='checkbox' />
                                <div className='text-sm  font-normal tracking-tight text-pink-light'>Keep me logged in</div>
                            </div>
                            <Link to="/Forgot">
                                <div className='text-sm font-medium tracking-tight text-pink-light text-left'>Forget password?
                                </div>
                            </Link>
                        </div>
                        <CustomButton
                            type='submit'
                            disabled={isLoading}
                            buttonStyle="w-[410px] py-5 text-sm font-bold rounded-2xl text-pink-light bg-[#DD69AA]
                           "
                            loaderSize={20}
                            showLoader>
                            Sign in
                        </CustomButton > */}
                    </div>
                </form>)}
            </Formik>
        </div >
    )
}

export default Login