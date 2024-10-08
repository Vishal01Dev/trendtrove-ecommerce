import { Dialog, Transition } from '@headlessui/react'
import React, { FC, Fragment } from 'react'
import { MdClose } from "react-icons/md";
import { navigationRoutes } from '../../utils/navigationRoutes';
import clsx from 'clsx';
import { Link, Location } from 'react-router-dom';

interface MobileNavbarProps {
    isOpen: boolean;
    onClose: () => void;
    location: Location
}

const MobileNavbar: FC<MobileNavbarProps> = ({ isOpen, onClose, location }) => {
    return (

        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 md:hidden" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10  overflow-y-auto">
                    <div className="h-[100vh]">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-x-100 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-100 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden w-[85%] sm:w-2/4  ml-auto min-h-full bg-white text-left shadow-xl transition-all">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className='fixed top-5 right-5 bg-gray-100 p-1 rounded-md' title='close' onClick={onClose}>
                                        <MdClose size={18} />
                                    </div>
                                    <div className='h-[100vh] w-full'>
                                        <ul className='flex h-[100vh] flex-col justify-center items-center gap-y-8 font-medium text-sm tracking-widest uppercase text-secondary'>
                                            {
                                                navigationRoutes.map((route) => (
                                                    <li onClick={onClose} key={route.path} className={clsx("hover:text-primary hover:scale-105", location.pathname === route.path && 'text-primary font-black scale-105 ')} >
                                                        <Link to={route.path}>{route.title}</Link>
                                                    </li>
                                                ))
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>

    )
}

export default MobileNavbar