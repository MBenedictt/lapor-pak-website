/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { MoreVertical } from 'lucide-react';

const DropdownInfo = ({ options = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
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

    return (
        <div
            ref={dropdownRef}
            className="relative"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="p-1 rounded-full hover:bg-gray-200 cursor-pointer"
            >
                <MoreVertical className='text-gray-400 hover:text-gray-600 w-5 h-5' />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="p-2 text-sm text-gray-700">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (option.onClick) option.onClick();
                                    setIsOpen(false);
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

export default DropdownInfo;