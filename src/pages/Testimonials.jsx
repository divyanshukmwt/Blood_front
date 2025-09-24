import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    name: "Ananya Sharma",
    review:
      "Donating blood through Red Hope was seamless and fulfilling. I feel proud to save lives!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Rahul Verma",
    review:
      "The platform makes it so easy to find blood donors. I highly recommend it to everyone!",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
  },
  {
    id: 3,
    name: "Priya Singh",
    review:
      "A wonderful initiative! Red Hope truly saves lives and spreads hope across communities.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 4,
    name: "Vikram Mehta",
    review:
      "Quick, reliable, and life-saving. Red Hope is changing the way we think about blood donation.",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    id: 5,
    name: "Sonal Kapoor",
    review:
      "This platform helped me donate blood safely and efficiently. Highly recommend it!",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 6,
    name: "Amit Singh",
    review:
      "Red Hope made it easy to help someone in need. Every donation counts!",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gray-50 py-16 px-6 lg:px-32">
      <h2 className="text-4xl font-[oswald] font-bold text-center text-red-700 mb-12">
        What People Say About Us
      </h2>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={3}        // show 3 at a time on desktop
        slidesPerGroup={1}       // slide 1 at a time
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        breakpoints={{
          0: {                   // mobile
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          768: {                 // tablet
            slidesPerView: 2,
            slidesPerGroup: 1,   // move 1 at a time
          },
          1024: {                // desktop
            slidesPerView: 3,
            slidesPerGroup: 1,   // move 1 at a time
          },
        }}
      >

        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-xl p-8 gap-y-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-red-700"
              />
              <p className="text-gray-700 text-lg font-[poppins]">"{t.review}"</p>
              <h3 className="text-red-700 font-[oswald] text-xl mt-2">- {t.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
