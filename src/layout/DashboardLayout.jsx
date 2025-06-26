import React, { use } from "react";
import { Outlet, NavLink, Link } from "react-router";
import { FaHome, FaClipboardList, FaRegSave, FaPlus, FaSignOutAlt, FaUserCircle, FaBars } from "react-icons/fa";
import logo from "../assets/logo.png";
import { FirebaseAuthContext } from "../provider/FirebaseAuthContext";
import Button from "../components/ui/Button";
import Swal from "sweetalert2";

const DashboardLayout = () => {
    const { logOutUser } = use(FirebaseAuthContext);


    // logout user
    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!",
        }).then((result) => {
            if (result.isConfirmed) {
                logOutUser();
                Swal.fire({
                    title: "Logged out!",
                    text: "You have been logged out.",
                    icon: "success",
                })
                    .then(() => { })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            title: "Error!",
                            text: "Logout failed.",
                            icon: "error",
                        });
                    });
            }
        });
    };

    // Helper to close sidebar on mobile
    const closeSidebarOnMobile = () => {
        if (window.innerWidth < 768) {
            document.getElementById('dashboard-sidebar').classList.add('hidden');
        }
    };

    return (
        <div className="min-h-screen bg-base-100 flex flex-col md:flex-row">
            {/* Hamburger for mobile */}
            <button
                className="sm:hidden fixed top-4 left-4 z-30 bg-orange-500 text-white p-2 rounded-full shadow-lg focus:outline-none"
                onClick={() => document.getElementById('dashboard-sidebar').classList.toggle('hidden')}
                aria-label="Open sidebar"
            >
                <FaBars className="w-6 h-6" />
            </button>
            {/* Sidebar */}
            <aside id="dashboard-sidebar" className="hidden w-full md:w-64 bg-base-200 border-r border-orange-100 md:flex flex-col items-center py-8 px-4 md:fixed md:h-full z-20">
                <Link to='/' onClick={closeSidebarOnMobile}>  <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-1 rounded-full shadow" /></Link>
                <h2 className="text-xl font-bold text-orange-600 mb-8">Dashboard</h2>
                <nav className="flex flex-col gap-3 w-full">
                    <NavLink to="/dashboard" onClick={closeSidebarOnMobile} className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-orange-50 text-base-content '}`}> <FaHome /> Home </NavLink>
                    <NavLink to="/dashboard/add-recipe" onClick={closeSidebarOnMobile} className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:text-black hover:bg-orange-50 text-base-content'}`}> <FaPlus /> Add Recipe </NavLink>
                    <NavLink to="/dashboard/my-recipes" onClick={closeSidebarOnMobile} className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:text-black hover:bg-orange-50 text-base-content'}`}> <FaClipboardList /> My Recipes </NavLink>
                    <NavLink to="/dashboard/wishlist" onClick={closeSidebarOnMobile} className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:text-black hover:bg-orange-50 text-base-content'}`}> <FaRegSave /> Wishlist </NavLink>
                    <NavLink to="/dashboard/my-profile" onClick={closeSidebarOnMobile} className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${isActive ? 'bg-orange-100 text-orange-600' : 'hover:bg-orange-50 text-base-content'}`}> <FaUserCircle /> My Profile </NavLink>
                    <Button onClick={() => { handleLogOut(); closeSidebarOnMobile(); }} variant="danger" className="flex items-center gap-1"> <FaSignOutAlt /> Sign Out </Button>
                </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 bg-base-100 min-h-screen">
                <div className="bg-base-200 rounded-xl shadow mt-12 md:mt-0 p-4 md:p-8 min-h-screen">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
