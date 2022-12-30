import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { ForgotValidationSchema, otpValidationSchema } from '../../utils/FormValidations'
import CustomButton from '../forms/CustomButton'
import { InputField } from '../forms/InputField'
import VerifyOtpModal from '../VerifyOtpModal'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { forgotEmailApi, forgotOtpVerifyApi, loginFetchAPi } from '../../Redux/auth/loginSlice'
import AuthMiddleware from '../AuthMiddleware';
import Loader from '../loader/Loader';



const Forgot = () => {
    const { isLoading, forgotModal } = useSelector((state) => ({
        isLoading: state.loginSlice.isLoading,
        forgotModal: state.loginSlice.forgotModal,
    }));
    const initialValues = { email: "" };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("")
    const handleOtp = (otp) => setOtp(otp)
    const handleForgotSubmit = (values) => {
        dispatch(forgotEmailApi(values));
    }
    const handleOtpVerify = (e) => {
        e.preventDefault();
        dispatch(forgotOtpVerifyApi({ email: forgotModal?.email, otp }));
        setOtp('');
    }
    useEffect(() => {
        forgotModal.otpVerified && navigate('/reset-password');
    }, [forgotModal.otpVerified, navigate]);
    if (isLoading) return <Loader />
    return (
        <AuthMiddleware >
            <div className='bg-[#171717] flex flex-col items-center h-screen py-[100px] sm:justify-center font-Sans w-screen px-5'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={ForgotValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleForgotSubmit}
                >
                    {({ handleSubmit }) =>
                    (<form
                        onSubmit={handleSubmit}
                    >
                        <div className='max-w-[410px] '>
                            <div className='text-2xl leading-[45px] tracking-[-0.02em] lg:text-3xl 2xl:text-4xl text-pink-light 2xl:leading-[56px] 2xl:tracking-[-0.02em] font-bold text-left '>Forgot Password</div>
                            {/* <div className='text-2xl leading-[45px] tracking-[-0.02em] sm:text-4xl text-pink-light sm:leading-[56px] sm:tracking-[-0.02em] font-bold text-left'>Forgot Password</div> */}
                            <div className='text-base leading-4 font-normal tracking-tight text-[#737373] text-left pb-6 sm:pt-2 sm:pb-9 w-[350px]'>Enter your register email id here, We have sent an OTP on your register email id.</div>
                            <div className='text-base pb-1 sm:text-sm font-medium tracking-tight text-pink-light 2xl:pb-3'>Email<span className='text-[#DD69AA]'>*</span></div>
                            <InputField
                                inputstyle='w-full text-[#737373] text-xs 2xl:text-sm outline-none py-[14px]  2xl:py-[18px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-xs 2xl:placeholder:text-sm placeholder:text-[#737373] pl-5 2xl:pl-6'
                                borderstyle='w-full text-[#737373] text-xs 2xl:text-sm outline-none py-[14px] 2xl:py-[18px] rounded-2xl border border-red-800 bg-transparent placeholder:text-xs 2xl:placeholder:text-sm placeholder:text-[#737373] pl-5 2xl:pl-6'
                                type='text'
                                id='email'
                                name='email'
                                placeholder='mail@simmmple.com' />
                            <CustomButton
                                disabled={isLoading}
                                loaderSize={20}
                                showLoader={isLoading}
                                type='submit'
                                // buttonStyle="sm:w-[410px] mt-7 sm:mt-8 w-full py-[14px] sm:py-5 text-base sm:text-sm font-bold rounded-2xl text-pink-light bg-[#DD69AA]">
                                buttonStyle="mt-7 2xl:w-[410px] w-full py-[14px] 2xl:py-5 text-base sm:text-sm font-bold rounded-2xl text-pink-light bg-[#DD69AA]">
                                Submit
                            </CustomButton >
                        </div>
                    </form>)}
                </Formik>
                <div>
                    <VerifyOtpModal modal={forgotModal} onClose={() => { }} >
                        <div className="p-[10px] sm:p-[50px] flex flex-col gap-[40px] items-center bg-[#171717] border max-w-[500px] rounded-[10px]">
                            <form
                                onSubmit={handleOtpVerify}
                            >
                                <div className='flex flex-col items-center gap-6 sm:gap-10'>
                                    <div>
                                        <p className="text-center text-white text-xs sm:text-xl font-normal leading-[21px] tracking-wide">
                                            Please check your email. We sent a OTP on your register email
                                            id.
                                        </p>
                                    </div>
                                    <OtpInput
                                        inputStyle="text-xl sm:!p-2 sm:!w-[35px] rounded-[5px]"
                                        value={otp}
                                        isInputNum={true}
                                        onChange={handleOtp}
                                        numInputs={6}
                                        separator={<span>-</span>}
                                    />
                                    <CustomButton
                                        type='submit'
                                        loaderSize={15}
                                        showLoader={isLoading}
                                        disabled={otp.length < 6 || isLoading}
                                        buttonStyle="w-[90px] mt-[20px] h-[40px] text-sm font-bold rounded-2xl text-pink-light bg-[#DD69AA]">
                                        Submit
                                    </CustomButton >
                                </div>
                            </form>
                        </div>
                    </VerifyOtpModal>
                </div >
            </div >
        </AuthMiddleware>
    )
}
export default Forgot