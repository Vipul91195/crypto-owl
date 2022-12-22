import React, { useState } from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import CommonTable from '../table/CommonTable';
import CustomModal from '../CustomModal';
import CustomButton from '../forms/CustomButton';
import chat from "../../assets/img/chat.svg";
import roundedblock from "../../assets/img/roundedblock.svg";
import profilepic from "../../assets/img/profilepic.svg";
import MessageForm from '../../admin/MessageForm';
import AwardPoint from '../../admin/AwardPoint';

const UserProfile = () => {
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
            <div className='pt-[87px]'>
                <h1 className='text-[34px] leading-[42px] tracking-tight font-bold text-pink-light'>User Profile</h1>
                <div className="pt-[50.94px] rounded-b-[20px] overflow-hidden relative">
                    <div className="absolute pt-10 pl-[42px]">
                        <img src={profilepic} alt="businessIcon" />
                    </div>
                    <div className=" bg-[#040404] pl-[328px] pr-[24.42px] rounded-t-[20px] pt-[61px]">
                        <p className='text-[64px] leading-9 font-bold text-pink-light '>
                            Kris Washington
                        </p>
                        <div className='flex flex-row justify-between'>
                            <p className='text-[31.5066px] tracking-tight leading-[54px] font-normal text-[#DD69AA]'>General Manager</p>
                            <div className='flex pb-[22px]'>
                                <div className='flex cursor-pointer'
                                    onClick={() => showModal("message")}
                                >
                                    <div>
                                        <img src={chat} alt="c" />
                                    </div>
                                    <p className='text-[21.1953px] leading-9 font-bold tracking-tight text-pink-light pl-[10px] whitespace-nowrap pr-[23px]'>Send Message</p>
                                </div>
                                <div className='flex'>
                                    <div><img src={roundedblock} alt="b" /></div>
                                    <p className='text-[21.1953px] leading-9 font-bold tracking-tight text-pink-light pl-[14px] whitespace-nowrap'>Block User</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex  pl-[328px] pr-[44px] pt-[10px] pb-[39px] bg-[#101010] ">
                        <div className="text-xl leading-9 font-normal text-[#979998] flex flex-col gap-[6px] justify-between grow">
                            <div className="flex gap-2">
                                <p className="text-[ 21.1953px] leading-9 font-bold tracking-tight text-[#CDBEBE]">
                                    Email:
                                </p>
                                <p className="text-[21.1953px] leading-9 font-bold tracking-tight text-[#DD69AA]"> ape.vpp8@gmail.com</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-[ 21.1953px] leading-9 font-bold tracking-tight text-[#CDBEBE]">
                                    Phone:
                                </p>
                                <p className="text-[21.1953px] leading-9 font-bold tracking-tight text-[#DD69AA]"> +01 1234567890</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-[ 21.1953px] leading-9 font-bold tracking-tight text-[#CDBEBE]">
                                    Address:
                                </p>
                                <p className="text-[21.1953px] leading-9 font-bold tracking-tight text-[#DD69AA]"> Khandala, behind hanging garden, India</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end">
                            <CustomButton
                                onClick={() => showModal("award")}
                                buttonStyle="px-[43px] py-[8px] text-sm leading-6 tracking-tight font-medium border border-[#DD69AA] 
                                    text-[#DD69AA] whitespace-nowrap"
                            >
                                Award Point
                            </CustomButton>
                        </div>
                    </div>
                </div>
                <div className='flex items-end gap-2 mt-[22px]'>
                    <p className='text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]'>Details</p>
                    <div className='h-[2.7px] bg-[#DD69AA] w-full'></div>
                </div>
                <div className='flex w-full gap-[68px]'>
                    <div className='flex pt-[25px] items-center justify-between grow'>
                        <div className='flex flex-col gap-7 text-xl leading-[21px] font-normal tracking-tight text-[#979998]'>
                            <p>Member ID</p>
                            <p>Issue Date</p>
                        </div>
                        <div className='flex flex-col gap-[10px] text-xl leading-9 font-medium tracking-tight text-white text-right'>
                            <p >MEM001</p>
                            <p>20-01-1920</p>
                        </div>
                    </div>
                    <div className='flex pt-[25px] items-center justify-between grow'>
                        <div className='flex flex-col gap-7 text-xl leading-[21px] font-normal tracking-tight text-[#979998]'>
                            <p>Member ID</p>
                            <p>Issue Date</p>
                        </div>
                        <div className='flex flex-col gap-[10px] text-xl leading-9 font-medium tracking-tight text-white text-right'>
                            <p>MEM001</p>
                            <p>20-01-1920</p>
                        </div>
                    </div>
                    <div className='flex pt-[25px] items-center justify-between grow'>
                        <div className='flex flex-col gap-7 text-xl leading-[21px] font-normal tracking-tight text-[#979998]'>
                            <p>Member ID</p>
                            <p>Issue Date</p>
                        </div>
                        <div className='flex flex-col gap-[10px] text-xl leading-9 font-medium tracking-tight text-white text-right'>
                            <p>MEM001</p>
                            <p>20-01-1920</p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-[68px] mt-[41px]'>
                    <div className='flex items-end gap-2 w-full'>
                        <p className='text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]'>Awarded</p>
                        <div className='h-[2.7px] bg-[#DD69AA] w-full'></div>
                    </div>
                    <div className='flex items-end gap-2  w-full'>
                        <p className='text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]'>Redeemed</p>
                        <div className='h-[2.7px] bg-[#DD69AA] w-full'></div>
                    </div>
                    <div className='flex items-end gap-2  w-full'>
                        <p className='text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]'>Available</p>
                        <div className='h-[2.7px] bg-[#DD69AA] w-full'></div>
                    </div>
                </div>
                <div className='flex w-full gap-[68px]'>
                    <div className='flex pt-[21px] items-center justify-between grow'>
                        <div className='flex flex-col gap-7 text-xl leading-[21px] font-normal tracking-tight text-[#979998]'>
                            <p>Business Points</p>
                            <p>Personal Points</p>
                        </div>
                        <div className='flex flex-col gap-[10px] text-xl leading-9 font-medium tracking-tight text-white text-right'>
                            <p>10000</p>
                            <p>4000</p>
                        </div>
                    </div>
                    <div className='flex pt-[25px] items-center justify-between grow'>
                        <div className='flex flex-col gap-7 text-xl leading-[21px] font-normal tracking-tight text-[#979998]'>
                            <p>Business Points</p>
                            <p>Personal Points</p>
                        </div>
                        <div className='flex flex-col gap-[10px] text-xl leading-9 font-medium tracking-tight text-white text-right'>
                            <p>10000</p>
                            <p>4000</p>
                        </div>
                    </div>
                    <div className='flex pt-[25px] items-center justify-between grow'>
                        <div className='flex flex-col gap-7 text-xl leading-[21px] font-normal tracking-tight text-[#979998]'>
                            <p>Member ID</p>
                            <p>Issue Date</p>
                        </div>
                        <div className='flex flex-col gap-[10px] text-xl leading-9 font-medium tracking-tight text-white text-right'>
                            <p>MEM001</p>
                            <p>20-01-1920</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-end gap-2 mt-[44px] mb-6'>
                    <p className='text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA] whitespace-nowrap'>Transaction History</p>
                    <div className='h-[2.7px] bg-[#DD69AA] w-full'></div>
                </div>
            </div >
            <CommonTable
                columns={columns}
                filteredColumns={["transactionType"]}
                data={data}
                HeaderClasses="bg-[#040404] text-[#DD69AA]"
                HeadingClasses="relative pt-[34px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 pb-[28px] whitespace-nowrap text-[20px] font-[500] leading-[24px] -tracking-[0.02em]"
                tableClasses="w-full rounded-[20px] overflow-hidden"
                BodyClasses="text-[#979998] bg-[#101010]"
                containerClasses="max-h-[44vh]  h-max overflow-auto"
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
            <CustomModal onClose={hideModal} modal={{ isVisible: !!modal }}>
                {modal === "message" && <MessageForm />}
                {modal === "award" && <AwardPoint />}
            </CustomModal>
        </AdminLayout>
    );
}

export default UserProfile