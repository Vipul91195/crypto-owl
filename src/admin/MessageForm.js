import { Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomButton from '../components/forms/CustomButton';
import { InputField } from '../components/forms/InputField'
import { CloseFilled } from '../components/icons/CloseFilled';
import { closeModal, sendMessage } from '../Redux/commonSlice';
import { MessageFormValidationSchema } from '../utils/FormValidations';

const MessageForm = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.commonSlice);
    const { member_id } = useParams();

    const handleLoginSubmit = (values) => {
        member_id && dispatch(sendMessage({ to_user: member_id, ...values }));
    }

    const initialValues = { subject: "", message: "" };
    return (
        <div className='w-[304px] xl:w-[450px] 2xl:w-[597px]'>
            <div className='flex  justify-between bg-[#101010]  py-[2px] text-left text-xl leading-[36px] xl:text-[24px] xl:leading-[46px] 2xl:text-[34px] 2xl:leading-[56px] font-bold text-white tracking-tight px-[19px] xl:px-[25px] 2xl:pl-[29px]'>
                Message
            <button onClick={() => dispatch(closeModal())} className="cursor-pointer"><CloseFilled className="text-[#DD69AA] h-5 w-5 md:h-6 md:w-6 2xl:h-8 2xl:w-8" /></button>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={MessageFormValidationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleLoginSubmit}
            >
                {({ values, setFieldValue, handleSubmit }) =>
                (<form onSubmit={handleSubmit} >
                    <div className='pt-4 xl:pt-[12px] 2xl:pt-[26px] pb-6 bg-[#1C1C1C] px-[19px] xl:px-[25px] 2xl:px-[29px] '>
                        <div className='flex text-left flex-col gap-[14px] xl:gap-[20px] 2xl:gap-[35px]'>
                            <div>
                                <label className='text-[18px] xl:text-[22px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[14px] block'>Subject<span className='text-[#DD69AA]'>*</span></label>
                                {/* 
                                <label className="text-base md:text-[18px] xl:text-[28px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block"> */}
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm xl:text-[18px] 2xl:text-xl  font-normal tracking-[-0.02em] outline-none
                              py-[8px] xl:py-[10px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent  2xl:pl-[25px] pl-[15.56px]'
                                    borderstyle='w-full text-[#858383] text-sm xl:text-[18px] 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                                    py-[8px] xl:py-[10px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent  2xl:pl-[25px] pl-[15.56px]'
                                    errorRight={true}
                                    type='text'
                                    id='subject'
                                    name='subject'
                                    placeholder='Subject' />
                            </div>
                            <div>
                                <label className='text-[18px] xl:text-[22px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[14px] block'>Message<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm xl:text-[18px] 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                                    py-[35px] xl:py-[40px] 2xl:py-[90px]  rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent  2xl:pl-[25px] pl-[15.56px]'
                                    borderstyle='w-full text-[#858383] text-sm xl:text-[18px] 2xl:text-xl  font-normal tracking-[-0.02em] outline-none
                                    py-[35px] xl:py-[40px] 2xl:py-[90px]  rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent  2xl:pl-[25px] pl-[15.56px]'
                                    errorRight={true}
                                    type='text'
                                    id='message'
                                    name='message'
                                    placeholder='Message' />
                            </div>
                        </div>
                        <div>
                            <CustomButton className=""
                                type="submit"
                                showLoader={isLoading}
                                disabled={isLoading}
                                loaderSize={20}
                                buttonStyle="w-full py-[7.5px] xl:py-3 text-xl tracking-tight text-white font-bold rounded-[10px] bg-[#DD69AA] mt-6 xl:mt-8 2xl:mt-9 ">
                                Send
                            </CustomButton >
                        </div>
                    </div>
                </form>)}
            </Formik>
        </div>
    )
}
export default MessageForm