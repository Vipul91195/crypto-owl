import React from 'react'
import CustomModal from './CustomModal'
import { CloseFilled } from './icons'
import { useDispatch, useSelector } from 'react-redux'
import { closeConfirmModal } from '../Redux/commonSlice'

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const ConfirmModal = useSelector(state => state.commonSlice.confirmModal);
  return (
    <CustomModal modal={ConfirmModal} >
      <div className='bg-[#101010] min-w-[300px] rounded-[10px]'>
        <div className='flex items-center border-b-[0.5px] justify-between p-[8.75px] border-solid border-[#545557]'>
          <p className='text-white' >{ConfirmModal.title}</p>
          <button className='block' onClick={() => dispatch(closeConfirmModal())}>
            <CloseFilled className="text-[#737373]" />
          </button>
        </div>
        <div className='px-[60px] py-[22px] text-center'>
          <p className='text-5 leading-6 text-[#737373] font-normal'>
            {ConfirmModal?.message}
          </p>
        </div>
      </div>
    </CustomModal>
  )
}

export default ConfirmModal