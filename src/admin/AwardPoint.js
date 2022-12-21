import { Formik } from 'formik'
import React from 'react'
import CustomButton from '../components/forms/CustomButton'
import Dropdown from '../components/forms/Dropdown'
import { InputField } from '../components/forms/InputField'
import { AwardPointValidationSchema } from '../utils/FormValidations'

const people = [
    { name: 'Business Points' },
    { name: 'Personal Points' },
]

const AwardPoint = ({ type }) => {
    const initialValues = { point: "", awardPoints: "", };

    const handleLoginSubmit = (values) => {
    }

    return (
        <div className='max-w-[600px] bg-[#1C1C1C] px-9 py-9'>
            <Formik
                initialValues={initialValues}
                validationSchema={AwardPointValidationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={handleLoginSubmit}
            >
                {({ values, setFieldValue, handleSubmit }) =>
                (<form onSubmit={handleSubmit} >
                    <div className='flex justify-between items-center'>
                        <label className='w-full text-left text-[32px] 2xl:gap-[77px] leading-5 font-normal tracking-tight text-white'>Points</label>
                        <InputField
                            inputstyle='w-[304px] text-white text-2xl outline-none h-[48px] rounded-2xl bg-[#101010] pl-5'
                            borderstyle='w-[304px] text-[#A6A6A6] text-2xl outline-none h-[48px] rounded-2xl bg-[#101010] pl-5 border border-red-800'
                            type='text'
                            id='point'
                            name='point' />
                    </div>
                    <div className='flex justify-between 2xl:gap-[77px] items-center pt-[26px] pb-[30px]'>
                        <label className='text-[32px] leading-5 font-normal tracking-tight text-white'>Point type</label>
                        <Dropdown
                            inputstyle='w-[304px] cursor-default bg-[#101010] h-[48px] rounded-2xl leading-5 font-normal tracking-tight text-white text-left pl-5'
                            people={people}
                            selected={type === "customer" ? { name: 'Personal Points' } : null}
                            id="awardPoints"
                            setValues={setFieldValue}
                            name="awardPoints"
                        />
                    </div>
                    <div className='flex justify-end '>
                        <CustomButton
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