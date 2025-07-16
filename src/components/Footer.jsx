import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => (
    <div className="bg-gray-100 pt-20 px-20 max-md:px-5 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center text-center gap-5 max-md:w-full">
            <h1 className="text-5xl font-bold text-black max-sm:text-4xl">Jangan Lewatkan Update Terbaru.</h1>
            <p className="text-lg max-sm:text-sm leading-relaxed text-gray-600">Kami akan mengirimkan kabar terbaru seputar layanan dan informasi penting lainnya langsung ke inbox Anda.</p>
            <form className="w-full border-t-1 border-b-1 p-4 flex gap-5 my-4 max-sm:flex-col max-md:py-6">
                <input
                    type="email"
                    placeholder="Masukkan alamat email kamu"
                    className="w-9/12 max-sm:w-full px-5 py-2 max-md:py-3 bg-zinc-200 focus:outline-none focus:bg-red-50 focus:ring-2 focus:ring-red-300"
                />
                <button className="w-3/12 max-sm:w-full cursor-pointer px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-none hover:bg-red-600 hover:text-white transition">
                    Registrasi Akun
                </button>
            </form>
            <div className="grid grid-cols-4 gap-10 max-sm:gap-5">
                <Link to="/" className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faFacebookF} />
                </Link>
                <Link to="/" className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link to="/" className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faTwitter} />
                </Link>
                <Link to="/" className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faWhatsapp} />
                </Link>
            </div>
        </div>
        <div className='my-10 text-center'>
            <p>© 2025 CityDept | <Link to="/" className='underline'>Contacts</Link> | <Link to="/" className='underline'>Terms of Use</Link> | <Link to="/" className='underline'>Privacy Policy</Link> | <Link to="/" className='underline'>Blog</Link></p>
        </div>
    </div>
);

export default Footer;