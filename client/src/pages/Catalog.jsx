import React from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { SearchContext } from '../App';
import Loader from '../componetns/Loader';
import NotFoundProduct from '../componetns/NotFoundProduct';
import { AuthContext } from '../context';
import { fetchTypes } from '../http/productAPI';

const Catalog = () => { 

    const { searchValue } = React.useContext(SearchContext);
    const [catalogItems, setCatalogItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true); 
    const { product } = React.useContext(AuthContext);

        /*React.useEffect(() => {
        setIsLoading(true);
        const search = searchValue ? `search=${searchValue}` : '';
            axios
                .get(
                    'http://localhost:3001/api/type',
                )
                .then((res) => {
                    setCatalogItems(res.data);
                    setIsLoading(false);
                });
            window.scrollTo(0, 0);
        }, []);*/
    
    React.useEffect(() => {
        fetchTypes().then(data => product.setTypes(data));
    }, [])
    
    
    return (
        <div className="main__catalog catalog">
            <div className="catalog__container">
                <div className="catalog__content">
                    {isLoading ? <Loader /> : 
                        <div className="catalog__items">   
                            { catalogItems.map((catalogItem) => 
                                <Link to={`/${catalogItem.path}`} key={catalogItem.id} value={catalogItem} className="catalog__item item-catalog">
                                    <div className="item-catalog__content">
                                        <div className="item-catalog__image">
                                            <img src={catalogItem.imageUrl} alt="category" />
                                        </div>                        
                                    </div>
                                    <h2 className="item-catalog__title">
                                        {catalogItem.name}
                                    </h2>
                                </Link>
                            )      
                            }    
                        </div>                                 
                    }
                    {catalogItems.length < 1 && !isLoading ? <NotFoundProduct/> : ''}                    
                </div>
            </div>   
      </div>
    );
};

export default Catalog;