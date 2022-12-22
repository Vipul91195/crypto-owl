import React, { Children, useState } from 'react'
import home from '../../assets/img/home.svg'
import user from '../../assets/img/user.svg'
import report from '../../assets/img/report.svg'
import searchUser from '../../assets/img/searchUser.svg'
import ConfirmModal from '../ConfirmModal';
import closelineicon from '../../assets/img/closelineicon.svg'

import { useLocation, useNavigate } from 'react-router-dom';
import RouteMiddleware from '../RouteMiddleware'
import classNames from 'classnames'

const tabs = [
    { name: 'Admin Info', icon: home, route: "/admin-info" },
    { name: 'User Management', icon: user, route: "/businesses" },
    { name: 'Reports', icon: report, route: "/reports" },
    { name: 'Search User', icon: searchUser, route: "/search-user" }
];

export const AdminLayout = ({ children }) => {
    const [show, setShow] = useState(false);
    const sidebar = () => {
        setShow(!show);
    };


    const route = useLocation();
    const navigate = useNavigate();
    return (
        <RouteMiddleware>
            <div className='grid grid-cols-[290px,auto] font-Sans '>
                <div className='max-w-[290px] bg-[#040404] min-h-screen'>
                    {/* <div className={classNames('absolute w-screen max-w-none z-index: 99 lg:max-w-[290px] bg-[#040404] min-h-screen',
                    { "right-[100%]": show })}> */}
                    {/* <div onClick={sidebar} className='lg:hidden '><img src={closelineicon} alt='' /></div> */}
                    <div className='border-b border-[#FFFFFF]/[10%] pt-32'></div>
                    <div>
                        {tabs.map((tab, i) => (
                            <a href="#!" onClick={() => navigate(tab.route)}>
                                <div key={i} className='flex items-center gap-[14px] pt-9 pl-9 relative'>
                                    {tab.route === route.pathname &&
                                        <div className='text-white h-9 w-1 bg-[#DD69AA] absolute right-0'></div>
                                    }
                                    <img src={tab.icon} alt="i" />
                                    <div className='text-base leading-7 text-[#DD69AA] font-bold whitespace-nowrap'>{tab.name}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                <div className='bg-[#171717] w-full px-11 '>
                    {children}
                </div>
            </div >
            <ConfirmModal />
        </RouteMiddleware>
    )
}
