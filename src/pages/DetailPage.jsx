import { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Comment from '../components/Comment';
import { Tooltip } from '../components/Tooltip';
import { Eye, ArrowBigUp, ArrowBigDown, MessageCircle, Bookmark, Share, SendHorizontal, Copy } from 'lucide-react';

const ReportDetailPage = () => {
    const [mainReport, setMainReport] = useState({
        id: 1,
        title: "Lampu Lalu Lintas Mati di Perempatan Jalan Sudirman",
        author: "warga01",
        date: "2024-07-14",
        tags: ["#lalu-lintas", "#lampu-mati", "#bahaya"],
        views: 215,
        upvotes: 48,
        downvotes: 3,
        comments: 3,
        image: "https://awsimages.detik.net.id/community/media/visual/2024/06/11/lampu-merah-di-bundaran-marlin-pangandaran-mati_169.jpeg?w=600&q=90",
        initialBookmark: false,
        category: "infrastruktur",
        location: "Jl. Sudirman",
        description: "Lampu lalu lintas di perempatan Jalan Sudirman sudah mati total selama 2 hari terakhir. Kondisi ini sangat membahayakan pengendara, terutama pada jam sibuk pagi dan sore hari. Beberapa kali hampir terjadi kecelakaan. Mohon pihak terkait segera melakukan perbaikan."
    });

    const [score, setScore] = useState(mainReport.upvotes - mainReport.downvotes);
    const [userVote, setUserVote] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(mainReport.initialBookmark);

    const flattenComments = (comments, isReply = false) => {
        let flatList = [];
        for (const comment of comments) {
            flatList.push({ ...comment, isReply: isReply });

            if (comment.replies && comment.replies.length > 0) {
                flatList = flatList.concat(flattenComments(comment.replies, true));
            }
        }
        return flatList;
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddComment();
        }
    }

    const otherReports = [
        {
            "id": 1,
            "title": "Lampu Lalu Lintas Mati di Perempatan Jalan Sudirman",
            "author": "warga01",
            "image": "https://awsimages.detik.net.id/community/media/visual/2024/06/11/lampu-merah-di-bundaran-marlin-pangandaran-mati_169.jpeg?w=600&q=90",
            "location": "Jl. Sudirman"
        },
        {
            "id": 2,
            "title": "Trotoar Rusak Membahayakan Pejalan Kaki di Jalan Ahmad Yani",
            "author": "peduliakses",
            "image": "https://static.republika.co.id/uploads/images/inpicture_slide/trotoar-untuk-pejalan-kaki-di-jalan-tb-simatupang-_190418200558-610.jpg",
            "location": "Jl. Ahmad Yani"
        },
        {
            "id": 3,
            "title": "Angkot Parkir Sembarangan Menutup Akses Jalan Sekolah",
            "author": "guru_sd",
            "image": "https://asset-2.tstatic.net/kupang/foto/bank/images/Angkota-Kupang-Mogok.jpg",
            "location": "Jl. Thamrin"
        },
        {
            "id": 4,
            "title": "Jalan Berlubang di Dekat Pasar Membahayakan Pengendara Motor",
            "author": "ojekonline",
            "image": "https://asset.kompas.com/crops/cOidyNWqHEdnvx2cA9MOo6uFpsg=/0x0:0x0/1200x800/data/photo/2023/05/11/645cba808a376.jpg",
            "location": "Jl. Diponegoro"
        },
        {
            "id": 5,
            "title": "Rambu Larangan Parkir Roboh di Persimpangan Utama",
            "author": "warga02",
            "image": "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/100/2024/07/09/9-mg2-Rambu-rambu-dilarang-parkir-roboh-ada-juga-yang-sampai-hilang-doni-2-792071909.jpg",
            "location": "Jl Sudirman"
        },
        {
            "id": 6,
            "title": "Halte Bus Tidak Terawat dan Kotor",
            "author": "penumpang_bus",
            "image": "https://static.republika.co.id/uploads/images/inpicture_slide/suasana-salah-satu-halte-tmb-di-jalan-perintis-kemerdekaan-_160114180516-234.jpg",
            "location": "Jl. Ahmad Yani"
        },
        {
            "id": 7,
            "title": "Drainase Tersumbat Menyebabkan Banjir",
            "author": "warga_rt05",
            "image": "https://newskaltim.com/wp-content/uploads/2017/08/Tumpukan-sampah-di-drainase-Gunung-Kawi.-int.jpg",
            "location": "Jl. Thamrin"
        },
        {
            "id": 8,
            "title": "Pedagang Kaki Lima Menutupi Trotoar",
            "author": "pejalan_kaki",
            "image": "https://media.suara.com/pictures/653x366/2020/04/16/57701-ilustrasi-pedagang-dok-istimewa.jpg",
            "location": "Jl. Diponegoro"
        },
        {
            "id": 9,
            "title": "Papan Reklame Roboh Menghalangi Jalan",
            "author": "saksi_mata",
            "image": "https://asset-2.tstatic.net/jabar/foto/bank/images/papan-reklame-di-kota-bandung-roboh.jpg",
            "location": "Jl. Sudirman"
        }
    ];

    const initialComments = [
        {
            id: 'c1',
            author: 'pengguna_aktif',
            text: 'Betul sekali, kemarin saya lewat sini hampir ditabrak motor dari arah berlawanan. Sangat berbahaya!',
            votes: 15,
            timestamp: '5 jam yang lalu',
            replies: [
                {
                    id: 'c3',
                    author: 'warga01',
                    text: 'Terima kasih atas konfirmasinya. Semakin banyak yang bersuara, semoga semakin cepat ditangani.',
                    votes: 5,
                    timestamp: '4 jam yang lalu',
                    replies: []
                }
            ]
        },
        {
            id: 'c2',
            author: 'pejabat_dinas',
            text: 'Terima kasih atas laporannya. Tim kami akan segera meluncur ke lokasi untuk pemeriksaan dan perbaikan. Estimasi perbaikan selesai dalam 1x24 jam.',
            votes: 2,
            timestamp: '2 jam yang lalu',
            replies: []
        }
    ];

    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");
    const commentSectionRef = useRef(null); 4


    const handleUpvote = () => {
        if (userVote === 'up') {
            setUserVote(null);
            setScore(score - 1);
        } else if (userVote === 'down') {
            setUserVote('up');
            setScore(score + 2);
        } else {
            setUserVote('up');
            setScore(score + 1);
        }
    };

    const handleDownvote = () => {
        if (userVote === 'down') {
            setUserVote(null);
            setScore(score + 1);
        } else if (userVote === 'up') {
            setUserVote('down');
            setScore(score - 2);
        } else {
            setUserVote('down');
            setScore(score - 1);
        }
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleCommentClick = () => {
        commentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link laporan disalin ke clipboard!");
    };



    const handleAddComment = () => {
        if (newComment.trim() === "") return;
        const newCommentObject = {
            id: `c${Date.now()}`,
            author: 'Anda',
            text: newComment,
            votes: 0,
            timestamp: 'Baru saja',
            replies: []
        };
        setComments([newCommentObject, ...comments]);
        setMainReport(prevState => ({
            ...prevState,
            comments: prevState.comments + 1
        }));
        setNewComment("");
    };

    const handleReplySubmit = (newReply, parentId) => {
        const addReplyRecursively = (nodes, targetId, reply) => {
            return nodes.map(node => {
                if (node.id === targetId) {
                    return { ...node, replies: [reply, ...node.replies] };
                }
                if (node.replies && node.replies.length > 0) {
                    return { ...node, replies: addReplyRecursively(node.replies, targetId, reply) };
                }
                return node;
            });
        };

        const updatedComments = addReplyRecursively(comments, parentId, newReply);
        setComments(updatedComments);
        setMainReport(prevState => ({
            ...prevState,
            comments: prevState.comments + 1
        }));
    };

    const shareUrl = window.location.href;
    const shareText = `Lihat laporan penting ini: "${mainReport.title}"`;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <main className="w-full px-4 md:px-10 lg:px-20 py-10 mt-[70px]">
                <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center max-sm:flex-col max-sm:items-start max-sm:gap-1 gap-4 mb-4 text-sm text-gray-500">
                                    <span className="font-semibold text-black">lapor/{mainReport.category}</span> • Diposting oleh u/{mainReport.author} • {mainReport.date}
                                </div>
                                <h1 className="text-3xl font-bold text-black mb-4">{mainReport.title}</h1>

                                {mainReport.image && <img src={mainReport.image} alt={mainReport.title} className="w-full h-auto max-h-[500px] object-cover rounded-md mb-4" />}
                                <p className="text-gray-800 leading-relaxed">{mainReport.description}</p>
                            </div>

                            <div className="px-6 pb-4 border-t border-gray-200 pt-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-1">
                                            <Eye className="w-4 h-4 text-gray-600" />
                                            <span className="text-gray-600 text-sm">{mainReport.views}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Tooltip message="Upvote">
                                                <button onClick={handleUpvote}>
                                                    <ArrowBigUp className={`w-5 h-5 cursor-pointer ${userVote === 'up' ? 'text-green-600 fill-green-600' : 'text-gray-600 hover:text-green-600'}`} />
                                                </button>
                                            </Tooltip>
                                            <span className="text-gray-800 text-sm font-bold w-4 text-center">{score}</span>
                                            <Tooltip message="Downvote">
                                                <button onClick={handleDownvote}>
                                                    <ArrowBigDown className={`w-5 h-5 cursor-pointer ${userVote === 'down' ? 'text-red-600 fill-red-600' : 'text-gray-600 hover:text-red-600'}`} />
                                                </button>
                                            </Tooltip>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Tooltip message="Lihat Komentar">
                                                <button onClick={handleCommentClick}>
                                                    <MessageCircle className="w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer" />
                                                </button>
                                            </Tooltip>
                                            <span className="text-gray-600 text-sm commentCount">{mainReport.comments}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Tooltip message="Bookmark">
                                            <button onClick={handleBookmark}>
                                                <Bookmark className={`w-4 h-4 cursor-pointer ${isBookmarked ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600 hover:text-yellow-500'}`} />
                                            </button>
                                        </Tooltip>
                                        <Tooltip message="Bagikan">
                                            <button onClick={handleShare}>
                                                <Share className="w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer" />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div ref={commentSectionRef} className="mt-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <p className="mb-2 text-sm">Komentar sebagai <span className="text-red-600 font-semibold">Anda</span></p>
                                <div className="flex w-full items-center gap-2">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        className="flex-grow p-3 h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 max-sm:text-sm"
                                        onKeyDown={handleKeyPress}
                                        placeholder="Tulis komentar Anda di sini..."
                                    />
                                    <button
                                        onClick={handleAddComment}
                                        className="w-12 h-12 flex items-center justify-center shrink-0 cursor-pointer bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                                    >
                                        <SendHorizontal className="inline-block" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 space-y-6">
                                {flattenComments(comments).map(comment => (
                                    <Comment
                                        key={comment.id}
                                        comment={comment}
                                        isReply={comment.isReply}
                                        onReplySubmit={handleReplySubmit}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3">
                        <div className="bg-white p-4 rounded-lg shadow-md sticky top-[90px]">

                            <div className="mb-6">
                                <h3 className="text-lg font-bold border-t border-gray-200 pt-4 pb-3 mb-4">Bagikan Laporan Ini</h3>
                                <div className="grid grid-cols-4 gap-2 text-center">
                                    <button onClick={handleShare} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100">
                                        <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                                            <Copy className="w-5 h-5 text-gray-700" />
                                        </div>
                                        <span className="text-xs mt-1">Copy link</span>
                                    </button>
                                    <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100">
                                        <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.885.002 2.024.63 3.965 1.742 5.574l-1.218 4.459 4.569-1.192z" /></svg>
                                        </div>
                                        <span className="text-xs mt-1">WhatsApp</span>
                                    </a>
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100">
                                        <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg>
                                        </div>
                                        <span className="text-xs mt-1">Facebook</span>
                                    </a>
                                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100">
                                        <div className="w-10 h-10 flex items-center justify-center bg-black rounded-full">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" /></svg>
                                        </div>
                                        <span className="text-xs mt-1">X</span>
                                    </a>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold border-t border-gray-300 pt-4 pb-3 mb-4">Lihat Laporan Lainnya</h3>
                            <div className="space-y-4">
                                {otherReports.map(report => (
                                    <Link to={`/report/detail`} key={report.id} className="block group">
                                        <div className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-100">
                                            <img src={report.image} alt={report.title} className="w-24 h-16 object-cover rounded" />
                                            <div>
                                                <h4 className="font-semibold text-sm group-hover:text-red-600 transition">{report.title}</h4>
                                                <p className="text-xs text-gray-500">u/{report.author}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ReportDetailPage;