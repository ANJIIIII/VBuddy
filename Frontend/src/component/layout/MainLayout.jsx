import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import {
    LayoutDashboard,
    Dog,
    Package,
    ShoppingCart,
    Calendar,
    ClipboardList,
    Menu,
    Bell,
    Search,
    LogOut,
    User,
    ChevronDown,
    Home as HomeIcon
} from 'lucide-react';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { user, isAuthenticated } = useSelector(state => state.auth);

    // Force logout if session is valid but user data is missing (handles legacy sessions)
    React.useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(logout()).then(() => navigate('/login'));
        }
    }, [isAuthenticated, user, dispatch, navigate]);

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/');
        });
    };

    const navItems = [
        { label: 'Home', path: '/', icon: HomeIcon },
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Pet Master', path: '/history', icon: Dog },
        { label: 'Inventory', path: '/inventoryList', icon: Package },
        { label: 'Sales Panel', path: '/saleshistory', icon: ShoppingCart },
        { label: 'Reminders', path: '/reminders', icon: Bell },
        { label: 'Attendance', path: '/attendance', icon: Calendar },
        { label: 'Deboard', path: '/deboard', icon: ClipboardList },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-secondary-50 flex font-sans">
            {/* Sidebar */}
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 bg-secondary-600 text-white transition-all duration-300 ease-in-out transform 
        ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 translate-x-0'} 
        hidden md:flex flex-col shadow-xl border-r border-secondary-700`}
            >
                {/* Brand */}
                <div className="h-20 flex items-center justify-center border-b border-secondary-700 px-4">
                    <div className="w-10 h-10 bg-primary-400 rounded-xl flex items-center justify-center text-xl flex-shrink-0 text-white font-bold shadow-lg shadow-black/20">
                        🐾
                    </div>
                    {isSidebarOpen && (
                        <span className="ml-3 text-xl font-bold tracking-wide text-white">PetCure</span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group
                ${!isSidebarOpen ? 'justify-center' : ''}
                ${isActive(item.path)
                                    ? 'bg-primary-400 text-secondary-900 font-bold shadow-lg shadow-black/20'
                                    : 'text-secondary-200 hover:bg-secondary-700 hover:text-white'
                                }`}
                        >
                            <item.icon className={`w-6 h-6 flex-shrink-0 transition-colors ${isActive(item.path) ? 'text-secondary-900' : 'text-secondary-300 group-hover:text-white'}`} />
                            {isSidebarOpen && (
                                <span className="ml-3 whitespace-nowrap">{item.label}</span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* User Profile Mini */}
                <div className="p-4 border-t border-secondary-700 bg-secondary-800/30">
                    <div className={`flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
                        <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center text-white font-bold ring-2 ring-primary-400">
                            {user?.fullName?.[0] || 'U'}
                        </div>
                        {isSidebarOpen && (
                            <div className="ml-3 overflow-hidden">
                                <p className="text-sm font-semibold text-white truncate">{user?.fullName || 'User'}</p>
                                <p className="text-xs text-secondary-300 truncate">{user?.email}</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>

                {/* Top Header */}
                <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors focus:outline-none"
                        >
                            <Menu size={24} />
                        </button>
                        {/* Dynamic Page Title */}
                        <h1 className="text-2xl font-bold text-secondary-900 hidden sm:block">
                            {navItems.find(item => item.path === location.pathname)?.label ||
                                (location.pathname === '/' ? 'Home' :
                                    location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(1).replace('/', ' '))}
                        </h1>
                    </div>

                    <div className="flex items-center space-x-6">
                        {/* Search Bar Removed as per request */}

                        {/* Notifications */}
                        <button
                            onClick={() => navigate('/reminders')}
                            className="relative p-2 rounded-full text-secondary-500 hover:bg-secondary-100 transition-colors"
                        >
                            <Bell size={22} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        {/* User Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-3 p-1.5 rounded-full hover:bg-secondary-50 transition-colors border border-transparent hover:border-secondary-100"
                            >
                                <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                                    {user?.fullName?.[0] || 'U'}
                                </div>
                                <ChevronDown size={16} className="text-secondary-400" />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-secondary-100 py-2 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="px-4 py-3 border-b border-secondary-100 mb-1">
                                        <p className="text-sm font-semibold text-secondary-900">{user?.fullName || 'User'}</p>
                                        <p className="text-xs text-secondary-500">{user?.role || 'Admin'}</p>
                                    </div>
                                    {/* Home removed from here as it is now in main nav */}
                                    <button onClick={() => navigate('/dashboard')} className="w-full text-left px-4 py-2.5 text-sm text-secondary-700 hover:bg-secondary-50 flex items-center">
                                        <LayoutDashboard size={16} className="mr-2" /> Dashboard
                                    </button>
                                    <button className="w-full text-left px-4 py-2.5 text-sm text-secondary-700 hover:bg-secondary-50 flex items-center">
                                        <User size={16} className="mr-2" /> My Profile
                                    </button>
                                    <div className="border-t border-secondary-100 mt-1"></div>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center font-medium">
                                        <LogOut size={16} className="mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
};

export default MainLayout;
