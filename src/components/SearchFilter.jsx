import { Search, ArrowUpDown, MapPin } from "lucide-react";
import { useState } from "react";

const SearchFilter = ({ onSearch, onFilter, onSort, onLocationFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationSearchTerm, setLocationSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilter(filter);
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    onSort(sort);
    setShowSortDropdown(false);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    onLocationFilter(location);
    setShowLocationDropdown(false);
    setLocationSearchTerm("");
  };

  const handleLocationSearchChange = (e) => {
    setLocationSearchTerm(e.target.value);
  };

    const filterOptions = [
    { value: "all", label: "Semua", color: "bg-gray-100 text-gray-700" },
    { value: "infrastruktur", label: "Infrastruktur", color: "bg-blue-100 text-blue-700" },
    { value: "akses", label: "Aksesibilitas", color: "bg-purple-100 text-purple-700" },
    { value: "transportasi", label: "Transportasi", color: "bg-green-100 text-green-700" },
    { value: "jalan", label: "Kondisi Jalan", color: "bg-red-100 text-red-700" }
    ];


  const sortOptions = [
    { value: "newest", label: "Terbaru" },
    { value: "oldest", label: "Terlama" },
    { value: "popular", label: "Terpopuler" },
    { value: "views", label: "Paling Dilihat" }
  ];

const locationOptions = [
  { value: "all", label: "Semua Lokasi" },
  { value: "Jl. Sudirman", label: "Jl. Sudirman" },
  { value: "Jl. Thamrin", label: "Jl. Thamrin" },
  { value: "Jl. HR Rasuna Said", label: "Jl. HR Rasuna Said" },
  { value: "Jl. Ahmad Yani", label: "Jl. Ahmad Yani" },
  { value: "Jl. Diponegoro", label: "Jl. Diponegoro" },
  { value: "Jl. Gatot Subroto", label: "Jl. Gatot Subroto" }
];

  // Filter location options based on search term
  const filteredLocationOptions = locationOptions.filter(option =>
    option.label.toLowerCase().includes(locationSearchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Search Bar with Sort and Location */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari laporan..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3 md:gap-3">
        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ArrowUpDown className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700 text-sm">Urutkan</span>
          </button>

          {showSortDropdown && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                    selectedSort === option.value ? 'bg-blue-50 text-blue-700' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Location Dropdown with Search */}
        <div className="relative">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700 text-sm">
              {locationOptions.find(option => option.value === selectedLocation)?.label || "Location"}
            </span>
          </button>

          {showLocationDropdown && (
            <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {/* Search input inside dropdown */}
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Cari lokasi..."
                    value={locationSearchTerm}
                    onChange={handleLocationSearchChange}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              
              {/* Location options */}
              <div className="max-h-48 overflow-y-auto">
                {filteredLocationOptions.length > 0 ? (
                  filteredLocationOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleLocationChange(option.value)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        selectedLocation === option.value ? 'bg-blue-50 text-blue-700' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500 text-sm">
                    Tidak ada lokasi yang ditemukan
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 items-center">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleFilterChange(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedFilter === option.value
                ? option.color
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;