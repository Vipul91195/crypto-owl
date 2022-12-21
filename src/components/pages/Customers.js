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
import { useDispatch } from "react-redux";
import CustomerForm from "../../admin/CustomerForm";
import CustomModal from "../CustomModal";

const Customers = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const showModal = (type) => setModal(type)
  const hideModal = () => setModal(false)
  /**   temp code */
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(typeof row.values[id] === 'string' ? row.values[id] : row.values[id].props.children);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);
    return (
      <div className="bg-[#303030] px-[20px] py-[25px] rounded-[10px] text-white min-w-[240px]">
        <p
          className="border-b w-full cursor-pointer border-solid pb-3 text-left border-[#545557] text-[20px]"
          onClick={() => {
            // api ....
          }}
        >
          All
        </p>
        {options.map((option, i) => (
          <p
            key={i}
            onClick={(e) => {
              console.log("id :", option);
              // api ....
            }}
            className="text-left py-3 cursor-pointer w-full last:pb-0 last:border-none border-b border-solid pb-3 text-[20px] border-[#545557]"
          >
            {option}
          </p>
        ))}
      </div>
    );
  }
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
    {
      id: "selected",
      accessor: (row) => {
        const { selected, id } = row;
        return (
          <input
            type="checkbox"
            className="bg-checkFalse checked:bg-checkTrue appearance-none h-[18px] w-[18px]"
            checked={selected}
            onChange={() => console.log(id, " is changed")}
          />
        );
      },
    },
    {
      Header: "Name",
      accessor: (row) => {
        const { customerImage, name } = row;
        return (
          <div onClick={() => navigate('/user-profile')} className="flex gap-[16px] items-center cursor-pointer">
            <div className="h-[45.42px] rounded-[18.1674px] overflow-hidden flex items-center justify-center bg-black w-[45.42px]">
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
      <div className="pt-[72px] flex gap-14 justify-between">
        <div className="text-white text-4xl whitespace-nowrap">
          User Management (Customers)
        </div>
        <div className="flex gap-6">
          <Formik initialValues={{ searchTerm: "" }} onSubmit={() => { }}>
            <Form>
              <InputField
                iconAfter={<SearchIcon className="h-[17px] w-[17px]" />}
                type="text"
                name="searchTerm"
                placeholder="Search"
                inputstyle="bg-[#101010] focus-visible:outline-none placeholder:text-[#A6A6A6] max-w-[300px] w-screen text-5 leading-5 text-[#A6A6A6] rounded-[15px] py-4 px-6"
              />
            </Form>
          </Formik>
          <CustomButton
            type="submit"
            onClick={() =>
              dispatch(openConfirmModal({ message: "User has been removed" }))
            }
            buttonStyle="w-full px-[62px] h-[51px] sm:text-sm  border border-[#DD69AA] leading-6 font-medium rounded-2xl  text-[#DD69AA]"
          >
            Remove
          </CustomButton>
          <CustomButton
            onClick={() => showModal("award")}
            buttonStyle="w-full px-[43px] h-[51px] sm:text-sm  border border-[#DD69AA] leading-6 font-medium rounded-2xl text-[#DD69AA] whitespace-nowrap"
          >
            Award Point
          </CustomButton>
          <CustomButton
            onClick={() => showModal("customer")}
            buttonStyle="w-full h-[51px] px-[36px] sm:text-sm font-medium rounded-2xl text-white bg-[#DD69AA] whitespace-nowrap"
          >
            Add Customer
          </CustomButton>
        </div>
      </div>
      <div className="pt-[50.94px] rounded-b-[20px] overflow-hidden relative">
        <div className="absolute pt-10 pl-[65px]">
          <img src={businessIcon} alt="businessIcon" />
        </div>
        <div className="text-5xl leading-9 font-bold text-[#CDBEBE] pt-10 pb-[18px] bg-[#040404] pl-[279px] rounded-t-[20px]">
          Verizon Pvt. Ltd.
        </div>
        <div className="flex items-center pl-[279px] pr-[30px] pt-2 pb-[18px] bg-[#101010] ">
          <div className="text-xl leading-9 font-normal text-[#979998] flex flex-col gap-[6px] justify-between grow">
            <div className="flex justify-between">
              <p className="text-xl leading-9 font-normal text-[#979998]">
                Company No.
              </p>
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
          <span className="h-[100px] w-[1px] mx-[55px] bg-[#979998] text-center"></span>
          <div className="text-xl leading-9 font-normal text-[#979998] flex flex-col gap-[6px] justify-between grow">
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
      <div className="mt-[38px]">
        <CommonTable
          columns={columns}
          filteredColumns={["Status"]}
          data={data}
          heightLightRow={{ memberId: "MEM0001" }}
          heighLightCellPostfix={{ name: "(owner)" }}
          HeaderClasses="bg-[#040404] text-[#DD69AA]"
          HeadingClasses="relative pt-[34px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 pb-[28px] whitespace-nowrap text-[20px] font-[500] leading-[24px] -tracking-[0.02em]"
          tableClasses="w-full rounded-[20px] overflow-hidden"
          BodyClasses="text-white bg-[#101010]"
          containerClasses="max-h-[50vh] h-max overflow-auto"
          cellDefaultStyle="text-xl px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal leading-[36.33px] py-[22px] -tracking-[2%] text-center"
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
              fontSize: "21px",
              fontWeight: "700",
              maxWidth: "369px"
            },
            emailId: { textAlign: "center", color: "#DD69AA" },
          }}
        />
      </div>
      <CustomModal onClose={hideModal} modal={{ isVisible: !!modal }}>
        {modal === "customer" && <CustomerForm />}
        {modal === "award" && <AwardPoint type={"customer"} />}
      </CustomModal>
    </AdminLayout>
  );
};
export default Customers;
