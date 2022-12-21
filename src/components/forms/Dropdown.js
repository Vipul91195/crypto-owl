import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import vector from '../../assets/img/Vector.svg'
import { useField } from 'formik'
import classNames from 'classnames'

const people = [
    { name: 'Business Points' },
    { name: 'Personal Points' },
]

const Dropdown = ({ setValues, ...props }) => {
    const [selected, setSelected] = useState(null)
    const [field, meta] = useField(props.name);
    useEffect(() => {
        console.log(selected);
        setValues(props.name, selected?.name || null);
    }, [selected])

    return (

        <div className="" onClick={(e) => e.stopPropagation()}>
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className={classNames("relative shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm",
                        props.inputstyle,
                        meta.touched && meta.error && " border border-red-800",
                        meta.touched && meta.error && " text-red-500 "
                    )}>
                        <span className="block truncate text-2xl">{selected?.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                            <img src={vector} alt="v" />
                        </span>
                    </Listbox.Button>
                    {meta.touched && meta.error && (
                        <div className="absolute error ml-5 mt-1">
                            <p className="text-ms text-red-400">{meta.error}</p>
                        </div>
                    )}
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-[10px] py-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-[#303030]">
                            {people.map((person, personIdx) => (
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
                                                className={`block group-last:border-none py-3 border-[#545557] border-b border-solid truncate text-left  text-white text-[20px] leading-[24px] ${selected ? 'font-medium ' : 'font-normal'}`}
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