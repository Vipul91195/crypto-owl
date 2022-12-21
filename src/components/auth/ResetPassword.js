import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { ResetPasswordValidationSchema } from '../../utils/FormValidations'
import CustomButton from '../forms/CustomButton'
import { InputField } from '../forms/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { resetPasswordApi } from '../../Redux/auth/loginSlice'
import { useNavigate } from 'react-router-dom'
import AuthMiddleware from '../AuthMiddleware'

const ResetPassword = () => {
    const { isLoading, forgotModal } = useSelector((state) => ({
        isLoading: state.loginSlice.isLoading,
        forgotModal: state.loginSlice.forgotModal,
    }));
    const initialValues = { password: "", passwordConfirmation : ""};
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleResetSubmit = (values) => {
        dispatch(resetPasswordApi({email: forgotModal?.email, password: values.password}));
    }
    useEffect(() => {
        !forgotModal?.email && navigate('/login');
    }, [forgotModal?.email, navigate])
    return (
        <AuthMiddleware >
            <div className='bg-[#171717] flex flex-col items-center h-screen py-[100px] sm:justify-center font-Sans w-screen px-5'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={ResetPasswordValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleResetSubmit}
                >
                    {({handleSubmit}) =>
                    (<form onSubmit={handleSubmit} >
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
                                id='passwordConfirmation'
                                name='passwordConfirmation'
                                placeholder='Min. 8 characters' />
                            <CustomButton
                                disabled={isLoading}
                                loaderSize={20}
                                showLoader={isLoading}
                                type='submit'
                                buttonStyle="sm:w-[410px] mt-7 sm:mt-8 w-full py-[14px] sm:py-5 text-base sm:text-sm font-bold rounded-2xl text-pink-light bg-[#DD69AA]">
                                Submit
                            </CustomButton >
                        </div>
                    </form>)}
                </Formik>
            </div >
        </AuthMiddleware>
    )
}

export default ResetPassword