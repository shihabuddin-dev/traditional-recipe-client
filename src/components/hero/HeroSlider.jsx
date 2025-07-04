import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "../../App.css";

// Import your images
import hero1 from "../../assets/hero/hero-1.jpg";
import hero2 from "../../assets/hero/hero-2.jpg";
import hero3 from "../../assets/hero/hero-3.jpg";
import hero4 from "../../assets/hero/hero-4.avif";
import hero5 from "../../assets/hero/hero-5.avif";
import hero6 from "../../assets/hero/hero-6.webp";
import hero7 from "../../assets/hero/hero-7.jpg";
import hero8 from "../../assets/hero/hero-8.jpg";
import hero9 from "../../assets/hero/hero-9.jpg";
import Button from "../ui/Button";
import { Link } from "react-router";

const HeroSlider = () => {
  const images = [
    { src: hero1, title: "Beautiful Pas", subtitle: "Nature Behave" },
    { src: hero2, title: "More Cream", subtitle: "Delicious Adventures" },
    { src: hero3, title: "Natures Platter", subtitle: "Natural Organs" },
    { src: hero4, title: "Ocean Breeze", subtitle: "Feel the waves" },
    { src: hero5, title: "Desert Sunset", subtitle: "Golden horizons" },
    { src: hero6, title: "Tequila Sunrise", subtitle: "Nature's path" },
    { src: hero7, title: "Mix Salad", subtitle: "Salad Forever" },
    { src: hero8, title: "Autumn", subtitle: "Seasonal Food" },
    { src: hero9, title: "Chicken Leg", subtitle: "Spicy and Tasteful" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 bg-base-100">
      <Swiper
        modules={[Autoplay, Pagination, Parallax]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        loop={true}
        speed={800}
        parallax={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={15}
        breakpoints={{
          640: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
        }}
        className="hero-swiper rounded-2xl shadow-xl"
      >
        {images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <div className="group relative rounded-2xl overflow-hidden h-[220px] md:h-[300px] lg:h-[350px] bg-base-200">
              <img
                src={image.src}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover brightness-85 group-hover:brightness-100 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg">
                  {image.title}
                </h2>
                <p className="mb-2 text-lg md:text-xl text-white/90 drop-shadow-lg">
                  {image.subtitle}
                </p>
                <Link to='/all-recipes'>  <Button variant="outline" className="border-white text-white hover:text-black">Explore</Button></Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
