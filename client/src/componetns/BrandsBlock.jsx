import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { setBrandId } from '../redux/slices/filterSlice';
import { AuthContext } from "../context";
import axios from "axios";
import "swiper/scss";

const BrandsBlock = () => {

  const { isAuth, adminMode, createMode, setCreateMode } = React.useContext(AuthContext);
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
                  {isAuth && adminMode && !createMode ? 
                  <SwiperSlide>                 
                    <div className="block-companies__slide slide-companies-block">
                      <div className="slide-companies-block__content">
                        <div className='slide-companies-block__add' onClick={() => setCreateMode(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" />
                            </svg>                                        
                        </div>
                      </div>
                    </div>                  
                    </SwiperSlide>  
                    : ''
                  }
                  
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