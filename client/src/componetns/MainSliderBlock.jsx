import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

import { Link } from "react-router-dom";

import "../scss/navigation.scss";
import "swiper/scss";
import "../scss/pagination.scss";
import axios from "axios";

const MainSliderBlock = () => {

  const [slides, setSlides] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:3001/api/slide`)
      .then((res) => {
        setSlides(res.data);
    })
  }, [])

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
                {slides.map((slide) => 
                  <SwiperSlide key={slide.id}>
                    <div className="block-main__slide slide-main-block">
                      <div className="slide-main-block__content">
                        <Link to="" className="slide-main-block__image">
                          <img src={`http://localhost:3001/` + slide.img} alt="slide"/>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>                
                )}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default MainSliderBlock;