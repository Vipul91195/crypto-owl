import classNames from 'classnames';
import React from 'react'
import { Oval } from "react-loader-spinner";


const CustomButton = ({ buttonStyle, children, loaderSize, showLoader, disabled, ...props }) => {
    return (
        <button
            {...props}
            disabled={disabled || false}
            className={classNames("flex justify-center items-center gap-2", { "bg-gray-500": disabled }, buttonStyle)}>
            {showLoader && disabled &&
                <Oval
                    color="#FFFFFF"
                    height={loaderSize}
                    width={loaderSize}
                    secondaryColor="#FAFAFA"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />}
            {children}
        </button>
    )
}
export default CustomButton