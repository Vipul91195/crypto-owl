import { Formik } from 'formik'
import React from 'react'
import CustomButton from '../components/forms/CustomButton';
import { InputField } from '../components/forms/InputField'
import { BusinessFormValidationSchema } from '../utils/FormValidations';

const BusinessForm = () => {
    const handleChange = (e, setFieldValue) => {
        const value = e.target.value.replace(/\D/g, "");
        setFieldValue(e.target.name, value);
    };

    const handleLoginSubmit = (values) => {
    }
    const initialValues = { business: "", companyNumber: "", ownerName: "", ownerEmail: "", vatNumber: "", address: "" };
    return (
        <div className='2xl:min-w-[470px] w-full'>
            <div className='bg-[#141414] h-[56px] text-left text-xl leading-[56px] font-bold text-[#CDBEBE] tracking-tight pl-[30.95px] '>
                Add Business
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={BusinessFormValidationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleLoginSubmit}
            >
                {({ values, setFieldValue, handleSubmit }) =>
                (<form onSubmit={handleSubmit} >
                    <div className='pt-7 pb-11 bg-black px-[31.5px] '>
                        <div className='flex text-left flex-col gap-[14px]'>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px]'>Business<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[18px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[18px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='business'
                                    name='business'
                                    placeholder='Name of the company' />
                            </div>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px]'>Company Number<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    onChange={(e) => handleChange(e, setFieldValue)}
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='companyNumber'
                                    name='companyNumber'
                                    placeholder='000000000' />
                            </div>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px]'>Owner&apos;s Name<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='ownerName'
                                    name='ownerName'
                                    placeholder='Name' />
                            </div>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px]'>Owner&apos;s Email ID<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='ownerEmail'
                                    name='ownerEmail'
                                    placeholder='mail@simmmple.com' />
                            </div>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px]'>VAT Number<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='vatNumber'
                                    name='vatNumber'
                                    placeholder='000000000' />
                            </div>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px]'>Address<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[32px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[32px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='address'
                                    name='address'
                                    placeholder='Address' />
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
export default BusinessForm