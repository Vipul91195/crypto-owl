import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { InputField } from '../forms/InputField'
import { CloseFilled, SearchIcon, StarFilled, UserAdd } from '../icons'
import CustomButton from '../forms/CustomButton'
import { openConfirmModal } from '../../Redux/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import CustomModal from '../CustomModal'
import BusinessForm from '../../admin/BusinessForm'
import CustomerForm from '../../admin/CustomerForm'
import AwardPoint from '../../admin/AwardPoint'

const AdminHeader = ({type, title, showControls = true}) => {
  const { selectedIds } = useSelector(state => state.modalSlice.tableData);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  // const [selectedIds, setSelectedIds] = useState(null);
  const showModal = (type) => setModal(type)
  const hideModal = () => setModal(false)

  return (
    <div className="pb-3 md:pt-[36px] 2xl:pt-[72px] flex md:gap-5 lg:gap-14 justify-between md:items-start lg:items-center w-full items-center md:flex-col lg:flex-row">
      {/* font-size: 20px;
    white-space: pre-wrap;
    max-width: 65%; */}
        <p className="text-white whitespace-pre-wrap 2xl:whitespace-nowrap 2xl:leading-9 leading-5 text-xl max-w-[65%] md:max-w-none md:text-lg lg:text-xl xl:text-[28px] 4xl:text-4xl">
          {title || "User Management (Businesses)"}
        </p>
        {showControls && 
          <div className="gap-[10px] md:gap-6 items-center flex">
            <Formik initialValues={{ searchTerm: "" }} onSubmit={() => console.log(" search term submitted. ")}>
                <Form>
                  <InputField
                    iconAfter={<SearchIcon className="h-[14px] 2xl:h-[17px] hidden md:block w-[14px] 2xl:w-[17px]" />}
                    type="text"
                    name="searchTerm"
                    placeholder="Search"
                    inputstyle="bg-[#101010] focus-visible:outline-none placeholder:text-[#A6A6A6] hidden md:block md:max-w-[200px] 2xl:max-w-[250px] 4xl:max-w-[300px] w-screen lg:text-[16px] 2xl:text-5 leading-5 text-[#A6A6A6] rounded-[10px] 2xl:rounded-[15px] py-2 xl:py-3 4xl:py-4 px-6"
                  />
                </Form>
            </Formik>
            {/* <div className="gap-6 items-center hidden md:flex"> */}
              <CustomButton
                type="submit"
                disabled={selectedIds}
                onClick={() =>
                  dispatch(openConfirmModal({ message: "User has been removed" }))
                }
                buttonStyle="hidden md:block lg:leading-[16px] 2xl:leading-6 4xl:w-screen w-full 4xl:max-w-[200px] px-3 2xl:px-6 4xl:px-0 py-[6px] lg:py-2 xl:py-3 lg:text-sm h-max 4xl:h-[51px] text-[12px] 2xl:text-sm  border border-[#DD69AA] font-medium rounded-[12px] 2xl:rounded-2xl text-[#DD69AA]"
              >
                Remove
              </CustomButton>
              <button className='block md:hidden p-[3px] relative group'>
                <UserAdd className="text-[#DD69AA]" />
                <div className='bg-[#101010] group-hover:block hidden py-[10px] px-3 rounded-[4px] absolute translate-y-full -translate-x-1/2 -bottom-[10px] left-1/2'>
                  <span className='text-[14px] text-[#979998] whitespace-nowrap leading-[10px]'>Add Customer</span>
                </div>
              </button>
              <CustomButton
                disabled={selectedIds}
                onClick={() => selectedIds && showModal("award")}
                buttonStyle="hidden md:block lg:leading-[16px] 2xl:leading-6 4xl:w-screen w-full 4xl:max-w-[200px] px-3 2xl:px-6 4xl:px-0 py-[6px] lg:py-2 xl:py-3 lg:text-sm h-max 4xl:h-[51px] text-[12px] 2xl:text-sm border border-[#DD69AA] font-medium rounded-[12px] 2xl:rounded-2xl text-[#DD69AA] whitespace-nowrap"
              >
                Award Point
              </CustomButton>
              <button className='block md:hidden p-[3px] relative group'>
                <CloseFilled className="text-[#DD69AA]" />
                <div className='bg-[#101010] group-hover:block hidden py-[10px] px-3 rounded-[4px] absolute translate-y-full -translate-x-1/2 -bottom-[10px] left-1/2'>
                  <span className='text-[14px] text-[#979998] whitespace-nowrap leading-[10px]'>Remove</span>
                </div>
              </button>
              <CustomButton
                onClick={() => showModal(type || "business")}
                buttonStyle="hidden md:block lg:leading-[16px] 2xl:leading-6 4xl:w-screen w-full 4xl:max-w-[200px] px-3 2xl:px-6 4xl:px-0 py-[6px] lg:py-2 xl:py-3 lg:text-sm h-max 4xl:h-[51px] text-[12px] 2xl:text-sm font-medium rounded-[12px] 2xl:rounded-2xl text-white bg-[#DD69AA] whitespace-nowrap"
              >
                Add Customer
              </CustomButton>
              <button className='block md:hidden p-[3px] relative group'>
                <StarFilled className="text-[#DD69AA]" />
                <div className='bg-[#101010] group-hover:block hidden py-[10px] px-3 rounded-[4px] absolute translate-y-full -translate-x-1/2 -bottom-[10px] left-1/2'>
                  <span className='text-[14px] text-[#979998] whitespace-nowrap leading-[10px]'>Award Points</span>
                </div>
              </button>
            {/* </div> */}
          </div>
        }
        <CustomModal onClose={hideModal} modal={{ isVisible: !!modal }}>
          {modal === "business" && <BusinessForm />}
          {modal === "customer" && <CustomerForm />}
          {modal === "award" && <AwardPoint type={type} memberId={selectedIds} />}
        </CustomModal>
      </div>
  )
}

export default AdminHeader