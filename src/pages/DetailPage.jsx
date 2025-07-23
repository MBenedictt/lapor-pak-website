import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Comment from '../components/Comment';
import AOS from 'aos';
import 'aos/dist/aos.css';
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

    useEffect(() => {
        AOS.init({
            disable: "phone",
            duration: 1000,
            easing: "ease-out-cubic",
        });
    }, []);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddComment();
        }
    }

    const otherReports = [
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
                        <div className="bg-white rounded-lg shadow-md overflow-hidden" data-aos="zoom-in-up" data-aos-once="true">
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
                            <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-right" data-aos-once="true">
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
                            <div className="mt-6 space-y-6" data-aos="fade-right" data-aos-once="true">
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
                        <div className="bg-white p-4 rounded-lg shadow-md sticky top-[90px]" data-aos="fade-left" data-aos-once="true">

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
                                            <svg className="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 29.079097 3.1186875 32.88588 4.984375 36.208984 L 2.0371094 46.730469 A 1.0001 1.0001 0 0 0 3.2402344 47.970703 L 14.210938 45.251953 C 17.434629 46.972929 21.092591 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 21.278025 46 17.792121 45.029635 14.761719 43.333984 A 1.0001 1.0001 0 0 0 14.033203 43.236328 L 4.4257812 45.617188 L 7.0019531 36.425781 A 1.0001 1.0001 0 0 0 6.9023438 35.646484 C 5.0606869 32.523592 4 28.890107 4 25 C 4 13.390466 13.390466 4 25 4 z M 16.642578 13 C 16.001539 13 15.086045 13.23849 14.333984 14.048828 C 13.882268 14.535548 12 16.369511 12 19.59375 C 12 22.955271 14.331391 25.855848 14.613281 26.228516 L 14.615234 26.228516 L 14.615234 26.230469 C 14.588494 26.195329 14.973031 26.752191 15.486328 27.419922 C 15.999626 28.087653 16.717405 28.96464 17.619141 29.914062 C 19.422612 31.812909 21.958282 34.007419 25.105469 35.349609 C 26.554789 35.966779 27.698179 36.339417 28.564453 36.611328 C 30.169845 37.115426 31.632073 37.038799 32.730469 36.876953 C 33.55263 36.755876 34.456878 36.361114 35.351562 35.794922 C 36.246248 35.22873 37.12309 34.524722 37.509766 33.455078 C 37.786772 32.688244 37.927591 31.979598 37.978516 31.396484 C 38.003976 31.104927 38.007211 30.847602 37.988281 30.609375 C 37.969311 30.371148 37.989581 30.188664 37.767578 29.824219 C 37.302009 29.059804 36.774753 29.039853 36.224609 28.767578 C 35.918939 28.616297 35.048661 28.191329 34.175781 27.775391 C 33.303883 27.35992 32.54892 26.991953 32.083984 26.826172 C 31.790239 26.720488 31.431556 26.568352 30.914062 26.626953 C 30.396569 26.685553 29.88546 27.058933 29.587891 27.5 C 29.305837 27.918069 28.170387 29.258349 27.824219 29.652344 C 27.819619 29.649544 27.849659 29.663383 27.712891 29.595703 C 27.284761 29.383815 26.761157 29.203652 25.986328 28.794922 C 25.2115 28.386192 24.242255 27.782635 23.181641 26.847656 L 23.181641 26.845703 C 21.603029 25.455949 20.497272 23.711106 20.148438 23.125 C 20.171937 23.09704 20.145643 23.130901 20.195312 23.082031 L 20.197266 23.080078 C 20.553781 22.728924 20.869739 22.309521 21.136719 22.001953 C 21.515257 21.565866 21.68231 21.181437 21.863281 20.822266 C 22.223954 20.10644 22.02313 19.318742 21.814453 18.904297 L 21.814453 18.902344 C 21.828863 18.931014 21.701572 18.650157 21.564453 18.326172 C 21.426943 18.001263 21.251663 17.580039 21.064453 17.130859 C 20.690033 16.232501 20.272027 15.224912 20.023438 14.634766 L 20.023438 14.632812 C 19.730591 13.937684 19.334395 13.436908 18.816406 13.195312 C 18.298417 12.953717 17.840778 13.022402 17.822266 13.021484 L 17.820312 13.021484 C 17.450668 13.004432 17.045038 13 16.642578 13 z M 16.642578 15 C 17.028118 15 17.408214 15.004701 17.726562 15.019531 C 18.054056 15.035851 18.033687 15.037192 17.970703 15.007812 C 17.906713 14.977972 17.993533 14.968282 18.179688 15.410156 C 18.423098 15.98801 18.84317 16.999249 19.21875 17.900391 C 19.40654 18.350961 19.582292 18.773816 19.722656 19.105469 C 19.863021 19.437122 19.939077 19.622295 20.027344 19.798828 L 20.027344 19.800781 L 20.029297 19.802734 C 20.115837 19.973483 20.108185 19.864164 20.078125 19.923828 C 19.867096 20.342656 19.838461 20.445493 19.625 20.691406 C 19.29998 21.065838 18.968453 21.483404 18.792969 21.65625 C 18.639439 21.80707 18.36242 22.042032 18.189453 22.501953 C 18.016221 22.962578 18.097073 23.59457 18.375 24.066406 C 18.745032 24.6946 19.964406 26.679307 21.859375 28.347656 C 23.05276 29.399678 24.164563 30.095933 25.052734 30.564453 C 25.940906 31.032973 26.664301 31.306607 26.826172 31.386719 C 27.210549 31.576953 27.630655 31.72467 28.119141 31.666016 C 28.607627 31.607366 29.02878 31.310979 29.296875 31.007812 L 29.298828 31.005859 C 29.655629 30.601347 30.715848 29.390728 31.224609 28.644531 C 31.246169 28.652131 31.239109 28.646231 31.408203 28.707031 L 31.408203 28.708984 L 31.410156 28.708984 C 31.487356 28.736474 32.454286 29.169267 33.316406 29.580078 C 34.178526 29.990889 35.053561 30.417875 35.337891 30.558594 C 35.748225 30.761674 35.942113 30.893881 35.992188 30.894531 C 35.995572 30.982516 35.998992 31.07786 35.986328 31.222656 C 35.951258 31.624292 35.8439 32.180225 35.628906 32.775391 C 35.523582 33.066746 34.975018 33.667661 34.283203 34.105469 C 33.591388 34.543277 32.749338 34.852514 32.4375 34.898438 C 31.499896 35.036591 30.386672 35.087027 29.164062 34.703125 C 28.316336 34.437036 27.259305 34.092596 25.890625 33.509766 C 23.114812 32.325956 20.755591 30.311513 19.070312 28.537109 C 18.227674 27.649908 17.552562 26.824019 17.072266 26.199219 C 16.592866 25.575584 16.383528 25.251054 16.208984 25.021484 L 16.207031 25.019531 C 15.897202 24.609805 14 21.970851 14 19.59375 C 14 17.077989 15.168497 16.091436 15.800781 15.410156 C 16.132721 15.052495 16.495617 15 16.642578 15 z"/></svg>
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