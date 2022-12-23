import { Field, Formik } from 'formik'
import React from 'react'
import CustomButton from '../components/forms/CustomButton';
import { InputField } from '../components/forms/InputField'
import { BusinessFormValidationSchema } from '../utils/FormValidations';
import { useDispatch } from 'react-redux';
import { addBusinesses } from '../Redux/businessSlice';

const BusinessForm = () => {
    const dispatch = useDispatch();

    const handleChange = (e, setFieldValue) => {
        const value = e.target.value.replace(/\D/g, "");
        setFieldValue(e.target.name, value);
    };

    const handleLoginSubmit = (values) => {
        console.log(values);
        const formData = new FormData();
        formData.append('business_name', values.business_name);
        formData.append('company_no', values.company_no);
        formData.append('owner_name', values.owner_name);
        formData.append('owner_email', values.owner_email);
        formData.append('vat_no', values.vat_no);
        formData.append('address', values.address);
        values?.business_logo && 
        formData.append('business_logo', values.business_logo);
        dispatch(addBusinesses(formData));
    }
    const initialValues = {business_logo: null, business_name: "", company_no: "", owner_name: "", owner_email: "", vat_no: "", address: "" };
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
                (<form onSubmit={handleSubmit} 
                encType="multipart/form-data"
                // encType="multipart/form"
                >
                    <div className='pt-7 pb-11 bg-black px-[31.5px] '>
                        <div className='flex text-left flex-col gap-[14px]'>
                            <div>
                                <input id="file" name="business_logo" type="file" onChange={(event) => {
                                    setFieldValue("business_logo", event.currentTarget.files[0]);
                                    }} />
                            </div>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px] block'>Business<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[18px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[18px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='business_name'
                                    name='business_name'
                                    placeholder='Name of the company' />
                            </div>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px] block'>Company Number<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    onChange={(e) => handleChange(e, setFieldValue)}
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='company_no'
                                    name='company_no'
                                    placeholder='000000000' />
                            </div>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px] block'>Owner&apos;s Name<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='owner_name'
                                    name='owner_name'
                                    placeholder='Name' />
                            </div>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px] block'>Owner&apos;s Email ID<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='owner_email'
                                    name='owner_email'
                                    placeholder='mail@simmmple.com' />
                            </div>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px] block'>VAT Number<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    borderstyle='w-full text-[#858383] text-sm font-normal tracking-[-0.02em] outline-none py-[16px] rounded-2xl border border-red-800 bg-transparent placeholder:text-sm placeholder:text-[#858383] pl-6'
                                    errorRight={true}
                                    type='text'
                                    id='vat_no'
                                    name='vat_no'
                                    placeholder='000000000' />
                            </div>
                            <div>
                                <label className='text-sm font-medium tracking-tight text-pink-light pb-[13px] block'>Address<span className='text-[#DD69AA]'>*</span></label>
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