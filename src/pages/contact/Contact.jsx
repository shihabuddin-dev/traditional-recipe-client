import React, { useRef, useState } from "react";
import contact from '../../assets/contact.svg';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
    const formRef = useRef(null);
    const [sending, setSending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        // Reset form fields after 2s
        setTimeout(() => {
            setSending(false);
            if (formRef.current) formRef.current.reset();
            Swal.fire({
                icon: "success",
                title: "Message sent!",
                text: "Thank you for contacting us. We'll get back to you soon.",
                timer: 1800,
                showConfirmButton: false,
            });
        }, 2000);
    };

    return (
        <section className="max-w-4xl mx-auto px-2 sm:px-4 text-base-content">
            <h2 className="text-3xl md:text-4xl font-semibold mb-2 flex justify-center items-center text-cente gap-2">
                Contact Us
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 mb-8 md:mb-12">
                <div className="flex-1 flex justify-center mb-4 md:mb-0">
                    <img src={contact} alt="Contact Illustration" className="w-full max-w-[220px] sm:max-w-xs md:max-w-md h-[140px] sm:h-[200px] md:h-[320px] object-contain" />
                </div>
                <div className="flex-1 text-center md:text-left">

                    <p className="text-xs sm:text-sm md:text-base text-base-content/70 mb-3">
                        Have a question, suggestion, or just want to say hello? Fill out the form or reach us directly. We love to connect with our food-loving community!
                    </p>
                    <div className="flex flex-col gap-2 items-center md:items-start mb-3">
                        <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base"><FaEnvelope className="text-orange-500" /> info@traditionalrecipe.com</div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base"><FaPhoneAlt className="text-orange-500" /> +880 1234-567890</div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base"><FaMapMarkerAlt className="text-orange-500" /> Bogura, Bangladesh</div>
                        <div className="flex gap-3 mt-1">
                            <a href="#" className="hover:text-orange-500 text-xs sm:text-base" aria-label="Facebook"><FaFacebookF /></a>
                            <a href="#" className="hover:text-orange-500 text-xs sm:text-base" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" className="hover:text-orange-500 text-xs sm:text-base" aria-label="Twitter"><FaTwitter /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-base-100 rounded-2xl shadow p-4 sm:p-6 md:p-8 max-w-xl mx-auto">
                <form ref={formRef} className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="flex-1 px-3 py-2 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xs sm:text-sm bg-base-200 shadow-sm"
                            required
                            disabled={sending}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="flex-1 px-3 py-2 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xs sm:text-sm bg-base-200 shadow-sm"
                            required
                            disabled={sending}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Subject (optional)"
                        className="px-3 py-2 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xs sm:text-sm bg-base-200 shadow-sm"
                        disabled={sending}
                    />
                    <textarea
                        placeholder="Your Message"
                        rows={3}
                        className="px-3 py-2 rounded-2xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xs sm:text-sm bg-base-200 shadow-sm resize-none"
                        required
                        disabled={sending}
                    ></textarea>
                    <div className="flex items-center gap-2 mt-1">
                        <input type="checkbox" id="newsletter" className="accent-orange-500" disabled={sending} />
                        <label htmlFor="newsletter" className="text-xs sm:text-sm text-base-content/70 cursor-pointer">Subscribe to our newsletter</label>
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-5 py-2 mt-1 text-xs sm:text-sm transition-colors duration-200 shadow-md tracking-wide flex items-center justify-center gap-2"
                        disabled={sending}
                    >
                        {sending ? (
                            <>
                                <span className="loader border-2 border-white border-t-orange-500 rounded-full w-4 h-4 animate-spin"></span>
                                Sending...
                            </>
                        ) : (
                            "Send Message"
                        )}
                    </button>
                </form>
                <div className="mt-6 text-center text-xs sm:text-sm text-base-content/60">
                    <p>Looking for partnership or collaboration? <a href="mailto:info@traditionalrecipe.com" className="text-orange-500 underline hover:text-orange-600">Email us directly</a>.</p>
                    <p className="mt-1">Our team will get back to you within 24 hours.</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;