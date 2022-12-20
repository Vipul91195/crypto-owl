import { Formik } from 'formik'
import React from 'react'
import CustomButton from '../components/forms/CustomButton'
import Dropdown from '../components/forms/Dropdown'
import { InputField } from '../components/forms/InputField'
import { AwardPointValidationSchema } from '../utils/FormValidations'

const AwardPoint = () => {
    const initialValues = { point: "", awardPoints: "", };

    const handleLoginSubmit = (values) => {
    }

    return (
        <div className='max-w-[600px] bg-[#101010] rounded-[20px] px-9 py-9 ml-[500px] mt-[200px]'>
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
                        <div className='w-full text-[32px] leading-5 font-normal tracking-tight text-[#A6A6A6]'>Points</div>
                        <InputField
                            inputstyle='w-[304px] text-white text-2xl outline-none h-[48px] rounded-2xl bg-[#303030] pl-5'
                            borderstyle='w-[304px] text-[#A6A6A6] text-2xl outline-none h-[48px] rounded-2xl bg-[#303030] pl-5 border border-red-800'
                            type='text'
                            id='point'
                            name='point' />
                    </div>
                    <div className='flex justify-between items-center pt-[26px] pb-[30px]'>
                        <div >
                            <div className='text-[32px] leading-5 font-normal tracking-tight text-[#A6A6A6]'>Point type</div>
                        </div>
                        <Dropdown
                            inputstyle='w-[304px] cursor-default bg-[#303030] h-[48px] rounded-2xl leading-5 font-normal tracking-tight text-white text-left pl-5'
                            id="awardPoints"
                            setValues={setFieldValue}
                            name="awardPoints"
                        />
                    </div>
                    <div className='flex justify-end'>
                        <CustomButton
                            type='submit'
                            buttonStyle="px-[43px] h-[51px] sm:text-sm  border border-[#DD69AA] leading-6 font-medium rounded-2xl text-[#DD69AA]">
                            Award Point
                        </CustomButton >
                    </div>
                </form>)}
            </Formik>
        </div >
    )
}
export default AwardPoint