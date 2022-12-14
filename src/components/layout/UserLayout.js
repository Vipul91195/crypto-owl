import React, { Children, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik'
import { InputField } from '../forms/InputField'
import { Home, Blocks, Profile, Logout, CloseFilled, MobMenu, SearchIcon } from '../icons'
import classNames from 'classnames'
import { Link } from "react-router-dom";
import NotifyModal from '../modal/NotifyModal'
import ConfirmationModal from '../modal/ConfirmationModal'
import UserRouteMiddleware from '../UserRouteMiddleware';
import RouteMiddleware from '../RouteMiddleware';
import { logout } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTransactions } from '../../Redux/userSlice';
import { setCurrentPage } from '../../Redux/commonSlice';

const tabs = [
    { name: 'Transaction', icon: Home, route: "/user/transaction" },
    { name: 'Profile', icon: Profile, route: "/user/profile" },
    { name: 'Support', icon: Blocks, route: "/user/support" },
];

export const UserLayout = ({ children }) => {
    const route = useLocation();
    const { pageSize } = useSelector(state => ({
        pageSize: state.commonSlice.tableData.pageSize,
    }));
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const handleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    }
    const [searchTerm, setSearchTerm] = useState(null);
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    useEffect(() => {
        if (searchTerm !== null) {
            dispatch(getUserTransactions({ page: 1, search: searchTerm, page_size: pageSize }));
            searchTerm === "" && setSearchTerm(null);
        }
        dispatch(setCurrentPage(1));
    }, [searchTerm]);
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
                                    <tab.icon />
                                    <div className='text-base leading-7 text-[#DD69AA] font-bold whitespace-nowrap'>{tab.name}</div>
                                </div>
                            </Link>
                        ))}
                        <Link to="/login" onClick={() => logout()}>
                            <div className='flex items-center gap-[14px] py-3 px-9 md:pr-0 sm:pl-5 2xl:pl-9 relative'>
                                <Logout className="text-[#DD69AA] h-[18px] w-[18px]" />
                                <p className='text-base leading-7 text-[#DD69AA] font-bold whitespace-nowrap'>Log out</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='bg-[#171717] min-h-screen px-5 box-border md:max-w-[calc(100vw_-_200px)] 2xl:max-w-[calc(100vw_-_290px)] w-full 2xl:px-11 '>
                    <div className='flex w-full justify-end items-center pt-[30px] pb-[25px] gap-x-5 md:hidden'>
                        {/* <Formik initialValues={{ searchTerm: "" }} onSubmit={() => {}}>
                            <Form>
                                <div className='max-w-[180px]'>
                                    <InputField
                                        iconAfter={<SearchIcon className="h-[14px] 2xl:h-[17px] block md:hidden w-[14px] 2xl:w-[17px]" />}
                                        type="text"
                                        value={searchTerm || ""}
                                        onChange={handleSearch}
                                        name="searchTerm"
                                        placeholder="Search"
                                        inputstyle="bg-[#101010] focus-visible:outline-none placeholder:text-[#A6A6A6] md:hidden block max-w-[180px] w-screen text-[12px]  text-[#A6A6A6] rounded-[4px] py-2 px-[10px]"
                                    />
                                </div>
                            </Form>
                        </Formik> */}
                        <div className='cursor-pointer' onClick={handleMobileMenu}>
                            <MobMenu className="text-[#DD69AA]" />
                        </div>
                    </div>
                    {children}
                </div>
            </div >
            <NotifyModal />
        </RouteMiddleware>
    )
}
