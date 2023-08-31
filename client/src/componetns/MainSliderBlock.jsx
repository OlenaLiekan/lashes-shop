import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

import { Link } from "react-router-dom";

import { AuthContext } from "../context";
import "../scss/navigation.scss";
import "swiper/scss";
import "../scss/pagination.scss";
import axios from "axios";
import CreateSlide from "./CreateSlide";
import SliderSkeleton from "./SliderSkeleton";

const MainSliderBlock = () => {

  const { isAuth, adminMode, createMode, setCreateMode } = React.useContext(AuthContext);
  const [slides, setSlides] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:3001/api/slide`)
      .then((res) => {
        setSlides(res.data);
        setIsLoading(false);
      });
  }, []);

  const removeSlide = (id) => {
    if (window.confirm('Tem certeza de que deseja excluir o slide?')) {
      axios.delete(`http://localhost:3001/api/slide?id=${id}`)
        .then(() => {
          alert('O slide foi excluído com sucesso!');

      })      
    } else {
      alert('Cancelar exclusão.');
    }
  }

  return (
      <section className="main__block block-main">
        <div className="block-main__container">
        <div className="block-main__body">
          {isAuth && adminMode && createMode ? <CreateSlide /> : ""}
            {isAuth && adminMode && !createMode ? 
              <button className="block-main__create" onClick={setCreateMode}>Create new slide</button>
              : ''
            }
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
                          <div className={isAuth && adminMode ? 'slide-main-block__actions' : 'slide-main-block__actions_hidden'}>
                            <svg className='delete-slide' onClick={() => removeSlide(slide.id)} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                              <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                            </svg>
                          </div>
                          {isLoading ? <SliderSkeleton/> : <img src={`http://localhost:3001/` + slide.img} alt="slide" /> }
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