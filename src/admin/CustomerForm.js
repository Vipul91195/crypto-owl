import { Formik } from 'formik'
import React from 'react'
import CustomButton from '../components/forms/CustomButton';
import { InputField } from '../components/forms/InputField'
import { CustomerFormValidationSchema } from '../utils/FormValidations';

const CustomerForm = () => {
    const handleChange = (e, setFieldValue) => {
        const value = e.target.value.replace(/\D/g, "");
        setFieldValue(e.target.name, value);
    };

    const handleLoginSubmit = (values) => {
    }
    const initialValues = { Name: "", Email: "", Phone: "", address: "" };
    return (
        <div className='2xl:min-w-[470px] w-full'>
            <div className='bg-[#141414] h-[56px] text-left text-xl leading-[56px] font-bold text-[#CDBEBE] tracking-tight pl-[30.95px] '>
                Add Customer
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={CustomerFormValidationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleLoginSubmit}
            >
                {({ values, setFieldValue, handleSubmit }) =>
                (<form onSubmit={handleSubmit} >
                    <div className=' pt-7 pb-11 bg-black px-[31.5px]'>
                        <div className='flex text-left flex-col gap-[14px]'>
                            <div>
                                <div className='text-sm font-medium tracking-tight text-pink-light pb-[13px]'>Name<span className='text-[#DD69AA]'>*</span></div>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[18px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[18px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='Name'
                                    name='Name'
                                    placeholder='name' />
                            </div>
                            <div>
                                <div className='text-sm font-medium tracking-tight text-pink-light pb-[13px]'>Email ID<span className='text-[#DD69AA]'>*</span></div>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='Email'
                                    name='Email'
                                    placeholder='mail@simmmple.com' />
                            </div>
                            <div>
                                <div className='text-sm font-medium tracking-tight text-pink-light pb-[13px]'>Phone<span className='text-[#DD69AA]'>*</span></div>
                                <InputField
                                    onChange={(e) => handleChange(e, setFieldValue)}
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='Phone'
                                    name='Phone'
                                    placeholder='000000000' />
                            </div>
                            <div>
                                <div className='text-sm font-medium tracking-tight text-pink-light pb-[13px]'>Address<span className='text-[#DD69AA]'>*</span></div>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[32px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[32px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='address'
                                    name='address'
                                    placeholder='Address' />
                            </div>
                            <div className='flex gap-10 mt-[34px]'>
                                <CustomButton
                                    buttonStyle="w-full h-[44.83px] text-sm leading-6 tracking-tight font-medium  text-[#DD69AA] border border-[#DD69AA] rounded-2xl"
                                >
                                    Bulk Upload
                                </CustomButton>
                                <a href={`${process.env.REACT_APP_PUBLIC_baseURL}/admin/template/`} >
                                    <CustomButton
                                        buttonStyle="w-full h-[44.83px]  text-sm leading-6 tracking-tight font-medium  text-[#DD69AA] border border-[#DD69AA] rounded-2xl"
                                    >
                                        Template
                                    </CustomButton>
                                </a>
                            </div>
                        </div>
                        <div>
                            <CustomButton
                                type='submit'
                                buttonStyle="w-full py-[17px] text-xl tracking-tight text-pink-light font-bold rounded-2xl bg-[#DD69AA] mt-7">
                                Invite
                            </CustomButton >
                        </div>
                    </div>
                </form>)}
            </Formik>
        </div>
    )
}
export default CustomerForm