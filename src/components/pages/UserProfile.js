import React, { useState } from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import CommonTable from '../table/CommonTable';

const UserProfile = () => {
const dispatch = useDispatch();
const [ modal, setModal ] = useState(false);
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
      orderNo: "1",
      date: "12/12/1212",
      transactionType: "Sent",
      fromTo: "KrisWashington",
      emailId: "@KrisWashington",
      pointsType: "Business",
      points: "1000",
      balance: "1000",
    },
    {
      orderNo: "2",
      date: "12/12/1212",
      transactionType: "Received",
      fromTo: "Verizon (business)",
      emailId: "@karl.will02",
      pointsType: "Personal",
      points: "5500",
      balance: "5500",
    },
    {
      orderNo: "3",
      date: "12/12/1212",
      transactionType: "Received",
      fromTo: "KrisWashington",
      emailId: "@KrisWashington",
      pointsType: "Business",
      points: "1000",
      balance: "1000",
    },
    {
      orderNo: "4",
      date: "12/12/1212",
      transactionType: "Sent",
      fromTo: "karl.will02",
      emailId: "@karl.will02",
      pointsType: "Personal",
      points: "5500",
      balance: "5500",
    }
  ]);
  const columns = React.useMemo(() => [
    {
        Header: "Order No",
        accessor: "orderNo"
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Transaction Type",
      accessor: "transactionType",
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
    {
      Header: "From To",
      accessor: "fromTo",
    },
    {
      Header: "Email ID",
      accessor: "emailId",
    },
    {
      Header: "Points Type",
      accessor: "pointsType",
    },
    {
        Header: "Points",
        accessor: "points",
    },
    {
        Header: "Balance",
        accessor: "balance",
    }
  ]);
  /**   temp code */
  
    return (
      <AdminLayout>
        <div className="text-white">user</div>
        <CommonTable
          columns={columns}
          filteredColumns={["transactionType"]}
          data={data}
          HeaderClasses="bg-[#040404] text-[#DD69AA]"
          HeadingClasses="relative pt-[34px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 pb-[28px] whitespace-nowrap text-[20px] font-[500] leading-[24px] -tracking-[0.02em]"
          tableClasses="w-full rounded-[20px] overflow-hidden"
          BodyClasses="text-[#979998] bg-[#101010]"
          containerClasses="max-h-[75vh] h-screen overflow-auto"
          cellDefaultStyle="text-xl px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal leading-[36.33px] py-[22px] -tracking-[2%] text-center"
          headerClasses={{
            fromTo: { textAlign: "left" },
            emailId: { textAlign: "right" },
          }}
          cellTextClassName={{
            fromTo: { justifyContent: "left", width: "100%" },
            emailId: { justifyContent: "right", width: "100%" },
          }}
          cellClasses={{
            fromTo: { textAlign: "left", color: 'white' },
            emailId: { textAlign: "right", color: "#979998" },
            date: { color: "#CDBEBE" },
            orderNo: { color: "#CDBEBE" },
            transactionType: { color: "#6D737A" },
          }}
        />
      </AdminLayout>
    );
}

export default UserProfile