import React from 'react';
import styles from './UserPanel.module.scss';

const UserPanel = ({user}) => {
    return (
        <div className='user-panel__wrapper'>
            <div className="user-panel__container">
                <div className={styles.content}>
                    <div className={styles.aside}>
                        <div className={styles.asideTop}>
                            <div>{user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : ''}</div>
                            <div>{user.email ? user.email : ''}</div>                            
                        </div>
                        <ul className={styles.asideMenu}>
                            <li className={styles.asideMenuItem}>
                                Order history
                            </li>
                            <li className={styles.asideMenuItem}>
                                Personal info
                            </li>
                            <li className={styles.asideMenuItem}>
                                Account manager
                            </li>
                        </ul>
                    </div>
                    <div className={styles.body}>
                        <div className="body-user-panel__orders orders">
                            <ul className={styles.ordersList}>
                                <li className="list-orders__item item-list-orders">
                                    <div className={styles.orderInfo}>
                                        <h4 className={styles.productTitle}>
                                            <span>№ 025654898</span>  28.08.2023 14:17:25         
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
                                            </svg>
                                        </h4>
                                        <div className="order-info__body body-order-info">
                                            <ul className="body-order-info__products products-order">
                                                <li className="products-order__item item-products-order">
                                                    <div className="item-products-order__image">
                                                        <img src="" alt="product"/>
                                                    </div>
                                                    <div className="item-products-order__product-info info-pro">
                                                        <div className="item-products-order__name">Pestanas</div> 
                                                        <div className="item-products-order__count">2</div> 
                                                        <div className="item-products-order__price">15 Є</div> 
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-orders__item item-list-orders">
                                    <div className={styles.orderInfo}>
                                        <h4 className={styles.productTitle}>
                                            <span>№ 025654869</span>  28.08.2023 14:58:25         
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
                                            </svg>
                                        </h4>
                                        <div className="order-info__body body-order-info">
                                            <ul className="body-order-info__products products-order">
                                                <li className="products-order__item item-products-order">
                                                    <div className="item-products-order__image">
                                                        <img src="" alt="product"/>
                                                    </div>
                                                    <div className="item-products-order__product-info info-pro">
                                                        <div className="item-products-order__name">Cola</div> 
                                                        <div className="item-products-order__count">2</div> 
                                                        <div className="item-products-order__price">15 Є</div> 
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPanel;