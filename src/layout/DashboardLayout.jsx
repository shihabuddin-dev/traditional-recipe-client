import React, { use } from "react";
import { Outlet, NavLink, Link } from "react-router";
import { FaHome, FaClipboardList, FaRegSave, FaUserCircle, FaPlus, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import { FirebaseAuthContext } from "../provider/FirebaseAuthContext";

const DashboardLayout = () => {
    const { user, logOutUser } = use(FirebaseAuthContext);

    return (
        <div className="min-h-screen bg-base-100 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-base-200 border-r border-orange-100 flex flex-col items-center py-8 px-4 md:fixed md:h-full z-20">
                <Link to='/'>  <img src={logo} alt="Logo" className="w-16 h-16 mb-4 rounded-full shadow" /></Link>

                <h2 className="text-xl font-bold text-orange-600 mb-8">Dashboard</h2>
                <nav className="flex flex-col gap-3 w-full">
                    <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-orange-50 text-base-content'}`}>
                        <FaHome /> Home
                    </NavLink>
                    <NavLink to="/dashboard/add-recipe" className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-orange-50 text-base-content'}`}>
                        <FaPlus /> Add Recipe
                    </NavLink>
                    <NavLink to="/dashboard/my-recipes" className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-orange-50 text-base-content'}`}>
                        <FaClipboardList /> My Recipes
                    </NavLink>
                    <NavLink to="/dashboard/wishlist" className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-orange-50 text-base-content'}`}>
                        <FaRegSave /> Wishlist
                    </NavLink>
                    <NavLink to="/dashboard/my-profile" className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-orange-50 text-base-content'}`}>
                        <FaUserCircle /> My Profile
                    </NavLink>
                </nav>
                <div className="mt-auto w-full flex flex-col items-center gap-2 pt-8">
                    {user && (
                        <>
                            <img src={user.photoURL || "/src/assets/user-logo.png"} alt="User" className="w-12 h-12 rounded-full border border-orange-400 mb-2" />
                            <span className="font-semibold text-orange-600 text-sm mb-2">{user.displayName || "User"}</span>
                            <button onClick={logOutUser} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition">
                                <FaSignOutAlt /> Logout
                            </button>
                        </>
                    )}
                </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 bg-base-100 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-orange-600">Welcome to your Dashboard</h1>
                    <p className="text-base-content/70 mt-1">Manage your recipes, wishlist, and profile all in one place.</p>
                </div>
                <div className="bg-base-200 rounded-xl shadow p-4 md:p-8 min-h-[60vh]">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
