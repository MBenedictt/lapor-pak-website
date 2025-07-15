// import React from 'react';

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomePage = () => {
    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <div className="w-full flex items-center justify-center bg-white px-20 py-30 max-md:px-10 max-md:py-10 mt-[70px]">
                <div className="flex max-[991px]:flex-col-reverse justify-between items-center w-full gap-10">
                    <div className="w-7/12 max-[991px]:w-full mb-10 md:mb-0">
                        <h1 className="text-4xl font-bold text-black mb-6 max-sm:text-center">
                            lapor<span className="text-red-600">PAK</span> by <span className="text-red-600">Dinas Perhubungan®</span>
                        </h1>
                        <p className="text-gray-700 mb-8 leading-relaxed max-sm:text-center">
                            Punya keluhan atau masukan? Sampaikan langsung di LaporPAK! Kami adalah platform pengaduan terpadu yang siap menjembatani suara Anda dengan pihak berwenang. Bersama, kita wujudkan perubahan.
                        </p>

                        <hr className="mb-8 border-gray-300" />

                        <h2 className="text-2xl font-semibold mb-5 max-sm:text-center">Punya Keluhan atau Masukan?</h2>

                        <div className="flex max-md:flex-col gap-4 max-sm:justify-center w-full">
                            <Link to="/">
                                <button className="cursor-pointer px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-md hover:bg-red-600 hover:text-white transition max-md:rounded-none max-md:w-full">
                                    Registrasi Akun Warga
                                </button>
                            </Link>
                            <Link to="/">
                                <button className="cursor-pointer px-6 py-3 border-2 border-black text-black font-semibold rounded-md hover:bg-black hover:text-white transition max-md:rounded-none max-md:w-full">
                                    Tulis Aduanmu Disini
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="w-5/12 max-[991px]:w-full flex justify-center relative">
                        <div className="relative w-84 h-84 max-lg:w-72 max-lg:h-72 rounded-full overflow-hidden shadow-lg">
                            <img
                                src="/your-image-path.png"
                                alt="User using phone"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Vote Section */}
            <div>

            </div>
        </div>
    );
}

export default HomePage;