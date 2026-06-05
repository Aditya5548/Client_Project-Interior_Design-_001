import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Search, IndianRupee, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import defaultServiceImage from "../assets/default_service_image.jpg";

const FullServices = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, categoriesRes] = await Promise.all([
        axios.get("https://client-project-interior-design-001.onrender.com/api/services"),
        axios.get("https://client-project-interior-design-001.onrender.com/api/categories"),
      ]);
      console.log(servicesRes);
      setServices(
        servicesRes.data.services || servicesRes.data || []
      );

      setCategories(
        categoriesRes.data.categories || categoriesRes.data || []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const search = searchTerm.toLowerCase().trim();
      const title = service.title?.toLowerCase() || "";
      const description = service.description?.toLowerCase() || "";
      const slug = service.slug?.toLowerCase() || "";
      const categoryName = service.category?.name?.toLowerCase() || "";
      const priceText = String(service.price || "");

      const locations = Array.isArray(service.locations)
        ? service.locations
            .map((loc) => {
              if (typeof loc === "object") {
                return loc.name || loc.city || loc.locationName || "";
              }
              return String(loc);
            })
            .join(" ")
            .toLowerCase()
        : "";

      const matchesSearch =
        search === "" ||
        title.includes(search) ||
        description.includes(search) ||
        slug.includes(search) ||
        categoryName.includes(search) ||
        priceText.includes(search) ||
        locations.includes(search);

      const matchesCategory =
        selectedCategory === "all"
          ? true
          : service.category?._id === selectedCategory ||
            service.category === selectedCategory;

      const servicePrice = Number(service.price) || 0;

      let matchesPrice = true;

      switch (priceRange) {
        case "0-5000":
          matchesPrice = servicePrice >= 0 && servicePrice <= 5000;
          break;
        case "5000-10000":
          matchesPrice = servicePrice > 5000 && servicePrice <= 10000;
          break;
        case "10000-25000":
          matchesPrice = servicePrice > 10000 && servicePrice <= 25000;
          break;
        case "25000-50000":
          matchesPrice = servicePrice > 25000 && servicePrice <= 50000;
          break;
        case "50000+":
          matchesPrice = servicePrice > 50000;
          break;
        default:
          matchesPrice = true;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [services, searchTerm, selectedCategory, priceRange]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            All Interior Services
          </h1>

          <p className="text-gray-300 mt-4">
            Explore our complete range of interior design services.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters Container */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-4">
            
            {/* Search Input (Takes up remaining space on desktop) */}
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full lg:w-56 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black bg-white transition"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Price Dropdown */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full lg:w-52 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black bg-white transition"
            >
              <option value="all">All Prices</option>
              <option value="0-5000">₹0 - ₹5,000</option>
              <option value="5000-10000">₹5,000 - ₹10,000</option>
              <option value="10000-25000">₹10,000 - ₹25,000</option>
              <option value="25000-50000">₹25,000 - ₹50,000</option>
              <option value="50000+">₹50,000+</option>
            </select>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setPriceRange("all");
              }}
              className="w-full lg:w-auto whitespace-nowrap bg-black text-white px-8 py-3 rounded-xl hover:bg-slate-800 transition font-medium"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Services List Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Available Services</h2>
          <span className="text-slate-500 font-medium">
            {filteredServices.length} Services Found
          </span>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-20 text-lg font-medium text-slate-500">
            Loading Services...
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow">
            <h3 className="text-2xl font-bold text-slate-800">
              No Services Found
            </h3>
            <p className="text-slate-500 mt-3">
              Try changing your search, category or price filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition duration-300"
              >
                <img
                  src={defaultServiceImage}
                  alt={service.title}
                  className="h-60 w-full object-cover"
                  onError={(e) => {
                    e.target.src = defaultServiceImage;
                  }}
                />

                <div className="p-5 flex flex-col h-[calc(100%-15rem)]">
                  <h3 className="text-xl font-bold line-clamp-1">
                    {service.title}
                  </h3>

                  <p className="text-slate-500 mt-3 text-sm line-clamp-2 flex-grow">
                    {service.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-green-600 font-bold">
                      <IndianRupee size={18} />
                      {service.price?.toLocaleString()}
                    </div>

                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                      Available
                    </span>
                  </div>

                  {service.locations?.length > 0 && (
                    <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
                      <MapPin size={15} />
                      {service.locations.length} Locations
                    </div>
                  )}

                  <Link to={`/service/${service._id}`} className="mt-5 block w-full">
                    <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-slate-800 transition font-medium">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FullServices;