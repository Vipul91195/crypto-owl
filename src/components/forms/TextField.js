import React, { useState } from 'react'
import showEye from '../../assets/img/showEye.svg'
import hideEye from '../../assets/img/hideEye.svg'
import classNames from 'classnames';

const TextField = ({ inputstyle, placeholder, borderstyle, errorRight, iconAfter, iconBefore, lable, ...props }) => {
    const [showPassword, setShowPassword] = useState(true);
    return (
        <div className='relative w-full'>
            {iconBefore ?
                <div className='absolute cursor-pointer top-1/2 h-max -translate-y-1/2 left-5 text-white'>
                    <>{iconBefore} </>
                </div>
                : null}
                <input
                  {...props}
                  placeholder={placeholder}
                  className={classNames({ "pl-[50px]": iconBefore }, inputstyle)}
                  autoComplete="off"
                  type={
                      props?.type === "password"
                          ? showPassword
                              ? "password"
                              : "text"
                          : (props.type || "text")
                  } />
            {props.type === "password" ?
                <div className='absolute top-4 2xl:top-[24px] right-5 cursor-pointer'

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
        </div>
    )
}

export default TextField;