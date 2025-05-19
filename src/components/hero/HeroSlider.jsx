import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/parallax";

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

const HeroSlider = () => {
  const images = [
    { src: hero1, title: "Beautiful Landscape", subtitle: "Explore nature" },
    { src: hero2, title: "City Lights", subtitle: "Urban adventures" },
    { src: hero3, title: "Mountain View", subtitle: "Breathtaking heights" },
    { src: hero4, title: "Ocean Breeze", subtitle: "Feel the waves" },
    { src: hero5, title: "Desert Sunset", subtitle: "Golden horizons" },
    { src: hero6, title: "Forest Trail", subtitle: "Nature's path" },
    { src: hero7, title: "Winter Wonderland", subtitle: "Frozen beauty" },
    { src: hero8, title: "Autumn Colors", subtitle: "Seasonal magic" },
    { src: hero9, title: "Spring Blossoms", subtitle: "New beginnings" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
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
            <div className="group relative rounded-2xl overflow-hidden h-[240px] md:h-[300px] lg:h-[400px]">
              <img
                src={image.src}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover brightness-80 group-hover:brightness-100 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                  {image.title}
                </h2>
                <p className="text-lg md:text-xl opacity-90">
                  {image.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.6;
          width: 10px;
          height: 10px;
          transition: all 0.3s;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 30px;
          border-radius: 5px;
        }
        .hero-swiper .swiper-slide {
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
