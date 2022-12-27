import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import vector from '../../assets/img/Vector.svg'
import { useField } from 'formik'
import classNames from 'classnames'

const Dropdown = ({ setValues, cursorNotAllowed, ...props }) => {
    const [selected, setSelected] = useState(props.selected || null)
    const [field, meta] = useField(props.name);

    useEffect(() => {
        console.log(selected);
        setValues(props.name, selected?.value || null);
    }, [selected])

    return (

        <div className="" onClick={(e) => e.stopPropagation()}>
            <Listbox value={selected} onChange={setSelected} disabled={props?.disabled || false}>
                <div className="relative mt-1">
                    <Listbox.Button className={classNames("relative shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm ",
                        props?.disabled && "cursor-not-allowed",
                        props.inputstyle,
                        meta.touched && meta.error && " border border-red-800",
                        meta.touched && meta.error && " text-red-500 "
                    )}>
                        <span className={classNames("block truncate text-left text-base xl:text-2xl", { 'text-gray-500': props?.disabled || false })}>{selected?.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 xl:pr-4 ">
                            <img className='w-[9.5px] xl:w-[27px]' src={vector} alt="v" />
                        </span>
                    </Listbox.Button>
                    {meta.touched && meta.error && (
                        <div className="absolute error xl:ml-5 xl:mt-1">
                            <p className="text-[11px] xl:text-ms text-red-500">{meta.error}</p>
                        </div>
                    )}
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-[10px] xl:py-3 text-sm leading-5 font-normal xl:text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-[#303030] xl:bg-[#101010]">
                            {props.options.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default group select-none pl-5 pr-4 ${active ? 'bg-[#DD69AA] text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block group-last:border-none py-1 xl:py-3 border-[#545557] border-b border-solid truncate text-left  text-white text-sm xl:text-[20px] leading-[24px] ${selected ? 'font-medium' : 'font-normal'}`}
                                            >
                                                {person.name}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox >
        </div >
    )
}

export default Dropdown