import { Formik } from 'formik'
import React from 'react'
import CustomButton from '../components/forms/CustomButton';
import { InputField } from '../components/forms/InputField'
import { CustomerFormValidationSchema } from '../utils/FormValidations';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer } from '../Redux/commonSlice';
import { getCSVTemplate } from '../Redux/customerSlice';
import { useParams } from 'react-router-dom';

const CustomerForm = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => ({
        isLoading: state.commonSlice.isLoading
    }));
    const { business_id } = useParams();

    const handleChange = (e, setFieldValue) => {
        const value = e.target.value.replace(/\D/g, "");
        setFieldValue(e.target.name, value);
    };

    const handleTemplateDownload = () => {
        console.log("download template clicked");
        dispatch(getCSVTemplate())
    }

    const handleLoginSubmit = (values) => {
        business_id && dispatch(addCustomer({ business_id: business_id, customer: values }));
    }
    const initialValues = { name: "", email: "", phone_no: "", address: "" };
    return (
        <div className='min-w-[304px] xl:min-w-[597px] w-full'>
            <div className='bg-[#101010] pt-1 2xl:h-[68px] xl:h-[50px]  text-left text-xl leading-9 text-white xl:text-3xl  2xl:text-[34px] 2xl:leading-[56px] font-bold xl:font-medium xl:text-[#CDBEBE] tracking-tight pl-5 xl:pl-[31px] '>
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
                    <div className='pt-[13px] pb-[25px] xl:pt-6 xl:pb-6 bg-[#1C1C1C] px-5 xl:px-[31.5px]'>
                        <div className='flex text-left flex-col gap-[14px] xl:gap-[30px] 2xl:gap-[35px]'>
                            <div>
                                <label className='text-sm xl:text-[28px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block'>Name<span className='text-[#DD69AA]'>*</span>
                                </label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-[10px] xl:text-xl font-normal tracking-[-0.02em] outline-none
                           py-[10px] xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                    borderstyle='w-full text-[#858383] text-[10px] xl:text-xl font-normal tracking-[-0.02em] outline-none
                           py-[10px] xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                    errorRight={true}
                                    type='text'
                                    id='name'
                                    name='name'
                                    placeholder='Name of the company' />
                            </div>
                            <div>
                                <label className='text-sm xl:text-[28px]  2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block'>Email ID<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-[10px] xl:text-xl font-normal tracking-[-0.02em] outline-none
                                       py-[10px] xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                    borderstyle='w-full text-[#858383] text-[10px] xl:text-xl font-normal tracking-[-0.02em] outline-none
                                       py-[10px] xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                    errorRight={true}
                                    type='text'
                                    id='email'
                                    name='email'
                                    placeholder='mail@simmmple.com' />
                            </div>
                            <div>
                                <label className='text-sm xl:text-[28px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block'>Phone<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    onChange={(e) => handleChange(e, setFieldValue)}
                                    inputstyle='w-full text-[#858383] text-[10px] xl:text-xl font-normal tracking-[-0.02em] outline-none
                                    py-[10px] xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                    borderstyle='w-full text-[#858383] text-[10px] xl:text-xl font-normal tracking-[-0.02em] outline-none
                                    py-[10px] xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                    errorRight={true}
                                    type='text'
                                    id='phone_no'
                                    name='phone_no'
                                    placeholder='000000000' />
                            </div>
                            <div>
                                <label className='text-sm xl:text-[28px]  2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block'>Address<span className='text-[#DD69AA]'>*</span></label>
                                <InputField
                                    inputstyle='w-full text-[#858383] text-[10px] xl:text-xl font-normal tracking-[-0.02em] outline-none
                                        py-[30px] 2xl:py-[35px] rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                    borderstyle='w-full text-[#858383] text-[10px] xl:text-xl font-normal tracking-[-0.02em] outline-none
                                        py-[30px] xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                    errorRight={true}
                                    type='text'
                                    id='address'
                                    name='address'
                                    placeholder='Address' />
                            </div>
                            <div className='flex gap-[25px] xl:gap-10 mt-[14px] xl:mt-[5px]'>
                                <CustomButton
                                    type="button"
                                    buttonStyle="w-full py-[3px] xl:h-[44.83px] text-sm leading-6 tracking-tight font-medium text-[#DD69AA] border border-[#DD69AA] rounded-[10px] xl:rounded-2xl"
                                >
                                    Bulk Upload
                                </CustomButton>
                                <CustomButton
                                    onClick={handleTemplateDownload}
                                    type="button"
                                    buttonStyle="w-full py-[3px] xl:h-[44.83px] text-sm leading-6 tracking-tight font-medium text-[#DD69AA] border border-[#DD69AA] rounded-[10px] xl:rounded-2xl"
                                >
                                    Template
                                </CustomButton>
                            </div>
                        </div>
                        <div>
                            <CustomButton className="text "
                                type='submit'
                                showLoader={isLoading}
                                disabled={isLoading}
                                loaderSize={20}
                                buttonStyle="w-full py-[7px] md:py-[5px] xl:py-[12px] text-xl xl:text-3xl tracking-tight text-pink-light font-bold rounded-[10px] xl:rounded-2xl bg-[#DD69AA] mt-[15px] xl:mt-7">
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