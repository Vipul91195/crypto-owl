import React, { useEffect, useState } from 'react'
import CustomButton from '../forms/CustomButton'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, removeBusiness } from '../../Redux/commonSlice';
import { useParams } from 'react-router-dom';

const ConfirmationModal = () => {
    const dispatch = useDispatch();
    
    const { isLoading, selectedIds } = useSelector(state => ({
        isLoading: state.commonSlice.isLoading,
        selectedIds: state.commonSlice.tableData.selectedIds
    }));
    const { business_id, member_id } = useParams();

    const [members, setMembers] = useState(null);
    
    const handleConfirm = () => {
        members && business_id ? dispatch(removeBusiness({ business_id, data:{ member_id: members }})): member_id ? dispatch(removeBusiness({member_id, data:{ member_id: [member_id] } })) : dispatch(removeBusiness({ data:{ member_id: members } }));
    }
    
    const handleCancel = () => {
        dispatch(closeModal());
    }
    
    useEffect(() => {
        setMembers(Object.keys(selectedIds).filter(selectedId => selectedIds[selectedId]))
    }, [selectedIds]);

    return (
        <div className='w-[300px] px-3  bg-[#1C1C1C] py-5'>
            <p className='whitespace-nowrap text-sm text-white w-max mx-auto text-end'>Are sure you want to delete business</p>
            <div className='flex justify-center gap-3 mt-5'>
                <CustomButton
                    loaderSize={20}
                    type='submit'
                    onClick={handleCancel}
                    buttonStyle="w-full max-w-[30%] col-start-3 bg-[#DD69AA] rounded-[10px] text-[12px] py-1 text-white">
                    Cancel
                </CustomButton >
                <CustomButton
                    showLoader={isLoading}
                    disabled={isLoading}
                    loaderSize={10}
                    onClick={handleConfirm}
                    type='submit'
                    buttonStyle="w-full max-w-[30%] col-start-4 bg-[#DD69AA] rounded-[10px] text-[12px] py-1 text-white">
                    Yes
                </CustomButton >
            </div>
        </div>
    )
}

export default ConfirmationModal