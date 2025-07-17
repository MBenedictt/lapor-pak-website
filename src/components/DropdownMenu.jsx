/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DropdownMenu = ({ Headertext, options = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option) => {
        setSelected(option.label); // store selected label
        if (option.onClick) option.onClick(); // still trigger original function
        setIsOpen(false); // close dropdown
    };

    return (
        <div ref={dropdownRef} className="relative" onClick={(e) => e.stopPropagation()}>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="px-5 py-3 bg-gray-100 rounded hover:bg-blue-50 cursor-pointer flex items-center justify-between transition duration-300 border border-gray-200 hover:border-blue-200 w-[300px]"
            >
                <span className="text-gray-600 font-semibold">
                    {selected || Headertext}
                </span>
                {isOpen ? (
                    <ChevronUp className='w-5 h-5 text-gray-400 font-bold' />
                ) : (
                    <ChevronDown className='w-5 h-5 text-gray-400 font-bold' />
                )}
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-full h-[180px] overflow-y-scroll bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="p-2 text-sm text-gray-700">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOptionClick(option);
                                }}
                                className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;