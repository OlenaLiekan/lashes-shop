import React from 'react';

import { useNavigate, Link } from 'react-router-dom';
import ProductCardSlider from './ProductCardSlider';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, minusItem } from '../redux/slices/cartSlice';
import { camelize } from '../js/script';
import axios from 'axios';

const ProductItem = ({ obj, id, info, slide, typeId, brandId, name, pestanasCurl, pestanasThickness, pestanasLength, title, subtitle, code, price, brand, lengthP, thickness, curl, volume, img, imageSlides, description }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeCurl, setActiveCurl] = React.useState('');
    const [activeThickness, setActiveThickness] = React.useState('');
    const [activeLength, setActiveLength] = React.useState('');
    const [brands, setBrands] = React.useState([]);
    const [types, setTypes] = React.useState([]);

    const [pestanasProducts, setPestanasProducts] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:3001/api/brand')
            .then((res) => {
                setBrands(res.data);
            });
    }, []);

    const companyNames = brands.map((brand) => brand.name);
    const company = companyNames.find((companyName, i) => i + 1 === brandId);

    React.useEffect(() => {
        axios.get('http://localhost:3001/api/type')
            .then((res) => {
                setTypes(res.data);
            });
    }, []);

    const typeNames = types.map((type) => camelize(type.name));
    const path = typeNames.find((typeName, i) => i === typeId);

    /*React.useEffect(() => {
        if (pestanasCurl) {
            axios
                .get(`https://643037ddc26d69edc88d8266.mockapi.io/${obj}`)
                .then((res) => {
                    setPestanasProducts(res.data);
            })            
        }

    }, [obj]);*/
    
/*const pestanasProduct = pestanasProducts ? (pestanasProducts.find((product) => product.curl === pestanasCurl[activeCurl] && product.thickness === pestanasThickness[activeThickness] && product.lengthP === Number(pestanasLength[activeLength]))) : '';    

    React.useEffect(() => {
        if (pestanasProduct) {
            navigate(`/${obj}/${pestanasProduct.id}`); 
        } 
    }, [activeCurl, activeLength, activeThickness]);*/

    const showCart = () => {
        if (addedCount) {
            window.scrollTo(0, 0);
            navigate('/cart');
        }
    };

    const cartItem = useSelector((state) => state.cart.items.find((obj) => obj.id === id));

    const addedCount = cartItem ? cartItem.count : 0;



    const onClickAdd = () => {
       
        const item = {
            id,
            name,
            info,
            subtitle,
            code,
            price,
            company,
            img,
            volume,
            obj,
            path
        };
        dispatch(addItem(item));
    };

    const onClickMinus = () => { 
        dispatch(
            minusItem(id)
        );
    };


    return (
        <div className="product-card__content">
            <div className="product-card__go-back go-back">
                <Link to={curl ? `/pestanas` : `/${path}`} className='go-back__link'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
                    </svg>
                    Voltar
                </Link>
            </div>
            <div className="product-card__body">
                <div className="images-product__wrapper">
                    <div className="product-card__images images-product">
                        <ProductCardSlider img={img} slides={slide} />                                
                    </div>
                    <div className="product-card__aside">
                        <div className="product-card__info info-product">
                            <div className="info-product__titles">
                                <h1 className="info-product__title">
                                    {name} 
                                </h1>   
                                {
                                    subtitle ?
                                        <h2 className="info-product__subtitle">
                                            {subtitle}
                                        </h2>
                                    :
                                    ''
                                }
                            </div>
                            <div className="info-product__number"><span className="label-bold">Código do produto:</span> {code}</div>
                            <div className="info-product__brand"><span className="label-bold">Marca:</span> {company}</div>
                            {info.length ? info.map((obj) => 
                                <div key={obj} className='info-product__volume'>
                                    <span className="label-bold">
                                        {obj.title}:
                                    </span>
                                    <div className="volume__value">
                                        {obj.description}
                                    </div>                                      
                                </div>                                    
                            ) :
                                ''
                            }
                            {curl && pestanasCurl ?
                                <div className="info-product__curl">
                                    <label htmlFor="curlList" className="label-bold">Curvatura: <span>{curl}</span></label>
                                    <div className="curl__select select-curl"> 
                                        
                                        <ul id="curlList" className="curl__list list-curl">   
 
                                            {pestanasCurl.map((itemCurl, curlIndex) => 
                                                <li key={itemCurl}
                                                    onClick={() => setActiveCurl(curlIndex)}
                                                    className={activeCurl === curlIndex ? 'activeCurl' : 'curlItem'}>
                                                    {itemCurl}
                                                </li>
                                            )}                              
                                        </ul>
                                    </div>
                                </div>                                
                                : ''
                            }
                            {thickness && pestanasThickness ?
                                <div className="info-product__thick">
                                    <label className="label-bold">Grossura, mm: <span>{thickness}</span></label>
                                    <div className="thick__select select-thick"> 
                                        <ul className="thick__list list-thick">
                                            {pestanasThickness.map((itemThick, thickIndex) => 
                                                <li key={itemThick} onClick={() => setActiveThickness(thickIndex)} className={activeThickness === thickIndex ? "activeThick" : "thickItem"}>
                                                    {itemThick}
                                                </li>
                                            )}                              
                                        </ul>
                                    </div>
                                </div>                                
                                : ''
                            }
                            {lengthP && pestanasLength ?
                                <div className="info-product__length">
                                    <label htmlFor="lengthList" className="label-bold">Tamanho, mm: <span>{lengthP} </span> </label>
                                    <div className="length__select select-length"> 
                                        <ul className="length__list list-length">
                                            {pestanasLength.map((itemLength, lengthIndex) => 
                                                <li key={itemLength} onClick={() => setActiveLength(lengthIndex)} className={activeLength === lengthIndex ? "activeLength" : "lengthItem"}>
                                                    {itemLength}
                                                </li>
                                            )}                              
                                        </ul>
                                    </div>
                                </div>                                
                                : ''
                            }

                            <div className="info-product__price">
                                <span className="label-bold">Preço:</span>
                                <div className="price__value">
                                    {price} €                                    
                                </div>
                            </div>
                        </div> 

                                <div className="product-card__actions">
                                    <div className="product-card__quantity quantity">
                                        <button onClick={onClickMinus} className="quantity__minus">-</button>
                                        <div className="quantity__text">{addedCount}</div>
                                        <button onClick={onClickAdd} className="quantity__plus">+</button>
                                    </div>
                                    <button onClick={showCart} className="checkout">
                                        Comprar
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                                        </svg>
                                    </button>
                                </div>                                  

      
                    </div>
                </div>
            </div>

            <div className="product-card__description description-product">
                    <h3 className="description-product__title">
                        Descrição
                </h3>
                {description ? description.map((paragraph, i) => (
                    <p key={i} value={paragraph} className="description-product__text">
                        {paragraph}
                    </p>                     
                )) : 'Oooops, description is not found.'}  
            </div>
        </div>
    );
};

export default ProductItem;