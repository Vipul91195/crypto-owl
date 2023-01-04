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
import { Arrow, SearchIcon } from '../icons';
import { openConfirmModal, setCurrentPage } from '../../Redux/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../CustomModal';
import BusinessForm from '../../admin/BusinessForm';
import { useNavigate } from 'react-router';
import { getBusinesses } from '../../Redux/businessSlice';
import AdminHeader from '../layout/AdminHeader';
import { SelectColumnFilter } from '../../utils/helper';
import ReactPaginate from 'react-paginate';
import { capitalize } from 'lodash';
import { Oval } from 'react-loader-spinner';
import Loader from '../loader/Loader';

const Businesses = () => {
  const { isLoading, allBusinesses, isAdmin, pageSize, currentPage, pagination, selectedFilter, currentTable, sortColumns } = useSelector(state => ({
    isLoading: state.businessSlice.isLoading,
    isAdmin: state.loginSlice.allData.is_admin,
    allBusinesses: state.businessSlice.allBusinesses,
    pagination: state.businessSlice.pagination,
    pageSize: state.commonSlice.tableData.pageSize,
    currentPage: state.commonSlice.tableData.currentPage,
    selectedFilter: state.commonSlice.tableData.selectedFilter,
    currentTable: state.commonSlice.tableData.currentTable,
    sortColumns: state.commonSlice?.tableData?.sortColumns
  }))
  const [selectedIds, setSelectedIds] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const showModal = (type) => setModal(type)
  const hideModal = () => setModal(false)
  const [currentPageLocal, setCurrentPageLocal] = useState(1);
  const [totalPages, setTotalPages] = useState(20);

  const handlePageClick = (page) => {
    dispatch(setCurrentPage(page.selected + 1));
  }

  useEffect(() => {
    isAdmin === "true" && dispatch(getBusinesses({ page: currentPage }))
  }, []);

  useEffect(() => {
    dispatch(
      getBusinesses({
        page: currentPage,
        filter: selectedFilter,
        order_by: Object.keys(sortColumns || {}).includes("Business")
          ? sortColumns["Business"]
          : null,
        sort_personal_points: Object.keys(sortColumns || {}).includes("personal_points")
          ? sortColumns["personal_points"]
          : null,
        sort_business_points: Object.keys(sortColumns || {}).includes("business_points")
          ? sortColumns["business_points"]
          : null,
      })
    );
  }, [currentTable, currentPage, dispatch, selectedFilter, sortColumns]);

  const tempData = React.useMemo(() => [
    {
      business_id: 1,
      selected: false,
      businessImage: "",
      business: "Verizon",
      owner_name: "maddison_c21",
      owner_email: "xyz@gmail.com",
      member_id: "9821",
      issue_date: "12/12/1212",
      business_points: "1000",
      personal_points: "1000",
      status: "Inactive",
    },
    {
      business_id: 2,
      selected: false,
      businessImage: "",
      business: "Verizon",
      owner_name: "maddison_c21",
      owner_email: "xyz@gmail.com",
      member_id: "9821",
      issue_date: "12/12/1212",
      business_points: "1000",
      personal_points: "1000",
      status: "Inactive",
    }
  ]);

  const columns = React.useMemo(() => [
    {
      Header: "Business",
      sortable: true,
      accessor: (row) => {
        const { business_logo, business, business_id } = row;
        return (
          <div onClick={() => navigate(`/customers/${business_id}`)} className="flex gap-[16px] items-center cursor-pointer">
            <div className="w-[30px] h-[30px] 2xl:w-[45.42px] 2xl:h-[45.42px] rounded-[10px] 2xl:rounded-[18.1674px] overflow-hidden flex items-center justify-center bg-black ">
              {business_logo && business_logo !== "" ? (
                <img src={process.env.REACT_APP_PUBLIC_MEDIA_URL+business_logo} alt="test" />
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
      id: "issue_date",
      accessor: ({issue_date}) => {
        const issueDate = new Date(issue_date);
        return issueDate.toLocaleDateString();
      },
    },
    {
      Header: "Status",
      accessor: ({ status }) => {
        return <p className={classNames({ 'text-[#DD69AA]': status === "active", 'text-[#A6A6A6]': status === "inactive" })}  >{capitalize(status)}</p>
      },
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Business Points",
      accessor: "business_points",
      sortable: true,
    },
    {
      Header: "Personal Points",
      accessor: "personal_points",
      sortable: true,
    },
  ]);

  return (
    <AdminLayout>
      <><AdminHeader type="business" title="User Management (Businesses)" />
        <div className="md:mt-[36px] lg:mt-[56px]">
          {Array.isArray(allBusinesses) ?
            <CommonTable
              showSelectCheck={allBusinesses}
              selectionColumn="member_id"
              columns={allBusinesses ? columns : [{ Header: "", accessor: "no_data" }]}
              data={allBusinesses || [{ no_data: "No Data" }]}
              // data={tempData}
              // columns={columns}
              filteredColumns={["Status"]}
              HeaderClasses="bg-[#040404] text-[#DD69AA]"
              HeadingClasses="relative py-2 md:pt-[26px] md:pb-[20px] 2xl:pt-[30px] 2xl:pb-[24px] 4xl:pt-[34px] 4xl:pb-[28px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 whitespace-nowrap text-[16px] 2xl:text-[20px] leading-[16px] 2xl:leading-[24px] font-[500]  -tracking-[0.02em]"
              tableClasses="w-full rounded-[20px] overflow-hidden"
              BodyClasses="text-white bg-[#101010]"
              containerClasses="min-h-[20vh] h-max overflow-x-auto"
              cellDefaultStyle="text-[16px] 2xl:text-xl leading-[16px] 2xl:leading-[36.33px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal pt-[18px] 2xl:py-[22px] -tracking-[2%] text-center text-[#A6A6A6]"
              headerClasses={{
                owner_name: { textAlign: "right" },
                Business: { textAlign: "left" },
                business_points: {
                  textAlign: "center",
                  whiteSpace: "pre-wrap",
                  // maxWidth: "90px",
                },
                personal_points: {
                  textAlign: "center",
                  whiteSpace: "pre-wrap",
                  // maxWidth: "90px",
                },
              }}
              cellTextClassName={{
                Business: { justifyContent: "left", width: "100%" },
                owner_email: { justifyContent: "center", width: "100%" },
                owner_name: { justifyContent: "right", width: "100%" },
              }}
              cellClasses={{
                Business: { textAlign: "left", fontWeight: "700", color: "#CDBEBE" },
                owner_email: { color: "#DD69AA" },
                owner_name: {
                  color: "#CDBEBE",
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
              isLoading={isLoading}
            />
          :
            <CommonTable
              columns={[{ Header: "", accessor: "no_data" }]}
              data={[{ no_data: "No Data" }]}
              filteredColumns={["Status"]}
              HeaderClasses="bg-[#040404] text-[#DD69AA]"
              HeadingClasses="relative py-2 md:pt-[26px] md:pb-[20px] 2xl:pt-[30px] 2xl:pb-[24px] 4xl:pt-[34px] 4xl:pb-[28px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 whitespace-nowrap text-[16px] 2xl:text-[20px] leading-[16px] 2xl:leading-[24px] font-[500]  -tracking-[0.02em]"
              tableClasses="w-full rounded-[20px] overflow-hidden"
              BodyClasses="text-white bg-[#101010]"
              containerClasses="min-h-[20vh] h-max overflow-x-auto"
              cellDefaultStyle="text-[16px] 2xl:text-xl leading-[16px] 2xl:leading-[36.33px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal pt-[18px] 2xl:py-[22px] -tracking-[2%] text-center"
            />
          } 
          {pagination &&
            <div className="flex justify-center md:justify-end h-max items-center gap-12">
              <ReactPaginate
                breakLabel=".........."
                nextLabel={
                  <button disabled={!pagination?.next_link} className="group"
                  >
                    <div className="bg-[#DD69AA] md:py-[9px] px-3 md:h-[30px] py-1 group-disabled:bg-gray-500 rounded-[3px] ml-2 md:ml-1 md:rounded-[10px] hover:bg-pink-500">
                      <Arrow className="text-white group-hover:text-black rotate-180" />
                    </div>
                  </button>
                }
                pageRangeDisplayed={1}
                onPageChange={handlePageClick}
                forcePage={currentPage - 1}
                pageCount={pagination?.total_pages || 1}
                marginPagesDisplayed={2}
                previousLabel={
                  <button
                    className="group"
                    disabled={!pagination?.previous_link}
                  >
                    <div className="bg-[#DD69AA] group-disabled:bg-gray-500 md:py-[9px] px-3 md:h-[30px] py-1 group rounded-[3px] mr-2 md:mr-1 md:rounded-[10px] hover:bg-pink-500">
                      <Arrow className="text-white group-hover:text-black" />
                    </div>
                  </button>
                }
                renderOnZeroPageCount={1}
                nextLinkClassName="leading-none flex"
                previousLinkClassName="leading-none flex"
                containerClassName={
                  "flex pt-[17px] pb-[25px] md:py-8 justify-center items-center gap-x-[3px] md:gap-x-1 leading-none"
                }
                pageClassName="cursor-pointer md:rounded-[10px] md:min-w-[30px] md:h-[30px] md:flex md:justify-center md:items-center after:content-[','] last:bg-blue-500 after:ml-1 after:text-[#979998] md:after:content-none"
                pageLinkClassName="font-normal md:px-2 md:py-1 h-full w-full text-center text-[14px] md:text-sm leading-[18.87px] text-[#979998] -tracking-tight"
                breakClassName="text-[#979998] tracking-[2px] md:tracking-[3px] 2xl:tracking-[5px]"
                activeLinkClassName="text-[#FFFFFF]"
                activeClassName="md:bg-[#DD69AA]"
              />
            </div>
          }
        </div>
      </>
    </AdminLayout>
  );
}

export default Businesses;