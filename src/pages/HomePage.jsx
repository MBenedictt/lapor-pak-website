// import React from 'react';

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ReportCard from "../components/ReportCard";

const HomePage = () => {
    const reports = [
        {
            id: 1,
            title: "Lampu Lalu Lintas Mati di Perempatan Jalan Sudirman",
            author: "warga01",
            date: "2024-07-14",
            tags: ["#lalu-lintas", "#lampu-mati", "#bahaya"],
            views: 215,
            likes: 45,
            comments: 4,
            image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=200&fit=crop",
            isBookmarked: false,
            category: "infrastruktur",
            location: "jl-sudirman"
        },
        {
            id: 2,
            title: "Trotoar Rusak Membahayakan Pejalan Kaki di Jalan Ahmad Yani",
            author: "peduliakses",
            date: "2024-07-12",
            tags: ["#trotoar", "#aksesibilitas", "#jalanrusak"],
            views: 342,
            likes: 67,
            comments: 12,
            image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=200&fit=crop",
            isBookmarked: true,
            category: "akses",
            location: "jl-ahmad-yani"
        },
        {
            id: 3,
            title: "Angkot Parkir Sembarangan Menutup Akses Jalan Sekolah",
            author: "guru_sd",
            date: "2024-07-10",
            tags: ["#angkot", "#parkirliar", "#keselamatan"],
            views: 789,
            likes: 123,
            comments: 23,
            image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=200&fit=crop",
            isBookmarked: false,
            category: "transportasi",
            location: "jl-thamrin"
        },
    ];

    return (
        <div>
            <Navbar />
            {/* Hero Section */}
            <div className="w-full h-screen flex items-center justify-center bg-white px-30 max-[1280px]:px-20 max-md:px-10 max-md:py-10 max-[991px]:h-auto max-[991px]:mt-[70px] max-[991px]:py-20 max-sm:px-5">
                <div className="flex max-[991px]:flex-col-reverse justify-between items-center w-full gap-10">
                    <div className="w-7/12 max-[991px]:w-full mb-10 md:mb-0 max-sm:px-5">
                        <h1 className="text-5xl max-sm:text-4xl font-bold text-black mb-6 max-sm:text-center leading-[60px] max-sm:leading-[50px]">
                            lapor<span className="text-red-600">PAK</span> by <span className="text-red-600">Dinas Perhubungan®</span>
                        </h1>
                        <p className="text-gray-700 mb-8 leading-relaxed max-sm:text-center">
                            Punya keluhan soal lingkungan kota? Sampaikan langsung di LaporPAK! Kami adalah platform pengaduan terpadu yang siap menjembatani suara Anda dengan pihak berwenang. Bersama, kita wujudkan perubahan.
                        </p>

                        <hr className="mb-8 border-gray-300" />

                        <h2 className="text-2xl font-semibold mb-5 max-sm:text-center">Punya Keluhan atau Masukan?</h2>

                        <div className="flex max-md:flex-col gap-4 max-sm:justify-center w-full">
                            <Link to="/">
                                <button className="cursor-pointer px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-none hover:bg-red-600 hover:text-white transition max-md:w-full">
                                    Registrasi Akun
                                </button>
                            </Link>
                            <Link to="/">
                                <button className="cursor-pointer px-6 py-3 border-2 border-black text-black font-semibold rounded-none hover:bg-black hover:text-white transition max-md:w-full">
                                    Tulis Laporan Disini
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="w-5/12 max-[991px]:w-full flex justify-center relative">
                        <div className="relative w-96 h-96 max-lg:w-72 rounded-full max-lg:h-72 overflow-hidden">
                            <img
                                src="/images/mascot.png"
                                alt="User using phone"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Guide Section */}
            <div className="bg-red-50 w-full px-30 max-[1280px]:px-20 py-20 max-md:px-10 max-md:py-10 flex flex-col items-center justify-center max-[991px]:mt-[70px]">
                <h1 className="text-5xl font-bold text-black text-center mb-15 max-sm:text-4xl max-sm:mb-10">Cara Membuat Laporan</h1>
                <div className="w-full grid grid-cols-3 gap-5 max-[991px]:grid-cols-1">
                    <div className="flex flex-col items-center">
                        <div className="w-60 h-60 xl:w-72 xl:h-72 rounded-full overflow-hidden mx-auto border-6 border-rose-200 shadow-lg mb-2 hover:scale-105 transition duration-300">
                            <img
                                src="/images/step1.png"
                                alt="Step 1"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="w-60 max-[991px]:w-2/4 max-sm:w-full flex flex-col justify-center text-center items-center">
                            <h2 className="text-xl font-semibold mt-4 rounded-full bg-red-700 pb-1 text-white w-8 h-8 flex items-center justify-center">1</h2>
                            <h2 className="text-xl font-semibold mt-4 mb-2">Registrasi / Login</h2>
                            <p className="text-gray-700">Buat akun atau masuk untuk melacak dan mengelola laporan Anda dengan mudah</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-60 h-60 xl:w-72 xl:h-72 rounded-full overflow-hidden mx-auto border-6 border-rose-200 shadow-lg mb-2 hover:scale-105 transition duration-300">
                            <img
                                src="/images/step2.png"
                                alt="Step 2"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="w-60 max-[991px]:w-2/4 max-sm:w-full flex flex-col justify-center text-center items-center">
                            <h2 className="text-xl font-semibold mt-4 rounded-full bg-red-700 pb-1 text-white w-8 h-8 flex items-center justify-center">2</h2>
                            <h2 className="text-xl font-semibold mt-4 mb-2">Laporkan Masalah</h2>
                            <p className="text-gray-700">Jelaskan keluhan Anda dengan jelas, tambahkan foto atau detail lokasi, lalu kirim laporan Anda</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-60 h-60 xl:w-72 xl:h-72 rounded-full overflow-hidden mx-auto border-6 border-rose-200 shadow-lg mb-2 hover:scale-105 transition duration-300">
                            <img
                                src="/images/step3.png"
                                alt="Step 3"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="w-60 max-[991px]:w-2/4 max-sm:w-full flex flex-col justify-center text-center items-center">
                            <h2 className="text-xl font-semibold mt-4 rounded-full bg-red-700 pb-1 text-white w-8 h-8 flex items-center justify-center">3</h2>
                            <h2 className="text-xl font-semibold mt-4 mb-2">Diskusi & Kolaborasi</h2>
                            <p className="text-gray-700">Lihat laporan dari pengguna lain, beri komentar, upvote, dan bekerja sama untuk menyuarakan masalah</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Vote Section */}
            <div className="w-full px-30 max-[1280px]:px-20 py-20 max-md:px-10 max-sm:px-5 max-md:py-10">
                <div className="flex justify-between items-center mb-15 max-sm:mb-10 max-sm:flex-col">
                    <h1 className="text-5xl font-bold text-black max-sm:text-4xl max-sm:mb-5 max-sm:text-center">Laporan Teratas</h1>
                    <Link to="/">
                        <button className="cursor-pointer px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-none hover:bg-red-600 hover:text-white transition max-md:w-full">
                            Lihat Semua
                        </button>
                    </Link>
                </div>
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {reports.map((report, index) => (
                            <ReportCard
                                key={index}
                                report={report}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            {/* <div className="bg-gray-50 py-12 px-20 max-md:px-5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="w-5/12 max-[991px]:w-full flex justify-center relative">
                        <div className="relative w-96 h-96 max-lg:w-72 rounded-full max-lg:h-72 overflow-hidden">
                            <img
                                src="/images/thumbsup.png"
                                alt="User using phone"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="max-md:text-center lg:text-left w-full lg:w-8/12 max-md:w-3/4">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                            Ada Kendala?
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Silakan kirim hubungi customer service kami atau kontak di bawah ini untuk informasi lebih lanjut.
                        </p>
                        <a
                            href="https://www.civicplus.com"
                            className="bg-red-600 text-white font-semibold px-6 py-3 rounded hover:bg-red-700 transition"
                        >
                            Visit Us
                        </a>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default HomePage;