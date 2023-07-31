import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { setBrandId } from '../redux/slices/filterSlice';
import { AuthContext } from "../context";
import axios from "axios";
import "swiper/scss";
import CreateBrand from "./CreateBrand";
import UpdateBrand from "./UpdateBrand";
import SliderSkeleton from "./SliderSkeleton";

const BrandsBlock = () => {

  const navigate = useNavigate();
  const {
    isAuth,
    adminMode,
    createMode,
    updateMode,
    setCreateMode,
    setUpdateMode
  } = React.useContext(AuthContext);

  const [brands, setBrands] = React.useState([]);
  const [brandItem, setBrandItem] = React.useState({});
  const [id, setId] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:3001/api/brand`)
      .then((res) => {
        setBrands(res.data);
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/api/brand/${id}`)
          .then((res) => {
              setBrandItem(res.data);
          }); 
      if (brandItem) {
          setUpdateMode(true);
          setCreateMode(false);
      }                 
    }
  }, [id]);
  
  const onChangeBrand = (brandId) => {
    dispatch(setBrandId(brandId));
    navigate(`/produtos`);
  }


  const removeBrand = (id) => {
    if (prompt('Tem certeza de que deseja excluir a marca? Confirme com «Sim».', 'Sim')) {
      axios.delete(`http://localhost:3001/api/brand?id=${id}`)
        .then(() => {
          alert('A marca foi excluído com sucesso!');
      })      
    } else {
      alert('Cancelar exclusão.');
    }
  }


  const createModeOn = () => {
    setCreateMode(true);
    setUpdateMode(false);
  }

    return (
        <section className="companies__block block-companies">
          <div className="block-companies__container">
          <div className="block-companies__body">
            {isAuth && adminMode && updateMode ? <UpdateBrand brandItem={brandItem} /> : ''}
            {isAuth && adminMode && createMode ? <CreateBrand /> : ''}
            {isAuth && adminMode && !createMode ? 
              <button className="block-companies__create" onClick={createModeOn}>Create new brand</button>
              : ''
            }
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
                          {brands.slice(0, 3).map((brand) => 
                            <div key={brand.name} className="slide-companies-block__image">
                              <div className={isAuth && adminMode ? 'slide-companies-block__actions' : 'slide-companies-block__actions_hidden'}>
                                  <svg className='delete-brand' onClick={() => removeBrand(brand.id)} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                      <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                                  </svg>
                                  <svg className='update-brand' onClick={() => setId(brand.id)} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                      <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                                  </svg>                                                
                              </div>
                              { isLoading ? <SliderSkeleton/> : <img src={'http://localhost:3001/' + brand.img} onClick={() => onChangeBrand(brand.id)} alt="brand"/> }
                            </div>                          
                          )}
                        </div>
                      </div>                  
                    </SwiperSlide>   
                    <SwiperSlide>                 
                      <div  className="block-companies__slide slide-companies-block">
                        <div className="slide-companies-block__content">
                          {brands.slice(3, 6).map((brand) => 
                            <div key={brand.name} className="slide-companies-block__image">
                              <div className={isAuth && adminMode ? 'slide-companies-block__actions' : 'slide-companies-block__actions_hidden'}>
                                  <svg className='delete-brand' onClick={() => removeBrand(brand.id)} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                      <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                                  </svg>
                                  <svg className='update-brand' onClick={() => setId(brand.id)} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                      <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                                  </svg>                                                
                              </div>
                              { isLoading ? <SliderSkeleton/> : <img src={'http://localhost:3001/' + brand.img} onClick={() => onChangeBrand(brand.id)} alt="brand"/> }
                            </div>                          
                          )
                          }
                        </div>
                      </div>                  
                    </SwiperSlide> 
                    <SwiperSlide>                 
                      <div  className="block-companies__slide slide-companies-block">
                        <div className="slide-companies-block__content">
                          {brands.slice(6).map((brand) => 
                            <div key={brand.name} className="slide-companies-block__image">
                              <div className={isAuth && adminMode ? 'slide-companies-block__actions' : 'slide-companies-block__actions_hidden'}>
                                  <svg className='delete-brand' onClick={() => removeBrand(brand.id)} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                      <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                                  </svg>
                                  <svg className='update-brand' onClick={() => setId(brand.id)} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                      <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                                  </svg>                                                
                              </div>
                              { isLoading ? <SliderSkeleton/> : <img src={'http://localhost:3001/' + brand.img} onClick={() => onChangeBrand(brand.id)} alt="brand"/> }
                            </div>                          
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