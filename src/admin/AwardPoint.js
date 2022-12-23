import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/forms/CustomButton'
import Dropdown from '../components/forms/Dropdown'
import { InputField } from '../components/forms/InputField'
import { AwardPointValidationSchema } from '../utils/FormValidations'
import { useDispatch, useSelector } from 'react-redux'
import { addRewardPoints } from '../Redux/modalSlice'

const people = [
    { name: 'Business Points', value: '1' },
    { name: 'Personal Points', value: '2' },
]

const AwardPoint = ({ type, memberId, onSubmit }) => {
    const {isLoading, selectedIds} = useSelector(state => ({ 
        isLoading : state.modalSlice.isLoading,
        selectedIds: state.modalSlice.tableData.selectedIds    
    }));
    const initialValues = { amount: "", reward_type: type === "customer" ? "2" : ""};
    const [members, setMembers] = useState(null);
    const dispatch = useDispatch();
    const handleAwardSubmit = (values) => {
        dispatch(addRewardPoints({...values, member_id: members}))
    }
    useEffect(() => {
        setMembers(Object.keys(selectedIds).filter(selectedId => selectedIds[selectedId]))
    }, [selectedIds]);

    return (
        <div className='max-w-[600px] bg-[#1C1C1C] px-9 py-9'>
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
                        <label className='w-full text-left text-[32px] 2xl:gap-[77px] leading-5 font-normal tracking-tight text-white'>Points</label>
                        <InputField
                            inputstyle='w-[304px] text-white text-2xl outline-none h-[48px] rounded-2xl bg-[#101010] pl-5'
                            borderstyle='w-[304px] text-[#A6A6A6] text-2xl outline-none h-[48px] rounded-2xl bg-[#101010] pl-5 border border-red-800'
                            type='text'
                            id='amount'
                            name='amount' />
                    </div>
                    <div className='flex justify-between 2xl:gap-[77px] items-center pt-[26px] pb-[30px]'>
                        <label className='text-[32px] leading-5 font-normal tracking-tight text-white'>Point type</label>
                        <Dropdown
                            inputstyle='w-[304px] cursor-default bg-[#101010] h-[48px] rounded-2xl leading-5 font-normal tracking-tight text-white text-left pl-5'
                            people={people}
                            disabled={type === "customer" || type === "user"}
                            selected={type === "customer" || type === "user" ? { name: 'Personal Points', value: '2' } : null}
                            id="reward_type"
                            setValues={setFieldValue}
                            name="reward_type"
                        />
                    </div>
                    <div className='flex justify-end '>
                        <CustomButton
                            showLoader={isLoading}
                            disabled={isLoading}
                            type='submit'
                            buttonStyle="w-full h-[51px] text-white text-xl font-bold rounded-2xl bg-[#DD69AA]">
                            Award Point
                        </CustomButton >
                    </div>
                </form>)}
            </Formik>
        </div >
    )
}
export default AwardPoint