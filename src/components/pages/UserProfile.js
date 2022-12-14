import React, { useEffect, useState } from "react";
import { AdminLayout } from "../layout/AdminLayout";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CommonTable from "../table/CommonTable";
import CustomModal from "../CustomModal";
import CustomButton from "../forms/CustomButton";
import chat from "../../assets/img/chat.svg";
import roundedblock from "../../assets/img/roundedblock.svg";
import profilepic from "../../assets/img/profilepic.svg";
import avatar from "../../assets/img/avatar.jpg";
import MessageForm from "../../admin/MessageForm";
import AwardPoint from "../../admin/AwardPoint";
import AdminHeader from "../layout/AdminHeader";
import {
    getCustomerProfile,
    getTransactionHistory,
} from "../../Redux/customerSlice";
import { capitalize } from "../../utils/helper";
import { closeModal, openModal, setCurrentPage } from "../../Redux/commonSlice";
import ReactPaginate from "react-paginate";
import { Arrow } from "../icons";
import Loader from "../loader/Loader";
import DataLoader from '../loader/DataLoader';

const UserProfile = () => {
    const dispatch = useDispatch();

    const {
        isLoading,
        customerDetails,
        transactionData,
        pageSize,
        currentPage,
        pagination,
        selectedFilter,
        sortColumns,
        currentTable,
    } = useSelector((state) => ({
        isLoading: state.customerSlice.isLoading,
        customerDetails: state.customerSlice.customerDetails,
        transactionData: state.customerSlice.transactionData,
        pagination: state.customerSlice.pagination,
        pageSize: state.commonSlice.tableData.pageSize,
        currentPage: state.commonSlice.tableData.currentPage,
        selectedFilter: state.commonSlice.tableData.selectedFilter,
        currentTable: state.commonSlice.tableData.currentTable,
        sortColumns: state.commonSlice.tableData.sortColumns,
    }));

    const [selectedIds, setSelectedIds] = useState(null);
    const [tableData, setTableData] = useState(null);

    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState("details");
    const userDetails = (e) => {
        setShowDetails(e.target.id);
    };
    const { member_id } = useParams();

    useEffect(() => {
        member_id && dispatch(getCustomerProfile({ member_id }));
        member_id && dispatch(getTransactionHistory({ member_id }));
    }, [member_id]);
    
    // const columns = React.useMemo(() => [
    //     {
    //         // Header: "Serial  No",
    //         // columns: [
    //         //   {
    //         Header: "Serial  No",
    //         accessor: "serial_no",
    //         //   },
    //         // ],

    //     },
    //     {
    //         Header: "Date & Time",
    //         accessor: "date",
    //     },

    //     {
    //         Header: "From/To",
    //         accessor: "From/To",
    //     },
    //     {
    //         Header: "Email ID",
    //         accessor: "EmailID",
    //     },
    //     {
    //         Header: "Awarded",
    //         columns: [
    //             {
    //                 Header: "Business Points",
    //                 accessor: "points.business_points",
    //             },
    //             {
    //                 Header: "Personal Points",
    //                 accessor: "points.personal_points",
    //             },
    //         ],
    //     },
    //     {
    //         Header: "Balance",
    //         columns: [
    //             {
    //                 Header: "Balance Points",
    //                 accessor: "business_points",
    //             },
    //             {
    //                 Header: "Personal Points",
    //                 accessor: "personal_points",
    //             },
    //         ],
    //     },
    // ]);
     const columns = React.useMemo(() => [
    {
      Header: "",
      accessor: "no_show",
      id: "no_show",
      columns: [
        {
          Header: "Serial No",
          accessor: "serial_no",
          id: "serial_no",
        },
        {
          Header: "Date & Time",
          accessor: (row) => {
            const date = new Date();
            return date.toLocaleDateString(row['Date & Time']) + ", " + date.toLocaleTimeString(row['Date & Time'], {
              hour: '2-digit',
              minute:'2-digit'
            });
          },
          id: "date",
        },
        {
          Header: "From/To",
          accessor: "From/To",
          id: "fromTo",
        },
        {
          Header: "Email ID",
          accessor: "EmailID",
          id: "emailId",
        }
      ],
    },
    {
      Header: "Awarded",
      id: "awarded",
      columns: [
        {
          Header: "Business Points",
          // accessor: "points.business_points",
          accessor: ({points, transaction_type}) => {
            return (
              points?.business_points === 0
                  ? "-"
                  : transaction_type === "recieved"
                  ? <span
                  className="text-[#26CE7A]">{"+" + points?.business_points}</span>
                  : <span
                  className="text-[#EA7070]">{"-" + points?.business_points}</span>
            );
          },
          id: "awardBusinessPoints"
        },
        {
          Header: "Personal Points",
          accessor: ({points, transaction_type}) => {
            return points?.personal_points === 0
                  ? "-"
                  : transaction_type === "recieved"
                  ? <span
                  className="text-[#26CE7A]">{"+" + points?.personal_points}</span>
                  : <span
                  className="text-[#EA7070]">{"-" + points?.personal_points}</span>;
          },
          id: "awardPersonalPoints"
        },
      ],
    },
    {
      Header: "Balance",
      id: 'balance',
      columns: [
        {
          Header: "Balance Points",
          accessor: "business_points",
        },
        {
          Header: "Personal Points",
          accessor: "personal_points",
        },
      ],
    },
  ]);

    const handlePageClick = (page) => {
        dispatch(setCurrentPage(page.selected + 1));
    };

    useEffect(() => {
        dispatch(getTransactionHistory({ member_id, page: currentPage }));
    }, []);

    useEffect(() => {
        transactionData &&
            setTableData(
                transactionData.map((transaction, i) => ({
                    serial_no: i + 1,
                    ...transaction,
                }))
            );
    }, [transactionData]);

    useEffect(() => {
        dispatch(
            getTransactionHistory({
                member_id,
                page: currentPage,
                filter: selectedFilter
            })
        );
    }, [currentTable, currentPage, dispatch, selectedFilter]);
    return (
      <AdminLayout>
        <AdminHeader className="" type="user-profile" title="User Profile" />
        <div className="">
          {isLoading ?
            <div className="pt-[6px] 2xl:pt-[30px] rounded-b-[20px] overflow-hidden relative">
                <div className="absolute pt-4 pl-4 md:pt-6 2xl:pt-14 xl:pl-[42px] ">
                  <DataLoader lines={1}  lineClassName="bg-gray-500 relative w-screen h-screen max-w-[84.72px] md:max-w-[86px] max-h-[98.39px] lg:max-w-[125px] xl:max-w-[140px] lg:max-h-[140px] xl:max-h-[160px] 2xl:max-w-[217px] 2xl:max-h-[200px] 4xl:max-h-[252px] " />
                </div>
                <div className=" bg-[#040404] pl-[126px] lg:pl-[180px] xl:pl-[220px] 2xl:pl-[328px] pr-[24.42px] rounded-t-[20px] pt-[23px] 2xl:pt-[61px]">
                  <DataLoader
                    lines={2}
                    lineClassName="h-[24px] md:h-[18px] lg:h-[30px] 2xl:h-[40px] bg-gray-500"
                    containerClassName="max-w-[200px] flex-col gap-2"
                  />
                </div>
                <div className="flex pl-[126px] lg:pl-[180px] xl:pl-[220px] 2xl:pl-[328px] md:pr-[20px] xl:pr-[44px] pt-[10px] pb-5 2xl:pb-[39px] bg-[#101010] ">
                <div className="gap-2 xl:gap-0 flex flex-col 2xl:gap-[10px] justify-between grow ">
                    <div className="flex gap-2">
                      <DataLoader
                          lines={3}
                          lineClassName="bg-gray-500 h-[16px] lg:h-[20px] 2xl:h-[22px]"
                          containerClassName="max-w-[100px] xs:max-w-[150px] sm:max-w-[180px] 2xl:max-w-[220px] self-center flex-col gap-2"
                      />
                    </div>
                </div>
                <div className="flex md:gap-1 lg:gap-3 2xl:gap-[27px]">
                    <div className="hidden md:flex md:flex-col md:justify-end">
                    <CustomButton
                        disabled={isLoading || !member_id}
                        onClick={() => dispatch(openModal({ type: "confirm" }))}
                        buttonStyle="w-screen md:max-w-[80px] lg:max-w-[110px] xl:max-w-[130px] 2xl:max-w-[150px] 4xl:max-w-[200px] md:text-[10px] px-[10px] py-1 leading-[15px] lg:text-[14px] xl:py-[5px] 2xl:py-[5px] 4xl:py-[7px] lg:leading-6 2xl:text-[20px] 2xl:leading-8 4xl:text-[24px] 4xl:leading-9 tracking-tight font-medium border border-[#DD69AA] 
                                    text-[#DD69AA] whitespace-nowrap  2xl:border-[2px] rounded-lg md:rounded-[5px]"
                    >
                        Remove
                    </CustomButton>
                    </div>
                    <div className="hidden md:flex md:flex-col md:justify-end">
                    <CustomButton
                    disabled={isLoading || !member_id}
                        onClick={() => dispatch(openModal({ type: "award" }))}
                        buttonStyle="w-screen md:max-w-[80px] lg:max-w-[110px] xl:max-w-[130px] 2xl:max-w-[150px] 4xl:max-w-[200px] md:text-[10px] px-[10px] py-1 leading-[15px] lg:text-[14px] xl:py-[5px]  2xl:py-[5px]  4xl:py-[7px] lg:leading-6  2xl:text-[20px] 2xl:leading-8 4xl:text-[24px] 4xl:leading-9 tracking-tight font-medium border border-[#DD69AA] 
                                    text-[#DD69AA] whitespace-nowrap  2xl:border-[2px] rounded-lg md:rounded-[5px]"
                    >
                        Award Point
                    </CustomButton>
                    </div>
                    <div className="hidden md:flex md:flex-col md:justify-end">
                    <CustomButton
                    disabled={isLoading || !member_id}
                        onClick={() => dispatch(openModal({ type: "message" }))}
                        buttonStyle="w-screen md:max-w-[80px] lg:max-w-[110px] xl:max-w-[130px] 2xl:max-w-[150px] 4xl:max-w-[200px] md:text-[10px] px-[10px] py-1 leading-[15px] lg:text-[14px] xl:py-[5px]  2xl:py-[5px]  4xl:py-[7px] lg:leading-6  2xl:text-[20px] 2xl:leading-8 4xl:text-[24px] 4xl:leading-9 tracking-tight font-medium border border-[#DD69AA] 
                                    text-[#DD69AA] whitespace-nowrap 2xl:border-[2px] rounded-lg md:rounded-[5px]"
                    >
                        Send Message
                    </CustomButton>
                    </div>
                </div>
                </div>
            </div>
          :
          <div className="pt-[6px] 2xl:pt-[30px] rounded-b-[20px] overflow-hidden relative">
            <div className="absolute pt-4 pl-4 md:pt-6 2xl:pt-14 xl:pl-[42px] ">
              <div className="relative w-screen h-screen max-w-[84.72px] md:max-w-[86px] max-h-[98.39px] lg:max-w-[125px] xl:max-w-[140px] lg:max-h-[140px] xl:max-h-[170px] 2xl:max-w-[217px] 2xl:max-h-[252px]">
                <img
                  className="h-full w-full"
                  src={
                    customerDetails?.profile?.profile_picture
                      ? process.env.REACT_APP_PUBLIC_MEDIA_URL +
                        customerDetails?.profile?.profile_picture
                      : avatar
                  }
                  alt="businessIcon"
                />
              </div>
            </div>
            <div className=" bg-[#040404] pl-[126px] lg:pl-[180px] xl:pl-[220px] 2xl:pl-[328px] pr-[24.42px] rounded-t-[20px] pt-[23px] 2xl:pt-[61px]">
                <p className="text-2xl xl:pb-[36px] pb-[22px] 2xl:pb-10 leading-[24px] tracking-tight text-white md:text-lg lg:text-4xl lg:leading-10 2xl:text-[64px] 2xl:leading-[64px] 2xl:font-bold lg:text-pink-light 2xl:mb-2">
                    {customerDetails?.profile?.name}
                </p>
                <div className="flex flex-row justify-between">
                <p className="text-xs leading-5 lg:text-2xl 2xl:text-[31.5066px] tracking-tight 2xl:leading-[54px] font-normal text-[#DD69AA]">
                    {/* General Manager */} {''}
                </p>
                </div>
            </div>
            <div className="flex pl-[126px] lg:pl-[180px] xl:pl-[220px] 2xl:pl-[328px] md:pr-[20px] xl:pr-[44px] pt-[10px] pb-5 2xl:pb-[39px] bg-[#101010] ">
              <div className="gap-2 xl:gap-0 flex flex-col 2xl:gap-[10px] justify-between grow ">
                <div className="flex gap-2">
                  <p className="text-sm leading-[14px] font-normal lg:text-[18px] lg:leading-7 lg:font-bold 2xl:text-[21px] 2xl:leading-9  tracking-tight text-[#CDBEBE]">
                    Email:
                  </p>
                  <p className="text-sm leading-[14px] font-normal lg:text-[18px] lg:leading-7 2xl:text-[21px] 2xl:leading-9 lg:font-bold  tracking-tight text-[#DD69AA]">
                    {customerDetails?.profile?.email}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="text-sm leading-[14px] font-normal lg:text-[18px] lg:leading-7 lg:font-bold 2xl:text-[21px] 2xl:leading-9  tracking-tight text-[#CDBEBE]">
                    Phone:
                  </p>
                  <p className="text-sm leading-[14px] font-normal lg:text-[18px] lg:leading-7 lg:font-bold tracking-tight 2xl:text-[21px] 2xl:leading-9 text-[#DD69AA]">
                    {customerDetails?.profile?.phone}
                  </p>
                </div>
                <div className="hidden xl:flex gap-2 ">
                  <p className="text-[21.1953px] lg:text-[18px] leading-9 lg:leading-7 2xl:text-[21px] 2xl:leading-9  font-bold tracking-tight text-[#CDBEBE]">
                    Address:
                  </p>
                  <p className="text-[21.1953px] lg:text-[18px] leading-9 lg:leading-7 2xl:text-[21px] 2xl:leading-9  font-bold tracking-tight text-[#DD69AA]">
                    {customerDetails?.profile?.address}
                  </p>
                </div>
              </div>
              <div className="flex md:gap-1 lg:gap-3 2xl:gap-[27px]">
                <div className="hidden md:flex md:flex-col md:justify-end">
                  <CustomButton
                    onClick={() => dispatch(openModal({ type: "confirm" }))}
                    buttonStyle="w-screen md:max-w-[80px] lg:max-w-[110px] xl:max-w-[130px] 2xl:max-w-[150px] 4xl:max-w-[200px] md:text-[10px] px-[10px] py-1 leading-[15px] lg:text-[14px] xl:py-[5px] 2xl:py-[5px] 4xl:py-[7px] lg:leading-6 2xl:text-[20px] 2xl:leading-8 4xl:text-[24px] 4xl:leading-9 tracking-tight font-medium border border-[#DD69AA] 
                                text-[#DD69AA] whitespace-nowrap  2xl:border-[2px] rounded-lg md:rounded-[5px]"
                  >
                    Remove
                  </CustomButton>
                </div>
                <div className="hidden md:flex md:flex-col md:justify-end">
                  <CustomButton
                    onClick={() => dispatch(openModal({ type: "award" }))}
                    buttonStyle="w-screen md:max-w-[80px] lg:max-w-[110px] xl:max-w-[130px] 2xl:max-w-[150px] 4xl:max-w-[200px] md:text-[10px] px-[10px] py-1 leading-[15px] lg:text-[14px] xl:py-[5px]  2xl:py-[5px]  4xl:py-[7px] lg:leading-6  2xl:text-[20px] 2xl:leading-8 4xl:text-[24px] 4xl:leading-9 tracking-tight font-medium border border-[#DD69AA] 
                                text-[#DD69AA] whitespace-nowrap  2xl:border-[2px] rounded-lg md:rounded-[5px]"
                  >
                    Award Point
                  </CustomButton>
                </div>
                <div className="hidden md:flex md:flex-col md:justify-end">
                  <CustomButton
                    onClick={() => dispatch(openModal({ type: "message" }))}
                    buttonStyle="w-screen md:max-w-[80px] lg:max-w-[110px] xl:max-w-[130px] 2xl:max-w-[150px] 4xl:max-w-[200px] md:text-[10px] px-[10px] py-1 leading-[15px] lg:text-[14px] xl:py-[5px]   2xl:py-[5px]  4xl:py-[7px] lg:leading-6  2xl:text-[20px] 2xl:leading-8 4xl:text-[24px] 4xl:leading-9 tracking-tight font-medium border border-[#DD69AA] 
                                text-[#DD69AA] whitespace-nowrap 2xl:border-[2px] rounded-lg md:rounded-[5px]"
                  >
                    Send Message
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
          }
          <div className="hidden xl:flex items-end gap-2 mt-[22px]">
            <p className="text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]">
              Details
            </p>
            <div className="h-[2.7px] bg-[#DD69AA] w-full"></div>
          </div>
          <div className="rounded-[10px] overflow-hidden mt-3">
            <div className="xl:hidden  flex items-center bg-[#040404]  justify-around">
              <p
                onClick={userDetails}
                id="details"
                className={classNames(
                  "flex-1 text-center text-base leading-9 font-medium tracking-tight text-[#DD69AA] md:text-xl md:leading-10 cursor-pointer",
                  {
                    "border-b-[1.5px] border-[#DD69AA]":
                      showDetails === "details",
                  }
                )}
              >
                Details
              </p>
              <p
                onClick={userDetails}
                id="points"
                className={classNames(
                  "text-base flex-1 text-center leading-9 font-medium tracking-tight text-[#DD69AA] md:text-xl md:leading-10 cursor-pointer",
                  {
                    "border-b-[1.5px] border-[#DD69AA]":
                      showDetails === "points",
                  }
                )}
              >
                Points
              </p>
            </div>
            {showDetails === "details" && (
              <div className="px-[14px] xl:px-0 bg-[#101010] xl:bg-[#171717] xl:grid xl:grid-cols-[1fr,1fr,1fr] xl:gap-[30px] 2xl:gap-[68px]">
                <div className="flex pt-[20px] md:pt-[25px] items-center justify-between grow">
                {isLoading ? 
                <DataLoader
                  lines={2}
                  lineClassName="h-9 bg-gray-500"
                  containerClassName="flex-col gap-7"
                /> :<>
                  <div className="flex flex-col gap-4 md:gap-7 text-xs leading-[13px] md:text-xl 2xl:leading-[21px] font-normal tracking-tight text-[#979998]">
                    <p>Member ID</p>
                    <p>Issue Date</p>
                  </div>
                  <div className="flex flex-col gap-[7px] md:gap-[10px] text-xs leading-[23px] md:md:text-xl md:leading-9 font-medium tracking-tight text-white text-right">
                    <p>{customerDetails?.profile?.member_id}</p>
                    <p>{customerDetails?.profile?.issue_date}</p>
                  </div></>}
                </div>
                <div className="flex pt-[16.41px] md:pt-[25px] items-center justify-between grow">
                {isLoading ? 
                <DataLoader
                  lines={2}
                  lineClassName="h-9 bg-gray-500"
                  containerClassName="flex-col gap-7"
                /> :<>
                  <div className="flex flex-col gap-4 md:gap-7 text-xs leading-[13px] md:text-xl 2xl:leading-[21px] font-normal tracking-tight text-[#979998]">
                    <p>Is Business owner</p>
                    <p>Is Customer</p>
                  </div>
                  <div className="flex flex-col gap-[7px] md:gap-[10px] text-xs leading-[23px] md:md:text-xl md:leading-9 font-medium tracking-tight text-white text-right">
                    <p>
                      {customerDetails?.profile?.is_business_owner.length > 0
                        ? `Yes (${customerDetails?.profile?.is_business_owner
                            .map((business) => capitalize(business))
                            .join(",")})`
                        : `No`}
                    </p>
                    <p>
                      {customerDetails?.profile?.is_customer.length > 0
                        ? `Yes (${customerDetails?.profile?.is_customer
                            .map((business) => capitalize(business))
                            .join(",")})`
                        : `No`}
                    </p>
                  </div></>}
                </div>
                <div className="flex pt-[16.41px] md:pt-[25px] items-center justify-between grow ">
                {isLoading ? 
                <DataLoader
                  lines={2}
                  lineClassName="h-9 bg-gray-500"
                  containerClassName="flex-col gap-7"
                /> :<><div className="flex flex-col gap-4 md:gap-7 text-xs leading-[13px] md:text-xl 2xl:leading-[21px] font-normal tracking-tight text-[#979998]">
                    <p>Current Status</p>
                    <p>Redemption Platform</p>
                  </div>
                  <div className="flex flex-col gap-[7px] md:gap-[10px] text-xs leading-[23px] md:md:text-xl md:leading-9 font-medium tracking-tight text-white text-right">
                    <p>
                      {capitalize(customerDetails?.profile?.current_status)}
                    </p>
                    <p className="text-[#DD69AA]">
                      {customerDetails?.profile?.redemption_platform}
                    </p>
                  </div></>}
                </div>
                <div className="xl:hidden flex md:pt-[25px] items-center justify-between grow pb-[9px]  ">
                  <div className="flex flex-col gap-4 md:gap-7 text-xs leading-[13px] md:text-xl 2xl:leading-[21px] font-normal tracking-tight text-[#979998]">
                    <p>Address</p>
                  </div>
                  <div className="flex flex-col gap-[7px] md:gap-[10px] text-xs leading-[23px] md:md:text-xl md:leading-9 font-medium tracking-tight text-white text-right">
                    <p className="text-[#CDBEBE] w-[138px]">
                      {customerDetails?.profile?.address}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {showDetails === "points" && (
              <div className="px-[14px] bg-[#101010] 2xl:hidden gap-[68px] pt-3 2xl:mt-[41px]">
                <div className="w-full">
                  <div className="flex items-end gap-2 w-full">
                    <p className="text-[15px] leading-[13px] font-medium md:text-[22px] 2xl:text-2xl 2xl:leading-[21px] 2xl:font-bold tracking-tight text-[#DD69AA]">
                      Awarded
                    </p>
                    <div className="h-[0.37px] md:h-[2.7px] bg-[#DD69AA] w-full"></div>
                  </div>
                  <div className="flex pt-3 md:pt-[21px] items-center justify-between grow">
                    <div className="flex flex-col gap-[11.36px] md:gap-7 text-xs leading-[13px] md:text-xl md:leading-[21px] font-normal tracking-tight text-[#979998]">
                      <p>Business Points</p>
                      <p>Personal Points</p>
                    </div>
                    <div className="flex flex-col gap-[2px] md:gap-[10px] text-xs leading-[23px] md:text-xl md:leading-9 font-medium tracking-tight text-white text-right">
                      <p>
                        {customerDetails?.awarded_points?.business_point || 0}
                      </p>
                      <p>
                        {customerDetails?.awarded_points?.personal_point || 0}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-end gap-2  w-full pt-3">
                    <p className="text-[15px] leading-[13px] font-medium md:text-[22px]  2xl:text-2xl 2xl:leading-[21px] 2xl:font-bold tracking-tight text-[#DD69AA]">
                      Redeemed
                    </p>
                    <div className="h-[0.37px] md:h-[2.7px] bg-[#DD69AA] w-full"></div>
                  </div>
                  <div className="flex pt-2 md:pt-[21px] items-center justify-between grow">
                    <div className="flex flex-col gap-[11.36px] md:gap-7 text-xs leading-[13px] md:text-xl md:leading-[21px] font-normal tracking-tight text-[#979998]">
                      <p>Business Points</p>
                      <p>Personal Points</p>
                    </div>
                    <div className="flex flex-col gap-[2px] md:gap-[10px] text-xs leading-[23px] md:text-xl md:leading-9 font-medium tracking-tight text-white text-right">
                      <p>
                        {customerDetails?.redeemed_points?.business_point || 0}
                      </p>
                      <p>
                        {customerDetails?.redeemed_points?.personal_point || 0}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-end gap-2  w-full pt-3">
                  <p className="text-[15px] leading-[13px] font-medium md:text-[22px]  2xl:text-2xl 2xl:leading-[21px] 2xl:font-bold tracking-tight text-[#DD69AA]">
                    Available
                  </p>
                  <div className="h-[0.37px] md:h-[2.7px] bg-[#DD69AA] w-full"></div>
                </div>
                <div className="flex pt-2 md:pt-[21px] items-center justify-between grow  pb-[9px]">
                  <div className="flex flex-col gap-[11.36px] md:gap-7 text-xs leading-[13px] md:text-xl md:leading-[21px] font-normal tracking-tight text-[#979998]">
                    <p>Business Points</p>
                    <p>Personal Points</p>
                  </div>
                  <div className="flex flex-col gap-[2px] md:gap-[10px] text-xs leading-[23px] md:text-xl md:leading-9 font-medium tracking-tight text-white text-right">
                    <p>
                      {customerDetails?.avaliable_balance?.business_point || 0}
                    </p>
                    <p>
                      {customerDetails?.avaliable_balance?.personal_point || 0}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="hidden xl:flex md:gap-[68px] xl:gap-[30px] md:mt-[41px]">
            <div className="w-full">
              <div className="flex items-end gap-2 w-full">
                <p className="text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]">
                  Awarded
                </p>
                <div className="h-[2.7px] bg-[#DD69AA] w-full"></div>
              </div>
              <div className="flex pt-[21px] items-center justify-between grow">
                {isLoading ? 
                <DataLoader
                  lines={2}
                  lineClassName="h-9 bg-gray-500"
                  containerClassName="flex-col gap-7"
                /> :
                <>
                <div className="flex flex-col gap-7 text-xl leading-[21px] font-normal tracking-tight text-[#979998]">
                  <p>Business Points</p>
                  <p>Personal Points</p>
                </div>
                <div className="flex flex-col gap-[10px] text-xl leading-9 font-medium tracking-tight text-white text-right">
                  <p>{customerDetails?.awarded_points?.business_point || 0}</p>
                  <p>{customerDetails?.awarded_points?.personal_point || 0}</p>
                </div></>
                }
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-end gap-2  w-full">
                <p className="text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]">
                  Redeemed
                </p>
                <div className="h-[2.7px] bg-[#DD69AA] w-full"></div>
              </div>
              <div className="flex pt-[25px] items-center justify-between grow">
              {isLoading ? 
                <DataLoader
                  lines={2}
                  lineClassName="h-9 bg-gray-500"
                  containerClassName="flex-col gap-7"
                /> :<>
                <div className="flex flex-col gap-7 text-xl leading-[21px] font-normal tracking-tight text-[#979998]">
                  <p>Business Points</p>
                  <p>Personal Points</p>
                </div>
                <div className="flex flex-col gap-[10px] text-xl leading-9 font-medium tracking-tight text-white text-right">
                  <p>{customerDetails?.redeemed_points?.business_point || 0}</p>
                  <p>{customerDetails?.redeemed_points?.personal_point || 0}</p>
                </div>
                </>}
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-end gap-2  w-full">
                <p className="text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]">
                  Available
                </p>
                <div className="h-[2.7px] bg-[#DD69AA] w-full"></div>
              </div>
              <div className="flex pt-[25px] items-center justify-between grow">
              {isLoading ? 
                <DataLoader
                  lines={2}
                  lineClassName="h-9 bg-gray-500"
                  containerClassName="flex-col gap-7"
                /> :<>
                <div className="flex flex-col gap-7 text-xl leading-[21px] font-normal tracking-tight text-[#979998]">
                  <p>Business Points</p>
                  <p>Personal Points</p>
                </div>
                <div className="flex flex-col gap-[10px] text-xl leading-9 font-medium tracking-tight text-white text-right">
                  <p>
                    {customerDetails?.avaliable_balance?.business_point || 0}
                  </p>
                  <p>
                    {customerDetails?.avaliable_balance?.personal_point || 0}
                  </p>
                </div>
                </>}
              </div>
            </div>
          </div>
          <div className="flex py-3 items-end md:gap-2 md:my-4 2xl:mt-[44px] 2xl:mb-6">
            <p className="text-[18px] leading-[20px] md:text-2xl md:leading-[21px] font-medium md:font-bold tracking-tight text-[#DD69AA] whitespace-nowrap">
              Transaction History
            </p>
            <div className="h-[1.5px] md:h-[2.7px] bg-[#DD69AA] w-full"></div>
          </div>
        </div>
        {/* <CommonTable
          columns={columns}
          filteredColumns={["transaction_type"]}
          data={tableData}
          HeaderClasses="bg-[#040404] text-[#DD69AA]"
          // HeadingClasses="relative pt-[22px] pb-[16px] md:pt-[26px] md:pb-[20px] 2xl:pt-[30px] 2xl:pb-[24px] 4xl:pt-[34px] 4xl:pb-[28px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 whitespace-nowrap text-[16px] 2xl:text-[20px] leading-[16px] 2xl:leading-[24px] font-[500]  -tracking-[0.02em]"
          HeadingClasses="relative py-2 px-[15px] 2xl:pr-[30px] 2xl:pl-0 whitespace-nowrap text-[16px] 2xl:text-[20px] leading-[16px] 2xl:leading-[24px] font-[500]  -tracking-[0.02em]"
          cellDefaultStyle="text-[16px] 2xl:text-xl leading-[16px] 2xl:leading-[36.33px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal py-[12px] -tracking-[2%] text-center"
          tableClasses="w-full rounded-[20px] overflow-hidden"
          BodyClasses="text-[#979998] bg-[#101010]"
          containerClasses="h-max overflow-auto"
          headerClasses={{
            "From/To": { textAlign: "left" },
            emailId: { textAlign: "right" },
            orderNo: { textAlign: "center" },
          }}
          cellTextClassName={{
            "From/To": { justifyContent: "left", width: "100%" },
            emailId: { justifyContent: "right", width: "100%" },
          }}
          cellClasses={{
            "From/To": { textAlign: "left", color: "white" },
            emailId: { textAlign: "right", color: "#979998" },
            date: { color: "#CDBEBE" },
            orderNo: { color: "#CDBEBE" },
            transaction_type: { color: "#6D737A" },
          }}
          isLoading={isLoading}
        /> */}
        {/* <CommonTable
        columns={columns}
        // handleRowSelect= {() => {}}
        filteredColumns={["transaction_type"]}
        data={tableData}
        // headingProps={
        //   { "Serial No": {
        //     'rowspan' : "2"
        //   } }
        // }
        // headerRowSpan={
        //   {
        //     "no_show" : "2"
        //   }
        // }
        HeaderClasses="bg-[#040404] text-[#DD69AA]"
        // HeadingClasses="relative pt-[34px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 pb-[28px] whitespace-nowrap text-[20px] font-[500] leading-[24px] -tracking-[0.02em]"
        // cellDefaultStyle="text-xl px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal leading-[36.33px] py-[22px] -tracking-[2%] text-center"
        // HeadingClasses="relative pt-[22px] pb-[16px] md:pt-[26px] md:pb-[20px] 2xl:pt-[30px] 2xl:pb-[24px] 4xl:pt-[34px] 4xl:pb-[28px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 whitespace-nowrap text-[16px] 2xl:text-[20px] leading-[16px] 2xl:leading-[24px] font-[500]  -tracking-[0.02em]"
        HeadingClasses="relative pt-[9px] pb-[7px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 whitespace-nowrap text-[16px] 2xl:text-[20px] leading-[16px] 2xl:leading-[24px] font-[500]  -tracking-[0.02em]"
        cellDefaultStyle="text-[16px] 2xl:text-xl leading-[16px] 2xl:leading-[36.33px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal py-[18px] 2xl:py-[9px] -tracking-[2%] text-center"
        tableClasses="w-full rounded-[20px] overflow-hidden"
        BodyClasses="text-[#A6A6A6] bg-[#101010]"
        containerClasses="h-max overflow-auto"
        headerClasses={{
          "fromTo": { textAlign: "left" },
          "emailId": { textAlign: "right", paddingLeft: "0px" },
          serial_no: { paddingLeft: "8px" },
        }}
        cellTextClassName={{
          "fromTo": { justifyContent: "left", width: "100%" },
          "emailId": { justifyContent: "right", width: "100%" },
        }}
        cellClasses={{
          "fromTo": { textAlign: "left", color: "#CDBEBE" },
          "emailId": { textAlign: "right", color: "#DD69AA", paddingLeft: "0px" },
          date: { color: "#A6A6A6" },
          serial_no: { color: "#A6A6A6", minWidth: "94px" },
          awardBusinessPoints: { color: "#EA7070" },
          awardPersonalPoints: { color: "#26CE7A" },
        }}
        isLoading={isLoading}
      /> */}
    {transactionData ? 
        <CommonTable
          columns={columns}
          filteredColumns={["transaction_type"]}
          data={tableData}
          HeaderClasses="bg-[#040404] text-[#DD69AA]"
          HeadingClasses="relative pt-[9px] pb-[7px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 whitespace-nowrap text-[16px] 2xl:text-[20px] leading-[16px] 2xl:leading-[24px] font-[500]  -tracking-[0.02em]"
          cellDefaultStyle="text-[16px] 2xl:text-xl leading-[16px] 2xl:leading-[36.33px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal py-[18px] 2xl:py-[9px] -tracking-[2%] text-center"
          tableClasses="w-full rounded-[20px] overflow-hidden"
          BodyClasses="text-[#A6A6A6] bg-[#101010]"
          containerClasses="h-max overflow-auto"
          headerClasses={{
            "fromTo": { textAlign: "left" },
            "emailId": { textAlign: "right", paddingLeft: "0px" },
            serial_no: { paddingLeft: "8px" },
            // awarded_4: {
            //   borderBottom: "1px solid",
            // },
            // balance_6: {
            //   borderBottom: "1px solid",
            // }
          }}
          cellTextClassName={{
            "fromTo": { justifyContent: "left", width: "100%" },
            "emailId": { justifyContent: "right", width: "100%" },
          }}
          cellClasses={{
            "fromTo": { textAlign: "left", color: "#CDBEBE" },
            "emailId": { textAlign: "right", color: "#DD69AA", paddingLeft: "0px" },
            date: { color: "#A6A6A6" },
            serial_no: { color: "#A6A6A6", minWidth: "94px" },
            // awardBusinessPoints: { color: "#26CE7A" },
            // awardPersonalPoints: { color: "#EA7070" },
          }}
          isLoading={isLoading}
        />
      :
      <CommonTable
          columns={[{Header: "", accessor: "no_data" }]}
          data={[{no_data: "No Data"}] }
          filteredColumns={["Status"]}
          HeaderClasses="bg-[#040404] text-[#DD69AA]"
          HeadingClasses="relative py-2 md:pt-[26px] md:pb-[20px] 2xl:pt-[30px] 2xl:pb-[24px] 4xl:pt-[34px] 4xl:pb-[28px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 whitespace-nowrap text-[16px] 2xl:text-[20px] leading-[16px] 2xl:leading-[24px] font-[500]  -tracking-[0.02em]"
          tableClasses="w-full rounded-[20px] overflow-hidden"
          BodyClasses="text-white bg-[#101010]"
          containerClasses="min-h-[20vh] h-max overflow-x-auto"
          cellDefaultStyle="text-[16px] 2xl:text-xl leading-[16px] 2xl:leading-[36.33px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal pt-[18px] 2xl:py-[22px] -tracking-[2%] text-center"
        />
      }
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
              pageRangeDisplayed={1}
              onPageChange={handlePageClick}
              forcePage={currentPage - 1}
              pageCount={pagination?.total_pages || 1}
              marginPagesDisplayed={2}
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
      </AdminLayout>
    );
};

export default UserProfile;
