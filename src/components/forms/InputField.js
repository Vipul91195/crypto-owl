import React, { useState } from 'react'
import showEye from '../../assets/img/showEye.svg'
import hideEye from '../../assets/img/hideEye.svg'
import { useField } from 'formik';
import classNames from 'classnames';

export const InputField = ({ inputstyle, placeholder, borderstyle, errorRight, iconAfter, iconBefore, lable, ...props }) => {
    const [showPassword, setShowPassword] = useState(true);
    const [field, meta] = useField(props);

    return (
        <div className='relative w-full'>
            {iconBefore ?
                <div className='absolute cursor-pointer top-1/2 h-max -translate-y-1/2 left-5 text-white'>
                    <>{iconBefore} </>
                </div>
                : null}
            <input
                {...field}
                {...props}
                placeholder={placeholder}
                // className={meta.touched && meta.error ? borderstyle : inputstyle}
                className={classNames({ "pl-[50px]": iconBefore }, inputstyle, { [borderstyle]: meta.touched && meta.error })}
                autoComplete="off"
                type={
                    props?.type === "password"
                        ? showPassword
                            ? "password"
                            : "text"
                        : (props.type || "text")
                } />
            {props.type === "password" ?
                <div className='absolute top-4 sm:top-[24px] right-5 cursor-pointer'

                    onClick={() => setShowPassword(!showPassword)}
                >
                    {(showPassword ? (
                        <img src={showEye} alt="" />
                    ) : (
                        <img src={hideEye} alt="" />
                    ))}
                </div>
                :
                iconAfter ?
                    <div className='absolute cursor-pointer top-1/2 h-max -translate-y-1/2 right-5 text-white'>
                        <>{iconAfter} </>
                    </div>
                    : null
            }
            {meta.touched && meta.error && (
                <div className={classNames("absolute error ml-5 mt-1", { "right-0": errorRight })}>
                    <p className="text-ms text-red-500">{meta.error}</p>
                </div>
            )}
        </div>
    )
}