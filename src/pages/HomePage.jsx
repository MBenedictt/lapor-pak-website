// import React from 'react';

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ReportCard from "../components/ReportCard";
import Footer from "../components/Footer";
import { useEffect, useState, useRef } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

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
        image: "https://awsimages.detik.net.id/community/media/visual/2024/06/11/lampu-merah-di-bundaran-marlin-pangandaran-mati_169.jpeg?w=600&q=90",
        isBookmarked: false,
        category: "infrastruktur",
        location: "Jl. Sudirman"
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
        image: "https://static.republika.co.id/uploads/images/inpicture_slide/trotoar-untuk-pejalan-kaki-di-jalan-tb-simatupang-_190418200558-610.jpg",
        isBookmarked: true,
        category: "akses",
        location: "Jl. Ahmad Yani"
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
        image: "https://asset-2.tstatic.net/kupang/foto/bank/images/Angkota-Kupang-Mogok.jpg",
        isBookmarked: false,
        category: "transportasi",
        location: "Jl. Thamrin"
    },
];

const data = [
  { id: 0, value: 34, label: 'Infrastruktur' },
  { id: 1, value: 26, label: 'Aksesibilitas' },
  { id: 2, value: 22, label: 'Kondisi Jalan' },
  { id: 3, value: 18, label: 'Transportasi' },
];

const redShades = ['#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'];

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const chartContainerRef = useRef(null);
    const [chartWidth, setChartWidth] = useState(500); // default awal

    useEffect(() => {
    const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
        if (entry.contentRect) {
            setChartWidth(entry.contentRect.width);
        }
        }
    });

    if (chartContainerRef.current) {
        observer.observe(chartContainerRef.current);
    }

    return () => observer.disconnect();
    }, []);

    useEffect(() => {
        AOS.init({
            disable: "phone",
            duration: 1000,
            easing: "ease-out-cubic",
        });
    }, []);

    useEffect(() => {
        const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');

        if (!hasLoadedBefore) {
            setIsLoading(true);
            setIsVisible(true);

            // Prevent showing loader again in this session
            sessionStorage.setItem('hasLoadedBefore', 'true');
        }
    }, []);

    const handleImageLoad = () => {
        if (isLoading) {
            setIsLoading(false);
            setTimeout(() => {
                setIsVisible(false);
            }, 500);
        }
    };

    useEffect(() => {
        if (isVisible) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => document.body.classList.remove('overflow-hidden');
    }, [isVisible]);

    return (
        <div>
            {isVisible && (
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-white z-[9999] transition-all duration-500 ${isLoading ? 'translate-y-0' : '-translate-y-[100%]'
                        }`}
                >
                    <div className="loader"></div>
                </div>
            )}
            <Navbar />
            {/* Hero Section */}
            <div className="w-full h-screen flex items-center justify-center bg-white px-30 max-[1280px]:px-20 max-md:px-10 max-md:py-10 max-[991px]:h-auto max-[991px]:mt-[70px] max-[991px]:py-20 max-sm:px-5">
                <div className="flex max-[991px]:flex-col-reverse justify-between items-center w-full gap-10">
                    <div className="w-7/12 max-[991px]:w-full mb-10 md:mb-0 max-sm:px-5">
                        <h1 className="text-5xl max-sm:text-4xl font-bold text-black mb-6 max-sm:text-center leading-[60px] max-sm:leading-[50px]" data-aos="fade-right">
                            lapor<span className="text-red-600">PAK</span> by <span className="text-red-600">City Department®</span>
                        </h1>
                        <p className="text-gray-700 mb-8 leading-relaxed max-sm:text-center" data-aos="fade-right">
                            Punya keluhan soal lingkungan kota? Sampaikan langsung di LaporPAK! Kami adalah platform pengaduan terpadu yang siap menjembatani suara Anda dengan pihak berwenang. Bersama, kita wujudkan perubahan.
                        </p>

                        <hr className="mb-8 border-gray-300" />

                        <h2 className="text-2xl font-semibold mb-5 max-sm:text-center" data-aos="fade-up">Punya Keluhan atau Masukan?</h2>

                        <div className="flex max-md:flex-col gap-4 max-sm:justify-center w-full" data-aos="fade-up">
                            <Link to="/">
                                <button className="cursor-pointer px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-none hover:bg-red-600 hover:text-white transition max-md:w-full">
                                    Registrasi akun
                                </button>
                            </Link>
                            <Link to="/create">
                                <button className="cursor-pointer px-6 py-3 border-2 border-black text-black font-semibold rounded-none hover:bg-black hover:text-white transition max-md:w-full">
                                    Tulis laporan di sini
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="w-5/12 max-[991px]:w-full flex justify-center relative">
                        <div className="relative w-96 h-96 max-lg:w-72 rounded-full max-lg:h-72 overflow-hidden" data-aos="fade-left">
                            <img
                                src="/images/mascot.png"
                                alt="User using phone"
                                className="object-cover w-full h-full"
                                onLoad={handleImageLoad}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Guide Section */}

            <div className="custom-shape-divider-bottom-1753183903" style={{ position: 'relative', zIndex: 10, transform: 'rotate(180deg)', top: '10px' }}>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: '52px', width: 'calc(100% + 1.3px)' }}>
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" style={{ fill: '#FEF2F2' }}></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" style={{ fill: '#FEF2F2' }}></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" style={{ fill: '#FEF2F2' }}></path>
                </svg>
            </div>

            <div className="bg-red-50 w-full px-30 max-[1280px]:px-20 py-20 max-md:px-10 max-md:py-10 flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold text-black text-center mb-15 max-sm:text-4xl max-sm:mb-10" data-aos="fade-down">Cara Membuat Laporan</h1>
                <div className="w-full grid grid-cols-3 gap-5 max-[991px]:grid-cols-1">
                    <div className="flex flex-col items-center">
                        <div className="w-60 h-60 xl:w-72 xl:h-72 rounded-full overflow-hidden mx-auto border-6 border-rose-200 shadow-lg mb-2 hover:scale-105 transition duration-300" data-aos="zoom-in">
                            <img
                                src="/images/step1.png"
                                alt="Step 1"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="w-60 max-[991px]:w-2/4 max-sm:w-full flex flex-col justify-center text-center items-center" data-aos="fade-up">
                            <h2 className="text-xl font-semibold mt-4 rounded-full bg-red-700 pb-1 text-white w-8 h-8 flex items-center justify-center">1</h2>
                            <h2 className="text-xl font-semibold mt-4 mb-2">Registrasi / Login</h2>
                            <p className="text-gray-700">Buat akun atau masuk untuk melacak dan mengelola laporan Anda dengan mudah</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-60 h-60 xl:w-72 xl:h-72 rounded-full overflow-hidden mx-auto border-6 border-rose-200 shadow-lg mb-2 hover:scale-105 transition duration-300" data-aos="zoom-in">
                            <img
                                src="/images/step2.png"
                                alt="Step 2"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="w-60 max-[991px]:w-2/4 max-sm:w-full flex flex-col justify-center text-center items-center" data-aos="fade-up">
                            <h2 className="text-xl font-semibold mt-4 rounded-full bg-red-700 pb-1 text-white w-8 h-8 flex items-center justify-center">2</h2>
                            <h2 className="text-xl font-semibold mt-4 mb-2">Laporkan Masalah</h2>
                            <p className="text-gray-700">Jelaskan keluhan Anda dengan jelas, tambahkan foto atau detail lokasi, lalu kirim laporan Anda</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-60 h-60 xl:w-72 xl:h-72 rounded-full overflow-hidden mx-auto border-6 border-rose-200 shadow-lg mb-2 hover:scale-105 transition duration-300" data-aos="zoom-in">
                            <img
                                src="/images/step3.png"
                                alt="Step 3"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="w-60 max-[991px]:w-2/4 max-sm:w-full flex flex-col justify-center text-center items-center" data-aos="fade-up">
                            <h2 className="text-xl font-semibold mt-4 rounded-full bg-red-700 pb-1 text-white w-8 h-8 flex items-center justify-center">3</h2>
                            <h2 className="text-xl font-semibold mt-4 mb-2">Diskusi & Kolaborasi</h2>
                            <p className="text-gray-700">Lihat laporan dari pengguna lain, beri komentar, upvote, dan bekerja sama untuk menyuarakan masalah</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom-shape-divider-top-1753183619">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: '48px', width: 'calc(100% + 1.3px)' }}>
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" style={{ fill: '#FEF2F2' }}></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" style={{ fill: '#FEF2F2' }}></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" style={{ fill: '#FEF2F2' }}></path>
                </svg>
            </div>

            {/* Top Vote Section */}
            <div className="w-full px-30 max-[1280px]:px-20 py-20 max-md:px-10 max-sm:px-5 max-md:py-10">
                <div className="flex justify-between items-center mb-15 max-sm:mb-10 max-sm:flex-col">
                    <h1 className="text-5xl font-bold text-black max-sm:text-4xl max-sm:mb-5 max-sm:text-center pb-2" data-aos='fade-right'>Laporan Teratas</h1>
                    <Link to="/report" data-aos='fade-left'>
                        <button className="cursor-pointer px-6 py-2 border-2 border-red-600 text-red-600 font-semibold rounded-none hover:bg-red-600 hover:text-white transition max-md:w-full">
                            Lihat Semua
                        </button>
                    </Link>
                </div>
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-aos="fade-up">
                        {reports.map((report, index) => (
                            <ReportCard
                                key={index}
                                report={report}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Chart section */}
            <div className="custom-shape-divider-bottom-1753183903" style={{ position: 'relative', zIndex: 10, transform: 'rotate(180deg)', top: '10px' }}>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: '52px', width: 'calc(100% + 1.3px)' }}>
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" style={{ fill: '#FEF2F2' }}></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" style={{ fill: '#FEF2F2' }}></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" style={{ fill: '#FEF2F2' }}></path>
                </svg>
            </div>
            
            <div className="w-full px-6 py-10 flex flex-col items-center justify-center bg-red-50">
                <h1 className="text-5xl font-bold text-black text-center mb-10 max-sm:text-4xl max-sm:mb-6" data-aos="fade-down">
                    Ringkasan Laporan
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
                    <div className="bg-white rounded-2xl shadow-md p-6 w-full" data-aos="slide-up">
                    <h2 className="text-xl md:text-2xl font-bold text-black text-center mb-4 md:mb-5 lg:mb-6">
                        Laporan berdasarkan kategori
                    </h2>
                    <PieChart
                        series={[
                        {
                            data: data.map((item, index) => ({
                            ...item,
                            color: redShades[index % redShades.length],
                            })),
                            arcLabel: (item) => `${item.value}%`,
                            arcLabelMinAngle: 15,
                            arcLabelRadius: '60%',
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 0, additionalRadius: -30, color: 'gray' },
                            outerRadius: 100,
                        },
                        ]}
                        sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fontWeight: 'bold',
                            fill: 'white',
                            fontSize: 12,
                        },
                        }}
                        width={250}
                        height={250}
                    />
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl shadow-md p-6 w-full" data-aos="slide-up" ref={chartContainerRef}>
                    <h2 className="text-xl md:text-2xl font-bold text-black text-center mb-4 md:mb-5 lg:mb-6">
                        Jumlah Laporan per Tahun
                    </h2>
                    
                        <LineChart
                        xAxis={[{ data: ["2021", "2022", "2023", "2024", "2025"], scaleType: 'point' }]}
                        series={[
                            {
                            data: [800, 1200, 1500, 1800, 2000],
                            color: '#ef4444',
                            },
                        ]}
                        width={chartWidth}
                        height={300}
                        />
                    </div>
                </div>
                </div>



            {/* Footer Section */}
            <Footer />

        </div>
    );
}

export default HomePage;