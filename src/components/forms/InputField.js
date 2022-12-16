import React, { useState } from 'react'
import showEye from '../../assets/img/showEye.svg'
import hideEye from '../../assets/img/hideEye.svg'
import { useField } from 'formik';


export const InputField = ({ inputstyle, placeholder, borderstyle, lable, ...props }) => {
    const [showPassword, setShowPassword] = useState(true);
    const [field, meta] = useField(props);

    return (
        <div className='relative'>
            <input
                {...field}
                {...props}
                placeholder={placeholder}
                className={meta.touched && meta.error ? borderstyle : inputstyle}
                autoComplete="off"
                type={
                    props?.type === "password"
                        ? showPassword
                            ? "password"
                            : "text"
                        : props.type
                } />
            {props.type === "password" &&
                <div className='absolute top-4 sm:top-[24px] right-5'

                    onClick={() => setShowPassword(!showPassword)}
                >
                    {(showPassword ? (
                        <img src={showEye} alt="" />
                    ) : (
                        <img src={hideEye} alt="" />
                    ))}
                </div>
            }
            {meta.touched && meta.error && (
                <div className="error ml-5 mt-1">
                    <p className="text-ms text-red-600">{meta.error}</p>
                </div>
            )}
        </div>
    )
}