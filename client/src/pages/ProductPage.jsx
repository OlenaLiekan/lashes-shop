import React from 'react';

import { camelize } from '../js/script';
import qs from 'qs';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Pagination from '../componetns/Pagination';
import Categories from '../componetns/Categories';
import Sort from '../componetns/Sort';
import { SearchContext } from '../App';

import ProductBlock from "../componetns/ProductBlock";
import Skeleton from "../componetns/Skeleton";

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import NotFoundProduct from '../componetns/NotFoundProduct';

const ProductPage = ({type}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

    const { searchValue } = React.useContext(SearchContext);


    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true); 


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };  


    const onChangePage = (number) => { 
        dispatch(setCurrentPage(number));            
    };



    React.useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:3001/api/product?typeId=${type.id}&limit=12`)
        .then((res) => {
            setItems(res.data.rows);
        });
        setIsLoading(false);
        window.scrollTo(0, 0);
    }, [type]);

    /*React.useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage
        });
        navigate(`?${queryString}`);
    }, [categoryId, currentPage, sort.sortProperty]);*/
    
    const products = items.map((item) => <Link key={item.id} to={`/${camelize(type.name)}/${item.id}`}><ProductBlock {...item} /></Link>);
    const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="main__product product-main">
            <div className="product-main__container">
                <div className="product-main__content">
                    <Categories arrItem={type} categoryId={categoryId} onChangeCategory={onChangeCategory}/>
                    <Sort arrItem={type} />
                    <div className="product-main__items">
                        {isLoading ? skeletons : products}
                    </div>
                    {items.length < 1 && !isLoading ? <NotFoundProduct /> : ''}
                    <Pagination arrItem={type} onChangePage = {onChangePage} />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
