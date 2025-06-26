import { FaLeaf, FaRegSmileBeam, FaClock, FaStar, FaUtensils, FaGlobe, FaMobileAlt, FaUserFriends } from "react-icons/fa";
import chef from '../../assets/chefs/chef-omar.jpg'
import logo from '../../assets/logo.png'

const About = () => {
    return (
        <section className="max-w-5xl mx-auto px-4 text-base-content">
            <h2 className="text-3xl md:text-4xl font-semibold mb-2 flex justify-center items-center text-center">
                About Traditional Recipe
            </h2>
            {/* Header Section */}
            <div className="mt-10 flex flex-col md:flex-row items-center gap-10 mb-12">

                <div className="flex-1 text-center md:text-center">


                    <p className="mb-4 text-base-content/80">
                        <span className="font-semibold text-orange-600">Traditional Recipe</span> is your gateway to a world of authentic, time-honored recipes from every corner of the globe. Our mission is to preserve culinary heritage and make it accessible to everyone, everywhere.
                    </p>
                    <p className="mb-4 text-base-content/70">
                        Built with <span className="font-semibold">React</span> and <span className="font-semibold">Firebase</span>, our platform offers a seamless, interactive, and mobile-friendly experience. Whether you’re a home cook, a food enthusiast, or a professional chef, you’ll find inspiration and community here.
                    </p>
                </div>
                <div className="flex-1 flex justify-center">
                    <img
                        src={logo}
                        alt="Traditional Recipe Logo"
                        className="w-36 h-36 md:w-48 md:h-48 object-contain rounded-full shadow-lg border-4 border-orange-200 bg-white hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-14">
                <div className="flex items-start gap-4 bg-base-100 rounded-xl p-5 shadow hover:shadow-lg transition-shadow duration-300">
                    <FaGlobe className="text-3xl text-green-600 mt-1" />
                    <div>
                        <h3 className="text-xl font-semibold mb-1">Global Cuisines</h3>
                        <p className="text-base-content/70">Explore 100+ authentic recipes from different cultures, each with its own story and flavor.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 bg-base-100 rounded-xl p-5 shadow hover:shadow-lg transition-shadow duration-300">
                    <FaMobileAlt className="text-3xl text-blue-500 mt-1" />
                    <div>
                        <h3 className="text-xl font-semibold mb-1">Responsive Design</h3>
                        <p className="text-base-content/70">Enjoy a beautiful, mobile-optimized interface for cooking on any device, anytime.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 bg-base-100 rounded-xl p-5 shadow hover:shadow-lg transition-shadow duration-300">
                    <FaUserFriends className="text-3xl text-amber-500 mt-1" />
                    <div>
                        <h3 className="text-xl font-semibold mb-1">Community Driven</h3>
                        <p className="text-base-content/70">Share your own recipes, comment, and connect with food lovers around the world.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 bg-base-100 rounded-xl p-5 shadow hover:shadow-lg transition-shadow duration-300">
                    <FaStar className="text-3xl text-yellow-400 mt-1" />
                    <div>
                        <h3 className="text-xl font-semibold mb-1">Top Rated & Trusted</h3>
                        <p className="text-base-content/70">Recipes loved by thousands of home cooks and foodies worldwide.</p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-base-200 rounded-2xl p-8 shadow flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 mb-6 md:mb-0">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 flex items-center gap-2 text-orange-600">
                        <FaRegSmileBeam className="text-2xl md:text-3xl" /> Why Choose Us?
                    </h2>
                    <ul className="list-none pl-0 space-y-3 text-base md:text-lg">
                        <li className="flex items-center gap-3"><FaLeaf className="text-green-500" /> Fresh, healthy, and seasonal ingredients</li>
                        <li className="flex items-center gap-3"><FaClock className="text-blue-500" /> Quick & simple step-by-step instructions</li>
                        <li className="flex items-center gap-3"><FaStar className="text-yellow-400" /> Top rated by our community</li>
                        <li className="flex items-center gap-3"><FaUtensils className="text-orange-500" /> Easy navigation for all ages and skill levels</li>
                    </ul>
                </div>
                <div className="flex-1 flex flex-col items-center">
                    <img
                        src={chef}
                        alt="Featured Chef"
                        className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full border-4 border-orange-300 shadow mb-3 hover:scale-105 transition-transform duration-300"
                    />
                    <span className="text-base font-semibold text-orange-600">Meet our expert chefs!</span>
                </div>
            </div>
        </section>
    );
};

export default About;