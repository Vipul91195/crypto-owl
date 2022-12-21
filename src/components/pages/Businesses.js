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
import { useDispatch } from 'react-redux';
import CustomModal from '../CustomModal';
import BusinessForm from '../../admin/BusinessForm';
import { useNavigate } from 'react-router';
import { getBusinesses } from '../../Redux/businessSlice';

const Businesses = () => {

  const dispatch = useDispatch();
  const [ modal, setModal ] = useState(false);
  const navigate = useNavigate();
  const showModal = (type) => setModal(type)
  const hideModal = () => setModal(false)

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch])
  

  /**   temp code */
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    console.log(preFilteredRows, " test");
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(typeof row.values[id] === 'string' ? row.values[id] : row.values[id].props.children);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);
    console.log(options, " test");
    return (
      <div className="bg-[#303030] px-[20px] py-[25px] rounded-[10px] text-white min-w-[240px]">
        <p
          className="border-b w-full cursor-pointer border-solid pb-3 text-left border-[#545557] text-[20px]"
          onClick={() => {
            // api call ...
          }}
        >
          All
        </p>
        {options.map((option, i) => (
          <p
            key={i}
            onClick={(e) => {
              // api call ...
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
      id: 1,
      selected: false,
      businessImage: "",
      business: "Verizon",
      ownerName: "maddison_c21",
      ownerEmail: "xyz@gmail.com",
      memberId: "9821",
      issueDate: "12/12/1212",
      businessPoints: "1000",
      personalPoints: "1000",
      status: "Inactive",
    },
    {
      id: 2,
      selected: true,
      businessImage: "",
      business: "Vodafone",
      ownerName: "karl.will02",
      ownerEmail: "xyz@gmail.com",
      memberId: "7032",
      issueDate: "12/12/1212",
      businessPoints: "5500",
      personalPoints: "5500",
      status: "Active",
    },
    {
      id: 3,
      selected: true,
      businessImage: "",
      business: "HDFC",
      ownerName: "andreea.1z",
      ownerEmail: "xyz@gmail.com",
      memberId: "5204",
      issueDate: "12/12/1212",
      businessPoints: "10700",
      personalPoints: "10700",
      status: "Active",
    },
    {
      id: 4,
      selected: false,
      businessImage: "",
      business: "Verizon",
      ownerName: "maddison_c21",
      ownerEmail: "xyz@gmail.com",
      memberId: "9821",
      issueDate: "12/12/1212",
      businessPoints: "1000",
      personalPoints: "1000",
      status: "Inactive",
    },
    {
      id: 5,
      selected: false,
      businessImage: "",
      business: "Verizon",
      ownerName: "maddison_c21",
      ownerEmail: "xyz@gmail.com",
      memberId: "9821",
      issueDate: "12/12/1212",
      businessPoints: "1000",
      personalPoints: "1000",
      status: "Inactive",
    },
    {
      id: 1,
      selected: false,
      businessImage: "",
      business: "Verizon",
      ownerName: "maddison_c21",
      ownerEmail: "xyz@gmail.com",
      memberId: "9821",
      issueDate: "12/12/1212",
      businessPoints: "1000",
      personalPoints: "1000",
      status: "Inactive",
    },
    {
      id: 2,
      selected: true,
      businessImage: "",
      business: "Vodafone",
      ownerName: "karl.will02",
      ownerEmail: "xyz@gmail.com",
      memberId: "7032",
      issueDate: "12/12/1212",
      businessPoints: "5500",
      personalPoints: "5500",
      status: "Active",
    },
    {
      id: 3,
      selected: true,
      businessImage: "",
      business: "HDFC",
      ownerName: "andreea.1z",
      ownerEmail: "xyz@gmail.com",
      memberId: "5204",
      issueDate: "12/12/1212",
      businessPoints: "10700",
      personalPoints: "10700",
      status: "Active",
    },
    {
      id: 4,
      selected: false,
      businessImage: "",
      business: "Verizon",
      ownerName: "maddison_c21",
      ownerEmail: "xyz@gmail.com",
      memberId: "9821",
      issueDate: "12/12/1212",
      businessPoints: "1000",
      personalPoints: "1000",
      status: "Inactive",
    },
    {
      id: 5,
      selected: false,
      businessImage: "",
      business: "Verizon",
      ownerName: "maddison_c21",
      ownerEmail: "xyz@gmail.com",
      memberId: "9821",
      issueDate: "12/12/1212",
      businessPoints: "1000",
      personalPoints: "1000",
      status: "Inactive",
    },
    {
      id: 1,
      selected: false,
      businessImage: "",
      business: "Verizon",
      ownerName: "maddison_c21",
      ownerEmail: "xyz@gmail.com",
      memberId: "9821",
      issueDate: "12/12/1212",
      businessPoints: "1000",
      personalPoints: "1000",
      status: "Inactive",
    },
    {
      id: 2,
      selected: true,
      businessImage: "",
      business: "Vodafone",
      ownerName: "karl.will02",
      ownerEmail: "xyz@gmail.com",
      memberId: "7032",
      issueDate: "12/12/1212",
      businessPoints: "5500",
      personalPoints: "5500",
      status: "Active",
    },
    {
      id: 3,
      selected: true,
      businessImage: "",
      business: "HDFC",
      ownerName: "andreea.1z",
      ownerEmail: "xyz@gmail.com",
      memberId: "5204",
      issueDate: "12/12/1212",
      businessPoints: "10700",
      personalPoints: "10700",
      status: "Active",
    },
    {
      id: 4,
      selected: false,
      businessImage: "",
      business: "Verizon",
      ownerName: "maddison_c21",
      ownerEmail: "xyz@gmail.com",
      memberId: "9821",
      issueDate: "12/12/1212",
      businessPoints: "1000",
      personalPoints: "1000",
      status: "Inactive",
    },
    {
      id: 5,
      selected: false,
      businessImage: "",
      business: "Verizon",
      ownerName: "maddison_c21",
      ownerEmail: "xyz@gmail.com",
      memberId: "9821",
      issueDate: "12/12/1212",
      businessPoints: "1000",
      personalPoints: "1000",
      status: "Inactive",
    },
  ]);
  const columns = React.useMemo(() => [
    {
      id: "selected",
      accessor: (row) => {
        const { id } = row;
        return (
          <input
            type="checkbox"
            className="bg-checkFalse checked:bg-checkTrue appearance-none h-[18px] w-[18px]"
            onChange={(e) => 
              console.log(id, " is changed to : ", e.target.checked)
            }
          />
        );
      },
    },
    {
      Header: "Business",
      accessor: (row) => {
        const { businessImage, business } = row;
        return (
          <div onClick={() => navigate('/customers')} className="flex gap-[16px] items-center cursor-pointer">
            <div className="h-[45.42px] rounded-[18.1674px] overflow-hidden flex items-center justify-center bg-black w-[45.42px]">
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
      accessor: "ownerName",
    },
    {
      Header: "Owners Email ID",
      accessor: "ownerEmail",
    },
    {
      Header: "Member ID",
      accessor: "memberId",
    },
    {
      Header: "Issue Date",
      accessor: "issueDate",
    },
    {
      Header: "Status",
      accessor: (row) => {
        const { status } = row;
        return <p className={classNames({'text-[#DD69AA]': status === "Active", 'text-[#858383]': status === "Inactive"})}  >{status}</p>
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
        <div className='text-white text-4xl whitespace-nowrap'>
          User Management (Businesses)
        </div>
        <div className="flex gap-6">
          <Formik initialValues={{ searchTerm: "" }} onSubmit={() => {}}>
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
            onClick={() => showModal("business")}
            buttonStyle="w-full h-[51px] px-[36px] sm:text-sm font-medium rounded-2xl text-white bg-[#DD69AA] whitespace-nowrap"
          >
            Add Business
          </CustomButton>
        </div>
      </div>
      <div className="mt-[56px]">
        <CommonTable
          columns={columns}
          filteredColumns={["Status"]}
          data={data}
          HeaderClasses="bg-[#040404] text-[#DD69AA]"
          HeadingClasses="relative pt-[34px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 pb-[28px] whitespace-nowrap text-[20px] font-[500] leading-[24px] -tracking-[0.02em]"
          tableClasses="w-full rounded-[20px] overflow-hidden"
          BodyClasses="text-white bg-[#101010]"
          containerClasses="max-h-[75vh] h-screen overflow-auto"
          cellDefaultStyle="text-xl px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal leading-[36.33px] py-[22px] -tracking-[2%] text-center"
          headerClasses={{
            ownerName: { textAlign: "right" },
            Business: { textAlign: "left" },
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
            Business: { justifyContent: "left", width: "100%" },
            ownerEmail: { justifyContent: "center", width: "100%" },
            ownerName: { justifyContent: "right", width: "100%" },
          }}
          cellClasses={{
            selected: { paddingInline: "16px 23px" },
            Business: { textAlign: "left" },
            ownerName: {
              textAlign: "right",
              fontSize: "21px",
              fontWeight: "700",
            }
          }}
        />
      </div>
      <CustomModal onClose={hideModal} modal={{ isVisible: !!modal }}>
        {modal === "business" && <BusinessForm />}
        {modal === "award" && <AwardPoint />}
      </CustomModal>
    </AdminLayout>
  );
}
export default Businesses;