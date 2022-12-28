import { Formik, Form } from 'formik'
import React, { useEffect, useState } from 'react'
import { InputField } from '../forms/InputField'
import { CloseFilled, SearchIcon, StarFilled, UserAdd, Message } from '../icons'
import CustomButton from '../forms/CustomButton'
import { closeModal, openConfirmModal, openModal, setCurrentPage } from '../../Redux/commonSlice'
import { useDispatch, useSelector } from 'react-redux'
import CustomModal from '../CustomModal'
import BusinessForm from '../../admin/BusinessForm'
import CustomerForm from '../../admin/CustomerForm'
import AwardPoint from '../../admin/AwardPoint'
import classNames from 'classnames'
import TextField from '../forms/TextField'
import { getBusinessCustomers, getBusinesses } from '../../Redux/businessSlice'
import { useParams } from 'react-router-dom'

const AdminHeader = ({ type, title, showControls = true }) => {
  const { selectedIds, modal, pageSize } = useSelector(state => ({
    selectedIds: state.commonSlice.tableData.selectedIds,
    pageSize: state.commonSlice.tableData.pageSize,
    modal: state.commonSlice.modal
  }));

  const [searchTerm, setSearchTerm] = useState(null);
  const dispatch = useDispatch();
  const [anySelected, setAnySelected] = useState(null);
  const hideModal = () => dispatch(closeModal());
  const location = useParams();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    if (type === "business" && searchTerm !== null) {
      dispatch(getBusinesses({ search: searchTerm, page_size: pageSize }));
      searchTerm === "" && setSearchTerm(null);
    }
    dispatch(setCurrentPage(1));
    type === "customer" && location.business_id && dispatch(getBusinessCustomers({ page: 1, business_id: location.business_id, search: searchTerm, page_size: pageSize }));
  }, [searchTerm]);

  useEffect(() => {
    setAnySelected(Object.keys(Object.keys(selectedIds).filter(selectedId => selectedIds[selectedId])).length > 0);
  }, [selectedIds]);

  return (
    <div className="pb-3 md:pt-[36px] 2xl:pt-[72px] flex md:gap-5 lg:gap-14 justify-between md:items-start lg:items-center w-full items-center md:flex-col lg:flex-row">
      <p className="text-white whitespace-pre-wrap 2xl:whitespace-nowrap 2xl:leading-9 leading-5 text-xl max-w-[65%] md:max-w-none md:text-lg lg:text-xl xl:text-[28px] 4xl:text-4xl">
        {title || "User Management (Businesses)"}
      </p>
      {showControls && (
        <div className="gap-[10px] md:gap-6 items-center flex">
          <TextField
            iconAfter={
              <SearchIcon className="h-[14px] 2xl:h-[17px] hidden md:block w-[14px] 2xl:w-[17px]" />
            }
            type="text"
            name="searchTerm"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search"
            inputstyle="bg-[#101010] focus-visible:outline-none placeholder:text-[#A6A6A6] hidden md:block md:max-w-[200px] 2xl:max-w-[250px] 4xl:max-w-[300px] w-screen lg:text-[16px] 2xl:text-5 leading-5 text-[#A6A6A6] rounded-[10px] 2xl:rounded-[15px] py-2 xl:py-3 4xl:py-4 px-6"
          />
          <CustomButton
            type="submit"
            disabled={!anySelected}
            onClick={() =>
              dispatch(openConfirmModal({ message: "User has been removed" }))
            }
            buttonStyle="hidden md:block lg:leading-[16px] 2xl:leading-6 4xl:w-screen w-full 4xl:max-w-[200px] px-3 2xl:px-6 4xl:px-0 py-[6px] lg:py-2 xl:py-3 lg:text-sm h-max 4xl:h-[51px] text-[12px] 2xl:text-sm  border border-[#DD69AA] font-medium rounded-[12px] 2xl:rounded-2xl text-[#DD69AA]"
          >
            Remove
          </CustomButton>
          <CustomButton
            disabled={!anySelected}
            onClick={() => { dispatch(openModal({ type: "award" })) }}
            buttonStyle="hidden md:block lg:leading-[16px] 2xl:leading-6 4xl:w-screen w-full 4xl:max-w-[200px] px-3 2xl:px-6 4xl:px-0 py-[6px] lg:py-2 xl:py-3 lg:text-sm h-max 4xl:h-[51px] text-[12px] 2xl:text-sm border border-[#DD69AA] font-medium rounded-[12px] 2xl:rounded-2xl text-[#DD69AA] whitespace-nowrap"
          >
            Award Point
          </CustomButton>
          <CustomButton
            onClick={() => dispatch(openModal({ type }))}
            buttonStyle="hidden md:block lg:leading-[16px] 2xl:leading-6 4xl:w-screen w-full 4xl:max-w-[200px] px-3 2xl:px-6 4xl:px-0 py-[6px] lg:py-2 xl:py-3 lg:text-sm h-max 4xl:h-[51px] text-[12px] 2xl:text-sm font-medium rounded-[12px] 2xl:rounded-2xl text-white bg-[#DD69AA] whitespace-nowrap"
          >
            {type === "business" ? "Add Business" : "Add Customer"}
          </CustomButton>
          <button className="block md:hidden p-[3px] relative group"
            onClick={() => dispatch(openModal({ type }))}
          >
            {type === "user-profile" ? <Message className="text-[#DD69AA]" />
              : <UserAdd className="text-[#DD69AA]" />}
            <div className="bg-[#101010] z-50 group-hover:block hidden py-[10px] px-3 rounded-[4px] absolute translate-y-full -translate-x-1/2 -bottom-[10px] left-1/2">
              <span className="text-[14px] text-[#979998] whitespace-nowrap leading-[10px]">
                {type === "business" ? "Add Business" : "Add Customer"}
              </span>
            </div>
          </button>
          <button
            className="block md:hidden p-[3px] group relative"
            disabled={!anySelected}
            onClick={() => dispatch(openConfirmModal({ message: "User has been removed" }))}
          >
            <CloseFilled className={classNames({ "text-[#DD69AA]": anySelected }, { "text-gray-500": (!selectedIds || !anySelected) })} />
            <div className="bg-[#101010] z-50 group-hover:block hidden py-[10px] px-3 rounded-[4px] absolute translate-y-full -translate-x-1/2 -bottom-[10px] left-1/2">
              <span className="text-[14px] text-[#979998] whitespace-nowrap leading-[10px]">
                Remove
              </span>
            </div>
          </button>
          <button className="block md:hidden p-[3px] group relative"
            disabled={!anySelected}
            onClick={() => dispatch(openModal({ type: "award" }))}
          >
            <StarFilled className={classNames({ "text-[#DD69AA]": anySelected }, { "text-gray-500": (!selectedIds || !anySelected) })} />
            <div className="bg-[#101010] z-50 group-hover:block hidden py-[10px] px-3 rounded-[4px] absolute translate-y-full -translate-x-1/2 -bottom-[10px] left-1/2">
              <span className="text-[14px] text-[#979998] whitespace-nowrap leading-[10px]">
                Award Points
              </span>
            </div>
          </button>
        </div>
      )}
      <CustomModal onClose={hideModal} modal={modal}>
        {modal.type === "business" && <BusinessForm />}
        {modal.type === "customer" && <CustomerForm />}
        {modal.type === "award" && <AwardPoint type={type} memberId={selectedIds} />}
      </CustomModal>
    </div>
  );
}

export default AdminHeader