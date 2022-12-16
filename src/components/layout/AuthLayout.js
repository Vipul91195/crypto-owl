import { Formik } from 'formik'
import React from 'react'
import googleLogo from '../../assets/img/googleLogo.svg'
import { LoginValidationSchema } from '../../utils/FormValidations'
import CustomButton from '../forms/CustomButton'
import { InputField } from '../forms/InputField'

const AuthLayout = () => {
    return (
        <div className='bg-[#171717] flex flex-col items-center justify-center font-Sans w-screen h-screen'>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginValidationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {(formik) =>
                (<form
                    onSubmit={formik.handleSubmit}
                >
                    <div className='max-w-[410px]'>
                        <div className='text-4xl text-pink-light leading-[56px] tracking-[-0.02em] font-bold text-left'>Sign In</div>
                        <div className='text-base leading-4 font-normal tracking-tight text-[#737373] text-left pt-2 pb-9'>Enter your email and password to sign in!</div>
                        <a href='google' >
                            <div className="flex justify-center items-center gap-3 max-w-[410px] h-[50px] rounded-2xl text-pink-light bg-[#000000]">
                                <img src={googleLogo} height="18px" width="18px" alt="googleLogo" />
                                Sign in with Google
                            </div>
                        </a>
                        <div className='flex pt-10 items-center'>
                            <div className='border-b w-full border-[#FFFFFF]/[10%]'></div>
                            <div className='px-4 text-[#ADADAD] text-sm leading-5 tracking-tight font-medium'>or</div>
                            <div className='border-b w-full border-[#FFFFFF]/[10%]'></div>
                        </div>
                        <div className='text-sm font-medium tracking-tight text-pink-light pt-7 pb-3'>Email<span className='text-[#DD69AA]'>*</span></div>
                        <InputField
                            inputstyle='w-full text-[#737373] text-sm outline-none h-[50px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#737373]  pl-6'
                            borderstyle='w-full text-[#737373] text-sm outline-none h-[50px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#737373]  pl-6'
                            type='text'
                            id='email'
                            name='email'
                            placeholder='mail@simmmple.com' />
                        <div className='text-sm font-medium tracking-tight text-pink-light pt-7 pb-3'>Password<span className='text-[#DD69AA]'>*</span></div>
                        <InputField
                            inputstyle='w-full text-[#737373] outline-none h-[50px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#737373] pl-6'
                            borderstyle='w-full text-[#737373] outline-none h-[50px] rounded-2xl border border-red-800  bg-transparent placeholder:text-sm placeholder:text-[#737373] pl-6'
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Min. 8 characters' />
                        <div className='flex pt-8 pb-8 justify-between'>
                            <div className='flex gap-3'>
                                <InputField
                                    inputstyle='h-[18px] w-[18px] rounded-sm outline-none'
                                    type='checkbox'
                                    id='checkbox'
                                    name='checkbox' />
                                <div className='text-sm font-normal tracking-tight text-pink-light'>Keep me logged in</div>
                            </div>
                            <a href='f'><div className='text-sm font-medium tracking-tight text-pink-light text-left'>Forget password?</div></a>
                        </div>
                        <CustomButton
                            type='submit'
                            buttonStyle="w-[410px] h-[54px] text-sm font-bold rounded-2xl text-pink-light bg-[#DD69AA]">
                            Sign in
                        </CustomButton >
                    </div>
                </form>)}
            </Formik>
        </div >
    )
}

export default AuthLayout