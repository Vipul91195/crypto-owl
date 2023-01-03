import React, { useEffect, useState } from "react";
import { UserLayout } from '../../layout/UserLayout'
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CommonTable from "../../table/CommonTable";
import CustomModal from "../../CustomModal";
import CustomButton from "../../forms/CustomButton";
import chat from "../../../assets/img/chat.svg";
import roundedblock from "../../../assets/img/roundedblock.svg";
import profilepic from "../../../assets/img/profilepic.svg";
import MessageForm from "../../../admin/MessageForm";
import AwardPoint from "../../../admin/AwardPoint";
import AdminHeader from "../../layout/AdminHeader";
import {
  getCustomerProfile,
  getTransactionHistory,
} from "../../../Redux/customerSlice";
import { capitalize } from "../../../utils/helper";
import { closeModal, openModal, setCurrentPage } from "../../../Redux/commonSlice";
import ReactPaginate from "react-paginate";
import { Arrow } from "../../icons";
import { getUserTransactions } from "../../../Redux/userSlice";
import Points from "../../user/Points";

const UserTransactions = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    transactionData,
    pageSize,
    currentPage,
    pagination,
    selectedFilter,
    currentTable,
  } = useSelector((state) => ({
    isLoading: state.userSlice.isLoading,
    transactionData: state.userSlice.transactionData,
    pagination: state.userSlice.pagination,
    pageSize: state.commonSlice.tableData.pageSize,
    currentPage: state.commonSlice.tableData.currentPage,
    selectedFilter: state.commonSlice.tableData.selectedFilter,
    currentTable: state.commonSlice.tableData.currentTable,
  }));

  const [selectedIds, setSelectedIds] = useState(null);
  const [tableData, setTableData] = useState(null);

  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState("details"); 
  const userDetails = (e) => {
    setShowDetails(e.target.id);
  };

  useEffect(() => {
    dispatch(getUserTransactions());
  }, []);

  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(
          typeof row.values[id] === "string"
            ? row.values[id]
            : row.values[id].props.children
        );
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
      columns: [
        {
          Header: "Business Points",
          accessor: "points.business_points",
          id: "awardBusinessPoints"
        },
        {
          Header: "Personal Points",
          accessor: "points.personal_points",
          id: "awardPersonalPoints"
        },
      ],
    },
    {
      Header: "Balance",
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
      getUserTransactions({
        page: currentPage,
        filter: selectedFilter,
      })
    );
  }, [currentTable, currentPage, dispatch, selectedFilter]);

  return (
    <UserLayout>
      <AdminHeader className="" showControls={false} type="transaction" title="Transactions" />
      <div>
        <Points />
      </div>
      <div className="mt-[39px] mb-[18px] flex items-baseline md:block">
        <p className="text-[#DD69AA] text-[18px] md:text-[20px] font-[700] leading-[24px] lg:text-[24px] md:font-[700] md:leading-[28px] 2xl:text-[36px] 2xl:font-[700] 2xl:leading-[42px]" >
        Transaction History
        </p>
        <span className="w-full md:hidden flex-1 h-[1.2px] ml-1 bg-[#DD69AA]"></span>
      </div>
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
    </UserLayout>
  );
};

export default UserTransactions;
