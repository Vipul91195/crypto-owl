import { Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomButton from '../../components/forms/CustomButton';
import { InputField } from '../../components/forms/InputField'
import { userSendRewardPoints } from '../../Redux/commonSlice';
import { MessageFormValidationSchema, UserRedeemPointsValidationSchema, UserSendPointsValidationSchema } from '../../utils/FormValidations';
import { handleNumberOnly } from '../../utils/helper';

const Points = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.commonSlice);
    // const { member_id } = useParams();

    const handleLoginSubmit = (values) => {
        dispatch(userSendRewardPoints({...values, send_reward_type: 1, to_user: [values?.to_user]}));
    }

    const initialValues = { to_user: "", sent_amount: "" };
    return (
        <div className='w-full rounded-[20px] overflow-hidden'>
            <div className="flex w-full bg-[#101010]">
              <div className="flex-1">
              <p className='bg-[#040404] py-2 text-left text-xl leading-[36px] xl:text-[28px] xl:leading-[46px] 2xl:text-[34px] 2xl:leading-[56px] font-bold text-white tracking-tight pl-[19px] xl:pl-[25px] 2xl:pl-[29px]'>
                  Business Point Balance - <span className='text-[#DD69AA]'>1000</span> Points
                </p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={UserSendPointsValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleLoginSubmit}
                >
                    {({ values, setFieldValue, handleSubmit }) =>
                    (<form onSubmit={handleSubmit} >
                        <div className='pt-4 xl:pt-5 2xl:pt-[26px] pb-[28px] xl:pb-[36px] px-[19px] xl:px-[25px] 2xl:px-[29px] '>
                          <p className="text-white mb-5 mt-[15px] text-[32px] leading-[56px] font-[700]">
                            Send Reward Points
                          </p>
                            <div className='flex flex-col xl:flex-row text-left gap-[14px] xl:gap-[30px] 2xl:gap-[35px]'>
                              <div className="flex-1 max-w-[308px] xl:max-w-none flex flex-col justify-between">
                                    <label className='text-[18px] xl:text-[20px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block'>Email ID<span className='text-[#DD69AA]'>*</span> <sup className='text-[#A6A6A6] text-[8px] 2xl:text-[14px]'>who are you sending reward points to</sup></label>
                                    {/* 
                                    <label className="text-base md:text-[18px] xl:text-[28px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block"> */}
                                    <InputField
                                        inputstyle='w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                  py-[8px] xl:py-[10px] 2xl:py-[18px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                        borderstyle='w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                        py-[8px] xl:py-[10px] 2xl:py-[18px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                        errorRight={true}
                                        type='text'
                                        id='to_user'
                                        name='to_user'
                                        placeholder='mail@sample.com' />
                                </div>
                                {/* <div>
                                    <label className='text-[18px] xl:text-[28px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block'>Message<span className='text-[#DD69AA]'>*</span></label>
                                    <InputField
                                        inputstyle='w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                        py-[35px] xl:py-[50px] 2xl:py-[90px]  rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                        borderstyle='w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                        py-[35px] xl:py-[50px] 2xl:py-[90px]  rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                        errorRight={true}
                                        type='text'
                                        id='message'
                                        name='message'
                                        placeholder='Message' />
                                </div> */}
                                  <div className="flex-1 flex flex-col justify-between max-w-[308px]">
                                    <label className='text-[18px] xl:text-[20px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block'>No. of Points<span className='text-[#DD69AA]'>*</span></label>
                                    {/* 
                                    <label className="text-base md:text-[18px] xl:text-[28px] 2xl:text-[32px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block"> */}
                                    <InputField
                                        inputstyle='w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                        py-[8px] xl:py-[10px] 2xl:py-[18px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                        borderstyle='w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                        py-[8px] xl:py-[10px] 2xl:py-[18px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                        errorRight={true}
                                        type='text'
                                        id='sent_amount'
                                        name='sent_amount'
                                        onChange={(e) => handleNumberOnly(e, setFieldValue)}
                                        placeholder='0000' />
                                </div>
                            </div>
                            <div>
                                <CustomButton className=""
                                    type="submit"
                                    showLoader={isLoading}
                                    disabled={isLoading}
                                    loaderSize={20}
                                    buttonStyle="w-full max-w-[250px] py-[7.5px] xl:py-3 text-xl tracking-tight text-white font-bold rounded-[16px] bg-[#DD69AA] mt-6 xl:mt-8 2xl:mt-9 ">
                                    Send
                                </CustomButton >
                            </div>
                        </div>
                    </form>)}
                </Formik>
              </div>
              <div className="flex-1 border-l border-solid border-[#DD69AA]">
                <p className='bg-[#040404] py-2 text-left text-xl leading-[36px] xl:text-[28px] xl:leading-[46px] 2xl:text-[34px] 2xl:leading-[56px] font-bold text-white tracking-tight pl-[19px] xl:pl-[25px] 2xl:pl-[29px]'>
                Personal Point Balance - <span className='text-[#DD69AA]'>1000</span> Points
                </p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={UserRedeemPointsValidationSchema}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={handleLoginSubmit}
              >
                  {({ values, setFieldValue, handleSubmit }) =>
                  (<form onSubmit={handleSubmit} >
                      <div className='pt-4 xl:pt-5 2xl:pt-[26px] pb-[28px] xl:pb-[36px] px-[19px] xl:px-[25px] 2xl:px-[29px] '>
                          <p className="text-[32px] text-white mb-5 mt-[15px] leading-[56px] font-[700]">
                            Redeem Points
                          </p>
                          <div className='flex text-left gap-[14px] xl:gap-[30px] 2xl:gap-[35px]'>
                              <div className='flex-1 max-w-[308px]'>
                                  <label className='text-[18px] xl:text-[20px] font-medium tracking-tight text-pink-light pb-2 xl:pb-[20px] block'>No. of Points<span className='text-[#DD69AA]'>*</span></label>
                                  <InputField
                                      inputstyle='w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                      py-[8px] xl:py-[10px] 2xl:py-[18px] rounded-[10px] 2xl:rounded-2xl border border-[#FFFFFF]/[10%] bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                      borderstyle='w-full text-[#858383] text-sm xl:text-xl font-normal tracking-[-0.02em] outline-none
                                      py-[8px] xl:py-[10px] 2xl:py-[18px] rounded-[10px] 2xl:rounded-2xl border border-red-800 bg-transparent  xl:pl-[25px] pl-[15.56px]'
                                      errorRight={true}
                                      type='text'
                                      id='points'
                                      name='points'
                                      onChange={(e) => handleNumberOnly(e, setFieldValue)}
                                      placeholder='0000' />
                              </div>
                          </div>
                          <div>
                              <CustomButton className=""
                                  type="submit"
                                  showLoader={isLoading}
                                  disabled={isLoading}
                                  loaderSize={20}
                                  buttonStyle="w-full max-w-[250px] py-[7.5px] xl:py-3 text-xl tracking-tight text-white font-bold rounded-[16px] bg-[#DD69AA] mt-6 xl:mt-8 2xl:mt-9 ">
                                  Redeem
                              </CustomButton >
                          </div>
                      </div>
                  </form>)}
                </Formik>
              </div>
            </div>
        </div>
    )
}
export default Points