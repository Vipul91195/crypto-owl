import React, { useEffect, useState } from "react";
import CustomButton from "../forms/CustomButton";
import UserManagement from "../../admin/UserManagement";
import { AdminLayout } from "../layout/AdminLayout";
import CommonTable from "../table/CommonTable";
import PopOver from "../PopOver";
import AwardPoint from "../../admin/AwardPoint";
import businessIcon from "../../assets/img/businessIcon.svg";
import classNames from "classnames";
import { Navigate, useLocation, useNavigate, useParams, useRoutes } from "react-router";
import { Form, Formik } from "formik";
import { InputField } from "../forms/InputField";
import { Arrow, SearchIcon } from "../icons";
import { openNotifyModal, setCurrentPage } from "../../Redux/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomerForm from "../../admin/CustomerForm";
import CustomModal from "../CustomModal";
import AdminHeader from "../layout/AdminHeader";
import { SelectColumnFilter } from "../../utils/helper";
import { getBusiness, getBusinessCustomers } from "../../Redux/businessSlice";
import ReactPaginate from "react-paginate";
import Loader from "../loader/Loader";
import DataLoader from "../loader/DataLoader";

const Customers = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    businessCustomers,
    businessDetails,
    currentPage,
    pageSize,
    pagination,
    currentTable,
    selectedFilter,
  } = useSelector((state) => ({
    isLoading: state.businessSlice.isLoading,
    businessCustomers: state.businessSlice.businessCustomers,
    businessDetails: state.businessSlice.businessDetails,
    pagination: state.businessSlice.pagination,
    pageSize: state.commonSlice.tableData.pageSize,
    currentPage: state.commonSlice.tableData.currentPage,
    selectedFilter: state.commonSlice.tableData.selectedFilter,
    currentTable: state.commonSlice.tableData.currentTable,
  }));

  const [modal, setModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState(null);
  const navigate = useNavigate();
  const showModal = (type) => setModal(type)
  const hideModal = () => setModal(false)
  const { business_id } = useParams();

  useEffect(() => {
    business_id && dispatch(getBusinessCustomers({ business_id: business_id }));
    business_id && dispatch(getBusiness({ business_id: business_id }));
  }, [business_id])

  const handlePageClick = (page) => {
    dispatch(setCurrentPage(page.selected + 1));
  }

  useEffect(() => {
    dispatch(getBusinessCustomers({ business_id: business_id, page: currentPage, filter: selectedFilter }))
  }, [currentTable, currentPage, selectedFilter]);

  const columns = React.useMemo(() => [
    {
      Header: "Business Id",
      accessor: "business_id",
    },
    {
      Header: "Name",
      accessor: (row) => {
        const { customerImage, name, member_id } = row;
        return (
          <div onClick={() => navigate(`/profile/${member_id}`)} className="flex gap-[16px] items-center cursor-pointer">
            <div className="w-[30px] h-[30px] 2xl:w-[45.42px] 2xl:h-[45.42px] rounded-[10px] 2xl:rounded-[18.1674px] overflow-hidden flex items-center justify-center bg-black">
              {customerImage && customerImage !== "" ? (
                <img src={customerImage} alt="test" />
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
            <p>{name}</p>
          </div>
        );
      },
    },
    {
      Header: "Member Id",
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
      Header: "Email Id",
      accessor: "email",
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

  const initialState = { hiddenColumns: ['business_id'] };

  return (
    <AdminLayout >
        <><AdminHeader type="customer" title="User Management (Customers)" />
          <div className="pt-[2px] 2xl:pt-[50.94px] rounded-b-[20px] overflow-hidden relative">
            <div className="absolute pt-4 pl-[14px] 2xl:pt-[40px] 2xl:pl-[42px]">
              <div className='relative max-w-[82.39px] max-h-[82.39px]  lg:max-w-[130px] 2xl:max-w-[217px] 2xl:max-h-[252px]'>
                <img
                  src={businessDetails?.business_logo ? process.env.REACT_APP_PUBLIC_MEDIA_URL+businessDetails?.business_logo : businessIcon}
                  alt="businessIcon"
                />
              </div>
            </div>
            <div className="text-2xl leading-4 tracking-tight font-bold text-white pt-[17.9px] pb-[7.91px] pl-[109px] lg:pl-[170px] lg:text-4xl 2xl:text-5xl 2xl:leading-9  2xl:text-[#CDBEBE] 2xl:pt-10 2xl:pb-[18px] bg-[#040404] 2xl:pl-[279px] rounded-t-[20px]">
              {isLoading ?
                <DataLoader
                  lines={1}
                  lineClassName="h-4 bg-gray-500"
                  containerClassName="max-w-[100px] sm:max-w-[140px] md:max-w-[200px] xl:max-w-[250px] flex-col gap-2"
                />
              :
                businessDetails?.business_name
              }
              </div>
            <div className="flex flex-col lg:flex lg:flex-row 2xl:items-center pt-[3px] 2xl:pl-[279px] lg:pr-[30px] 2xl:pt-2 2xl:pb-[18px] bg-[#101010]">
              <div className="text-sm pl-[109px] lg:pl-[170px] lg:text-lg 2xl:pl-0 pr-[15px] 2xl:pr-0 pb-[12.11px] 2xl:pb-0 leading-4 tracking-tight 2xl:text-xl 2xl:leading-9 font-normal text-[#979998] flex flex-col gap-[4px] lg:gap-0 2xl:gap-[6px] justify-between grow">
              {isLoading ?
                <DataLoader
                  lines={3}
                  lineClassName="h-4 bg-gray-500"
                  containerClassName="flex-col gap-2"
                />
                :<>
                <div className="flex justify-between">
                  <p > Company No.</p>
                  <p className="text-[#DD69AA]">{businessDetails?.company_no}</p>
                </div>
                <div className="flex justify-between">
                  <p>VAT Number</p>
                  <p className="text-[#DD69AA]">{businessDetails?.vat_numer}</p>
                </div>
                <div className="flex justify-between">
                  <p>Member ID</p>
                  <p className="text-[#DD69AA]">{businessDetails?.member_id}</p>
                </div>
                </>}
              </div>
              <span className="hidden lg:flex lg:h-[70px] mt-[7px] 2xl:h-[100px] w-[1px] lg:mx-[20px] xl:mx-[40px] 2xl:mx-[55px] bg-[#979998] lg:text-center"></span>
              <div className="hidden lg:flex text-xl leading-9 font-normal text-[#979998] lg:text-lg 2xl:text-xl 2xl:leading-9  2xl:flex flex-col gap-[6px] lg:gap-0 2xl:gap-[6px] justify-between grow pb-[12.11px]">
              {isLoading ?
                <DataLoader
                  lines={3}
                  lineClassName="h-4 bg-gray-500"
                  containerClassName="flex-col gap-2"
                />
                :<>
                <div className="flex justify-between">
                  <p >
                    Owner
                  </p>
                  <p className="text-[#DD69AA]">{businessDetails?.owner}</p>
                </div>
                <div className="flex justify-between">
                  <p>Owner&apos;s Email ID</p>
                  <p className="text-[#DD69AA]">
                    {businessDetails?.owner_email_id}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Address</p>
                  <p className="text-[#DD69AA]">{businessDetails?.address}</p>
                </div>
                </>}
              </div>
            </div>
          </div>
          <div className="lg:hidden">
            <div className="flex gap-1">
              <span className="text-base leading-9 font-medium tracking-tight text-[#979998]">Details</span>
              <div className="h-[2px] w-full bg-[#979998] mt-[23px]"></div>
            </div>
            {isLoading ? <>
              <DataLoader
                  lines={3}
                  lineClassName="h-5 bg-gray-500"
                  containerClassName="flex-col gap-2"
                />
              </>:<>
                <div className="flex justify-between ">
                  <span className="text-sm leading-3 tracking-tight font-normal text-[#979998]">Owner</span>
                  <span className="text-sm leading-3 tracking-tight font-medium text-[#CDBEBE]">Kris Washington</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm leading-3 tracking-tight font-normal text-[#979998]">Owner&apos;s Email ID</span>
                  <span className="text-sm leading-3 tracking-tight font-medium text-[#CDBEBE]">xyz@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm leading-3 tracking-tight font-normal text-[#979998]">Address</span>
                  <span className="text-sm leading-4 tracking-tight font-medium text-[#CDBEBE] w-[172px] text-end">Khandala, behind hanging garden, India</span>
                </div>
            </>}
          </div>
          <div className="mt-3 md:mt-[38px] 2xl:mt-[20px]">
            {Array.isArray(businessCustomers) ? (
              <CommonTable
                initialState={initialState}
                showSelectCheck={businessCustomers}
                data={businessCustomers || [{ no_data: "No Data" }]}
                columns={
                  businessCustomers
                    ? columns
                    : [{ Header: "", accessor: "no_data" }]
                }
                // showSelectCheck
                // columns={columns}
                // data={data}
                selectionColumn="member_id"
                filteredColumns={["Status"]}
                heightLightRow={{ memberId: businessDetails?.member_id }}
                // heightLightRow={{ memberId: "MEM0001" }}
                // heighLightCellPostfix={{ name: "(owner)" }}
                HeaderClasses="bg-[#040404] text-[#DD69AA]"
                HeadingClasses="relative py-2 md:pt-[26px] md:pb-[20px] 2xl:pt-[30px] 2xl:pb-[24px] 4xl:pt-[34px] 4xl:pb-[28px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 whitespace-nowrap text-[16px] 2xl:text-[20px] leading-[16px] 2xl:leading-[24px] font-[500]  -tracking-[0.02em]"
                cellDefaultStyle="text-[16px] 2xl:text-xl leading-[16px] 2xl:leading-[36.33px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal pt-[18px] 2xl:py-[22px] -tracking-[2%] text-center"
                tableClasses="w-full rounded-[20px] overflow-hidden"
                BodyClasses="text-white bg-[#101010]"
                containerClasses="min-h-[20vh] h-max overflow-auto"
                headerClasses={{
                  selected: { padding: "0" },
                  Name: { textAlign: "left", maxWidth: "399px" },
                  businessPoints: {
                    textAlign: "center",
                    whiteSpace: "pre-wrap",
                    maxWidth: "90px",
                  },
                  personalPoints: {
                    textAlign: "center",
                    whiteSpace: "pre-wrap",
                    maxWidth: "90px",
                  },
                }}
                cellTextClassName={{
                  emailId: { justifyContent: "center", width: "100%" },
                  Name: { justifyContent: "left", width: "100%" },
                  selected: { padding: "0", width: "18px" },
                }}
                cellClasses={{
                  selected: { paddingInline: "22px 15px", width: "18px" },
                  Name: {
                    textAlign: "left",
                    fontSize: "16px",
                    fontWeight: "700",
                    maxWidth: "280px",
                    lineHeight: "1px",
                    "@media (max-width: 1536px)": {
                      fontSize: "21px",
                      maxWidth: "369px",
                      lineHeight: "24px",
                    },
                  },
                  // personal_points: {
                  //   textAlign: "center",
                  //   whiteSpace: "pre-wrap",
                  //   maxWidth: "90px",
                  // },
                  email: { textAlign: "center", color: "#DD69AA" },
                }}
                handleRowSelect={setSelectedIds}
                isLoading={isLoading}
              />
            ) : (
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
            )}
            {pagination && (
              <div className="flex justify-center md:justify-end h-max items-center gap-12">
                <ReactPaginate
                  breakLabel=".........."
                  nextLabel={
                    <button disabled={!pagination?.next_link} className="group">
                      <div className="bg-[#DD69AA] md:py-[9px] px-3 md:h-[30px] py-1 group-disabled:bg-gray-500 rounded-[3px] ml-2 md:ml-1 md:rounded-[10px] hover:bg-pink-500">
                        <Arrow className="text-white group-hover:text-black rotate-180" />
                      </div>
                    </button>
                  }
                  forcePage={currentPage - 1}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={1}
                  pageCount={pagination?.total_pages || 0}
                  // marginPagesDisplayed={2}
                  previousLabel={
                    <button className="group" disabled={!pagination?.previous_link}>
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
            )}
          </div>
        </>
    </AdminLayout>
  );
};
export default Customers;
