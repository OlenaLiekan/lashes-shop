import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { addItem, minusItem, removeItem } from '../redux/slices/cartSlice';

const CartItem = ({ obj, typeId, path, info, name, img, id, title, subtitle, code, price, company, imageUrl, lengthP, thickness, curl, volume, count }) => { 

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${path}/${id}`);
        window.scrollTo(0, 0);            
    }

    const dispatch = useDispatch();

    const onClickPlus = () => { 
        dispatch(
            addItem({
                id,
            }),
        );
    };

    const onClickMinus = () => { 
        dispatch(
            minusItem(id)
        );
    };

    const onClickRemove = () => { 
        if (window.confirm('Tem certeza de que deseja excluir o produto?')) {
            dispatch(
                removeItem(id)
            );            
        }
    };

    return (
        <div className="body-cart__item item__cart">
            <div className="item-cart__content">
                <div className="item-cart__product-block">
                    <div onClick={handleClick} className="item-cart__image">
                        <img src={'http://localhost:3001/' + img} alt="product"/>
                    </div>
                    <div className="item-cart__info info-cart">
                        <div className="info-cart__titles">
                            <h4 className='info-cart__title'>{name}</h4>
                            { subtitle ? <h4 className="info-cart__subtitle">{subtitle}</h4> : ''}                            
                        </div>
                        <div className='info-cart__line'>
                            <span>Código: </span>
                            {code}
                        </div>
                        <div className='info-cart__line'>
                            <span>Marca: </span>
                            {company}
                        </div>
                        {
                            info
                            ?
                            info.map((obj) => 
                                <div key={obj} className='info-cart__line'>
                                    <span>
                                        {obj.title}: 
                                    </span>
                                    {obj.description}                                     
                                </div>                                    
                            )
                            :
                            ''
                        }
                    </div>                                         
                </div>
                <div className="item-cart__actions">
                    <div className="item-cart__quantity quantity-cart quantity">
                        <button onClick={onClickMinus} className="quantity__minus">-</button>
                        <div className="quantity__text">{count}</div>
                        <button onClick={onClickPlus} className="quantity__plus">+</button>
                    </div>
                    <div className="item-cart__price">{price} €</div>
                    <button onClick={onClickRemove} className="item-cart__delete">+</button>                                        
                </div>
            </div>
        </div>
    );
};

export default CartItem;