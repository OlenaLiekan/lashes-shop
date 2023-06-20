import React from "react";
import { Link } from "react-router-dom";

import brand1 from "../assets/img/companies/logos/mia_logo.png";
import brand3 from "../assets/img/companies/logos/sculptor_logo.png";
import brand2 from "../assets/img/companies/logos/lami_logo.png";
import brand4 from "../assets/img/companies/logos/maxi_logo.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/scss";


const BrandsBlock = () => {
    return (
        <section className="companies__block block-companies">
          <div className="block-companies__container">
            <div className="block-companies__body">
              <div className="block-companies__slider">
                <div className="block-companies__swiper swiper">
                
                  <Swiper
                    modules={[Autoplay]}
                    autoplay={true}
                    loop={true}                  
                    spaceBetween={20}
                    slidesPerView={1}
                    speed={3000}
                  >
                    <SwiperSlide>
                      <div className="block-companies__slide slide-companies-block">
                        <div className="slide-companies-block__content">
                          <Link to="" className="slide-companies-block__image">
                            <img src={brand1}  alt="brand"/>
                          </Link>
                          <Link to="" className="slide-companies-block__image">
                            <img src={brand2}  alt="brand"/>
                          </Link>
                          <Link to="" className="slide-companies-block__image">
                            <img src={brand3}  alt="brand"/>
                          </Link>
                          <Link to="" className="slide-companies-block__image">
                            <img src={brand4}  alt="brand"/>
                          </Link>                        
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="block-companies__slide slide-companies-block">
                        <div className="slide-companies-block__content">
                          <Link to="" className="slide-companies-block__image">
                            <img src={brand1}  alt="brand"/>
                          </Link>
                          <Link to="" className="slide-companies-block__image">
                            <img src={brand2}  alt="brand"/>
                          </Link> 
                          <Link to="" className="slide-companies-block__image">
                            <img src={brand3}  alt="brand"/>
                          </Link> 
                          <Link to="" className="slide-companies-block__image">
                            <img src={brand4}  alt="brand"/>
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

export default BrandsBlock;