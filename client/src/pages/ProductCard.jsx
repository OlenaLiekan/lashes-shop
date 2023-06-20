import React from 'react';
import ProductItem from '../componetns/ProductItem';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../componetns/Loader';


const ProductCard = ({obj}) => {
    const [item, setItem] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true); 

    const navigate = useNavigate();
    const {id} = useParams(); 

    React.useEffect(() => {
            setIsLoading(true);
            async function fetchProduct() {
                try {
                    const { data } = await axios
                        .get(
                            `https://localhost:3001/api/product/` + id,
                        );
                    setItem(data);
                    setIsLoading(false);
                } catch (error) {
                    alert('Produto não encontrado!');
                    navigate('/');
                }
            }
            window.scrollTo(0, 0);
            fetchProduct();
    }, [obj, id]);     

    return (
        <div className="main__product-card product-card">
            <div className="product-card__container">
                {isLoading ? <Loader /> : <ProductItem obj={obj} key={item.code} {...item} />}
            </div>
        </div>
    );
};

export default ProductCard;