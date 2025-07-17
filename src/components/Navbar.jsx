/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // scrolling down
                setShowNavbar(false);
            } else {
                // scrolling up
                setShowNavbar(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`fixed top-0 left-0 w-full bg-white z-50 shadow-md transition-all duration-300 ease-in-out overflow-hidden ${showNavbar ? 'h-[70px]' : 'h-0'}`}>
            <div className={`flex justify-between items-center px-20 max-lg:px-10 max-md:px-5 transition-all duration-300 ease-in-out ${showNavbar ? 'opacity-100' : 'opacity-0'} h-full`}>
                <div className='flex items-center'>
                    <Link to="/" className="flex items-center">
                        <img src="/logo.png" alt="logo" className="w-8 h-8 max-md:ml-3" />
                        <h1 className="font-semibold text-2xl text-black ml-3 pb-1">lapor<span className="text-red-600 font-bold">PAK</span></h1>
                    </Link>
                </div>
                <ul className="flex items-center gap-10">
                    <li className="font-semibold max-md:hidden">
                        <Link to="/" className="relative group flex">
                            <span className="group-hover:after:w-full after:w-0 after:h-0.5 after:bg-black after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300">
                                Home
                            </span>
                        </Link>
                    </li>
                    <li className="font-semibold max-md:hidden">
                        <Link to="/report" className="relative group flex">
                            <span className="group-hover:after:w-full after:w-0 after:h-0.5 after:bg-black after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300">
                                Laporan
                            </span>
                        </Link>
                    </li>
                    <li className="font-semibold max-md:hidden">
                        <Link to="/">
                            <button className="cursor-pointer px-6 pt-1 py-2 border-2 border-red-600 text-red-600 font-semibold hover:bg-red-600 hover:text-white transition">
                                Login
                            </button>
                        </Link>
                    </li>
                </ul>
                <i onClick={toggleDrawer} className='text-2xl md:hidden hover:bg-neutral-100 py-1 px-2 rounded-xl cursor-pointer'>
                    <Menu />
                </i>
            </div>

            {/* Drawer remains unchanged */}
            <div
                className={`fixed top-0 left-0 z-40 h-screen shadow-xl p-4 bg-white w-80 transition-transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <button
                    type="button"
                    onClick={toggleDrawer}
                    className="cursor-pointer text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl w-8 h-8 absolute top-2.5 right-2.5 flex items-center justify-center"
                >
                    <X />
                </button>
                <div className='flex flex-col justify-evenly h-[90%]'>
                    <ul className='flex flex-col items-center'>
                        <li className="font-medium text-2xl py-4">
                            <Link to="/" className="relative group flex w-fit">
                                <span className="group-hover:after:w-full after:w-0 after:h-0.5 after:bg-black after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300">
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li className="font-medium text-2xl py-4">
                            <Link to="/report" className="relative group flex w-fit">
                                <span className="group-hover:after:w-full after:w-0 after:h-0.5 after:bg-black after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300">
                                    Reports
                                </span>
                            </Link>
                        </li>
                        <li className="font-medium text-2xl py-4">
                            <Link to="/" className="relative group flex w-fit">
                                <span className="group-hover:after:w-full after:w-0 after:h-0.5 after:bg-black after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300">
                                    Login
                                </span>
                            </Link>
                        </li>
                        <li className="font-medium text-2xl py-4 border-t-2"></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
