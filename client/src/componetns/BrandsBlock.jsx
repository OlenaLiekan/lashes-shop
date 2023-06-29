import React from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/scss";
import axios from "axios";


const BrandsBlock = () => {

  const [brands, setBrands] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:3001/api/brand`)
      .then((res) => {
        setBrands(res.data);
      });
    console.log(brands);
  }, []);

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
                  >                        {
                  brands.map((brand) => 
                    <SwiperSlide key={brand.id}>
                      <div className="block-companies__slide slide-companies-block">
                        <div className="slide-companies-block__content">
                            <Link to="" className="slide-companies-block__image">
                              <img src={'http://localhost:3001/' + brand.img}  alt="brand"/>
                            </Link>   
                        </div>
                      </div>
                    </SwiperSlide>                       
                          )
                          }

                  </Swiper>
                </div>
              </div>
            </div>
          </div> 
        </section>
    );
};

export default BrandsBlock;