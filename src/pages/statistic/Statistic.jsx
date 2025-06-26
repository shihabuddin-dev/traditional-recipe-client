import React from 'react';
import { useLoaderData } from 'react-router';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#FF6666', '#A28CFF'];

const Statistic = () => {
    const recipes = useLoaderData();

    // Prepare data for charts
    // For PieChart: show number of recipes per cuisine
    const cuisineCount = {};
    recipes.forEach(r => {
        cuisineCount[r.cuisine] = (cuisineCount[r.cuisine] || 0) + 1;
    });
    const pieData = Object.entries(cuisineCount).map(([cuisine, count]) => ({
        name: cuisine,
        value: count,
    }));

    // For BarChart: show likes per recipe
    const barData = recipes.map(r => ({
        title: r.title,
        likes: r.likes,
    }));

    return (
        <section className="max-w-5xl mx-auto px-2 sm:px-4 py-8">
            <title>Statistics | Traditional Recipe</title>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-orange-600">Site Statistics</h2>
            <div className="grid gap-5 lg:grid-cols-2">
                {/* Pie Chart */}
                <div className="bg-base-100 rounded-xl shadow p-4 flex flex-col items-center w-full">
                    <h3 className="text-base md:text-lg font-semibold mb-2 text-orange-500 text-center">Recipes by Cuisine</h3>
                    <div className="w-full h-[280px] sm:h-[260px] py-4">
                        <ResponsiveContainer width="100%" height="110%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#FF8042"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                {/* Bar Chart */}
                <div className="bg-base-100 rounded-xl shadow p-4 flex flex-col items-center w-full">
                    <h3 className="text-base md:text-lg font-semibold mb-2 text-orange-500 text-center">Likes per Recipe</h3>
                    <div className="w-full h-[200px] sm:h-[250px]">
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="title" tick={{ fontSize: 7 }} interval={0} angle={-30} textAnchor="end" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="likes" fill="#FF8042">
                                    {barData.map((entry, index) => (
                                        <Cell key={`bar-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Statistic;