// import React from 'react';

import { useState } from "react";
import DropdownMenu from "../components/DropdownMenu";
import Navbar from "../components/Navbar";
import { Camera, LocateFixed, MapPin, ArrowLeft, BrushCleaning, TrafficCone, Construction, Trees, Ambulance } from 'lucide-react';
import Tooltip from "../components/Tooltip";
import { Link } from "react-router-dom";

const communities = [
    {
        name: 'lapor/Kebersihan',
        quantity: '102',
        icon: <BrushCleaning className="w-6 h-6 text-slate-600 p-1" />,
        bgColor: 'bg-slate-100'
    },
    {
        name: 'lapor/JalanRusak',
        quantity: '78',
        icon: <TrafficCone className="w-6 h-6 text-orange-600 p-1" />,
        bgColor: 'bg-orange-100'
    },
    {
        name: 'lapor/Lingkungan',
        quantity: '53',
        icon: <Construction className="w-6 h-6 text-yellow-600 p-1" />,
        bgColor: 'bg-yellow-100'
    },
    {
        name: 'lapor/Infrastruktur',
        quantity: '19',
        icon: <Trees className="w-6 h-6 text-green-600 p-1" />,
        bgColor: 'bg-green-100'
    },
    {
        name: 'lapor/Kecelakaan',
        quantity: '2',
        icon: <Ambulance className="w-6 h-6 text-red-600 p-1" />,
        bgColor: 'bg-red-100'
    },
];

const CreatePage = () => {
    const [mode, setMode] = useState("tulis");
    const [text, setText] = useState("");
    const [location, setLocation] = useState("");

    const extractHashtags = (input) => {
        return input.match(/#[\w\d]+/g) || [];
    };

    const handleSubmit = () => {
        alert('Laporan berhasil diunggah!');
    };

    return (
        <div>
            <Navbar />
            <div className="flex justify-between pt-25 pb-10  w-full h-full bg-gray-50 px-8 max-md:px-0 max-md:flex-col">
                <div className="w-9/12 px-5 max-lg:w-8/12 max-md:w-full">
                    <div className="flex justify-between items-center border-b border-gray-400 border-gray-400 pb-5 mb-5">
                        <div className="flex items-center gap-3">
                            <Tooltip message="Kembali">
                                <button
                                    onClick={() => window.history.back()}
                                    className="bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-full"
                                >
                                    <ArrowLeft className="w-8 h-8 p-1" />
                                </button>
                            </Tooltip>
                            <h1 className="text-2xl font-semibold">Tulis Laporanmu</h1>
                        </div>
                        <h1 className="font-bold text-blue-600">Draf <span className="bg-gray-400 text-white px-2 ml-1 pb-1 pt-0.5 rounded-lg">0</span></h1>
                    </div>
                    <div className="bg-white rounded shadow-md p-5">
                        <div className="w-fit max-sm:w-full">
                            <DropdownMenu Headertext="Pilih Kategori" options={[
                                { label: 'Infrastruktur' },
                                { label: 'Aksesibilitas' },
                                { label: 'Transportasi' },
                                { label: 'Kondisi Jalan' },
                                { label: 'Kecelakaan' },
                                { label: 'Kebersihan' },
                                { label: 'Lainnya' }
                            ]} />
                        </div>
                        <div className="mt-5">
                            <input
                                type="file"
                                accept="image/*"
                                id="fileInput"
                                className="hidden"
                            />

                            <div
                                onClick={() => document.getElementById("fileInput").click()}
                                className="w-60 h-36 border border-gray-200 hover:border-blue-200 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-blue-50 gap-2 rounded-lg text-gray-400"
                            >
                                <Camera />
                                <p className="font-semibold">Tambah Foto</p>
                            </div>
                        </div>
                        <div className="mt-5">
                            <input
                                type="text"
                                placeholder="Title"
                                maxLength={300}
                                className="w-full border border-gray-200 rounded-lg text-lg text-gray-700 focus:bg-blue-50 focus:ring-1 focus:ring-blue-200 bg-gray-100 py-2 px-3 font-medium outline-none"
                            />
                        </div>

                        <div className="bg-gray-100 text-gray-300 rounded-lg border border-gray-200 p-4 mx-auto mt-5">
                            {/* Tabs */}
                            <div className="flex mb-2 border-b border-gray-300">
                                <button
                                    onClick={() => setMode("tulis")}
                                    className={`cursor-pointer px-4 py-2 font-medium ${mode === "tulis" ? "text-white bg-gray-400 border-b-2 border-gray-500" : "text-gray-400"
                                        }`}
                                >
                                    Tulis
                                </button>
                                <button
                                    onClick={() => setMode("preview")}
                                    className={`cursor-pointer px-4 py-2 font-medium ${mode === "preview" ? "text-white bg-gray-400 border-b-2 border-gray-500" : "text-gray-400"
                                        }`}
                                >
                                    Lihat Pratinjau
                                </button>
                            </div>

                            {/* Textarea or preview */}
                            {mode === "tulis" ? (
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center w-[300px] border border-gray-300 rounded bg-gray-200 px-3 max-md:px-2 py-2 max-md:py-1 mb-2 mt-3 focus-within:bg-gray-100 focus-within:border-gray-400">
                                            <MapPin className="w-7 h-7 max-md:w-6 max-md:h-6 text-gray-500 mr-3 pr-3 max-md:pr-2 max-md:mr-2 border-r border-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Tambahkan Lokasi"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                className="flex-1 bg-transparent text-gray-500 outline-none border-none placeholder:text-gray-500 text-sm max-sm:w-3/4"
                                            />
                                        </div>
                                        <Tooltip message={"Cari Lokasi di Peta"}>
                                            <div className="mt-1 bg-gray-200 border border-gray-300 hover:border-gray-400 hover:bg-gray-300 p-2 max-md:p-1 cursor-pointer rounded"><LocateFixed className="w-7 h-7 max-md:w-6 max-md:h-6 text-gray-500" /></div>
                                        </Tooltip>
                                    </div>
                                    <textarea
                                        className="w-full h-40 bg-gray-100 text-gray-700 mt-1 border-none resize-none outline-none"
                                        placeholder="Tulis laporanmu..."
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        maxLength={10000}
                                    />
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-4 rounded border mt-4">
                                    {/* Location Display */}
                                    <div className="flex items-center text-gray-700 font-medium mb-3 max-md:text-sm">
                                        <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                                        {location || <span className="italic text-gray-400">Lokasi belum ditambahkan</span>}
                                    </div>

                                    {/* Description Text */}
                                    <p className="max-md:text-sm text-gray-800 whitespace-pre-line">{text || "Belum ada deskripsi."}</p>

                                    {/* Hashtags Display */}
                                    <div className="flex flex-wrap mt-4 gap-2">
                                        {extractHashtags(text).map((tag, index) => (
                                            <div
                                                key={index}
                                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium"
                                            >
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Footer Actions */}
                            <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                                <div>{text.length}/10000</div>
                            </div>
                        </div>

                        <div className="mt-5 w-full flex justify-end gap-3">
                            <button onClick={() => window.history.back()} className="cursor-pointer px-6 py-2 border-2 border-black text-black font-semibold rounded-none hover:bg-black hover:text-white transition max-md:w-fit">
                                Batal
                            </button>
                            <Link to="/report">
                                <button onClick={handleSubmit} className="cursor-pointer px-6 py-2 border-2 border-red-600 bg-red-600 text-white font-semibold rounded-none hover:bg-red-700 hover:border-red-700 hover:text-white transition max-md:w-fit">
                                    Unggah
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className="w-3/12 pr-5 max-lg:w-4/12 max-md:w-full max-md:px-5">
                    <div className="w-full bg-white rounded shadow-md p-5 mt-[73px] max-md:mt-5">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-300 mb-4">
                            <img src="/logo.png" alt="logo" className="w-7 h-7" />
                            <h1 className="font-semibold text-lg">Aturan Menulis Laporan</h1>
                        </div>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-700 text-sm">
                            <li className="font-semibold py-1">Gunakan bahasa yang sopan dan mudah dipahami.</li>
                            <li className="font-semibold py-1">Jelaskan lokasi dan detail kejadian dengan jelas.</li>
                            <li className="font-semibold py-1">Tidak mengandung unsur SARA, pornografi, atau ujaran kebencian.</li>
                            <li className="font-semibold py-1">Unggah foto yang relevan dan jelas jika diperlukan.</li>
                        </ol>
                    </div>
                    <div className="w-full bg-white rounded shadow-md p-5 mt-5">
                        <h2 className="text-sm font-semibold mb-4 uppercase pb-4 border-b border-gray-300">Laporan Hari Ini</h2>
                        <ul>
                            {communities.map((com, index) => (
                                <li key={index} className="flex items-center gap-3 hover:bg-gray-100 p-3 cursor-pointer">
                                    <div className={`p-1 rounded-full ${com.bgColor}`}>
                                        {com.icon}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">{com.name}</div>
                                        <div className="text-xs text-gray-400">{com.quantity} laporan</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default CreatePage;