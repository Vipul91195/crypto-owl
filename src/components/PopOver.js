import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ArrowDown } from './icons/ArrowDown'
import classNames from 'classnames'


export default function PopOver({label, showLabelIcon = true, LabelIcon, LabelIconClassName, children, LabelClassName, ContainerClassName, PanelClassName}) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              LabelClassName || "text-base font-medium text-white",
              { "text-opacity-90": open },
              "group inline-flex items-center hover:text-opacity-100 focus:outline-none"
            )}
          >
            <span>{label}</span>
            {(showLabelIcon) &&
              <>
              {LabelIcon || <ArrowDown className={classNames(LabelIconClassName || "text-white")} />}
              </>
            }            
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 mt-3 w-max max-w-sm px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                {children}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

