import React, { useState } from "react";
import CustomButton from "../forms/CustomButton";
import UserManagement from "../../admin/UserManagement";
import { AdminLayout } from "../layout/AdminLayout";
import CommonTable from "../table/CommonTable";
import PopOver from "../PopOver";
import AwardPoint from "../../admin/AwardPoint";
import businessIcon from "../../assets/img/businessIcon.svg";
import classNames from "classnames";
import { Navigate, useNavigate } from "react-router";
import { Form, Formik } from "formik";
import { InputField } from "../forms/InputField";
import { SearchIcon } from "../icons";
import { openConfirmModal } from "../../Redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomerForm from "../../admin/CustomerForm";
import CustomModal from "../CustomModal";
import AdminHeader from "../layout/AdminHeader";
import { SelectColumnFilter } from "../../utils/helper";

const Customers = () => {
  const dispatch = useDispatch();
  const { isLoading, allBusinesses } = useSelector(state => ({
    isLoading: state.businessSlice.isLoading,
    customerData: state.businessSlice.customerData
  }))
  const [modal, setModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState(null);
  const navigate = useNavigate();
  const showModal = (type) => setModal(type)
  const hideModal = () => setModal(false)

  /**   temp code */
  const data = React.useMemo(() => [
    {
      name: "@KrisWashington",
      memberId: "MEM0001",
      customerImage: '',
      issueDate: "12/12/1212",
      emailId: "https//fsdvz",
      status: "Active",
      businessPoints: "1000",
      personalPoints: "1000",
    },
    {
      name: "@karl.will02",
      memberId: "7032",
      issueDate: "12/12/1212",
      emailId: "https//fsdvz",
      status: "Inactive",
      businessPoints: "5500",
      personalPoints: "5500",
    },
    {
      name: "@andreea.1z",
      memberId: "5204",
      issueDate: "12/12/1212",
      emailId: "https//fsdvz",
      status: "Active",
      businessPoints: "10700",
      personalPoints: "10700",
    },
    {
      name: "@abraham47.y",
      memberId: "4309",
      issueDate: "12/12/1212",
      emailId: "https//fsdvz",
      status: "Active",
      businessPoints: "2000",
      personalPoints: "2000",
    }
  ]);
  const columns = React.useMemo(() => [
    // {
    //   id: "selected",
    //   accessor: (row) => {
    //     const { selected, id } = row;
    //     return (
    //       <input
    //         type="checkbox"
    //         className="bg-checkFalse checked:bg-checkTrue appearance-none h-[18px] w-[18px]"
    //         checked={selected}
    //         onChange={() => console.log(id, " is changed")}
    //       />
    //     );
    //   },
    // },
    {
      Header: "Name",
      accessor: (row) => {
        const { customerImage, name } = row;
        return (
          <div onClick={() => navigate('/user-profile')} className="flex gap-[16px] items-center cursor-pointer">
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
      accessor: "memberId",
    },
    {
      Header: "Issue Date",
      accessor: "issueDate",
    },
    {
      Header: "Email Id",
      accessor: "emailId",
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
      accessor: "businessPoints",
    },
    {
      Header: "Personal Points",
      accessor: "personalPoints",
    },
  ]);
  /**   temp code */
  return (
    <AdminLayout>
      <AdminHeader type="customer" title="User Management (Customers)" />
      <div className="pt-[50.94px] rounded-b-[20px] overflow-hidden relative">
        {/* <div className="absolute pt-10 pl-[65px] max-w-[81.39px] max-h-[81.39px] lg:max-w-[142px] xl:max-w-[170px] xl:max-h-[170px] 2xl:max-w-[217px] 2xl:max-h-[252px]">
          <img src={businessIcon} alt="businessIcon" />
        </div> */}
        <div className="absolute pt-4 pl-[14px] 2xl:pt-14 2xl:pl-[42px]">
          <div className='relative max-w-[82.39px] max-h-[82.39px] lg:max-w-[140px] 2xl:max-w-[217px] 2xl:max-h-[252px]'>
            <img src={businessIcon} alt="businessIcon" />
          </div>
        </div>
        <div className="text-2xl leading-4 tracking-tight font-bold text-white pt-[17.9px] pb-[7.91px] pl-[109px] lg:pl-[170px] lg:text-4xl 2xl:text-5xl 2xl:leading-9  2xl:text-[#CDBEBE] 2xl:pt-10 2xl:pb-[18px] bg-[#040404] 2xl:pl-[279px] rounded-t-[20px]">
          Verizon Pvt. Ltd.
        </div>
        <div className="flex flex-col lg:flex lg:flex-row 2xl:items-center pt-[3px] 2xl:pl-[279px] lg:pr-[30px] 2xl:pt-2 2xl:pb-[18px] bg-[#101010]">
          <div className="text-sm pl-[109px] lg:pl-[170px] lg:text-lg 2xl:pl-0 pr-[15px] 2xl:pr-0 pb-[12.11px] 2xl:pb-0 leading-4 tracking-tight 2xl:text-xl 2xl:leading-9 font-normal text-[#979998] flex flex-col gap-[4px] lg:gap-0 2xl:gap-[6px] justify-between grow">
            <div className="flex justify-between">
              <p > Company No.</p>
              <p className="text-[#DD69AA]">34689433</p>
            </div>
            <div className="flex justify-between">
              <p>VAT Number</p>
              <p className="text-[#DD69AA]">32199965</p>
            </div>
            <div className="flex justify-between">
              <p>Member ID</p>
              <p className="text-[#DD69AA]">MEM0001</p>
            </div>
          </div>
          <span className="hidden lg:flex h-[100px] w-[1px] mx-[55px] bg-[#979998] lg:text-center"></span>
          <div className="hidden lg:flex text-xl leading-9 font-normal text-[#979998] lg:text-lg  2xl:flex flex-col gap-[6px] lg:gap-0 2xl:gap-[6px] justify-between grow pb-[12.11px]">
            <div className="flex justify-between">
              <p className="text-xl leading-9 font-normal text-[#979998]">
                Owner
              </p>
              <p className="text-[#DD69AA]">Kris Washington</p>
            </div>
            <div className="flex justify-between">
              <p>Owner&apos;s Email ID</p>
              <p className="text-[#DD69AA]">xyz@gmail.com</p>
            </div>
            <div className="flex justify-between">
              <p>Address</p>
              <p className="text-[#DD69AA]">MEM0001</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <div className="flex gap-1">
          <span className="text-base leading-9 font-medium tracking-tight text-[#979998]">Details</span>
          <div className="h-[2px] w-full bg-[#979998] mt-[23px]"></div>
        </div>
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
      </div>

      <div className="mt-3 md:mt-[38px] 2xl:mt-[20px]">
        <CommonTable
          showSelectCheck
          columns={columns}
          selectionColumn="member_id"
          filteredColumns={["Status"]}
          data={data}
          heightLightRow={{ memberId: "MEM0001" }}
          heighLightCellPostfix={{ name: "(owner)" }}
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
              '@media (max-width: 1536px)': {
                fontSize: "21px",
                maxWidth: "369px",
                lineHeight: "24px",
              },
            },
            emailId: { textAlign: "center", color: "#DD69AA" },
          }}
          handleRowSelect={setSelectedIds}
        />
      </div>
    </AdminLayout>
  );
};
export default Customers;
