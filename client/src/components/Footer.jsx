import { ArrowRight, Mail } from "lucide-react";
import { FiFacebook } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram, FaGithub } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const handleSubscribe = () => {
    toast.success("Subscribed successfully!");
  };
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-white flex items-center gap-1 mb-4"
            >
              Movie<span className="text-red-600">Hub</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for the latest movies, reviews, and
              trailers. Experience the magic of cinema right at your fingertips.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                className="hover:text-red-500 transition-colors"
              >
                <FiFacebook size={20} />
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                className="hover:text-red-500 transition-colors"
              >
                <RiTwitterXFill size={20} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                className="hover:text-red-500 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                className="hover:text-red-500 transition-colors"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-red-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-red-500 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-red-500 transition-colors"
                >
                  All Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-red-500 transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-red-500 transition-colors"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Action
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Adventure
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Sci-Fi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Fantasy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Horror
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for new releases and top rated movies.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
        <hr className="border-gray-800 my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} MovieHub. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-red-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
