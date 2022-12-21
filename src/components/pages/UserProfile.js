import React from 'react'
import { AdminLayout } from '../layout/AdminLayout'

const UserProfile = () => {
    return (
        <AdminLayout>
            <div className='pt-[87px]'>
                <h1 className='text-[34px] leading-[42px] tracking-tight font-bold text-pink-light'>User Profile</h1>
                <div className="pt-[50.94px] rounded-b-[20px] overflow-hidden relative">
                    <div className="absolute pt-10 pl-[65px]">
                        {/* <img src={businessIcon} alt="businessIcon" /> */}
                    </div>
                    <div className="text-[64px] leading-9 font-bold text-pink-light pt-[61px] pb-[18px] bg-[#040404] pl-[328px] rounded-t-[20px]">
                        <p>
                            Kris Washington
                        </p>
                    </div>
                    <p>General Manager</p>
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
            </div>
        </AdminLayout>
    )
}

export default UserProfile