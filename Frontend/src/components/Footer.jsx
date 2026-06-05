import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xl">
                ID
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Interior Design
                </h2>
                <p className="text-sm text-zinc-400">
                  Luxury Spaces
                </p>
              </div>
            </div>

            <p className="text-zinc-400 leading-7">
              Transform your home and workspace with
              premium interior design solutions,
              modern aesthetics, and expert execution.
            </p>

            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-white hover:text-black transition-all flex items-center justify-center"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-white hover:text-black transition-all flex items-center justify-center"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-white hover:text-black transition-all flex items-center justify-center"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-white hover:text-black transition-all flex items-center justify-center"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-zinc-400">
              <Link
                to="/"
                className="hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/services"
                className="hover:text-white transition"
              >
                Services
              </Link>

              <Link
                to="/projects"
                className="hover:text-white transition"
              >
                Projects
              </Link>

              <Link
                to="/about"
                className="hover:text-white transition"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="hover:text-white transition"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">
              Interior Services
            </h3>

            <div className="flex flex-col gap-3 text-zinc-400">
              <span>Living Room Design</span>
              <span>Bedroom Design</span>
              <span>Modular Kitchen</span>
              <span>Office Interior</span>
              <span>False Ceiling</span>
              <span>Full Home Interior</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contact Information
            </h3>

            <div className="space-y-4 text-zinc-400">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-1"
                />
                <span>
                  Lucknow, Uttar Pradesh,
                  India
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>
                  +91 98765 43210
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>
                  info@interiordesign.com
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-zinc-200 transition">
                Request Consultation
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © 2026 Interior Design. All rights
            reserved.
          </p>

          <div className="flex gap-6 text-sm text-zinc-500">
            <Link
              to="/privacy-policy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-and-conditions"
              className="hover:text-white transition"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/refund-policy"
              className="hover:text-white transition"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;