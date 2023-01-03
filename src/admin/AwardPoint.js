import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/forms/CustomButton'
import Dropdown from '../components/forms/Dropdown'
import { InputField } from '../components/forms/InputField'
import { AwardPointValidationSchema } from '../utils/FormValidations'
import { useDispatch, useSelector } from 'react-redux'
import { addRewardPoints, closeModal, getPointTypes } from '../Redux/commonSlice'
import { useParams } from 'react-router-dom'
import {CloseFilled} from '../components/icons/CloseFilled'

const AwardPoint = ({ type, memberId, onSubmit }) => {
    const { isLoading, selectedIds, pointsTypes } = useSelector(state => ({
        isLoading: state.commonSlice.isLoading,
        selectedIds: state.commonSlice.tableData.selectedIds,
        pointsTypes: state.commonSlice.tableData.pointsTypes
    }));

    const handleChange = (e, setFieldValue) => {
        const value = e.target.value.replace(/\D/g, "");
        setFieldValue(e.target.name, value);
    };

    const initialValues = { amount: "", reward_type: type === "customer" || type === "user-profile" ? "2" : "" };
    const [members, setMembers] = useState(null);
    const [options, setOptions] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const dispatch = useDispatch();
    const { business_id, member_id } = useParams();
    const handleAwardSubmit = (values) => {
        business_id
          ? dispatch(
              addRewardPoints({
                data: { ...values, member_id: members },
                business_id: business_id,
              })
            )
          : member_id ? 
          dispatch(
            addRewardPoints({ data: { ...values, member_id: [member_id] }, member_id })
          )
          :  dispatch(
              addRewardPoints({ data: { ...values, member_id: members } })
            )
    }
    useEffect(() => {
        setMembers(Object.keys(selectedIds).filter(selectedId => selectedIds[selectedId]))
    }, [selectedIds]);

    useEffect(() => {
        dispatch(getPointTypes());
    }, []);
    useEffect(() => {
        pointsTypes && setOptions(pointsTypes.map(pointType => ({ name: pointType.reward_name, value: pointType.id })));
        (type === "customer" || type === "user-profile") && pointsTypes &&  
            setSelectedOption(pointsTypes.filter(pointType => pointType.id === 2).map(pointType => ({ name: pointType.reward_name, value: pointType.id }))[0]);
    }, [pointsTypes]);

    return (
        <div>
        <div className="bg-[#101010] py-8 pt-1 pb-1  px-5 flex items-center justify-between">
            <p className="py-4 text-left text-xl leading-9 text-white xl:text-[24px] 2xl:text-[34px] 2xl:leading-[56px] font-bold xl:font-medium xl:text-[#CDBEBE] tracking-tight"></p>
            <button onClick={() => dispatch(closeModal())} className="cursor-pointer"><CloseFilled className="text-[#DD69AA] h-5 w-5 md:h-6 md:w-6 2xl:h-8 2xl:w-8" /></button>
        </div>
            <div className='max-w-[600px] bg-[#1C1C1C] xl:bg-[#1C1C1C] py-[22px] px-[18px] xl:p-6 2xl:px-9 2xl:py-9'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={AwardPointValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleAwardSubmit}
                >
                    {({ values, setFieldValue, handleSubmit }) =>
                    (<form onSubmit={handleSubmit} >
                        {/* <div className='flex justify-end pb-4'>
                        <button onClick={() => dispatch(closeModal())} className="cursor-pointer"><CloseFilled className="text-[#DD69AA] h-5 w-5 md:h-6 md:w-6 2xl:h-8 2xl:w-8" /></button>
                        </div> */}
                        <div className='flex justify-between items-center'>
                            <label className='w-full text-left text-base leading-[10px] text-[#A6A6A6] font-normal tracking-tight xl:text-[20px] 2xl:text-[32px] 2xl:leading-5 xl:text-white'>Points</label>
                            <InputField
                                onChange={(e) => handleChange(e, setFieldValue)}
                                inputstyle='w-[163px] xl:w-[210px] 2xl:w-[304px] text-white text-base leading-[10px] xl:text-[20px] 2xl:text-2xl outline-none h-[25px] xl:h-[36px] 2xl:h-[48px] xl:rounded-2xl rounded-[5px] bg-[#101010] pl-2 xl:pl-5'
                                borderstyle='w-[163px] xl:w-[210px] 2xl:w-[304px] text-white text-base leading-[10px] xl:text-[20px] 2xl:text-2xl outline-none h-[25px] xl:h-[36px] 2xl:h-[48px] xl:rounded-2xl rounded-[5px] bg-[#101010] pl-2 xl:pl-5 border border-red-800'
                                type='text'
                                id='amount'
                                name='amount' />
                        </div>
                        <div className='flex justify-between gap-[60px] 2xl:gap-[77px] items-center pt-[16px] md:pt-[18px] pb-[22px] md:pb-[24px] xl:pt-[22px] xl:pb-[30px]'>
                            <label className='w-full text-left text-base leading-[10px] text-[#A6A6A6] font-normal tracking-tight xl:text-[20px] 2xl:text-[32px] 2xl:leading-5 xl:text-white whitespace-nowrap'>Point type</label>
                            <Dropdown
                                inputstyle='w-[163px] xl:w-[210px] 2xl:w-[304px] text-white text-base leading-[10px] xl:text-[20px] 2xl:text-2xl outline-none h-[25px] py-[12px] flex items-center xl:h-[36px] 2xl:h-[48px] rounded-[5px] xl:rounded-2xl bg-[#101010] pl-2 xl:pl-5'
                                options={options}
                                disabled={type === "customer" || type === "user-profile"}
                                selected={type === "customer" || type === "user-profile" ? selectedOption : null}
                                id="reward_type"
                                setValues={setFieldValue}
                                name="reward_type"
                            />
                        </div>
                        <div className='flex justify-end'>
                            <CustomButton
                                showLoader={isLoading}
                                disabled={isLoading}
                                loaderSize={20}
                                type='submit'
                                buttonStyle="w-full py-[7.5px] xl:py-[10px] text-[#DD69AA] xl:text-white text-xl font-medium rounded-[10px] xl:text-[20px] 2xl:text-3xl xl:font-bold xl:rounded-2xl xl:bg-[#DD69AA] border-[1.5px] border-[#DD69AA] xl:border-none">
                                Award Point
                            </CustomButton >
                        </div>
                    </form>)}
                </Formik>
            </div >
        </div>
    )
}
export default AwardPoint