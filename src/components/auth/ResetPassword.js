import { Formik } from 'formik'
import React from 'react'
import { ResetPasswordValidationSchema } from '../../utils/FormValidations'
import CustomButton from '../forms/CustomButton'
import { InputField } from '../forms/InputField'

const ResetPassword = () => {


    return (
        <>
            <div className='bg-[#171717] flex flex-col items-center h-screen justify-center font-Sans w-screen px-5'>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={ResetPasswordValidationSchema}
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
                            <div className='text-2xl leading-[45px] tracking-[-0.02em] sm:text-4xl text-pink-light sm:leading-[56px] sm:tracking-[-0.02em] font-bold text-left w-[350px]'>
                                Reset Your Password</div>
                            <div className='text-sm font-medium tracking-tight text-pink-light pt-5 sm:pt-6 pb-1 sm:pb-3'>
                                New Password <span className='text-[#DD69AA]'>*</span></div>
                            <InputField
                                inputstyle='w-full text-[#737373] text-xs sm:text-sm outline-none py-[14px] sm:py-[18px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-xs sm:placeholder:text-sm placeholder:text-[#737373] pl-5 sm:pl-6'
                                borderstyle='w-full text-[#737373] text-xs sm:text-sm outline-none py-[14px] sm:py-[18px] rounded-2xl border border-red-800 bg-transparent placeholder:text-xs sm:placeholder:text-sm placeholder:text-[#737373] pl-5 sm:pl-6'
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Min. 8 characters' />
                            <div className='text-sm font-medium tracking-tight text-pink-light pt-5 sm:pt-6 pb-1 sm:pb-3'>
                                Confirm Password<span className='text-[#DD69AA]'>*</span></div>
                            <InputField
                                inputstyle='w-full text-[#737373] text-xs sm:text-sm outline-none py-[14px] sm:py-[18px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-xs sm:placeholder:text-sm placeholder:text-[#737373] pl-5 sm:pl-6'
                                borderstyle='w-full text-[#737373] text-xs sm:text-sm outline-none py-[14px] sm:py-[18px] rounded-2xl border border-red-800 bg-transparent placeholder:text-xs sm:placeholder:text-sm placeholder:text-[#737373] pl-5 sm:pl-6'
                                type='password'
                                id='password'
                                name='passwordConfirmation'
                                placeholder='Min. 8 characters' />
                            <CustomButton
                                type='submit'
                                buttonStyle="sm:w-[410px] mt-7 sm:mt-8 w-full py-[14px] sm:py-5 text-base sm:text-sm font-bold rounded-2xl text-pink-light bg-[#DD69AA]">
                                Submit
                            </CustomButton >
                        </div>
                    </form>)}
                </Formik>
            </div >
        </>
    )
}

export default ResetPassword