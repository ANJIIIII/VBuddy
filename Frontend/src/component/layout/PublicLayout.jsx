import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const PublicLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Public Navbar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justifying-between h-16 items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-xl text-white shadow-lg shadow-primary-500/30">
                                🐾
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                                PetCure
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8 ml-auto">
                            <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Home</Link>
                            <Link to="/aboutus" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">About Us</Link>
                            <Link to="/contact" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Contact</Link>
                            <div className="flex items-center space-x-4 pl-8 border-l border-gray-200">
                                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Log In</Link>
                                <Link to="/signup" className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg shadow-primary-500/20 active:scale-95">
                                    Sign Up
                                </Link>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden ml-auto">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
                        <div className="px-4 py-4 space-y-3">
                            <Link onClick={() => setIsMenuOpen(false)} to="/" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 font-medium hover:text-primary-600">Home</Link>
                            <Link onClick={() => setIsMenuOpen(false)} to="/aboutus" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 font-medium hover:text-primary-600">About Us</Link>
                            <Link onClick={() => setIsMenuOpen(false)} to="/login" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 font-medium hover:text-primary-600">Log In</Link>
                            <Link onClick={() => setIsMenuOpen(false)} to="/signup" className="block w-full text-center py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 shadow-md shadow-primary-500/20">Sign Up</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Content */}
            <main className="flex-grow w-full">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} PetCure. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
