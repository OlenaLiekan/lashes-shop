import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/scss";
import axios from "axios";
import { setBrandId } from '../redux/slices/filterSlice';

const BrandsBlock = () => {


  const [brands, setBrands] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios.get(`http://localhost:3001/api/brand`)
      .then((res) => {
        setBrands(res.data);
      });
  }, []);

  const onChangeBrand = (id) => {
    dispatch(setBrandId(id));
  }

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
                      <div  className="block-companies__slide slide-companies-block">
                        <div className="slide-companies-block__content">
                          {brands.map((brand) => 
                            brand.id < 5
                            ?
                            <Link key={brand.name} to={`/produtos`} onClick={() => onChangeBrand(brand.id)} className="slide-companies-block__image">
                              <img src={'http://localhost:3001/' + brand.img}  alt="brand"/>
                            </Link>                          
                            :
                            ''
                          )
                          }
                        </div>
                      </div>                  
                    </SwiperSlide>   
                    <SwiperSlide>                 
                      <div  className="block-companies__slide slide-companies-block">
                        <div className="slide-companies-block__content">
                          {brands.map((brand) => 
                            brand.id > 4
                            ?
                            <Link key={brand.name} to={`/produtos`} onClick={() => onChangeBrand(brand.id)} className="slide-companies-block__image">
                              <img src={'http://localhost:3001/' + brand.img}  alt="brand"/>
                            </Link>                          
                            :
                            ''
                          )
                          }
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