import { Formik } from 'formik'
import React from 'react'
import CustomButton from '../components/forms/CustomButton';
import { InputField } from '../components/forms/InputField'
import { MessageFormValidationSchema } from '../utils/FormValidations';

const MessageForm = () => {
    const handleLoginSubmit = (values) => {
    }
    const initialValues = { subject: "", message: "" };
    return (
        <div className='2xl:min-w-[470px] w-full'>
            <div className='bg-[#141414] text-left text-xl leading-[56px] font-bold text-[#CDBEBE] tracking-tight pl-[34px] '>
                Message
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={MessageFormValidationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleLoginSubmit}
            >
                {({ handleSubmit }) =>
                (<form onSubmit={handleSubmit} >
                    <div className='pt-5 pb-11 bg-black px-[31.5px] '>
                        <div className='flex text-left flex-col gap-[14px]'>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px] block'>Subject<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:font-normal placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-red-800 bg-transparent placeholder:font-normal placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='subject'
                                    name='subject'
                                    placeholder='Subject' />
                            </div>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px] block'>Message<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[46px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:font-normal placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[46px] rounded-2xl border border-red-800 bg-transparent placeholder:font-normal placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='message'
                                    name='message'
                                    placeholder='Message' />
                            </div>
                        </div>
                        <div>
                            <CustomButton
                                type='submit'
                                buttonStyle="w-full py-[17px] text-xl tracking-tight text-pink-light font-bold rounded-2xl bg-[#DD69AA] mt-7">
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