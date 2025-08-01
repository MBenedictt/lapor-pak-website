import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchFilter from "../components/SearchFilter";
import ReportCard from "../components/ReportCard";
import Footer from "../components/Footer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/Pagination";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState("newest");
  const [currentLocation, setCurrentLocation] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // 6 items per page for better grid layout

  // Contoh data dummy
  const sampleReports = [
    {
      id: 1,
      title: "Lampu Lalu Lintas Mati di Perempatan Jalan Sudirman",
      author: "warga01",
      date: "2024-07-14",
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
      views: 789,
      likes: 123,
      comments: 23,
      image: "https://asset-2.tstatic.net/kupang/foto/bank/images/Angkota-Kupang-Mogok.jpg",
      isBookmarked: false,
      category: "transportasi",
      location: "Jl. Thamrin"
    },
    {
      id: 4,
      title: "Jalan Berlubang di Dekat Pasar Membahayakan Pengendara Motor",
      author: "ojekonline",
      date: "2024-07-08",
      views: 456,
      likes: 89,
      comments: 16,
      image: "https://asset.kompas.com/crops/cOidyNWqHEdnvx2cA9MOo6uFpsg=/0x0:0x0/1200x800/data/photo/2023/05/11/645cba808a376.jpg",
      isBookmarked: false,
      category: "jalan",
      location: "Jl. Diponegoro"
    },
    {
      id: 5,
      title: "Rambu Larangan Parkir Roboh di Persimpangan Utama",
      author: "warga02",
      date: "2024-07-06",
      views: 324,
      likes: 56,
      comments: 8,
      image: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/100/2024/07/09/9-mg2-Rambu-rambu-dilarang-parkir-roboh-ada-juga-yang-sampai-hilang-doni-2-792071909.jpg",
      isBookmarked: false,
      category: "infrastruktur",
      location: "Jl Sudirman"
    },
    {
      id: 6,
      title: "Halte Bus Tidak Terawat dan Kotor",
      author: "penumpang_bus",
      date: "2024-07-05",
      views: 198,
      likes: 34,
      comments: 6,
      image: "https://static.republika.co.id/uploads/images/inpicture_slide/suasana-salah-satu-halte-tmb-di-jalan-perintis-kemerdekaan-_160114180516-234.jpg",
      isBookmarked: true,
      category: "transportasi",
      location: "Jl. Ahmad Yani"
    },
    {
      id: 7,
      title: "Drainase Tersumbat Menyebabkan Banjir",
      author: "warga_rt05",
      date: "2024-07-03",
      views: 567,
      likes: 98,
      comments: 19,
      image: "https://newskaltim.com/wp-content/uploads/2017/08/Tumpukan-sampah-di-drainase-Gunung-Kawi.-int.jpg",
      isBookmarked: false,
      category: "infrastruktur",
      location: "Jl. Thamrin"
    },
    {
      id: 8,
      title: "Pedagang Kaki Lima Menutupi Trotoar",
      author: "pejalan_kaki",
      date: "2024-07-01",
      views: 445,
      likes: 76,
      comments: 14,
      image: "https://media.suara.com/pictures/653x366/2020/04/16/57701-ilustrasi-pedagang-dok-istimewa.jpg",
      isBookmarked: false,
      category: "akses",
      location: "Jl. Diponegoro"
    },
    {
      id: 9,
      title: "Papan Reklame Roboh Menghalangi Jalan",
      author: "saksi_mata",
      date: "2024-06-29",
      views: 623,
      likes: 112,
      comments: 27,
      image: "https://asset-2.tstatic.net/jabar/foto/bank/images/papan-reklame-di-kota-bandung-roboh.jpg",
      isBookmarked: true,
      category: "infrastruktur",
      location: "Jl. Sudirman"
    }
  ];

  useEffect(() => {
    setReports(sampleReports);
    setFilteredReports(sampleReports);
  }, []);

  useEffect(() => {
    filterAndSortReports();
  }, [searchTerm, currentFilter, currentSort, currentLocation, reports]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, currentFilter, currentLocation]);

  const filterAndSortReports = () => {
    let filtered = [...reports];

    // Search
    if (searchTerm) {
      filtered = filtered.filter((report) =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filter by category
    if (currentFilter !== "all") {
      filtered = filtered.filter((report) => report.category === currentFilter);
    }

    // Filter by location
    if (currentLocation !== "all") {
      filtered = filtered.filter((report) =>
        report.location === currentLocation
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (currentSort) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "popular":
          return b.likes - a.likes;
        case "views":
          return b.views - a.views;
        default:
          return 0;
      }
    });

    setFilteredReports(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const handleSort = (sort) => {
    setCurrentSort(sort);
  };

  const handleLocationFilter = (location) => {
    setCurrentLocation(location);
  };

  // Pagination calculations
  const totalItems = filteredReports.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredReports.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show ellipsis for large number of pages
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, currentPage + 2);

      if (start > 1) {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              className="cursor-pointer"
            >
              1
            </PaginationLink>
          </PaginationItem>
        );
        if (start > 2) {
          items.push(
            <PaginationItem key="ellipsis-start">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
      }

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          items.push(
            <PaginationItem key="ellipsis-end">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              className="cursor-pointer"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-[70px]">
        {/* Header Section */}
        <div className="w-full flex flex-col items-center justify-center bg-white px-20 pt-20 pb-10 max-md:px-10 max-md:py-10">
          <h1 className="text-4xl font-bold text-black mb-4 max-sm:text-center">
            Temukan Laporan Terkini
          </h1>

          {/* Search and Filter */}
          <SearchFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            onSort={handleSort}
            onLocationFilter={handleLocationFilter}
          />
        </div>

        {/* Reports Grid */}
        <div className="px-20 max-md:px-10 pb-10 pt-10">
          {/* Results Info */}
          <div className="mb-6">
            <p className="text-gray-600">
              Menampilkan {startIndex + 1}-{Math.min(endIndex, totalItems)} dari {totalItems} laporan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {currentItems.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Tidak ada laporan yang ditemukan untuk pencarian Anda.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                    />
                  </PaginationItem>

                  {renderPaginationItems()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReportPage;