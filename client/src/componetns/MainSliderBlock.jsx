import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

import { Link } from "react-router-dom";

import "../scss/navigation.scss";
import "swiper/scss";
import "../scss/pagination.scss";

import img1 from "../assets/img/slider/01.png";
import img2 from "../assets/img/slider/02.jpg";
import img3 from "../assets/img/slider/03.jpg";


const MainSliderBlock = () => {
    return (
        <section className="main__block block-main">
          <div className="block-main__container">
            <div className="block-main__body">
              <div className="block-main__slider">
                <div className="block-main__swiper swiper">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={true}
                    spaceBetween={10}
                    slidesPerView={1}
                    speed={2000}
                    loop={true}
                  >
                    <SwiperSlide>
                        <div className="block-main__slide slide-main-block">
                        <div className="slide-main-block__content">
                          <Link to="" className="slide-main-block__image">
                            <img src={img1} alt="slide"/>
                          </Link>
                        </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="block-main__slide slide-main-block">
                        <div className="slide-main-block__content">
                          <Link to="" className="slide-main-block__image">
                            <img src={img2}  alt="slide"/>
                          </Link>
                        </div>
                      </div>                    
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="block-main__slide slide-main-block">
                        <div className="slide-main-block__content">
                          <Link to="" className="slide-main-block__image">
                            <img src={img3}  alt="slide"/>
                          </Link>
                        </div>
                      </div>                    
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};

export default MainSliderBlock;