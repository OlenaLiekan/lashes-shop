import React from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { SearchContext } from '../App';
import Loader from '../componetns/Loader';
import NotFoundProduct from '../componetns/NotFoundProduct';
import { camelize } from '../js/script';
import { useDispatch } from 'react-redux';
import { setBrandId } from '../redux/slices/filterSlice';

const Catalog = () => { 

    const dispatch = useDispatch();
    const { searchValue } = React.useContext(SearchContext);
    const [catalogItems, setCatalogItems] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true); 

    const onChangeBrand = (id) => {
        dispatch(setBrandId(id));
    }

        React.useEffect(() => {
        setIsLoading(true);
        const search = searchValue ? `search=${searchValue}` : '';
            axios
                .get(
                    `http://localhost:3001/api/type`,
                )
                .then((res) => {
                    setCatalogItems(res.data);
                    setIsLoading(false);
                });
            window.scrollTo(0, 0);
        }, []);
    
        React.useEffect(() => {
        setIsLoading(true);
            axios
                .get(
                    `http://localhost:3001/api/category`,
                )
                .then((res) => {
                    setCategories(res.data);
                    setIsLoading(false);
                });
            window.scrollTo(0, 0);
        }, []);

    return (
        <div className="main__catalog catalog">
            <div className="catalog__container">
                <div className="catalog__content">
                    {isLoading ? <Loader /> : 
                        <div className="catalog__items">     
                            {catalogItems.map((catalogItem) => 
                                catalogItem.id > 0
                                    ?
                                    <Link to={`/${camelize(catalogItem.name)}`} onClick={() => onChangeBrand(0)} key={catalogItem.id} value={catalogItem.name} className="catalog__item item-catalog">
                                        <div className="item-catalog__content">
                                            <h3 className="item-catalog__category">                                        
                                            {categories.map((category) => 
                                                <span key={category.id} value={category.name}>
                                                    { category.id === catalogItem.categoryId ? category.name : ""} 
                                                </span>
                                            )}  
                                            </h3> 
                                            <div className="item-catalog__image">
                                                <img src={'http://localhost:3001/' + catalogItem.img} alt="category" />
                                            </div>                        
                                        </div>
                                        <h2 className="item-catalog__title">
                                            {catalogItem.name}
                                        </h2>
                                    </Link>
                                    :
                                    ""
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