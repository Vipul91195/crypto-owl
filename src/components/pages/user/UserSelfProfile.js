import React, { useEffect, useState } from "react";
import { UserLayout } from '../../layout/UserLayout'
import { AdminLayout } from "../../layout/AdminLayout";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import avatar from "../../../assets/img/avatar.jpg";
import AdminHeader from "../../layout/AdminHeader";
import {
  getCustomerProfile,
  getTransactionHistory,
} from "../../../Redux/customerSlice";
import { capitalize } from "../../../utils/helper";
import { openModal} from "../../../Redux/commonSlice";
import ReactPaginate from "react-paginate";
import { Arrow } from "../../icons";
import CustomButton from "../../forms/CustomButton";
import { getUserProfile } from "../../../Redux/userSlice";



const UserSelfProfile = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    customerDetails,
  } = useSelector((state) => ({
    isLoading: state.userSlice.isLoading,
    customerDetails: state.userSlice.userData,
  }));
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState("details");
  
  const userDetails = (e) => {
    setShowDetails(e.target.id);
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <UserLayout>
      <AdminHeader className="" type="user-self-profile" title="User Profile" />
      <div className="pb-10">
        <div className="md:pt-[18px] 2xl:pt-[30px] rounded-b-[20px] overflow-hidden relative">
          <div className="absolute pt-4 pl-4 md:pt-6 2xl:pt-14 xl:pl-[42px] ">
            <div className="relative w-screen h-screen max-w-[84.72px] md:max-w-[86px] max-h-[98.39px] lg:max-w-[125px] xl:max-w-[140px] lg:max-h-[140px] xl:max-h-[170px] 2xl:max-w-[217px] 2xl:max-h-[252px]">
              <img
                className="h-full w-full"
                src={customerDetails?.profile?.profile_picture ? process.env.REACT_APP_PUBLIC_MEDIA_URL+customerDetails?.profile?.profile_picture : avatar}
                alt="businessIcon"
              />
            </div>
          </div>
          <div className=" bg-[#040404] pl-[126px] lg:pl-[180px] xl:pl-[220px] 2xl:pl-[328px] pr-[24.42px] rounded-t-[20px] pt-[23px] 2xl:pt-[61px]">
            <p className="text-2xl leading-[24px] tracking-tight text-white md:text-lg lg:text-4xl lg:leading-10 2xl:text-[64px] 2xl:leading-[64px] 2xl:font-bold lg:text-pink-light 2xl:mb-2">
              {customerDetails?.profile?.name}
            </p>
            <div className="flex flex-row justify-between">
              <p className="text-xs leading-5 lg:text-2xl 2xl:text-[31.5066px] tracking-tight 2xl:leading-[54px] font-normal text-[#DD69AA]">
                General Manager
              </p>
            </div>
          </div>
          <div className="flex pl-[126px] lg:pl-[180px] xl:pl-[220px] 2xl:pl-[328px] md:pr-[20px] xl:pr-[44px] pt-[10px] pb-5 2xl:pb-[39px] bg-[#101010] ">
            <div className="gap-2 xl:gap-0 flex flex-col 2xl:gap-[10px] justify-between grow ">
              <div className="flex gap-2">
                <p className="text-sm leading-[14px] font-normal lg:text-[18px] lg:leading-7 lg:font-bold 2xl:text-[21px] 2xl:leading-9  tracking-tight text-[#CDBEBE]">
                  Email:
                </p>
                <p className="text-sm leading-[14px] font-normal lg:text-[18px] lg:leading-7 2xl:text-[21px] 2xl:leading-9 lg:font-bold  tracking-tight text-[#DD69AA]">
                  {customerDetails?.profile?.email}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-sm leading-[14px] font-normal lg:text-[18px] lg:leading-7 lg:font-bold 2xl:text-[21px] 2xl:leading-9  tracking-tight text-[#CDBEBE]">
                  Phone:
                </p>
                <p className="text-sm leading-[14px] font-normal lg:text-[18px] lg:leading-7 lg:font-bold tracking-tight 2xl:text-[21px] 2xl:leading-9 text-[#DD69AA]">
                  {customerDetails?.profile?.phone}
                </p>
              </div>
              <div className="hidden xl:flex gap-2 ">
                <p className="text-[21.1953px] lg:text-[18px] leading-9 lg:leading-7 2xl:text-[21px] 2xl:leading-9  font-bold tracking-tight text-[#CDBEBE]">
                  Address:
                </p>
                <p className="text-[21.1953px] lg:text-[18px] leading-9 lg:leading-7 2xl:text-[21px] 2xl:leading-9  font-bold tracking-tight text-[#DD69AA]">
                  {customerDetails?.profile?.address}
                </p>
              </div>
            </div>
            <div className="flex md:gap-1 lg:gap-3 2xl:gap-[27px]">
              {/* <div className="hidden md:flex md:flex-col md:justify-end">
                <CustomButton
                  onClick={() => dispatch(openModal({ type: "confirm" }))}
                  buttonStyle="w-screen md:max-w-[60px] lg:max-w-[110px] xl:max-w-[130px] 2xl:max-w-[150px] 4xl:max-w-[200px] md:text-[8px] leading-[15px] lg:text-[10px] xl:py-[5px] 2xl:py-[5px] 4xl:py-[7px] lg:text-sm lg:leading-6 2xl:text-[20px] 2xl:leading-8 4xl:text-[24px] 4xl:leading-9 tracking-tight font-medium border border-[#DD69AA] 
                                    text-[#DD69AA] whitespace-nowrap  2xl:border-[2px] rounded-lg md:rounded-[5px]"
                >
                  Remove
                </CustomButton>
              </div>
              <div className="hidden md:flex md:flex-col md:justify-end">
                <CustomButton
                  onClick={() => dispatch(openModal({ type: "award" }))}
                  buttonStyle="w-screen md:max-w-[70px] lg:max-w-[110px] xl:max-w-[130px] 2xl:max-w-[150px] 4xl:max-w-[200px] md:text-[8px] leading-[15px] lg:text-[10px] xl:py-[5px]  2xl:py-[5px]  4xl:py-[7px] lg:text-sm lg:leading-6  2xl:text-[20px] 2xl:leading-8 4xl:text-[24px] 4xl:leading-9 tracking-tight font-medium border border-[#DD69AA] 
                                    text-[#DD69AA] whitespace-nowrap  2xl:border-[2px] rounded-lg md:rounded-[5px]"
                >
                  Award Point
                </CustomButton>
              </div>
              <div className="hidden md:flex md:flex-col md:justify-end">
                <CustomButton
                  onClick={() => dispatch(openModal({ type: "message" }))}
                  buttonStyle="w-screen md:max-w-[70px] lg:max-w-[110px] xl:max-w-[130px] 2xl:max-w-[150px] 4xl:max-w-[200px] md:text-[8px] leading-[15px] lg:text-[10px] xl:py-[5px]   2xl:py-[5px]  4xl:py-[7px] lg:text-sm lg:leading-6  2xl:text-[20px] 2xl:leading-8 4xl:text-[24px] 4xl:leading-9 tracking-tight font-medium border border-[#DD69AA] 
                                    text-[#DD69AA] whitespace-nowrap 2xl:border-[2px] rounded-lg md:rounded-[5px]"
                >
                  Send Message
                </CustomButton>
              </div> */}
            <div className="hidden md:flex md:flex-col md:justify-end">
                <CustomButton
                    onClick={() => dispatch(openModal({ type: "edit-profile" }))}
                    buttonStyle={classNames("hidden cursor-pointer md:block lg:leading-[16px] 2xl:leading-6 4xl:w-screen w-full 4xl:max-w-[200px] px-3 2xl:px-6 4xl:px-0 py-[6px] lg:py-2 xl:py-3 lg:text-sm h-max 4xl:h-[51px] text-[12px] 2xl:text-sm font-medium rounded-[12px] 2xl:rounded-2xl text-white bg-[#DD69AA] whitespace-nowrap")}
                >Edit Profile
                </CustomButton>   
            </div> 
            </div>
          </div>
        </div>
        <div className="hidden xl:flex items-end gap-2 mt-[22px]">
          <p className="text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]">
            Details
          </p>
          <div className="h-[2.7px] bg-[#DD69AA] w-full"></div>
        </div>
        <div className="rounded-[10px] overflow-hidden mt-3">
          <div className="xl:hidden  flex items-center bg-[#040404]  justify-around">
            <p
              onClick={userDetails}
              id="details"
              className={classNames(
                "flex-1 text-center text-base leading-9 font-medium tracking-tight text-[#DD69AA] md:text-xl md:leading-10 cursor-pointer",
              )}
            >
              Details
            </p>
          </div>
        <div className="px-[14px] xl:px-0 bg-[#101010] xl:bg-[#171717] xl:grid xl:grid-cols-[1fr,1fr,1fr] xl:gap-[30px] 2xl:gap-[68px]">
            <div className="flex pt-[20px] md:pt-[25px] items-center justify-between grow">
            <div className="flex flex-col gap-4 md:gap-7 text-xs leading-[13px] md:text-xl 2xl:leading-[21px] font-normal tracking-tight text-[#979998]">
                <p>Member ID</p>
                <p>Issue Date</p>
            </div>
            <div className="flex flex-col gap-[7px] md:gap-[10px] text-xs leading-[23px] md:md:text-xl md:leading-9 font-medium tracking-tight text-white text-right">
                <p>{customerDetails?.profile?.member_id}</p>
                <p>{customerDetails?.profile?.issue_date}</p>
            </div>
            </div>
            <div className="flex pt-[16.41px] md:pt-[25px] items-center justify-between grow">
            <div className="flex flex-col gap-4 md:gap-7 text-xs leading-[13px] md:text-xl 2xl:leading-[21px] font-normal tracking-tight text-[#979998]">
                <p>Is Business owner</p>
                <p>Is Customer</p>
            </div>
            <div className="flex flex-col gap-[7px] md:gap-[10px] text-xs leading-[23px] md:md:text-xl md:leading-9 font-medium tracking-tight text-white text-right">
                <p>
                {customerDetails?.profile?.is_business_owner.length > 0
                    ? `Yes (${customerDetails?.profile?.is_business_owner
                        .map((business) => capitalize(business))
                        .join(",")})`
                    : `No`}
                </p>
                <p>
                {customerDetails?.profile?.is_customer.length > 0
                    ? `Yes (${customerDetails?.profile?.is_customer
                        .map((business) => capitalize(business))
                        .join(",")})`
                    : `No`}
                </p>
            </div>
            </div>
            <div className="flex pt-[16.41px] md:pt-[25px] items-center justify-between grow">
            <div className="flex flex-col gap-4 md:gap-7 text-xs leading-[13px] md:text-xl 2xl:leading-[21px] font-normal tracking-tight text-[#979998]">
                <p>Current Status</p>
                <p>Redemption Platform</p>
            </div>
            <div className="flex flex-col gap-[7px] md:gap-[10px] text-xs leading-[23px] md:md:text-xl md:leading-9 font-medium tracking-tight text-white text-right">
                <p>{capitalize(customerDetails?.profile?.current_status)}</p>
                <p className="text-[#DD69AA]">
                {customerDetails?.profile?.redemption_platform}
                </p>
            </div>
            </div>
            <div className="md:hidden bg-[] flex md:pt-[25px] items-center justify-between grow">
            <div className="flex flex-col gap-4 md:gap-7 text-xs leading-[13px] md:text-xl 2xl:leading-[21px] font-normal tracking-tight text-[#979998]">
                <p>Address</p>
            </div>
            <div className="flex flex-col gap-[7px] pb-[9px] md:gap-[10px] text-xs leading-[23px] md:md:text-xl md:leading-9 font-medium tracking-tight text-white text-right">
                <p className="text-[#CDBEBE] w-[138px]">
                {customerDetails?.profile?.address}
                </p>
            </div>
            </div>
        </div>
        </div>
        <div className="rounded-[10px] overflow-hidden mt-3">
          <div className="xl:hidden  flex items-center bg-[#040404]  justify-around">
            <p
              onClick={userDetails}
              id="points"
              className={classNames(
                "text-base flex-1 text-center leading-9 font-medium tracking-tight text-[#DD69AA] md:text-xl md:leading-10 cursor-pointer",
              )}
            >
              Points
            </p>
          </div>
            <div className="block px-[14px] bg-[#101010] xl:hidden gap-[68px] pt-3 2xl:mt-[41px]">
              <div className="w-full">
                <div className="flex items-end gap-2 w-full">
                  <p className="text-[15px] leading-[13px] font-medium md:text-[22px] 2xl:text-2xl 2xl:leading-[21px] 2xl:font-bold tracking-tight text-[#DD69AA]">
                    Awarded
                  </p>
                  <div className="h-[0.37px] md:h-[2.7px] bg-[#DD69AA] w-full"></div>
                </div>
                <div className="flex pt-3 md:pt-[21px] items-center justify-between grow">
                  <div className="flex flex-col gap-[11.36px] md:gap-7 text-xs leading-[13px] md:text-xl md:leading-[21px] font-normal tracking-tight text-[#979998]">
                    <p>Business Points</p>
                    <p>Personal Points</p>
                  </div>
                  <div className="flex flex-col gap-[2px] md:gap-[10px] text-xs leading-[23px] md:text-xl md:leading-9 font-medium tracking-tight text-white text-right">
                    <p>
                      {customerDetails?.awarded_points?.business_point || 0}
                    </p>
                    <p>
                      {customerDetails?.awarded_points?.personal_point || 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-end gap-2  w-full pt-3">
                  <p className="text-[15px] leading-[13px] font-medium md:text-[22px]  2xl:text-2xl 2xl:leading-[21px] 2xl:font-bold tracking-tight text-[#DD69AA]">
                    Redeemed
                  </p>
                  <div className="h-[0.37px] md:h-[2.7px] bg-[#DD69AA] w-full"></div>
                </div>
                <div className="flex pt-2 md:pt-[21px] items-center justify-between grow">
                  <div className="flex flex-col gap-[11.36px] md:gap-7 text-xs leading-[13px] md:text-xl md:leading-[21px] font-normal tracking-tight text-[#979998]">
                    <p>Business Points</p>
                    <p>Personal Points</p>
                  </div>
                  <div className="flex flex-col gap-[2px] md:gap-[10px] text-xs leading-[23px] md:text-xl md:leading-9 font-medium tracking-tight text-white text-right">
                    <p>
                      {customerDetails?.redeemed_points?.business_point || 0}
                    </p>
                    <p>
                      {customerDetails?.redeemed_points?.personal_point || 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-2  w-full pt-3">
                <p className="text-[15px] leading-[13px] font-medium md:text-[22px]  2xl:text-2xl 2xl:leading-[21px] 2xl:font-bold tracking-tight text-[#DD69AA]">
                  Available
                </p>
                <div className="h-[0.37px] md:h-[2.7px] bg-[#DD69AA] w-full"></div>
              </div>
              <div className="flex pt-2 md:pt-[21px] items-center justify-between grow">
                <div className="flex flex-col gap-[11.36px] md:gap-7 text-xs leading-[13px] md:text-xl md:leading-[21px] font-normal tracking-tight text-[#979998]">
                  <p>Business Points</p>
                  <p>Personal Points</p>
                </div>
                <div className="flex flex-col gap-[2px] md:gap-[10px] text-xs leading-[23px] md:text-xl md:leading-9 font-medium tracking-tight text-white text-right pb-[14.73px]">
                  <p>
                    {customerDetails?.avaliable_balance?.business_point || 0}
                  </p>
                  <p>
                    {customerDetails?.avaliable_balance?.personal_point || 0}
                  </p>
                </div>
              </div>
            </div>
        </div>
        <div className="hidden xl:flex md:gap-[68px] xl:gap-[30px] md:mt-[41px]">
          <div className="w-full">
            <div className="flex items-end gap-2 w-full">
              <p className="text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]">
                Awarded
              </p>
              <div className="h-[2.7px] bg-[#DD69AA] w-full"></div>
            </div>
            <div className="flex pt-[21px] items-center justify-between grow">
              <div className="flex flex-col gap-7 text-xl leading-[21px] font-normal tracking-tight text-[#979998]">
                <p>Business Points</p>
                <p>Personal Points</p>
              </div>
              <div className="flex flex-col gap-[10px] text-xl leading-9 font-medium tracking-tight text-white text-right">
                <p>{customerDetails?.awarded_points?.business_point || 0}</p>
                <p>{customerDetails?.awarded_points?.personal_point || 0}</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-end gap-2  w-full">
              <p className="text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]">
                Redeemed
              </p>
              <div className="h-[2.7px] bg-[#DD69AA] w-full"></div>
            </div>
            <div className="flex pt-[25px] items-center justify-between grow">
              <div className="flex flex-col gap-7 text-xl leading-[21px] font-normal tracking-tight text-[#979998]">
                <p>Business Points</p>
                <p>Personal Points</p>
              </div>
              <div className="flex flex-col gap-[10px] text-xl leading-9 font-medium tracking-tight text-white text-right">
                <p>{customerDetails?.redeemed_points?.business_point || 0}</p>
                <p>{customerDetails?.redeemed_points?.personal_point || 0}</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-end gap-2  w-full">
              <p className="text-2xl leading-[21px] font-bold tracking-tight text-[#DD69AA]">
                Available
              </p>
              <div className="h-[2.7px] bg-[#DD69AA] w-full"></div>
            </div>
            <div className="flex pt-[25px] items-center justify-between grow">
              <div className="flex flex-col gap-7 text-xl leading-[21px] font-normal tracking-tight text-[#979998]">
                <p>Business Points</p>
                <p>Personal Points</p>
              </div>
              <div className="flex flex-col gap-[10px] text-xl leading-9 font-medium tracking-tight text-white text-right">
                <p>{customerDetails?.avaliable_balance?.business_point || 0}</p>
                <p>{customerDetails?.avaliable_balance?.personal_point || 0}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex py-3 items-end md:gap-2 md:my-4 2xl:mt-[44px] 2xl:mb-6">
          <p className="text-[18px] leading-[20px] md:text-2xl md:leading-[21px] font-medium md:font-bold tracking-tight text-[#DD69AA] whitespace-nowrap">
            Transaction History
          </p>
          <div className="h-[1.5px] md:h-[2.7px] bg-[#DD69AA] w-full"></div>
        </div> */}
      </div>
    </UserLayout>
  );
};

export default UserSelfProfile;
