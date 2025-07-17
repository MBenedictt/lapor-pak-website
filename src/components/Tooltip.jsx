/* eslint-disable react/prop-types */
import { useState } from "react";

export const Tooltip = ({ message, children }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative flex flex-col items-center group">
            <span
                className="flex justify-center"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {children}
            </span>
            <div
                className={`absolute whitespace-nowrap bottom-full flex flex-col items-center mb-1 ${!show ? "hidden" : ""
                    }`}
            >
                <span className="relative z-[999] p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 rounded-md">
                    {message}
                </span>
                <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600" />
            </div>
        </div>
    );
};

export default Tooltip;