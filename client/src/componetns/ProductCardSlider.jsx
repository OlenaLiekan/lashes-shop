import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper";

import "../scss/navigation.scss";

const ProductCardSlider = ({ img, imageSlides }) => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
    return (
        <>
            <div className="images-product__thumbs thumbs-images">
                <div className="thumbs-images__swiper">
                    <Swiper 
                        modules={[Thumbs]} 
                        thumbs={{ swiper: thumbsSwiper }}
                        slidesPerView={1}
                        spaceBetween={10}
                        loop={true}
                    >
                        <SwiperSlide>
                            <div className="thumbs-images__slide slide-thumbs">
                                <div className="slide-thumbs__media">
                                    <img src={'http://localhost:3001/' + img} alt="slide"/>                                  
                                </div>
                            </div>          
                        </SwiperSlide>
                        { imageSlides ?
                            imageSlides.map((slide, i) =>
                                <SwiperSlide key={i} value={slide}>
                                    <div className="thumbs-images__slide slide-thumbs">
                                        <div className="slide-thumbs__media">
                                            <img src={slide} alt="slide"/>                                    
                                        </div>
                                    </div>          
                                </SwiperSlide>                            
                            )

                            : 
                            ''
                        }
                    </Swiper>
                </div>
            </div>
            <div className="images-product__slider">
                <div className="images-product__swiper">                
                    <Swiper
                        modules={[Thumbs]}
                        watchSlidesProgress
                        onSwiper={setThumbsSwiper}
                        speed={2000}
                        breakpoints={{
                            280: {
                                direction: 'horizontal',
                                slidesPerView: 2,
                                spaceBetween: 5
                            },

                            319: {
                                direction: 'horizontal',
                                slidesPerView: 3,
                                spaceBetween: 5
                            },

                            479: {
                                direction: 'vertical',
                                slidesPerView: 3,
                                spaceBetween: 10
                            },

                            768: {                            
                                direction: 'vertical',
                                slidesPerView: 3,
                                spaceBetween: 10
                            },

                            992: {                           
                                direction: 'vertical',
                                slidesPerView: 3,
                                spaceBetween: 10
                            },

                            1200: {
                                direction: 'vertical',
                                slidesPerView: 3,
                                spaceBetween: 10
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className="images-product__slide slide-product">
                                <div className="slide-product__media">
                                    <img src={'http://localhost:3001/' + img} alt="slide"/>                                    
                                </div>
                            </div>                        
                        </SwiperSlide>
                        { imageSlides ?
                            imageSlides.map((slide, index) => 
                                <SwiperSlide key={index} value={slide}>
                                    <div className="images-product__slide slide-product">
                                        <div className="slide-product__media">
                                            <img src={slide} alt="slide"/>                                    
                                        </div>
                                    </div>                        
                                </SwiperSlide>                            
                            )
                            :
                            ''
                        }                 
                    </Swiper>                    
                </div>
            </div>
        </>
    );
};

export default ProductCardSlider;