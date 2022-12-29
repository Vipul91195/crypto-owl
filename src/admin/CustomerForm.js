import { Formik } from 'formik'
import React, { useState } from 'react'
import CustomButton from '../components/forms/CustomButton';
import { InputField } from '../components/forms/InputField'
import { BulkUploadValidations, CustomerFormValidationSchema } from '../utils/FormValidations';
import { useDispatch, useSelector } from 'react-redux';
import { addBulkCustomer, addCustomer } from '../Redux/commonSlice';
import { getCSVTemplate } from '../Redux/customerSlice';
import { useParams } from 'react-router-dom';

const CustomerForm = () => {
  const dispatch = useDispatch();
  const [bulkUpload, setBulkUpload] = useState(false);
  const [fileError, setFileError] = useState(null);
  const { isLoading } = useSelector(state => ({
    isLoading: state.commonSlice.isLoading
  }));
  const { business_id } = useParams();

  const handleChange = (e, setFieldValue) => {
    const value = e.target.value.replace(/\D/g, "");
    setFieldValue(e.target.name, value);
  };

  const handleTemplateDownload = () => {
    dispatch(getCSVTemplate())
  }

  const handleLoginSubmit = (values) => {
    const formData = new FormData();
    {/**
    {
    "name":"Kartik",
    "email":"employee1@gmail.com",
    "phone_no":"1234567890",
    "address":"abc",
    "profile_picture": "atew"
}
   */}
    formData.append('name', values.name);
    formData.append('phone_no', values.phone_no);
    formData.append('email', values.email);
    formData.append('address', values.address);
    // formData.append('profile_picture', values.profile_picture || '');
    formData.append('user_profile_pic', values.user_profile_pic || '');
    // dispatch(addBusinesses(formData));
    business_id && dispatch(addCustomer({ business_id: business_id, customer: formData }));
  }
  const handleBulkUpload = (values) => {
    const data = new FormData();
    data.append('csv_file', values?.csv_file);
    business_id &&
      dispatch(addBulkCustomer({ business_id: business_id, customers: data }));
  }
  const initialValues = { user_profile_pic: null, name: "", email: "", phone_no: "", address: "" };
  // const initialValues = { profile_picture: null, name: "", email: "", phone_no: "", address: "" };
  return (
    <div className="min-w-[304px] xl:min-w-[597px] w-full">
      <div className="bg-[#101010] pt-1 xl:h-[68px] text-left text-xl leading-9 text-white xl:text-[34px] xl:leading-[56px] font-bold xl:font-medium xl:text-[#CDBEBE] tracking-tight pl-5 xl:pl-[31px] ">
        Add Customer
      </div>
      {bulkUpload ?
        (<Formik
          initialValues={{ csv_file: null }}
          validationSchema={BulkUploadValidations}
          onSubmit={handleBulkUpload}
        >
          {({ values, errors, setFieldValue, handleSubmit }) => (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="pt-[13px] pb-[25px] xl:pt-6 xl:pb-6 bg-[#1C1C1C] px-5 xl:px-[31.5px]">
                <div className="flex text-left flex-col gap-[14px] xl:gap-[30px] 2xl:gap-[35px]">
                  <label className="w-full cursor-pointer flex items-center justify-center border-[5px] border-dashed border-gray-500 p-6 min-h-[150px] text-white  text-sm xl:text-[28px] 2xl:text-[32px] font-medium tracking-tight pb-2 xl:pb-[20px]">
                    {values.csv_file ?
                      <span>{values.csv_file.name}</span>
                      :
                      <span>Upload File</span>}
                    <input
                      hidden
                      type="file"
                      name="csv_file"
                      onChange={(event) => {
                        if (event.currentTarget.files[0].type === "text/csv") {
                          setFileError(null)
                          setFieldValue("csv_file", event.currentTarget.files[0])
                        } else {
                          setFieldValue("csv_file", null)
                          setFileError("Please select valid CSV file.")
                        }
                      }}
                    />
                  </label>
                  {fileError ? <span className='text-red-500'>{fileError}</span> : errors?.csv_file ? <span className='text-red-500'>{errors?.csv_file}</span> : null}
                </div>
                <div>
                  <CustomButton
                    className="text "
                    type="submit"
                    showLoader={isLoading}
                    disabled={isLoading}
                    loaderSize={20}
                    buttonStyle="w-full py-[7px] md:py-[5px] xl:py-[12px] text-xl xl:text-3xl tracking-tight text-pink-light font-bold rounded-[10px] xl:rounded-2xl bg-[#DD69AA] mt-[15px] xl:mt-7"
                  >
                    Invite
                  </CustomButton>
                </div>
              </div>
            </form>
          )}
        </Formik>)

        :
        (<Formik
          initialValues={initialValues}
          validationSchema={CustomerFormValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleLoginSubmit}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="pt-[13px] pb-[25px] xl:pt-6 xl:pb-6 bg-[#1C1C1C] px-5 xl:px-[31.5px]">
                <div className="flex text-left flex-col gap-[14px] md:gap-3 xl:gap-[30px] 2xl:gap-[35px]">
                  <div>
                          <input id="file" name="user_profile_pic" type="file" onChange={(event) => {
                              setFieldValue("user_profile_pic", event.currentTarget.files[0]);
                          }} />
                      </div>
                  <div>
                    <label className="text-base md:text-[18px] xl:text-[28px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block">
                      Name<span className="text-[#DD69AA]">*</span>
                    </label>
                    <InputField
                      inputstyle="w-full text-[#858383] text-sm  xl:text-xl font-normal tracking-[-0.02em] outline-none
                             py-[8px] xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent xl:pl-[25px] pl-[15.56px]"
                      borderstyle="w-full text-[#858383] text-sm  xl:text-xl font-normal tracking-[-0.02em] outline-none
                      py-[8px] xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]"
                      errorRight={true}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name of the company"
                    />
                  </div>
                  <div>
                    <label className="text-base md:text-[18px] xl:text-[28px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block">
                      Email ID<span className="text-[#DD69AA]">*</span>
                    </label>
                    <InputField
                      inputstyle="w-full text-[#858383] text-sm  xl:text-xl font-normal tracking-[-0.02em] outline-none
                  py-[8px] xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent xl:pl-[25px] pl-[15.56px]"
                      borderstyle="w-full text-[#858383] text-sm  xl:text-xl font-normal tracking-[-0.02em] outline-none
           py-[8px] xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]"
                      errorRight={true}
                      type="text"
                      id="email"
                      name="email"
                      placeholder="mail@simmmple.com"
                    />
                  </div>
                  <div>
                    <label className="text-base md:text-[18px] xl:text-[28px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block">
                      Phone<span className="text-[#DD69AA]">*</span>
                    </label>
                    <InputField
                      onChange={(e) => handleChange(e, setFieldValue)}
                      inputstyle="w-full text-[#858383] text-sm  xl:text-xl font-normal tracking-[-0.02em] outline-none
                      py-[8px] xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent xl:pl-[25px] pl-[15.56px]"
                      borderstyle="w-full text-[#858383] text-sm  xl:text-xl font-normal tracking-[-0.02em] outline-none
               py-[8px] xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]"
                      errorRight={true}
                      type="text"
                      id="phone_no"
                      name="phone_no"
                      placeholder="000000000"
                    />
                  </div>
                  <div>
                    <label className="text-base md:text-[18px] xl:text-[28px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block">
                      Address<span className="text-[#DD69AA]">*</span>
                    </label>
                    <InputField
                      inputstyle="w-full text-[#858383] text-sm  xl:text-xl font-normal tracking-[-0.02em] outline-none
 py-[26px] 2xl:py-[35px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent xl:pl-[25px] pl-[15.56px]"
                      borderstyle="w-full text-[#858383] text-sm  xl:text-xl font-normal tracking-[-0.02em] outline-none
py-[26px] 2xl:py-[35px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]"
                      errorRight={true}
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Address"
                    />
                  </div>
                  <div className="flex gap-[25px] xl:gap-10 mt-[14px] xl:mt-[5px]">
                    <CustomButton
                      type="button"
                      onClick={() => setBulkUpload(true)}
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
                  <CustomButton
                    className="text "
                    type="submit"
                    showLoader={isLoading}
                    disabled={isLoading}
                    loaderSize={20}
                    buttonStyle="w-full py-[7px] md:py-[5px] xl:py-[12px] text-xl xl:text-3xl tracking-tight text-pink-light font-bold rounded-[10px] xl:rounded-2xl bg-[#DD69AA] mt-[15px] xl:mt-7"
                  >
                    Invite
                  </CustomButton>
                </div>
              </div>
            </form>
          )}
        </Formik>)
      }
    </div>
  );
}
export default CustomerForm