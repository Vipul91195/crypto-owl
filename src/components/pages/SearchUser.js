import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import TextField from '../forms/TextField';
import { SearchIcon } from '../icons';
import { clearGlobalSearch, searchUser } from '../../Redux/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import AdminHeader from '../layout/AdminHeader';

const SearchUser = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { globalSearch } = useSelector(state => state.commonSlice);
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }
    useEffect(() => {
        !searchTerm && dispatch(clearGlobalSearch());
        searchTerm && searchTerm !== "" && dispatch(searchUser({ search: searchTerm }));
    }, [searchTerm]);

    return (
        <AdminLayout>
            <AdminHeader type="search" title="Search User" showControls={false} />
            <div className='flex flex-col h-[calc(100vh_-_242px)] w-full justify-center items-center' >
                <div className='w-full max-w-[280px] md:max-w-[400px] 2xl:max-w-[660px] relative'>
                    <TextField
                        iconAfter={
                            <SearchIcon className="h-[14px] 2xl:h-[17px] md:block w-[14px] 2xl:w-[17px]" />
                        }
                        type="text"
                        name="searchTerm"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search by Name/Email ID/Member ID"
                        inputstyle="bg-[#101010] focus-visible:outline-none placeholder:text-[#A6A6A6] md:block w-full lg:text-[16px] 2xl:text-5 leading-5 text-[#A6A6A6] rounded-[10px] 2xl:rounded-[15px] py-2 xl:py-3 4xl:text-[20px] 4xl:py-4 px-6"
                    />
                    {globalSearch && 
                        <div className='absolute w-max min-w-full grid gap-1 py-4 rounded-xl max-h-[300px] overflow-y-auto'>
                            {(globalSearch.length > 0) ? globalSearch.map(user => (
                                <p onClick={() => navigate(`/profile/${user?.member_id}`)} className='text-white cursor-pointer px-5 py-3 bg-[#101010] hover:bg-black hover:text-[#DD69AA] lg:text-[16px] 2xl:text-5 leading-5 rounded-xl w-full' >{user?.username}</p>
                                )) :
                                <p className='text-white cursor-pointer px-5 py-3 bg-[#101010] lg:text-[16px] 2xl:text-5 leading-5 rounded-xl w-full' >No User Found</p>
                            }
                        </div>
                    }
                </div>
            </div>
        </AdminLayout>
    )
}
export default SearchUser