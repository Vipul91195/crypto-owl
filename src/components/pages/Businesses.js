import React, { useEffect, useState } from 'react'
import CustomButton from '../forms/CustomButton'
import UserManagement from '../../admin/UserManagement'
import { AdminLayout } from '../layout/AdminLayout'
import CommonTable from '../table/CommonTable';
import PopOver from '../PopOver';
import AwardPoint from '../../admin/AwardPoint';
import classNames from 'classnames';
import { InputField } from '../forms/InputField';
import { Form, Formik } from 'formik';
import { SearchIcon } from '../icons';
import { openConfirmModal } from '../../Redux/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../CustomModal';
import BusinessForm from '../../admin/BusinessForm';
import { useNavigate } from 'react-router';
import { getBusinesses } from '../../Redux/businessSlice';
import AdminHeader from '../layout/AdminHeader';
import { SelectColumnFilter } from '../../utils/helper';

const Businesses = () => {

  const { isLoading, allBusinesses} = useSelector(state => state.businessSlice)
  const [selectedIds, setSelectedIds] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const showModal = (type) => setModal(type)
  const hideModal = () => setModal(false)

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch])
  
  const columns = React.useMemo(() => [
    {
      Header: "Business",
      accessor: (row) => {
        const { businessImage, business } = row;
        return (
          <div onClick={() => navigate('/customers')} className="flex gap-[16px] items-center cursor-pointer">
            <div className="w-[30px] h-[30px] 2xl:w-[45.42px] 2xl:h-[45.42px] rounded-[10px] 2xl:rounded-[18.1674px] overflow-hidden flex items-center justify-center bg-black ">
              {businessImage && businessImage !== "" ? (
                <img src={businessImage} alt="test" />
              ) : (
                <svg
                  stroke="currentColor"
                  className="text-white h-full w-full"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                </svg>
              )}
            </div>
            <p>{business}</p>
          </div>
        );
      },
    },
    {
      Header: "Owner’s Name",
      accessor: "owner_name",
    },
    {
      Header: "Owners Email ID",
      accessor: "owner_email",
    },
    {
      Header: "Member ID",
      accessor: "member_id",
    },
    {
      Header: "Issue Date",
      accessor: "issue_date",
    },
    {
      Header: "Status",
      accessor: (row) => {
        const { status } = row;
        return <p className={classNames({ 'text-[#DD69AA]': status === "Active", 'text-[#858383]': status === "Inactive" })}  >{status}</p>
      },
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Business Points",
      accessor: "business_points",
    },
    {
      Header: "Personal Points",
      accessor: "personal_points",
    },
  ]);

  return (
    <AdminLayout>
      <AdminHeader type="business" title="User Management (Businesses)" />
      <div className="md:mt-[36px] lg:mt-[56px]">
        <CommonTable
          showSelectCheck
          selectionColumn="member_id"
          columns={columns}
          data={allBusinesses}
          filteredColumns={["Status"]}
          HeaderClasses="bg-[#040404] text-[#DD69AA]"
          HeadingClasses="relative py-2 md:pt-[26px] md:pb-[20px] 2xl:pt-[30px] 2xl:pb-[24px] 4xl:pt-[34px] 4xl:pb-[28px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 whitespace-nowrap text-[16px] 2xl:text-[20px] leading-[16px] 2xl:leading-[24px] font-[500]  -tracking-[0.02em]"
          tableClasses="w-full rounded-[20px] overflow-hidden"
          BodyClasses="text-white bg-[#101010]"
          containerClasses="min-h-[20vh] h-max overflow-x-auto"
          cellDefaultStyle="text-[16px] 2xl:text-xl leading-[16px] 2xl:leading-[36.33px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal pt-[18px] 2xl:py-[22px] -tracking-[2%] text-center"
          headerClasses={{
            owner_name: { textAlign: "right" },
            Business: { textAlign: "left" },
            business_points: {
              textAlign: "center",
              whiteSpace: "pre-wrap",
              maxWidth: "90px",
            },
            personal_points: {
              textAlign: "center",
              whiteSpace: "pre-wrap",
              maxWidth: "90px",
            },
          }}
          cellTextClassName={{
            Business: { justifyContent: "left", width: "100%" },
            owner_email: { justifyContent: "center", width: "100%" },
            owner_name: { justifyContent: "right", width: "100%" },
          }}
          cellClasses={{
            Business: { textAlign: "left" },
            owner_name: {
              textAlign: "right",
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "16px",
              "@media (max-width: 1536px)": {
                fontSize: "21px",
                lineHeight: "24px",
              },
            },
          }}
          handleRowSelect={setSelectedIds}
        />
      </div>
    </AdminLayout>
  );
}

export default Businesses;