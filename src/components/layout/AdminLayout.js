import React, { Children, useState } from 'react'
import home from '../../assets/img/home.svg'
import user from '../../assets/img/user.svg'
import report from '../../assets/img/report.svg'
import searchUser from '../../assets/img/searchUser.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import RouteMiddleware from '../RouteMiddleware'
import { Form, Formik } from 'formik'
import { InputField } from '../forms/InputField'
import { CloseFilled, MobMenu, SearchIcon } from '../icons'
import classNames from 'classnames'
import { Link } from "react-router-dom";
import NotifyModal from '../modal/NotifyModal'
import ConfirmationModal from '../modal/ConfirmationModal'
import Loader from '../loader/Loader'

const tabs = [
    // { name: 'Admin Info', icon: home, route: "/admin-info" },
    { name: 'User Management', icon: user, route: "/businesses" },
    { name: 'Reports', icon: report, route: "/reports" },
    { name: 'Search User', icon: searchUser, route: "/search-user" }
];

export const AdminLayout = ({ children, isLoading }) => {
    const route = useLocation();
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const handleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    }
    if (isLoading) return <Loader />
    return (
        <RouteMiddleware>
            <div className='md:grid md:grid-cols-[200px,auto] 2xl:grid-cols-[290px,auto] font-Sans overflow-hidden relative'>
                <div className={classNames('max-w-[290px] bg-[#040404] min-h-screen pb-14 lg:pb-0 absolute md:relative md:translate-x-0 z-50 md:z-0 right-0 translate-x-full transition-all duration-200', { 'translate-x-0': showMobileMenu })} >
                    <div className='absolute top-7 md:hidden right-7 cursor-pointer' onClick={handleMobileMenu}>
                        <CloseFilled className="text-[#DD69AA] h-7 w-7" />
                    </div>
                    <div className='border-b border-[#FFFFFF]/[10%] pt-32'></div>
                    <div className='pt-7'>
                        {tabs.map((tab, i) => (
                            <Link key={i} to={tab.route}>
                                <div className='flex items-center gap-[14px] py-3 px-9 md:pr-0 sm:pl-5 2xl:pl-9 relative'>
                                    {tab.route === route.pathname &&
                                        <div className='text-white h-9 w-1 bg-[#DD69AA] absolute right-0'></div>
                                    }
                                    <img src={tab.icon} alt="i" />
                                    <div className='text-base leading-7 text-[#DD69AA] font-bold whitespace-nowrap'>{tab.name}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='bg-[#171717] min-h-screen px-5 box-border md:max-w-[calc(100vw_-_200px)] 2xl:max-w-[calc(100vw_-_290px)] w-full 2xl:px-11 '>
                    <div className='flex w-full justify-end items-center pt-[30px] pb-[25px] gap-x-5 md:hidden'>
                        <Formik initialValues={{ searchTerm: "" }} onSubmit={() => console.log(" search term submitted. ")}>
                            <Form>
                                <div className='max-w-[180px]'>
                                    <InputField
                                        iconAfter={<SearchIcon className="h-[14px] 2xl:h-[17px] block md:hidden w-[14px] 2xl:w-[17px]" />}
                                        type="text"
                                        name="searchTerm"
                                        placeholder="Search"
                                        inputstyle="bg-[#101010] focus-visible:outline-none placeholder:text-[#A6A6A6] md:hidden block max-w-[180px] w-screen text-[12px]  text-[#A6A6A6] rounded-[4px] py-2 px-[10px]"
                                    />
                                </div>
                            </Form>
                        </Formik>
                        <div className='cursor-pointer' onClick={handleMobileMenu}>
                            <MobMenu className="text-[#DD69AA]" />
                        </div>
                    </div>
                    {/* {isLoading ? <Loader /> : children} */}
                    {children}
                </div>
            </div >
            <NotifyModal />
        </RouteMiddleware>
    )
}
