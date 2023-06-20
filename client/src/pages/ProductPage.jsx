import React from 'react';

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

const ProductPage = ({arrItem}) => {

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
        const sortBy = sort.sortProperty.replace('-', '');        
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
            axios
            .get(
                `https://localhost:3001/api/product`,
            )
            .then((res) => {
                setItems(res.data);
                setIsLoading(false); 
            });      
        window.scrollTo(0, 0);
    }, [arrItem, categoryId, sort, searchValue, currentPage]);

    React.useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage
        });
        navigate(`?${queryString}`);
    }, [categoryId, currentPage, sort.sortProperty]);

    
    const products = items.map((item) => <Link key={item.code} to={arrItem !== 'pestanas' ? `/${arrItem}/${item.id}` : `/${item.path}/0`}><ProductBlock {...item} /></Link>);
    const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="main__product product-main">
            <div className="product-main__container">
                <div className="product-main__content">
                    <Categories arrItem={arrItem} categoryId={categoryId} onChangeCategory={onChangeCategory}/>
                    <Sort arrItem={arrItem} />
                    <div className="product-main__items">
                        {isLoading ? skeletons : products}
                    </div>
                    {items.length < 1 && !isLoading ? <NotFoundProduct /> : ''}
                    <Pagination arrItem={arrItem} onChangePage = {onChangePage} />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
