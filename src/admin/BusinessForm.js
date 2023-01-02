import { Field, Formik } from 'formik'
import React from 'react'
import CustomButton from '../components/forms/CustomButton';
import { InputField } from '../components/forms/InputField'
import { BusinessFormValidationSchema } from '../utils/FormValidations';
import { useDispatch, useSelector } from 'react-redux';
import { addBusinesses } from '../Redux/commonSlice';
import { handleNumberOnly } from '../utils/helper';

const BusinessForm = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.commonSlice);

    const handleLoginSubmit = (values) => {
        const formData = new FormData();
        formData.append('business_name', values.business_name);
        formData.append('company_no', values.company_no);
        formData.append('owner_name', values.owner_name);
        formData.append('owner_email', values.owner_email);
        formData.append('vat_no', values.vat_no);
        formData.append('address', values.address);
        formData.append('business_logo', values.business_logo || '');
        dispatch(addBusinesses(formData));
    }
    const initialValues = { business_logo: null, business_name: "", company_no: "", owner_name: "", owner_email: "", vat_no: "", address: "" };
    return (
        <div className='min-w-[304px] max-w-[597px] 2xl:max-w-[1171px] w-[70vw] 3xl:w-full'>
            <div className='bg-[#141414] md:bg-[#101010]  pt-1 xl:pt-2 md:h-[48px] xl:h-[68px] text-left text-xl md:text-3xl leading-9 2xl:text-[34px] xl:leading-[56px] font-medium text-white xl:text-[#CDBEBE] tracking-tight pl-[20px] xl:pl-[31px]'>
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
                    <div className='pt-3 pb-6 xl:pt-[25px] xl:pb-11 bg-black xl:bg-[#1C1C1C] px-5 xl:px-[31.5px] '>
                        <div className='flex text-left flex-col gap-[14px] md:gap-[20px] 2xl:gap-[35px]'>
                            {/* <div>
                                <input id="file" name="business_logo" type="file" onChange={(event) => {
                                    setFieldValue("business_logo", event.currentTarget.files[0]);
                                }} />
                            </div> */}
                            <div>
                                <label className='whitespace-nowrap text-base md:text-[18px] font-medium tracking-tight text-pink-light 
                                pb-[8.47px] 2xl:text-[32px] xl:font-normal 2xl:pb-[20px] block'>Business<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-sm md:text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                                   py-[8px] md:py-[14px]  2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl  border border-[#FFFFFF]/[10%] bg-transparent xl:pl-[25px] pl-[15.56px]'
                                    borderstyle='w-full text-[#858383] text-sm md:text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                                   py-[8px] md:py-[14px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl  border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]'
                                    errorRight={true}
                                    type='text'
                                    id='business_name'
                                    name='business_name'
                                    placeholder='Name of the company' />
                            </div>
                            {/* <div className='xl:flex xl:flex-row xl:gap-[34px] flex flex-col gap-[14px]'> */}
                            <div className='grid xl:grid-cols-2 xl:gap-[34px] gap-[14px]'>
                                <div>
                                    <label className='whitespace-nowrap text-base md:text-[18px] font-medium tracking-tight text-pink-light pb-[8.47px] 2xl:text-[32px] xl:font-normal 2xl:pb-[20px] block'>Company Number<span className='text-[#DD69AA]'>*</span></label>
                                    <InputField
                                        inputstyle='w-full  text-[#858383] text-sm md:text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                                         py-[8px] md:py-[14px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl  border border-[#FFFFFF]/[10%] bg-transparent xl:pl-[25px] pl-[15.56px]'
                                        borderstyle='w-full  text-[#858383] text-sm md:text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                                         py-[8px] md:py-[14px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl  border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]'
                                        errorRight={true}
                                        type='text'
                                        onChange={(e) => handleNumberOnly(e, setFieldValue)}
                                        id='company_no'
                                        name='company_no'
                                        placeholder='000000000' />
                                </div>
                                <div>
                                    <label className='whitespace-nowrap text-base md:text-[18px] font-medium tracking-tight text-pink-light pb-[8.47px] 2xl:text-[32px] xl:font-normal 2xl:pb-[20px] block'>Owner&apos;s Name<span className='text-[#DD69AA]'>*</span></label>
                                    <InputField
                                        inputstyle='w-full  text-[#858383] text-sm md:text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                              py-[8px] md:py-[14px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl  border border-[#FFFFFF]/[10%] bg-transparent xl:pl-[25px] pl-[15.56px]'
                                        borderstyle='w-full  text-[#858383] text-sm md:text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                              py-[8px] md:py-[14px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl  border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]'
                                        errorRight={true}
                                        type='text'
                                        id='owner_name'
                                        name='owner_name'
                                        placeholder='Name' />
                                </div>
                            </div>
                            {/* <div className='xl:flex xl:flex-row xl:gap-[34px] flex flex-col gap-[14px]'> */}
                            <div className='grid xl:grid-cols-2 xl:gap-[34px] gap-[14px]'>
                                <div>
                                    <label className='whitespace-nowrap text-base md:text-[18px] font-medium tracking-tight text-pink-light pb-[8.47px] 2xl:text-[32px] xl:font-normal 2xl:pb-[20px] block'>Owner&apos;s Email ID<span className='text-[#DD69AA]'>*</span></label>
                                    <InputField
                                        inputstyle='w-full  text-[#858383] text-sm md:text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                                      py-[8px] md:py-[14px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl  border border-[#FFFFFF]/[10%] bg-transparent xl:pl-[25px] pl-[15.56px]'
                                        borderstyle='w-full  text-[#858383] text-sm md:text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                                      py-[8px] md:py-[14px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl  border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]'
                                        errorRight={true}
                                        type='text'
                                        id='owner_email'
                                        name='owner_email'
                                        placeholder='mail@simmmple.com' />
                                </div>
                                <div>
                                    <label className='whitespace-nowrap text-base md:text-[18px] font-medium tracking-tight text-pink-light pb-[8.47px] 2xl:text-[32px] 2xl:pb-[20px] block'>VAT Number<span className='text-[#DD69AA]'>*</span></label>
                                    <InputField
                                        inputstyle='w-full  text-[#858383] text-sm md:text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                                       py-[8px] md:py-[14px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl  border border-[#FFFFFF]/[10%] bg-transparent xl:pl-[25px] pl-[15.56px]'
                                        borderstyle='w-full  text-[#858383] text-sm md:text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                                       py-[8px] md:py-[14px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl  border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]'
                                        errorRight={true}
                                        type='text'
                                        id='vat_no'
                                        name='vat_no'
                                        placeholder='000000000' />
                                </div>
                            </div>
                            <div>
                                <label className='whitespace-nowrap text-base md:text-[18px] font-medium tracking-tight text-pink-light pb-[8.47px] 2xl:text-[32px] xl:font-normal 2xl:pb-[20px] block'>Address<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    // inputstyle='w-full text-[#858383] text-sm xl:text-sm font-normal tracking-[-0.02em] outline-none py-[20px] xl:py-[43px] rounded-[10px] 2xl:rounded-2xl  border border-[#FFFFFF]/[10%] bg-transparent placeholder:text-[10px] xl:placeholder:text-sm placeholder:text-[#858383] pl-[15.56px] xl:pl-6'
                                    // borderstyle='w-full text-[#858383] text-sm xl:text-sm font-normal tracking-[-0.02em] outline-none py-[20px] xl:py-[43px] rounded-[10px] 2xl:rounded-2xl  border border-red-800 bg-transparent placeholder:text-[10px] xl:placeholder:text-sm placeholder:text-[#858383] pl-[15.56px] xl:pl-6'
                                    inputstyle='w-full  text-[#858383] text-sm md:text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                                    py-[20px] md:py-[30px] xl:py-[43px] rounded-[10px] 2xl:rounded-2xl  border border-[#FFFFFF]/[10%] bg-transparent xl:pl-[25px] pl-[15.56px]'
                                    borderstyle='w-full  text-[#858383] text-sm md:text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                                    py-[20px] md:py-[30px] xl:py-[43px] rounded-[10px] 2xl:rounded-2xl  border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]'
                                    errorRight={true}
                                    type='text'
                                    id='address'
                                    name='address'
                                    placeholder='Address' />
                            </div>
                        </div>
                        <div>
                            <div className='md:grid grid-cols-2 xl:gap-[34px] gap-[14px] flex justify-center'>
                                <CustomButton
                                    showLoader={isLoading}
                                    disabled={isLoading}
                                    loaderSize={20}
                                    type='submit'
                                    className="text-xl"
                                    buttonStyle="w-full py-[7.5px] 2xl:py-[12px] text-xl tracking-tight text-white xl:text-pink-light font-bold rounded-[10px] 2xl:rounded-2xl  
                                    bg-[#DD69AA] mt-[29.6px] xl:mt-8">
                                    Invite
                                </CustomButton >
                            </div>
                        </div>
                    </div>
                </form>)}
            </Formik>
        </div >
    )
}
export default BusinessForm