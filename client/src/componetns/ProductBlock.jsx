import axios from 'axios';
import React from 'react';


const ProductBlock = ({info, name, typeId, subtitle, price, brandId, img, thickness, lengthP, volume, imageSlides}) => {

    const [brands, setBrands] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:3001/api/brand')
            .then((res) => {
                setBrands(res.data);
            });
    }, []);

    const companyNames = brands.map((brand) => brand.name);
    const company = companyNames.find((companyName, i) => i + 1 === brandId);

    return (
        <div className="product-main__item item-product">
            <div className="item-product__body">
                <div className="item-product__image">
                    <img src={'http://localhost:3001/' + img} alt="product"/>
                </div>  
                <div className="item-product__info">
                    <div className="item-product__top">

                        <div className="item-product__titles">
                            <h2 className="item-product__title">
                                {name} 
                            </h2>
                            {
                                subtitle ?
                                <h2 className="item-product__subtitle">
                                    {subtitle}  
                                </h2> 
                                :
                                ''
                            }
                        </div>
                        <div className="item-product__brand">
                            {company}
                        </div>                                    
                    </div>
                    <div className='item-product__bottom'>
                        <div className="item-product__sizes">
                            {info.length ? info.map((obj) => 
                                <div key={obj} className='item-product__length'>
                                    <span className="label-bold">
                                        {obj.title}:
                                    </span>
                                    <div className="item-product__value">
                                        {obj.description}
                                    </div>                                      
                                </div>                                    
                            ) :
                                ''
                            }

                        </div>    


                        <div className="item-product__price">{price} €</div>                   
                    </div>                    
                </div>
            </div>
        </div>                  
    );
};

export default ProductBlock;