import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { ForgotValidationSchema, otpValidationSchema } from '../../utils/FormValidations'
import CustomButton from '../forms/CustomButton'
import { InputField } from '../forms/InputField'
import VerifyOtpModal from '../VerifyOtpModal'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { forgotEmailAPi, loginFetchAPi } from '../../Redux/auth/loginSlice'



const Forgot = () => {
    const { isLoading, forgotModal } = useSelector((state) => ({
        isLoading: state.loginSlice.isLoading,
        forgotModal: state.loginSlice.forgotModal,
    }));
    const dispatch = useDispatch();

    const [otp, setOtp] = useState("")
    const handleOtp = (otp) => setOtp(otp)

    return (
        <div className='bg-[#171717] flex flex-col items-center justify-center font-Sans w-screen h-screen'>
            <Formik
                initialValues={{ email: "" }}
                validationSchema={ForgotValidationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={(values) => {
                    dispatch(forgotEmailAPi(values));
                }}
            >
                {(formik) =>
                (<form
                    onSubmit={formik.handleSubmit}
                >
                    <div className='max-w-[410px]'>
                        <div className='text-4xl text-pink-light leading-[56px] tracking-[-0.02em] font-bold text-left'>Forgot Password</div>
                        <div className='text-base leading-4 font-normal tracking-tight text-[#737373] text-left pt-2 pb-9'>Enter your register email id here, we will send OTP on your register email id.</div>

                        <div className='text-sm font-medium tracking-tight text-pink-light pt-7 pb-3'>Email<span className='text-[#DD69AA]'>*</span></div>
                        <InputField
                            inputstyle='w-full text-[#737373] text-sm outline-none h-[50px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#737373]  pl-6'
                            borderstyle='w-full text-[#737373] text-sm outline-none h-[50px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#737373] pl-6'
                            type='text'
                            id='email'
                            name='email'
                            placeholder='mail@simmmple.com' />
                        <CustomButton
                            disabled={isLoading}
                            loaderSize={20}
                            showLoader={isLoading}
                            type='submit'
                            buttonStyle="w-[410px] h-[54px] mt-8 text-sm font-bold rounded-2xl text-pink-light bg-[#DD69AA]">
                            Submit
                        </CustomButton >
                    </div>
                </form>)}
            </Formik>
            <div>
                <VerifyOtpModal modal={forgotModal} onClose={() => { }} >
                    <div className="p-[50px] flex flex-col gap-[40px] items-center bg-[#171717] border max-w-[500px] rounded-[10px]">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert(otp.length);
                            }}
                        >
                            <div className='flex flex-col items-center gap-10'>
                                <div>
                                    <p className="text-center text-white text-xl font-normal leading-[21px] tracking-wide">
                                        Please check your email. We sent a OTP on your register email
                                        id.
                                    </p>
                                </div>
                                <OtpInput
                                    inputStyle="text-xl !p-2 !w-[35px] rounded-[5px]"
                                    value={otp}
                                    isInputNum={true}
                                    onChange={handleOtp}
                                    numInputs={6}
                                    separator={<span>-</span>}
                                />
                                <CustomButton
                                    type='submit'
                                    disabled={otp.length < 6}

                                    buttonStyle="w-[90px] mt-[20px] h-[40px] text-sm font-bold rounded-2xl text-pink-light bg-[#DD69AA]">
                                    Submit
                                </CustomButton >
                            </div>
                        </form>
                    </div>
                </VerifyOtpModal>
            </div >
        </div >
    )
}
export default Forgot