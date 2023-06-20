import React from 'react';
import ProductItem from '../componetns/ProductItem';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../componetns/Loader';


const LashesCard = ({obj}) => {
    const [item, setItem] = React.useState({});
    const [pestanasItem, setPestanasItem] = React.useState({});
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
                    alert('Product not found!');
                    navigate('/');
                }
            }
            window.scrollTo(0, 0);
            fetchProduct();
    }, [obj, id]);     

        React.useEffect(() => {
            axios
            .get(
                `https://643037ddc26d69edc88d8266.mockapi.io/pestanas?path=${obj}`,
            )
            .then((res) => {
                setPestanasItem(...res.data);
                setIsLoading(false); 
            });      
        window.scrollTo(0, 0);
    }, [obj]);
    

    return (
        <div className="main__product-card product-card">
            <div className="product-card__container">
                {isLoading ? <Loader /> : <ProductItem pestanasCurl={pestanasItem.curl} pestanasThickness={pestanasItem.thickness} pestanasLength={pestanasItem.lengthP} obj={obj} key={item.code} {...item} />}
            </div>
        </div>
    );
};

export default LashesCard;