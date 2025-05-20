import React from 'react';
import { useLoaderData } from 'react-router';

const AllRecipes = () => {
    const allRecipes= useLoaderData()
    console.log(allRecipes)
    return (
        <div>
            <div>
               aadf
            </div>
        </div>
    );
};

export default AllRecipes;