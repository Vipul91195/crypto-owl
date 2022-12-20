import React from 'react'
import home from '../../assets/img/home.svg'
import user from '../../assets/img/user.svg'
import report from '../../assets/img/report.svg'
import UserManagemant from '../../admin/UserManagement';
import CustomButton from '../forms/CustomButton';
import searchIcon from '../../assets/img/SearchIcon.svg'



const tabs = [
    { name: 'Admin Info', icon: home },
    { name: 'User Management', icon: user },
    { name: 'Reports', icon: report }
];


export const AdminLayout = () => {
    return (
        <div className='grid grid-cols-[290px,auto] font-Sans '>
            <div className='max-w-[290px] bg-[#040404] min-h-screen'>
                <div className='border-b border-[#FFFFFF]/[10%] pt-32'></div>
                <div>
                    {tabs.map((tab, i) => (
                        <div className='flex items-center gap-[14px] pt-9 pl-9'>
                            <img src={tab.icon} alt="i" />
                            <div className='text-base leading-7 text-[#DD69AA] font-bold whitespace-nowrap'>{tab.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-[#171717] w-full px-11 '>
                <div className='pt-[72px] flex gap-14'>
                    <UserManagemant />
                    <div className='flex gap-6'>
                        {/* <img src={searchIcon} alt="s" /> */}
                        <input className='h-[51px] rounded-2xl w-full max-w-[500px] px-[62px] bg-[#101010]' type="search" />
                        <CustomButton
                            type='submit'
                            buttonStyle="w-full px-[62px] h-[51px] sm:text-sm  border border-[#DD69AA] leading-6 font-medium rounded-2xl  text-[#DD69AA]">
                            Remove
                        </CustomButton >
                        <CustomButton
                            type='submit'
                            buttonStyle="w-full px-[43px] h-[51px] sm:text-sm  border border-[#DD69AA] leading-6 font-medium rounded-2xl text-[#DD69AA] whitespace-nowrap">
                            Award Point
                        </CustomButton >
                        <CustomButton
                            type='submit'
                            // disabled={isLoading}
                            buttonStyle="w-full h-[51px] px-[36px] sm:text-sm font-medium rounded-2xl text-pink-light bg-[#DD69AA] whitespace-nowrap"
                        // loaderSize={20}
                        // showLoader
                        >
                            Add Business
                        </CustomButton >
                    </div>
                </div>
            </div>
        </div >
    )
}
