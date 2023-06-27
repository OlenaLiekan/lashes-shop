import React from 'react';

import { camelize } from '../js/script';
import qs from 'qs';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Pagination from '../componetns/Pagination';
import Brands from '../componetns/Brands';
import Sort from '../componetns/Sort';
import { SearchContext } from '../App';

import ProductBlock from "../componetns/ProductBlock";
import Skeleton from "../componetns/Skeleton";

import { setBrandId, setCurrentPage } from '../redux/slices/filterSlice';
import NotFoundProduct from '../componetns/NotFoundProduct';

const ProductPage = ({type}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { brandId, sort, currentPage } = useSelector((state) => state.filter);

    const { searchValue } = React.useContext(SearchContext);


    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true); 


    const onChangeBrand = (id) => {
        dispatch(setBrandId(id));
    };  


    const onChangePage = (number) => { 
        dispatch(setCurrentPage(number));            
    };



    React.useEffect(() => {
        setIsLoading(true);
        const sortBy = sort.sortProperty.replace('-', '');        
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const brandCategory = brandId === 0 ? '' : `&brandId=${brandId}`;
        const typeId = type.id;

        const search = searchValue ? `&search=${searchValue}` : '';
        axios.get(`http://localhost:3001/api/product?info&page=${currentPage}&limit=12&typeId=${typeId}${brandCategory}&sort=${sortBy}&order=${order}${search}`)
        .then((res) => {
            setItems(res.data.rows);
        });
        setIsLoading(false);
        window.scrollTo(0, 0);
    }, [brandId, sort, currentPage, searchValue, type.id]);

    React.useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            brandId,
            currentPage
        });
        navigate(`?${queryString}`);
    }, [brandId, currentPage, sort.sortProperty]);
    
    const products = items.map((item) => <Link key={item.id} to={`/${camelize(type.name)}/${item.id}`}><ProductBlock info={item.info} {...item} /></Link>);
    const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="main__product product-main">
            <div className="product-main__container">
                <div className="product-main__content">
                    <Brands type={type} brandId={brandId} onChangeBrand={onChangeBrand}/>
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
