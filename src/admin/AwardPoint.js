import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/forms/CustomButton'
import Dropdown from '../components/forms/Dropdown'
import { InputField } from '../components/forms/InputField'
import { AwardPointValidationSchema } from '../utils/FormValidations'
import { useDispatch, useSelector } from 'react-redux'
import { addRewardPoints } from '../Redux/modalSlice'

const people = [
    { name: 'Business', value: '1' },
    { name: 'Personal', value: '2' },
]

const AwardPoint = ({ type, memberId, onSubmit }) => {
    const { isLoading, selectedIds } = useSelector(state => ({
        isLoading: state.modalSlice.isLoading,
        selectedIds: state.modalSlice.tableData.selectedIds
    }));
    const initialValues = { amount: "", reward_type: type === "customer" ? "2" : "" };
    const [members, setMembers] = useState(null);
    const dispatch = useDispatch();
    const handleAwardSubmit = (values) => {
        dispatch(addRewardPoints({ ...values, member_id: members }))
    }
    useEffect(() => {
        setMembers(Object.keys(selectedIds).filter(selectedId => selectedIds[selectedId]))
    }, [selectedIds]);

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
                            inputstyle='w-[163px] xl:w-[304px] text-white text-base leading-[10px] xl:text-2xl outline-none h-[25px] xl:h-[48px] xl:rounded-2xl rounded-[5px] bg-[#303030] xl:bg-[#101010] pl-2 xl:pl-5'
                            borderstyle='w-[163px] xl:w-[304px] text-white text-base leading-[10px] xl:text-2xl outline-none h-[25px] xl:h-[48px] rounded-2xl  rounded-[5px] bg-[#101010] pl-5 border border-red-800'
                            type='text'
                            id='amount'
                            name='amount' />
                    </div>
                    <div className='flex justify-between gap-[60px] xl:gap-[77px] items-center pt-[10px] pb-[22px] xl:pt-[26px] xl:pb-[30px]'>
                        <label className='w-full text-left text-base leading-[10px] text-[#A6A6A6] font-normal tracking-tight xl:text-[32px] xl:leading-5 xl:text-white whitespace-nowrap'>Point type</label>
                        <Dropdown
                            inputstyle='w-[163px] xl:w-[304px] text-white text-base leading-[10px] xl:text-2xl outline-none h-[25px] xl:h-[48px] rounded-[5px] xl:rounded-2xl bg-[#303030] xl:bg-[#101010] pl-2 lg:pl-5'
                            people={people}
                            disabled={type === "customer" || type === "user"}
                            selected={type === "customer" || type === "user" ? { name: 'Personal Points', value: '2' } : null}
                            id="reward_type"
                            setValues={setFieldValue}
                            name="reward_type"
                        />
                    </div>
                    <div className='flex justify-end'>
                        <CustomButton
                            showLoader={isLoading}
                            disabled={isLoading}
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