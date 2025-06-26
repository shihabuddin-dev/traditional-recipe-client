import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { FaSearchPlus } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

import img1 from "../../assets/gallery/1.jpg";
import img2 from "../../assets/gallery/2.jpg";
import img3 from "../../assets/gallery/3.jpg";
import img4 from "../../assets/gallery/4.jpg";
import img5 from "../../assets/gallery/5.jpg";
import img6 from "../../assets/gallery/6.jpg";
import img7 from "../../assets/gallery/7.jpg";
import img8 from "../../assets/gallery/8.jpg";
import img9 from "../../assets/gallery/9.jpg";
import img10 from "../../assets/gallery/10.jpg";
import img11 from "../../assets/gallery/11.jpg";
import img12 from "../../assets/gallery/12.jpg";
import img13 from "../../assets/gallery/13.jpg";
import img14 from "../../assets/gallery/14.jpg";
import img15 from "../../assets/gallery/15.jpg";
import img16 from "../../assets/gallery/16.jpg";
import img17 from "../../assets/gallery/17.jpg";
import img18 from "../../assets/gallery/18.jpg";
import img19 from "../../assets/gallery/19.jpg";
import img20 from "../../assets/gallery/20.jpg";
import img21 from "../../assets/gallery/21.jpg";
import img22 from "../../assets/gallery/22.jpg";
import img23 from "../../assets/gallery/23.jpg";
import hero1 from "../../assets/hero/hero-1.jpg";
import hero2 from "../../assets/hero/hero-2.jpg";
import hero3 from "../../assets/hero/hero-3.jpg";
import hero4 from "../../assets/hero/hero-4.avif";
import hero5 from "../../assets/hero/hero-5.avif";
import hero7 from "../../assets/hero/hero-7.jpg";
import hero8 from "../../assets/hero/hero-8.jpg";
import hero9 from "../../assets/hero/hero-9.jpg";
import Spinner from "../../components/ui/Spinner";

const Gallery = () => {
    const images = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
        img10,
        img11,
        img12,
        img13,
        img14,
        img15,
        img16,
        img17,
        img18,
        img19,
        img20,
        img21,
        img22,
        img23,
        hero1,
        hero2,
        hero3,
        hero4,
        hero5,
        hero7,
        hero8,
        hero9,
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
        img10,
        hero3,
        img17,
        img18,
    ];
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(12);

    const fetchMoreImages = () => {
        setVisibleCount((prev) => Math.min(prev + 8, images.length));
    };

    return (
        <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-2 text-center">
                Recipes Gallery
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>

            <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
                <InfiniteScroll
                    dataLength={visibleCount}
                    next={fetchMoreImages}
                    hasMore={visibleCount < images.length}
                    loader={<Spinner />}
                    scrollThreshold={0.95}
                    scrollableTarget={null}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                        {images.slice(0, visibleCount).map((img, idx) => (
                            <div
                                key={idx}
                                className="overflow-hidden rounded-2xl shadow group relative cursor-pointer"
                                onClick={() => {
                                    setOpen(true);
                                    setIndex(idx);
                                }}
                            >
                                <img
                                    src={img}
                                    alt={`Food Gallery ${idx + 1}`}
                                    className="w-full h-40 sm:h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <FaSearchPlus className="text-white text-3xl drop-shadow-lg" />
                                </span>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={images.map((src) => ({ src }))}
                on={{ view: ({ index: i }) => setIndex(i) }}
            />
        </div>
    );
};

export default Gallery;