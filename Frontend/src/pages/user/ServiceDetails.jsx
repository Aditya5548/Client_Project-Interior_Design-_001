import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Loader2,
  CheckCircle,
  IndianRupee,
  Clock,
  ShieldCheck,
} from "lucide-react";

// Local asset for fallback
import DefaultServiceImage from "../../assets/Default_service_image2.jpg";

const serverUrl = "http://localhost:4000";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/services/${id}`);
      setService(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-black" size={48} />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="h-screen flex flex-col justify-center items-center p-6 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Service Not Found</h1>
        <button
          onClick={() => navigate("/services")}
          className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section - Responsive Height */}
      <div className="relative h-[300px] md:h-[450px] w-full">
        <img
          src={service.image || DefaultServiceImage}
          alt={service.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = DefaultServiceImage; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 md:px-6 pb-8 md:pb-12 w-full text-white">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 mb-4 md:mb-6 hover:text-gray-300 transition"
            >
              <ArrowLeft />
              Back
            </button>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{service.title}</h1>
          </div>
        </div>
      </div>

      {/* Details Section - Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold mb-4">About This Service</h2>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Why Choose Us?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: ShieldCheck, text: "Professional Team" },
                  { icon: CheckCircle, text: "Quality Assurance" },
                  { icon: Clock, text: "Fast Delivery" },
                  { icon: CheckCircle, text: "24/7 Support" },
                ].map((item, idx) => (
                  <div key={idx} className="border border-gray-100 bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                    <item.icon className="text-blue-600 flex-shrink-0" size={20} />
                    <span className="font-medium text-gray-700 text-sm md:text-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Stacks on Mobile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg lg:sticky lg:top-5 border border-gray-100">
              <h2 className="text-lg md:text-xl font-bold mb-6">Service Details</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-semibold">Price</p>
                  <div className="flex items-center gap-1 text-3xl md:text-4xl font-bold text-gray-900 mt-1">
                    <IndianRupee size={24} />
                    {service.price}
                  </div>
                </div>

                <div>
                  <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-semibold">Availability</p>
                  <div className={`mt-2 inline-flex px-4 py-1.5 rounded-full text-sm font-semibold ${
                      service.availability ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    }`}>
                    {service.availability ? "Available Now" : "Currently Unavailable"}
                  </div>
                </div>

                <button 
                  disabled={!service.availability}
                  className={`w-full py-3 md:py-4 rounded-xl font-bold transition-all ${
                    service.availability 
                    ? "bg-black text-white hover:bg-gray-800" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {service.availability ? "Book Service Now" : "Unavailable"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;