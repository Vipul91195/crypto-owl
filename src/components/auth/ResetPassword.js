import { Formik } from 'formik'
import React from 'react'
import { ResetPasswordValidationSchema } from '../../utils/FormValidations'
import CustomButton from '../forms/CustomButton'
import { InputField } from '../forms/InputField'

const ResetPassword = () => {


    return (
        <>
            <div className='bg-[#171717] flex flex-col items-center justify-center font-Sans w-screen h-screen'>
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
                            <div className='text-4xl text-pink-light leading-[56px] tracking-[-0.02em] font-bold text-left'>
                                Reset Your Password</div>
                            <div className='text-base leading-4 font-normal tracking-tight text-[#737373] text-left pt-9 pb-3'>
                                New Password </div>
                            <InputField
                                inputstyle='w-full text-[#737373] outline-none h-[50px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#737373] pl-6'
                                borderstyle='w-full text-[#737373] outline-none h-[50px] rounded-2xl border border-red-800  bg-transparent placeholder:text-sm placeholder:text-[#737373] pl-6'
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Min. 8 characters' />
                            <div className='text-base leading-4 font-normal tracking-tight text-[#737373] text-left pt-6 pb-3'>
                                Confirm Password</div>
                            <InputField
                                inputstyle='w-full text-[#737373] outline-none h-[50px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#737373] pl-6'
                                borderstyle='w-full text-[#737373] outline-none h-[50px] rounded-2xl border border-red-800  bg-transparent placeholder:text-sm placeholder:text-[#737373] pl-6'
                                type='password'
                                id='password'
                                name='passwordConfirmation'
                                placeholder='Min. 8 characters' />
                            <CustomButton
                                type='submit'
                                buttonStyle="w-[410px] h-[54px] text-sm font-bold rounded-2xl text-pink-light bg-[#DD69AA] mt-8">
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