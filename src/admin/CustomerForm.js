import { Formik } from 'formik'
import React, { useState } from 'react'
import CustomButton from '../components/forms/CustomButton';
import { InputField } from '../components/forms/InputField'
import { BulkUploadValidations, CustomerEditValidationSchema, CustomerFormValidationSchema } from '../utils/FormValidations';
import { useDispatch, useSelector } from 'react-redux';
import { addBulkCustomer, addCustomer, closeModal, userProfileEdit } from '../Redux/commonSlice';
import { getCSVTemplate } from '../Redux/customerSlice';
import { useParams } from 'react-router-dom';
import { CloseFilled } from '../components/icons';

const CustomerForm = ({type}) => {
  const dispatch = useDispatch();
  const [bulkUpload, setBulkUpload] = useState(false);
  const [fileError, setFileError] = useState(null);
  const { isLoading, useProfile } = useSelector(state => ({
    isLoading: state.commonSlice.isLoading,
    useProfile: state.userSlice?.userData?.profile
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
    type === "edit-profile" ?
    formData.append('username', values.username):
    formData.append('name', values.name);
    formData.append('phone_no', values.phone_no);
    type !== "edit-profile" && formData.append('email', values.email);
    formData.append('address', values.address);
    type === "edit-profile"
      ? typeof values?.user_profile_pic !== "string" &&
        formData.append("profile_picture", values?.user_profile_pic || "")
      : 
        formData.append("profile_pic", values?.user_profile_pic || "")
      ;
    if(type === "edit-profile") {
      dispatch(userProfileEdit(formData))
    }else {
      business_id && dispatch(addCustomer({ business_id: business_id, customer: formData }));
    }
  }
  const handleBulkUpload = (values) => {
    const data = new FormData();
    data.append('csv_file', values?.csv_file);
    business_id &&
      dispatch(addBulkCustomer({ business_id: business_id, customers: data }));
  }
  const initialValues =
    type === "edit-profile"
      ? {
          user_profile_pic: useProfile?.profile_picture || null,
          username: useProfile?.name || "",
          phone_no: useProfile?.phone || "",
          address: useProfile?.address || "",
        }
      : {
          user_profile_pic: null,
          name: "",
          email: "",
          phone_no: "",
          address: "",
        };
  // const initialValues = { profile_picture: null, name: "", email: "", phone_no: "", address: "" };
  return (
    <div className="min-w-[304px] xl:min-w-[450px] 2xl:min-w-[597px] w-full">
      <div className="bg-[#101010] pt-1 pb-1 2xl:h-[68px] px-5 xl:px-[31px] flex items-center justify-between">
        <p className="text-left text-xl leading-9 text-white xl:text-[24px] 2xl:text-[34px] 2xl:leading-[56px] font-bold xl:font-medium xl:text-[#CDBEBE] tracking-tight">{type === "edit-profile" ? "Edit Profile" : "Add Customer"}</p>
        <button onClick={() => dispatch(closeModal())} className="cursor-pointer"><CloseFilled className="text-[#DD69AA] h-5 w-5 md:h-6 md:w-6 2xl:h-8 2xl:w-8" /></button>
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
                  <label className="w-full cursor-pointer flex items-center justify-center border-[5px] border-dashed border-gray-500 p-6 min-h-[150px] text-white  text-sm xl:text-[28px] 2xl:text-[32px] font-medium tracking-tight pb-2 lg:pb-2 2xl:pb-[20px]">
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
          validationSchema={type === "edit-profile" ? CustomerEditValidationSchema : CustomerFormValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleLoginSubmit}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="pt-[13px] pb-[25px] xl:pt-6 xl:pb-6 bg-[#1C1C1C] px-5 xl:px-[31.5px]">
                <div className="flex text-left flex-col gap-[14px] md:gap-3 xl:gap-[20px] 2xl:gap-[35px]">
                  <div>
                          <input id="file" className="appearance-none text-white" name="user_profile_pic" type="file" onChange={(event) => {
                              setFieldValue("user_profile_pic", event.currentTarget.files[0]);
                          }} />
                      </div>
                  <div>
                    <label className="text-base md:text-[18px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 lg:pb-2 2xl:pb-[20px] block">
                      Name<span className="text-[#DD69AA]">*</span>
                    </label>
                    <InputField className=""
                      inputstyle="w-full text-[#858383] text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                             py-[8px] lg:md:py-[10px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent 2xl:pl-[25px] pl-[15.56px]"
                             borderstyle="w-full text-[#858383] text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                             py-[8px] lg:md:py-[10px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]"
                      errorRight={true}
                      type="text"
                      id="name"
                      name={type === "edit-profile" ? "username" :"name"}
                      placeholder="Name of the company"
                    />
                  </div>
                  {type !== "edit-profile" && 
                  <div>
                    <label className="text-base md:text-[18px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 lg:pb-2 2xl:pb-[20px] block">
                      Email ID<span className="text-[#DD69AA]">*</span>
                    </label>
                    <InputField
                     inputstyle="w-full text-[#858383] text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                     py-[8px] lg:md:py-[10px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent 2xl:pl-[25px] pl-[15.56px]"
                     borderstyle="w-full text-[#858383] text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                     py-[8px] lg:md:py-[10px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]"
                      errorRight={true}
                      type="text"
                      id="email"
                      name="email"
                      placeholder="mail@simmmple.com"
                    />
                  </div>}
                  <div>
                    <label className="text-base md:text-[18px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 lg:pb-2 2xl:pb-[20px] block">
                      Phone<span className="text-[#DD69AA]">*</span>
                    </label>
                    <InputField
                      onChange={(e) => handleChange(e, setFieldValue)}
                      inputstyle="w-full text-[#858383] text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                      py-[8px] lg:md:py-[10px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent 2xl:pl-[25px] pl-[15.56px]"
                      borderstyle="w-full text-[#858383] text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                      py-[8px] lg:md:py-[10px] 2xl:py-[15px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]"
                      errorRight={true}
                      type="text"
                      id="phone_no"
                      name="phone_no"
                      placeholder="000000000"
                    />
                  </div>
                  <div>
                    <label className="text-base md:text-[18px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 lg:pb-2 2xl:pb-[20px] block">
                      Address<span className="text-[#DD69AA]">*</span>
                    </label>
                    <InputField
                       inputstyle="w-full text-[#858383] text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                       py-[26px] 2xl:py-[35px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent 2xl:pl-[25px] pl-[15.56px]"
                       borderstyle="w-full text-[#858383] text-sm 2xl:text-xl font-normal tracking-[-0.02em] outline-none
                       py-[26px] 2xl:py-[35px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent xl:pl-[25px] pl-[15.56px]"
                      errorRight={true}
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Address"
                    />
                  </div>
                  {type !== "edit-profile" && 
                  <div className="flex gap-[25px] xl:gap-10 mt-[14px] xl:mt-[5px]">
                    <CustomButton
                      type="button"
                      onClick={() => setBulkUpload(true)}
                      buttonStyle="w-full py-[3px] xl:h-[40px] 2xl:h-[44.83px] text-sm leading-6 tracking-tight font-medium text-[#DD69AA] border border-[#DD69AA] rounded-[10px] xl:rounded-2xl"
                    >
                      Bulk Upload
                    </CustomButton>
                    <CustomButton
                      onClick={handleTemplateDownload}
                      type="button"
                      buttonStyle="w-full py-[3px]  xl:h-[40px] 2xl:h-[44.83px] text-sm leading-6 tracking-tight font-medium text-[#DD69AA] border border-[#DD69AA] rounded-[10px] xl:rounded-2xl"
                    >
                      Template
                    </CustomButton>
                  </div>}
                </div>
                <div className="mt-6">
                  <CustomButton
                    className="text "
                    type="submit"
                    showLoader={isLoading}
                    disabled={isLoading}
                    loaderSize={20}
                    buttonStyle="w-full py-[7px] md:py-[5px] xl:py-[10px] text-xl xl:text-[24px] 2xl:text-3xl tracking-tight text-pink-light font-bold rounded-[10px] xl:rounded-2xl bg-[#DD69AA] mt-[15px] xl:mt-7"
                  >
                    {type === "edit-profile" ? "Update" : "Invite"}
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