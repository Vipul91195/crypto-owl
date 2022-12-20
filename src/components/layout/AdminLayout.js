import React, { Children } from 'react'
import home from '../../assets/img/home.svg'
import user from '../../assets/img/user.svg'
import report from '../../assets/img/report.svg'



const tabs = [
    { name: 'Admin Info', icon: home },
    { name: 'User Management', icon: user },
    { name: 'Reports', icon: report }
];


export const AdminLayout = ({children}) => {
    console.log(children)
    return (
        <div className='grid grid-cols-[290px,auto] font-Sans '>
            <div className='max-w-[290px] bg-[#040404] min-h-screen'>
                <div className='border-b border-[#FFFFFF]/[10%] pt-32'></div>
                <div>
                    {tabs.map((tab, i) => (
                        <div key={i} className='flex items-center gap-[14px] pt-9 pl-9'>
                            <img src={tab.icon} alt="i" />
                            <div className='text-base leading-7 text-[#DD69AA] font-bold whitespace-nowrap'>{tab.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-[#171717] w-full px-11 '>
                {children}
            </div>
        </div >
    )
}
