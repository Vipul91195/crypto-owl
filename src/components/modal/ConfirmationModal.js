import React from 'react'
import CustomButton from '../forms/CustomButton'

const ConfirmationModal = () => {
    return (
        <div className='w-[250px] px-3  bg-[#1C1C1C] py-4'>
            <p className='whitespace-nowrap text-sm text-white text-end'>Are sure you want to delete business</p>
            <div className='grid grid-cols-4 gap-[10px] mt-3 '>
                <CustomButton
                    // showLoader={isLoading}
                    // disabled={isLoading}
                    loaderSize={20}
                    type='submit'
                    buttonStyle="w-full col-start-3 bg-[#DD69AA] rounded-[10px] text-[12px] py-1 text-white">
                    Cancel
                </CustomButton >
                <CustomButton
                    // showLoader={isLoading}
                    // disabled={isLoading}
                    loaderSize={20}
                    type='submit'
                    buttonStyle="w-full col-start-4 bg-[#DD69AA] rounded-[10px] text-[12px] py-1 text-white">
                    Yes
                </CustomButton >
            </div>
        </div>
    )
}

export default ConfirmationModal