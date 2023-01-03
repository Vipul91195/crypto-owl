import { Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomButton from '../../components/forms/CustomButton';
import { InputField } from '../../components/forms/InputField'
import { userSendRewardPoints } from '../../Redux/commonSlice';
import { MessageFormValidationSchema, UserRedeemPointsValidationSchema, UserSendPointsValidationSchema } from '../../utils/FormValidations';
import { handleNumberOnly } from '../../utils/helper';
import classNames from 'classnames';
import { capitalize } from 'lodash';

const Points = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.commonSlice);
    // const { member_id } = useParams();

    const handleSendPoint = (values, { resetForm }) => {
        dispatch(userSendRewardPoints({...values, send_reward_type: 1, to_user: [values?.to_user]}));
        resetForm();
    }
    const handleRedeemPoint = (values, {resetForm}) => {
      resetForm();
    }
    
    const [showDetails, setShowDetails] = useState("details");
    const userDetails = (e) => {
        setShowDetails(e.target.id);
    };
    const initialValues = { to_user: "", sent_amount: "" };
    const redeemInitialValues = { sent_amount: "" };

    return (
      <>
        <div className="w-full hidden md:block rounded-[20px] overflow-hidden">
          <div className="flex w-full bg-[#101010]">
            <div className="flex-1">
              <p className="bg-[#040404] py-2 text-left text-[15px] lg:text-[18px] 2xl:text-xl leading-[36px] xl:text-[28px] xl:leading-[46px] 2xl:text-[34px] 2xl:leading-[56px] font-bold text-white tracking-tight pl-[19px] xl:pl-[25px] 2xl:pl-[29px]">
                Business Point Balance -{" "}
                <span className="text-[#DD69AA]"> 1000</span> Points
              </p>
              <Formik
                initialValues={initialValues}
                validationSchema={UserSendPointsValidationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleSendPoint}
              >
                {({ values, setFieldValue, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="pt-3 xl:pt-5 2xl:pt-[26px] pb-[28px] xl:pb-[36px] px-[19px] xl:px-[25px] 2xl:px-[29px] ">
                      <p className="text-white mb-3 2xl:mb-5 mt-[10px] 2xl:mt-[15px] md:text-[20px] lg:text-[28px] 2xl:text-[32px] md:leading-[24px] lg:leading-[30px] 2xl:leading-[56px] font-[700]">
                        Send Reward Points
                      </p>
                      <div className="flex flex-col xl:flex-row text-left gap-[14px] xl:gap-[30px] 2xl:gap-[35px]">
                        <div className="flex-1 max-w-[308px] xl:max-w-none flex flex-col justify-between">
                          <label className="text-[18px] whitespace-nowrap xl:text-[20px] font-medium flex items-start tracking-tight text-pink-light pb-2 xl:pb-[20px]">
                            Email ID<span className="text-[#DD69AA]">*</span>
                            <span className="text-[#A6A6A6] text-[10px] pl-1 block whitespace-nowrap 2xl:text-[14px]">
                              who are you sending reward points to
                            </span>
                          </label>
                          <InputField
                            inputstyle="w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                  py-[8px] xl:py-[10px] 2xl:py-[18px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent  xl:pl-[25px] pl-[15.56px]"
                            borderstyle="w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                        py-[8px] xl:py-[10px] 2xl:py-[18px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent  xl:pl-[25px] pl-[15.56px]"
                            errorRight={true}
                            type="text"
                            id="to_user"
                            name="to_user"
                            placeholder="mail@sample.com"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between max-w-[308px]">
                          <label className="text-[18px] xl:text-[20px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block">
                            No. of Points
                            <span className="text-[#DD69AA]">*</span>
                          </label>
                          <InputField
                            inputstyle="w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                        py-[8px] xl:py-[10px] 2xl:py-[18px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent  xl:pl-[25px] pl-[15.56px]"
                            borderstyle="w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                        py-[8px] xl:py-[10px] 2xl:py-[18px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent  xl:pl-[25px] pl-[15.56px]"
                            errorRight={true}
                            type="text"
                            id="sent_amount"
                            name="sent_amount"
                            onChange={(e) => handleNumberOnly(e, setFieldValue)}
                            placeholder="0000"
                          />
                        </div>
                      </div>
                      <div>
                        <CustomButton
                          className=""
                          type="submit"
                          showLoader={isLoading}
                          disabled={isLoading}
                          loaderSize={20}
                          buttonStyle="w-full max-w-[120px] lg:max-w-[150px] 2xl:max-w-[250px] py-[7.5px] xl:py-3 text-sm lg:text-lg 2xl:text-xl 2xl:tracking-tight text-white font-bold rounded-[10px] lg:rounded-[16px] bg-[#DD69AA] mt-6 xl:mt-8 2xl:mt-9 "
                        >
                          Send
                        </CustomButton>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
            <div className="flex-1 border-l border-solid border-[#DD69AA]">
              <p className="bg-[#040404] py-2 text-left text-[15px] lg:text-[18px] 2xl:text-xl leading-[36px] xl:text-[28px] xl:leading-[46px] 2xl:text-[34px] 2xl:leading-[56px] font-bold text-white tracking-tight pl-[19px] xl:pl-[25px] 2xl:pl-[29px]">
                Personal Point Balance -{" "}
                <span className="text-[#DD69AA]"> 1000</span> Points
              </p>
              <Formik
                initialValues={redeemInitialValues}
                validationSchema={UserRedeemPointsValidationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleRedeemPoint}
              >
                {({ values, setFieldValue, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="pt-3 xl:pt-5 2xl:pt-[26px] pb-[28px] xl:pb-[36px] px-[19px] xl:px-[25px] 2xl:px-[29px] ">
                      <p className="text-white mb-3 2xl:mb-5 mt-[10px] 2xl:mt-[15px] md:text-[20px] lg:text-[28px] 2xl:text-[32px] md:leading-[24px] lg:leading-[30px] 2xl:leading-[56px] font-[700]">
                      Redeem Points
                      </p>
                      <div className="flex text-left gap-[14px] xl:gap-[30px] 2xl:gap-[35px]">
                        <div className="flex-1 max-w-[308px]">
                          <label className="text-[18px] xl:text-[20px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block">
                            No. of Points
                            <span className="text-[#DD69AA]">*</span>
                          </label>
                          <InputField
                            inputstyle="w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                      py-[8px] xl:py-[10px] 2xl:py-[18px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent  xl:pl-[25px] pl-[15.56px]"
                            borderstyle="w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                      py-[8px] xl:py-[10px] 2xl:py-[18px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent  xl:pl-[25px] pl-[15.56px]"
                            errorRight={true}
                            type="text"
                            id="sent_amount"
                            name="sent_amount"
                            onChange={(e) => handleNumberOnly(e, setFieldValue)}
                            placeholder="0000"
                          />
                        </div>
                      </div>
                      <div>
                        <CustomButton
                          className=""
                          type="submit"
                          showLoader={isLoading}
                          disabled={isLoading}
                          loaderSize={20}
                          buttonStyle="w-full max-w-[120px] lg:max-w-[150px] 2xl:max-w-[250px] py-[7.5px] xl:py-3 text-sm lg:text-lg 2xl:text-xl 2xl:tracking-tight text-white font-bold rounded-[10px] lg:rounded-[16px] bg-[#DD69AA] mt-6 xl:mt-8 2xl:mt-9 "
                        >
                          Redeem
                        </CustomButton>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div className="w-full md:hidden rounded-[10px] overflow-hidden">
          <div className="rounded-[10px] overflow-hidden mt-3">
            <div className="xl:hidden  flex items-center bg-[#040404]  justify-around">
              <p
                onClick={userDetails}
                id="details"
                className={classNames(
                  "flex-1 text-center text-base leading-9 font-medium tracking-tight text-[#DD69AA] md:text-xl md:leading-10 cursor-pointer",
                  {
                    "border-b-[1.5px] border-[#DD69AA]":
                      showDetails === "details",
                  }
                )}
              >
                Business Points
              </p>
              <p
                onClick={userDetails}
                id="points"
                className={classNames(
                  "text-base flex-1 text-center leading-9 font-medium tracking-tight text-[#DD69AA] md:text-xl md:leading-10 cursor-pointer",
                  {
                    "border-b-[1.5px] border-[#DD69AA]":
                      showDetails === "points",
                  }
                )}
              >
                Personal Points
              </p>
            </div>
            {showDetails === "details" && (
              <div className="px-[14px] xl:px-0 bg-[#101010] pb-[19px] xl:bg-[#171717] xl:grid xl:grid-cols-[1fr,1fr,1fr] xl:gap-[30px] 2xl:gap-[68px]">
                <p className="pt-[15px] pb-[12px] text-left text-sm leading-[20px] font-bold text-white tracking-tight">
                  Business Point Balance -
                  <span className="text-[#DD69AA]"> 1000</span> Points
                </p>
                <div className="text-[#DD69AA] flex items-baseline pb-[14px] relative text-[32px] leading-[56px] font-[700]">
                  <p className="text-sm leading-5 font-bold">
                    Send Reward Points
                  </p>
                  <span className="w-full flex-1 h-[1.2px] ml-1 bg-[#DD69AA]"></span>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={UserSendPointsValidationSchema}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={handleSendPoint}
                >
                  {({ values, setFieldValue, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="">
                        <div className="flex flex-col sm:flex-row text-left gap-[15px]">
                          <div className="flex-1 max-w-[308px] xl:max-w-none flex flex-col justify-between">
                            <label className="text-[14px] whitespace-nowrap font-medium leading-[14px] tracking-tight text-pink-light pb-2 xl:pb-[20px] block">
                              Email ID<span className="text-[#DD69AA]">*</span>
                              <sup className="text-[#A6A6A6] text-[12px] top-0">
                                who are you sending reward points to
                              </sup>
                            </label>
                            <InputField
                              inputstyle="w-full text-[#858383] text-[12px] font-normal tracking-[-0.02em] outline-none
                                py-[10px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent px-[13px]"
                              borderstyle="w-full text-[#858383] text-[12px] font-normal tracking-[-0.02em] outline-none
                            py-[10px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent px-[13px]"
                              errorRight={true}
                              type="text"
                              id="to_user"
                              name="to_user"
                              placeholder="mail@sample.com"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between max-w-[308px]">
                            <label className="text-[14px] font-medium leading-[14px] tracking-tight text-pink-light pb-2 xl:pb-[20px] block">
                              No. of Points
                              <span className="text-[#DD69AA]">*</span>
                            </label>
                            <InputField
                              inputstyle="w-full text-[#858383] text-[12px] font-normal tracking-[-0.02em] outline-none
                            py-[10px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent px-[13px]"
                              borderstyle="w-full text-[#858383] text-[12px] font-normal tracking-[-0.02em] outline-none
                            py-[10px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent px-[13px]"
                              errorRight={true}
                              type="text"
                              id="sent_amount"
                              name="sent_amount"
                              onChange={(e) =>
                                handleNumberOnly(e, setFieldValue)
                              }
                              placeholder="0000"
                            />
                          </div>
                        </div>
                        <div>
                          <CustomButton
                            className=""
                            type="submit"
                            showLoader={isLoading}
                            disabled={isLoading}
                            loaderSize={20}
                            buttonStyle="w-full max-w-[100px] py-[6px] text-sm tracking-tight text-white font-bold rounded-[7px] bg-[#DD69AA] mt-[15px]"
                          >
                            Send
                          </CustomButton>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            )}
            {showDetails === "points" && (
              <div className="px-[14px] pb-[25px] bg-[#101010] 2xl:hidden gap-[68px] md:pt-3 2xl:mt-[41px]">
                <p className="pt-[15px] pb-[12px] text-left text-sm leading-[20px] font-bold text-white tracking-tight">
                  Personal Point Balance -
                  <span className="text-[#DD69AA]"> 1000</span> Points
                </p>
                <div className="text-[#DD69AA] flex items-baseline pb-[14px] relative text-[32px] leading-[56px] font-[700]">
                  <p className="text-sm leading-5 font-bold">Redeem Points</p>
                  <span className="w-full flex-1 h-[1.2px] ml-1 bg-[#DD69AA]"></span>
                </div>
                <Formik
                  initialValues={redeemInitialValues}
                  validationSchema={UserRedeemPointsValidationSchema}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={handleRedeemPoint}
                >
                  {({ values, setFieldValue, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="">
                        <div className="flex flex-col sm:flex-row text-left gap-[15px]">
                          <div className="flex-1 flex flex-col justify-between max-w-[308px]">
                            <label className="text-[14px] font-medium leading-[14px] tracking-tight text-pink-light pb-2 xl:pb-[20px] block">
                              No. of Points
                              <span className="text-[#DD69AA]">*</span>
                            </label>
                            <InputField
                              inputstyle="w-full text-[#858383] text-[12px] font-normal tracking-[-0.02em] outline-none
                            py-[10px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent px-[13px]"
                              borderstyle="w-full text-[#858383] text-[12px] font-normal tracking-[-0.02em] outline-none
                            py-[10px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent px-[13px]"
                              errorRight={true}
                              type="text"
                              id="sent_amount"
                              name="sent_amount"
                              onChange={(e) =>
                                handleNumberOnly(e, setFieldValue)
                              }
                              placeholder="0000"
                            />
                          </div>
                        </div>
                        <div>
                          <CustomButton
                            className=""
                            type="submit"
                            showLoader={isLoading}
                            disabled={isLoading}
                            loaderSize={20}
                            buttonStyle="w-full max-w-[100px] py-[6px] text-sm tracking-tight text-white font-bold rounded-[7px] bg-[#DD69AA] mt-[15px]"
                          >
                            Send
                          </CustomButton>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </>
    );
}
export default Points