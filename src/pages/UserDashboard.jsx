import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const UserDashboard = () => {
    const [hotels, setHotels] = useState([]);  // Stores fetched hotels
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const hotelsPerPage = 8;  // Show 8 hotels per page

    // Fetch paginated hotels from Flask API
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/hotels?page=${currentPage}&per_page=${hotelsPerPage}`);
                setHotels(response.data.hotels);
                setTotalPages(response.data.total_pages);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching hotels:", error);
                setError("Failed to load hotels. Please try again.");
                setLoading(false);
            }
        };
        fetchHotels();
    }, [currentPage]);

    // Filter hotels based on search input
    const filteredHotels = hotels.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col overflow-auto">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>

                    {/* Search Bar */}
                    <div className="mb-6 flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                        <input
                            type="text"
                            placeholder="Search hotels..."
                            className="w-full p-3 outline-none text-gray-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="bg-gray-700 p-3 text-white">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Loading & Error Handling */}
                    {loading && <p>Loading hotels...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Responsive Grid for Hotel Cards */}
                    {!loading && !error && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredHotels.map((hotel) => (
                                    <Link key={hotel.hid} to={`/user-dashboard/hotel/${hotel.hid}`} className="transform transition-transform hover:scale-105">
                                        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all">
                                            <img src={hotel.image_url || "https://source.unsplash.com/300x200/?hotel"} alt={hotel.name} className="w-full h-40 object-cover" />
                                            <CardHeader>
                                                <CardTitle>{hotel.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-600">📍 {hotel.city}, {hotel.location}</p>
                                                <p className="text-yellow-500 font-semibold">⭐ {hotel.rating}/5</p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-6">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                className={`cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                            />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <span className="text-lg px-4 py-2">{currentPage} / {totalPages}</span>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext
                                                className={`cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                                                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
