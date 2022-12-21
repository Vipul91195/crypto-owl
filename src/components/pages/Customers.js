import React from 'react'
import CustomButton from '../forms/CustomButton'
import UserManagement from '../../admin/UserManagement'
import { AdminLayout } from '../layout/AdminLayout'
import CommonTable from '../table/CommonTable';
import PopOver from '../PopOver';
import AwardPoint from '../../admin/AwardPoint';
import businessIcon from '../../assets/img/businessIcon.svg'

const Customers = () => {
    /**   temp code */
    function SelectColumnFilter({
        column: { filterValue, setFilter, preFilteredRows, id },
    }) {
        const options = React.useMemo(() => {
            const options = new Set();
            preFilteredRows.forEach((row) => {
                options.add(row.values[id]);
                // console.log(row.values, "  : options");
            });
            return [...options.values()];
        }, [id, preFilteredRows]);
        return (
            // <div className='absolute top-[80%] -translate-x-1/2 left-1/2 bg-[#303030] px-[20px] py-[25px] rounded-[10px] text-white min-w-[240px]'>
            <div className="bg-[#303030] px-[20px] py-[25px] rounded-[10px] text-white min-w-[240px]">
                <p
                    className="border-b w-full cursor-pointer border-solid pb-3 text-left border-[#545557] text-[20px]"
                    onClick={() => {
                        setFilter("");
                    }}
                >
                    All
                </p>
                {options.map((option, i) => (
                    <p
                        key={i}
                        onClick={(e) => {
                            console.log("id :", option);
                            setFilter(option || undefined);
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
            Header: "Business",
            accessor: (row) => {
                const { businessImage, business } = row;
                return (
                    <div className="flex gap-[16px] items-center">
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
            // accessor: (row) => {
            // const { status } = row;
            // return <p className={classNames({'text-[#DD69AA]': status === "Active", 'text-[#858383]': status === "Inactive"})}  >{status}</p>
            // },
            accessor: "status",
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
                    User Management (Customers)
                </div>
                <div className="flex gap-6">
                    {/* <input
            className="h-[51px] rounded-2xl w-full max-w-[500px] px-[62px] bg-[#101010]"
            type="search"
          /> */}
                    <CustomButton
                        type="submit"
                        buttonStyle="w-full px-[62px] h-[51px] sm:text-sm  border border-[#DD69AA] leading-6 font-medium rounded-2xl  text-[#DD69AA]"
                    >
                        Remove
                    </CustomButton>
                    <PopOver
                        showLabelIcon={false}
                        label="Award Point"
                        LabelClassName="w-full px-[43px] h-[51px] sm:text-sm  border border-[#DD69AA] leading-6 font-medium rounded-2xl text-[#DD69AA] whitespace-nowrap"
                    >
                        <AwardPoint />
                        {/* <p>test</p> */}
                    </PopOver>
                    {/* <CustomButton
            type="submit"
            buttonStyle="w-full px-[43px] h-[51px] sm:text-sm  border border-[#DD69AA] leading-6 font-medium rounded-2xl text-[#DD69AA] whitespace-nowrap"
          >
            Award Point
          </CustomButton> */}
                    <CustomButton
                        type="submit"
                        // disabled={isLoading}
                        buttonStyle="w-full h-[51px] px-[36px] text-sm leading-6 tracking-tight font-medium rounded-2xl text-white bg-[#DD69AA] whitespace-nowrap"
                    // loaderSize={20}
                    // showLoader
                    >
                        Add Customer
                    </CustomButton>
                </div>
            </div>
            <div className='pt-[50.94px] rounded-b-[20px] overflow-hidden relative'>
                <div className='absolute pt-10 pl-[65px]'><img src={businessIcon} alt='businessIcon' /></div>
                <div className='text-5xl leading-9 font-bold text-[#CDBEBE] pt-10 pb-[18px] bg-[#040404] pl-[279px] rounded-t-[20px]'>Verizon Pvt. Ltd.</div>
                <div className='flex items-center pl-[279px] pr-[30px] pt-2 pb-[18px] bg-[#101010] '>
                    <div className='text-xl leading-9 font-normal text-[#979998] flex flex-col gap-[6px] justify-between grow'>
                        <div className='flex justify-between'>
                            <p className='text-xl leading-9 font-normal text-[#979998]'>Company No.</p>
                            <p className='text-[#DD69AA]'>34689433</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>VAT Number</p>
                            <p className='text-[#DD69AA]'>32199965</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Member IDr</p>
                            <p className='text-[#DD69AA]'>MEM0001</p>
                        </div>
                    </div>
                    <span className='h-[100px] w-[1px] mx-[55px] bg-[#979998] text-center'></span>
                    <div className='text-xl leading-9 font-normal text-[#979998] flex flex-col gap-[6px] justify-between grow'>
                        <div className='flex justify-between'>
                            <p className='text-xl leading-9 font-normal text-[#979998]'>Company No.</p>
                            <p className='text-[#DD69AA]'>34689433</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>VAT Number</p>
                            <p className='text-[#DD69AA]'>32199965</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Member IDr</p>
                            <p className='text-[#DD69AA]'>MEM0001</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[56px]">
                <CommonTable
                    columns={columns}
                    filteredColumns={["status"]}
                    data={data}
                    HeaderClasses="bg-[#040404] text-[#DD69AA]"
                    HeadingClasses="relative pt-[34px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 pb-[28px] whitespace-nowrap text-[20px] font-[500] leading-[24px] -tracking-[0.02em]"
                    tableClasses="w-full rounded-[20px] overflow-hidden"
                    BodyClasses="text-white bg-[#101010]"
                    cellDefaultStyle="text-xl px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal leading-[36.33px] py-[22px] -tracking-[2%] text-center"
                    headerClasses={{
                        ownerName: { textAlign: "right" },
                        Business: { textAlign: "left" },
                    }}
                    cellClasses={{
                        selected: { paddingInline: "16px 23px" },
                        Business: { textAlign: "left" },
                        ownerName: {
                            textAlign: "right",
                            fontSize: "21px",
                            fontWeight: "700",
                        },
                        ownerEmail: { textAlign: "center" },
                    }}
                />
            </div>
        </AdminLayout>
    );
}
export default Customers;