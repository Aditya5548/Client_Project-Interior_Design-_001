import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, MapPin, IndianRupee, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import defaultServiceImage from "../assets/default_service_image.jpg";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFeaturedServices = () => services.slice(0, 4);

  const fetchServices = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/services");

      setServices(data.services || data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      <section className="relative h-[60vh] overflow-hidden ">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1800')",
          }}
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tighter">
                Design Your Dream Space
              </h1>

              <p className="text-gray-200 mt-5 text-base md:text-lg max-w-xl">
                Premium interior design solutions for homes, offices,
                restaurants and luxury spaces.
              </p>

              <div className="mt-8 flex gap-3 flex-wrap">
                <Link
                  to="/services"
                  className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-slate-100 transition focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                >
                  Explore Services
                </Link>

                <Link
                  to="/register"
                  className="border border-white/40 text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 hover:border-white/60 transition focus:ring-2 focus:ring-white"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 md:py-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-3">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Services</h2>

            <p className="text-slate-500 mt-1.5 text-sm">
              Premium interior solutions for every space.
            </p>
          </div>

          <Link
            to="/services"
            className="flex items-center gap-1.5 bg-black text-white px-5 py-2.5 rounded-md font-medium text-sm group hover:bg-black/90 transition"
          >
            View All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48 py-20 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : getFeaturedServices().length === 0 ? (
          <div className="text-center py-16 text-slate-500 border border-slate-200 rounded-lg">
            No services available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getFeaturedServices().map((service) => (
              <div
                key={service._id}
                className="group bg-white rounded-lg overflow-hidden border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <img
                  src={service.image || defaultServiceImage}
                  alt={service.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = defaultServiceImage;
                  }}
                />

                <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
                  <h3 className="font-bold text-base tracking-tight text-slate-950">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-4 h-4 text-emerald-600" />
                      ₹{service.price}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-sky-600" />
                      {service.location}
                    </div>
                  </div>

                  <Link
                    to={`/service/${service._id}`}
                    className="inline-flex justify-center items-center gap-1.5 mt-5 bg-black text-white px-4 py-2.5 rounded-md font-medium text-sm group/btn hover:bg-black/90 transition w-full"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-slate-950 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight">
            Transform Your Space Today
          </h2>

          <p className="text-gray-300 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Connect with expert designers and create a beautiful environment that
            reflects your style.
          </p>

          <Link
            to="/register"
            className="inline-block mt-10 bg-white text-black px-6 py-3.5 rounded-md font-semibold text-lg hover:bg-slate-100 transition focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;