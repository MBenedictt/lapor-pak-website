import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchFilter from "../components/SearchFilter";
import ReportCard from "../components/ReportCard";
import Footer from "../components/Footer";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState("newest");
  const [currentLocation, setCurrentLocation] = useState("all");

  // Contoh data dummy
  const sampleReports = [
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
    {
      id: 4,
      title: "Jalan Berlubang di Dekat Pasar Membahayakan Pengendara Motor",
      author: "ojekonline",
      date: "2024-07-08",
      tags: ["#jalanberlubang", "#pengendaramotor", "#keselamatan"],
      views: 456,
      likes: 89,
      comments: 16,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=200&fit=crop",
      isBookmarked: false,
      category: "jalan",
      location: "jl-diponegoro"
    }
  ];

  useEffect(() => {
    setReports(sampleReports);
    setFilteredReports(sampleReports);
  }, []);

  useEffect(() => {
    filterAndSortReports();
  }, [searchTerm, currentFilter, currentSort, currentLocation, reports]);

  const filterAndSortReports = () => {
    let filtered = [...reports];

    // Search
    if (searchTerm) {
      filtered = filtered.filter((report) =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
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
        <div className="px-20 max-md:px-10 pb-20 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredReports.map((report) => (
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReportPage;
