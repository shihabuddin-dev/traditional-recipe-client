import React, { useState, useRef } from 'react';
import foodImg from '../../assets/gallery/14.jpg';
import Button from '../ui/Button';
import Swal from 'sweetalert2';

const NewsLater = () => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Subscribed!',
                text: 'You have successfully subscribed to our newsletter. Check your email for confirmation.',
                timer: 2000,
                showConfirmButton: false,
            });
            if (formRef.current) {
                formRef.current.reset();
            }
        }, 2000);
    };

    return (
        <section className="w-full max-w-4xl mx-auto my-12 px-4">
            <div className="flex flex-col md:flex-row items-center rounded-2xl shadow-sm overflow-hidden border border-orange-200">
                {/* Food Image */}
                <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-base-100  md:border-r-1 border-orange-200">
                    <img
                        src={foodImg}
                        alt="Delicious food"
                        className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full shadow-sm border-4 border-orange-200"
                    />
                </div>
                {/* Newsletter Content */}
                <div className="w-full md:w-1/2 p-6 flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-semibold text-orange-600 mb-2">Join Our Recipe Newsletter!</h2>
                    <p className="text-sm md:text-base mb-4">Get the latest traditional recipes, kitchen tips, and exclusive offers delivered to your inbox. Fresh, tasty, and inspiring—just like our food!</p>
                    <form ref={formRef} className="w-full flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
                        <input
                            name='email'
                            type="email"
                            required
                            placeholder="Enter your email"
                            className="w-full border-1 border-base-content/20 px-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition duration-200 bg-base-100 text-base-content"
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2"><span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>Loading...</span>
                            ) : (
                                'Subscribe'
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewsLater;