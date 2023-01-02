import classNames from 'classnames';
import React from 'react'
import { Oval } from "react-loader-spinner";

const CustomButton = ({ buttonStyle, children, loaderSize, showLoader, disabled, ...props }) => {
    return (
        <button
            {...props}
            disabled={disabled || false}
            className={classNames("flex justify-center items-center gap-2", { "bg-gray-500 !text-white !border-none": disabled }, buttonStyle)}>
            {showLoader && disabled ?
                <div className='flex justify-center items-center h-[24px] w-[24px] sm:h-[18px] sm:w-[24px] md:h-[22px] md:w-[22px] lg:h-[20px] lg:w-[26px]'> <Oval
                        color="#FFFFFF"
                        secondaryColor="#FAFAFA"
                        strokeWidth={2}
                        height="100%"
                        width="100%"
                        strokeWidthSecondary={2}
                    />
                    </div> 
                :
                children
            }
        </button>
    )
}
export default CustomButton