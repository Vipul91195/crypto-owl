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
import AdminHeader from '../layout/AdminHeader';
const UserProfile = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const showModal = (type) => setModal(type)
    const hideModal = () => setModal(false)
    const [showDetails, setShowDetails] = useState("details")
    const userDetails = (e) => {
        setShowDetails(e.target.id)
    }


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
            {/* <AdminHeader type="user-profile" title="User Profile" showControls={false} /> */}
            <AdminHeader type="user" title="User Profile" />
            <div className=''>
                {/* <h1 className='text-[34px] leading-[42px] tracking-tight font-bold text-pink-light'>User Profile</h1> */}
                <div className="pt-[18px] lg:pt-[50.94px] rounded-b-[20px] overflow-hidden relative">
                    <div className="absolute pt-4 pl-4 md:pt-6 lg:pt-14 xl:pl-[42px] ">
                        <div className='relative max-w-[84.72px] max-h-[98.39px] lg:max-w-[142px] xl:max-w-[170px] xl:max-h-[170px] 2xl:max-w-[217px] 2xl:max-h-[252px]'>
                            <img src={profilepic} alt="businessIcon" />
                        </div>
                    </div>
                    <div className=" bg-[#040404] pl-[126px] lg:pl-[180px] xl:pl-[250px] 2xl:pl-[328px] pr-[24.42px] rounded-t-[20px] pt-[23px] lg:pt-[61px]">
                        <p className='text-2xl leading-[14px] tracking-tight text-white md:text-lg lg:text-4xl lg:leading-7 2xl:text-[64px] 2xl:leading-9 2xl:font-bold lg:text-pink-light '>
                            Kris Washington
                        </p>
                        <div className='flex flex-row justify-between'>
                            <p className='text-xs leading-5 lg:text-2xl 2xl:text-[31.5066px] tracking-tight 2xl:leading-[54px] font-normal text-[#DD69AA]'>General Manager</p>
                            <div className='flex pb-[22px] md:pb-2 lg:pb-[22px]'>
                                <div className='flex cursor-pointer'
                                    onClick={() => showModal("message")}
                                >
                                    <div className='hidden md:flex'>
                                        <img className='w-5 h-5 lg:w-[30px] lg:h-[30px] 2xl:w-[39px] 2xl:h-[39px]' src={chat} alt="c" />
                                    </div>
                                    <p className='hidden md:flex md:text-sm lg:text-lg lg:leading-7 2xl:text-[21.1953px] 2xl:leading-9 font-bold tracking-tight text-pink-light pl-[10px] whitespace-nowrap pr-[23px]'>Send Message</p>
                                </div>
                                <div className='hidden md:flex'>
                                    {/* <div><img src={roundedblock} alt="b" /></div>
                                    <p className='text-[21.1953px] leading-9 font-bold tracking-tight text-pink-light pl-[14px] whitespace-nowrap'>Block User</p> */}
                                    <CustomButton
                                        onClick={() => showModal("award")}
                                        buttonStyle="text-[10px] px-[10px] lg:px-[30px] 2xl:px-[43px] 2xl:py-[8px] lg:text-sm lg:leading-6 tracking-tight font-medium border border-[#DD69AA] 
                                    text-[#DD69AA] whitespace-nowrap"
                                    >
                                        Award Point
                                    </CustomButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex pl-[126px] lg:pl-[180px] xl:pl-[250px] 2xl:pl-[328px] pr-[44px] pt-[10px] pb-5 2xl:pb-[39px] bg-[#101010] ">
                        {/* <div className="text-xl leading-9 font-normal text-[#979998] gap-2 flex flex-col md:gap-[6px] justify-between grow "> */}
                        <div className="gap-2 xl:gap-0 flex flex-col 2xl:gap-[6px] justify-between grow ">
                            <div className="flex gap-2">
                                <p className="text-sm leading-[14px] font-normal lg:text-[21.1953px] lg:leading-9 lg:font-bold tracking-tight text-[#CDBEBE]">
                                    Email:
                                </p>
                                <p className="text-sm leading-[14px] font-normal lg:text-[21.1953px] lg:leading-9 lg:font-bold tracking-tight text-[#DD69AA]"> ape.vpp8@gmail.com</p>
                            </div>
                            <div className="flex gap-2">
                                <p className="text-sm leading-[14px] font-normal lg:text-[21.1953px] lg:leading-9 lg:font-bold tracking-tight text-[#CDBEBE]">
                                    Phone:
                                </p>
                                <p className="text-sm leading-[14px] font-normal lg:text-[21.1953px] lg:leading-9 lg:font-bold tracking-tight text-[#DD69AA]"> +01 1234567890</p>
                            </div>
                            <div className="hidden xl:flex gap-2 ">
                                <p className="text-[21.1953px] leading-9 font-bold tracking-tight text-[#CDBEBE]">
                                    Address:
                                </p>
                                <p className="text-[21.1953px] leading-9 font-bold tracking-tight text-[#DD69AA]"> Khandala, behind hanging garden, India</p>
                            </div>
                        </div>
                        {/* <div className="hidden md:flex md:flex-col md:justify-end">
                            <CustomButton
                                onClick={() => showModal("award")}
                                buttonStyle="px-[43px] py-[8px] text-sm leading-6 tracking-tight font-medium border border-[#DD69AA] 
                                    text-[#DD69AA] whitespace-nowrap"
                            >
                                Award Point
                            </CustomButton>
                        </div> */}
                    </div>
                </div>
                <div className='hidden xl:flex items-end gap-2 mt-[22px]'>
                    <p className='text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]'>Details</p>
                    <div className='h-[2.7px] bg-[#DD69AA] w-full'></div>
                </div>
                <div className='rounded-[10px] overflow-hidden mt-3'>
                    <div className='xl:hidden  flex items-center bg-[#040404]  justify-around'>
                        <p onClick={userDetails} id="details" className={classNames('flex-1 text-center text-base leading-9 font-medium tracking-tight text-[#DD69AA] md:text-xl md:leading-10 cursor-pointer', { 'border-b-[1.5px] border-[#DD69AA]': showDetails === "details" })}>Details</p>
                        <p onClick={userDetails} id="points" className={classNames('text-base flex-1 text-center leading-9 font-medium tracking-tight text-[#DD69AA] md:text-xl md:leading-10 cursor-pointer', { 'border-b-[1.5px] border-[#DD69AA]': showDetails === "points" })}>Points</p>
                    </div>
                    {showDetails === "details" &&
                        <div className='px-[14px] xl:px-0 bg-[#101010] xl:bg-[#171717] xl:grid xl:grid-cols-[1fr,1fr,1fr] xl:gap-[30px] 2xl:gap-[68px]'>
                            <div className='flex pt-[20px] md:pt-[25px] items-center justify-between grow'>
                                <div className='flex flex-col gap-4 md:gap-7 text-xs leading-[13px] md:text-xl 2xl:leading-[21px] font-normal tracking-tight text-[#979998]'>
                                    <p>Member ID</p>
                                    <p>Issue Date</p>
                                </div>
                                <div className='flex flex-col gap-[7px] md:gap-[10px] text-xs leading-[23px] md:md:text-xl md:leading-9 font-medium tracking-tight text-white text-right'>
                                    <p >MEM001</p>
                                    <p>20-01-1920</p>
                                </div>
                            </div>
                            <div className='flex pt-[16.41px] md:pt-[25px] items-center justify-between grow'>
                                <div className='flex flex-col gap-4 md:gap-7 text-xs leading-[13px] md:text-xl 2xl:leading-[21px] font-normal tracking-tight text-[#979998]'>
                                    <p>Is Business owner</p>
                                    <p>Is Customer</p>
                                </div>
                                <div className='flex flex-col gap-[7px] md:gap-[10px] text-xs leading-[23px] md:md:text-xl md:leading-9 font-medium tracking-tight text-white text-right'>
                                    <p>Yes (Verizon)</p>
                                    <p>Yes</p>
                                </div>
                            </div>
                            <div className='flex pt-[16.41px] md:pt-[25px] items-center justify-between grow'>
                                <div className='flex flex-col gap-4 md:gap-7 text-xs leading-[13px] md:text-xl 2xl:leading-[21px] font-normal tracking-tight text-[#979998]'>
                                    <p>Current Status</p>
                                    <p>Redemption Platform</p>
                                </div>
                                <div className='flex flex-col gap-[7px] md:gap-[10px] text-xs leading-[23px] md:md:text-xl md:leading-9 font-medium tracking-tight text-white text-right'>
                                    <p>Active</p>
                                    <p className='text-[#DD69AA]'>https;//gdhcbc</p>
                                </div>
                            </div>
                            <div className='md:hidden bg-[] flex md:pt-[25px] items-center justify-between grow'>
                                <div className='flex flex-col gap-4 md:gap-7 text-xs leading-[13px] md:text-xl 2xl:leading-[21px] font-normal tracking-tight text-[#979998]'>
                                    <p>Address</p>
                                </div>
                                <div className='flex flex-col gap-[7px] pb-[9px] md:gap-[10px] text-xs leading-[23px] md:md:text-xl md:leading-9 font-medium tracking-tight text-white text-right'>
                                    <p className='text-[#CDBEBE] w-[138px]'>Khandala, behind hanging garden, India</p>
                                </div>
                            </div>
                        </div>}
                    {showDetails === "points" &&
                        <div className='px-[14px] bg-[#101010] 2xl:hidden gap-[68px] pt-3 2xl:mt-[41px]'>
                            <div className='w-full'>
                                <div className='flex items-end gap-2 w-full'>
                                    <p className='text-[15px] leading-[13px] font-medium md:text-[22px] 2xl:text-2xl 2xl:leading-[21px] 2xl:font-bold tracking-tight text-[#DD69AA]'>Awarded</p>
                                    <div className='h-[0.37px] md:h-[2.7px] bg-[#DD69AA] w-full'></div>
                                </div>
                                <div className='flex pt-3 md:pt-[21px] items-center justify-between grow'>
                                    <div className='flex flex-col gap-[11.36px] md:gap-7 text-xs leading-[13px] md:text-xl md:leading-[21px] font-normal tracking-tight text-[#979998]'>
                                        <p>Business Points</p>
                                        <p>Personal Points</p>
                                    </div>
                                    <div className='flex flex-col gap-[2px] md:gap-[10px] text-xs leading-[23px] md:text-xl md:leading-9 font-medium tracking-tight text-white text-right'>
                                        <p>10000</p>
                                        <p>4000</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className='flex items-end gap-2  w-full pt-3'>
                                    <p className='text-[15px] leading-[13px] font-medium md:text-[22px]  2xl:text-2xl 2xl:leading-[21px] 2xl:font-bold tracking-tight text-[#DD69AA]'>Redeemed</p>
                                    <div className='h-[0.37px] md:h-[2.7px] bg-[#DD69AA] w-full'></div>
                                </div>
                                <div className='flex pt-2 md:pt-[21px] items-center justify-between grow'>
                                    <div className='flex flex-col gap-[11.36px] md:gap-7 text-xs leading-[13px] md:text-xl md:leading-[21px] font-normal tracking-tight text-[#979998]'>
                                        <p>Business Points</p>
                                        <p>Personal Points</p>
                                    </div>
                                    <div className='flex flex-col gap-[2px] md:gap-[10px] text-xs leading-[23px] md:text-xl md:leading-9 font-medium tracking-tight text-white text-right'>
                                        <p>10000</p>
                                        <p>4000</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-end gap-2  w-full pt-3'>
                                <p className='text-[15px] leading-[13px] font-medium md:text-[22px]  2xl:text-2xl 2xl:leading-[21px] 2xl:font-bold tracking-tight text-[#DD69AA]'>Available</p>
                                <div className='h-[0.37px] md:h-[2.7px] bg-[#DD69AA] w-full'></div>
                            </div>
                            <div className='flex pt-2 md:pt-[21px] items-center justify-between grow'>
                                <div className='flex flex-col gap-[11.36px] md:gap-7 text-xs leading-[13px] md:text-xl md:leading-[21px] font-normal tracking-tight text-[#979998]'>
                                    <p>Business Points</p>
                                    <p>Personal Points</p>
                                </div>
                                <div className='flex flex-col gap-[2px] md:gap-[10px] text-xs leading-[23px] md:text-xl md:leading-9 font-medium tracking-tight text-white text-right pb-[14.73px]'>
                                    <p>10000</p>
                                    <p>4000</p>
                                </div>
                            </div>
                        </div>}
                </div>

                {/* <div className='hidden md:flex md:items-end md:gap-2 md:mt-[44px] md:mb-6'>
                    <p className='text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA] whitespace-nowrap'>Transaction History</p>
                    <div className='h-[2.7px] bg-[#DD69AA] w-full'></div>
                </div> */}
                <div className='hidden xl:flex md:gap-[68px] xl:gap-[30px] md:mt-[41px]'>
                    <div className='w-full'>
                        <div className='flex items-end gap-2 w-full'>
                            <p className='text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]'>Awarded</p>
                            <div className='h-[2.7px] bg-[#DD69AA] w-full'></div>
                        </div>
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
                    </div>
                    <div className='w-full'>
                        <div className='flex items-end gap-2  w-full'>
                            <p className='text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]'>Redeemed</p>
                            <div className='h-[2.7px] bg-[#DD69AA] w-full'></div>
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
                    </div>
                    <div className='w-full'>
                        <div className='flex items-end gap-2  w-full'>
                            <p className='text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]'>Available</p>
                            <div className='h-[2.7px] bg-[#DD69AA] w-full'></div>
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
                    </div>
                </div>
                <div className='flex py-3 items-end md:gap-2 md:my-4 2xl:mt-[44px] 2xl:mb-6'>
                    <p className='text-[18px] leading-[20px] md:text-2xl md:leading-[21px] font-medium md:font-bold tracking-tight text-[#DD69AA] whitespace-nowrap'>Transaction History</p>
                    <div className='h-[1.5px] md:h-[2.7px] bg-[#DD69AA] w-full'></div>
                </div>
            </div >
            <CommonTable
                columns={columns}
                // handleRowSelect= {() => {}}
                filteredColumns={["transactionType"]}
                data={data}
                HeaderClasses="bg-[#040404] text-[#DD69AA]"
                // HeadingClasses="relative pt-[34px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 pb-[28px] whitespace-nowrap text-[20px] font-[500] leading-[24px] -tracking-[0.02em]"
                // cellDefaultStyle="text-xl px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal leading-[36.33px] py-[22px] -tracking-[2%] text-center"
                HeadingClasses="relative pt-[22px] pb-[16px] md:pt-[26px] md:pb-[20px] 2xl:pt-[30px] 2xl:pb-[24px] 4xl:pt-[34px] 4xl:pb-[28px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 whitespace-nowrap text-[16px] 2xl:text-[20px] leading-[16px] 2xl:leading-[24px] font-[500]  -tracking-[0.02em]"
                cellDefaultStyle="text-[16px] 2xl:text-xl leading-[16px] 2xl:leading-[36.33px] px-[15px] 2xl:pr-[30px] 2xl:pl-0 font-normal py-[18px] 2xl:py-[22px] -tracking-[2%] text-center"
                tableClasses="w-full rounded-[20px] overflow-hidden"
                BodyClasses="text-[#979998] bg-[#101010]"
                containerClasses="h-max overflow-auto"
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
                {modal === "award" && <AwardPoint type={"user"} />}
            </CustomModal>
        </AdminLayout>
    );
}

export default UserProfile