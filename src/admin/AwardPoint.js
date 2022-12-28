import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/forms/CustomButton'
import Dropdown from '../components/forms/Dropdown'
import { InputField } from '../components/forms/InputField'
import { AwardPointValidationSchema } from '../utils/FormValidations'
import { useDispatch, useSelector } from 'react-redux'
import { addRewardPoints, getPointTypes } from '../Redux/commonSlice'
import { useParams } from 'react-router-dom'

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

    const initialValues = { amount: "", reward_type: type === "customer" ? "2" : "" };
    const [members, setMembers] = useState(null);
    const [options, setOptions] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const dispatch = useDispatch();
    const { business_id } = useParams();
    const handleAwardSubmit = (values) => {
        // console.log("values : ", values);
        // console.log("members : ", members);
        
        business_id
          ? dispatch(
              addRewardPoints({
                data: { ...values, member_id: members },
                business_id: business_id,
              })
            )
          : dispatch(
              addRewardPoints({ data: { ...values, member_id: members } })
            );
    }
    useEffect(() => {
        setMembers(Object.keys(selectedIds).filter(selectedId => selectedIds[selectedId]))
    }, [selectedIds]);

    useEffect(() => {
        dispatch(getPointTypes());
    }, []);
    useEffect(() => {
        pointsTypes && setOptions(pointsTypes.map(pointType => ({ name: pointType.reward_name, value: pointType.id })));
        // pointsTypes && console.log(pointsTypes.filter(pointType => pointType.id === 2).map(pointType => ({ name: pointType.reward_name, value: pointType.id }))[0] );
        
        (type === "customer" || type === "user") && pointsTypes &&  
            setSelectedOption(pointsTypes.filter(pointType => pointType.id === 2).map(pointType => ({ name: pointType.reward_name, value: pointType.id }))[0]);
    }, [pointsTypes]);

    return (
        <div className='max-w-[600px] bg-[#101010] xl:bg-[#1C1C1C] py-[22px] px-[18px] xl:px-9 xl:py-9'>
            <Formik
                initialValues={initialValues}
                validationSchema={AwardPointValidationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleAwardSubmit}
            >
                {({ values, setFieldValue, handleSubmit }) =>
                (<form onSubmit={handleSubmit} >
                    <div className='flex justify-between items-center'>
                        <label className='w-full text-left text-base leading-[10px] text-[#A6A6A6] font-normal tracking-tight xl:text-[32px]  xl:leading-5 xl:text-white'>Points</label>
                        <InputField
                            onChange={(e) => handleChange(e, setFieldValue)}
                            inputstyle='w-[163px] xl:w-[304px] text-white text-base leading-[10px] xl:text-2xl outline-none h-[25px] xl:h-[48px] xl:rounded-2xl rounded-[5px] bg-[#303030] xl:bg-[#101010] pl-2 xl:pl-5'
                            borderstyle='w-[163px] xl:w-[304px] text-white text-base leading-[10px] xl:text-2xl outline-none h-[25px] xl:h-[48px] xl:rounded-2xl rounded-[5px] bg-[#101010] pl-2 xl:pl-5 border border-red-800'
                            type='text'
                            id='amount'
                            name='amount' />
                    </div>
                    <div className='flex justify-between gap-[60px] xl:gap-[77px] items-center pt-[16px] md:pt-[18px] pb-[22px] md:pb-[24px] xl:pt-[30px] xl:pb-[36px]'>
                        <label className='w-full text-left text-base leading-[10px] text-[#A6A6A6] font-normal tracking-tight xl:text-[32px] xl:leading-5 xl:text-white whitespace-nowrap'>Point type</label>
                        <Dropdown
                            inputstyle='w-[163px] xl:w-[304px] text-white text-base leading-[10px] xl:text-2xl outline-none h-[25px] py-[12px] flex items-center xl:h-[48px] rounded-[5px] xl:rounded-2xl bg-[#303030] xl:bg-[#101010] pl-2 xl:pl-5'
                            options={options}
                            disabled={type === "customer" || type === "user"}
                            // selected={type === "customer" || type === "user" ? { name: 'Personal Points', value: '2' } : null}
                            // selected={type === "customer" || type === "user" ? pointsTypes ? pointsTypes.filter(pointType => pointType.name === 'Personal Points')[0] : null : null}
                            // selected={options.filter(option => option?.name === 'Personal Points')}
                            selected={selectedOption}
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
                            buttonStyle="w-full py-[7.5px] xl:py-3 text-[#DD69AA] xl:text-white text-xl font-medium rounded-[10px] xl:text-3xl xl:font-bold xl:rounded-2xl xl:bg-[#DD69AA] border-[1.5px] border-[#DD69AA] xl:border-none">
                            Award Point
                        </CustomButton >
                    </div>
                </form>)}
            </Formik>
        </div >
    )
}
export default AwardPoint