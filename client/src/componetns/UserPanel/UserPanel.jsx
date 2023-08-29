import React from 'react';
import styles from './UserPanel.module.scss';

const UserPanel = ({user}) => {
    return (
        <div className='user-panel__wrapper'>
            <div className="user-panel__container">
                <div className={styles.content}>
                    <div className={styles.aside}>
                        <div className={styles.asideTop}>
                            <div>{user.email ? user.email : ''}</div>                            
                        </div>
                        <ul className={styles.asideMenu}>
                            <li className={styles.asideMenuItem}>
                                Histórico de pedidos
                            </li>
                            <li className={styles.asideMenuItem}>
                                Informações pessoais
                            </li>
                            <li className={styles.asideMenuItem}>
                                Gerenciamento de contas
                            </li>
                        </ul>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.orders}>
                            <ul className={styles.ordersList}>
                                <li className={styles.ordersItem}>
                                    <div className={styles.orderInfo}>
                                        <h4 className={styles.orderTitle}>
                                            <span>№ 025654898</span>  28.08.2023 14:17:25         
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
                                            </svg>
                                        </h4>
                                        <div className={styles.orderBody}>
                                            <ul className={styles.productsList}>
                                                <li className={styles.productsItem}>
                                                    <div className={styles.productTop}>Pestanas</div>
                                                    <div className={styles.productBottom}>
                                                        <div className={styles.productImage}>
                                                            <img src={`http://localhost:3001/100028.jpg`} alt="product"/>
                                                        </div>                                                        
                                                        <div className={styles.productInfo}>
                                                            <div className={styles.infoLine}>Código: 100008</div> 
                                                            <div className={styles.infoLine}>Marca: Sculptor Lash</div>
                                                            <div className={styles.infoLine}>Opções: CC/0.07/6mm</div>
                                                            <div className={styles.infoLine}>Preço: 15 €</div>                                                         
                                                            <div className={styles.infoLine}>Amount: 2</div>                                                             
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className={styles.productsItem}>
                                                    <div className={styles.productTop}>Pestanas</div>
                                                    <div className={styles.productBottom}>
                                                        <div className={styles.productImage}>
                                                            <img src={`http://localhost:3001/100029.jpg`} alt="product"/>
                                                        </div>                                                        
                                                        <div className={styles.productInfo}>
                                                            <div className={styles.infoLine}>Código: 100007</div> 
                                                            <div className={styles.infoLine}>Marca: Sculptor Lash</div>
                                                            <div className={styles.infoLine}>Opções: CC/0.07/6mm</div>
                                                            <div className={styles.infoLine}>Preço: 15 €</div>                                                         
                                                            <div className={styles.infoLine}>Amount: 2</div>                                                             
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className={styles.total}>
                                                <div>Quantidade total: 5</div>
                                                <div>Montante total: 60 €</div>                                                
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className={styles.ordersItem}>
                                    <div className={styles.orderInfo}>
                                        <h4 className={styles.orderTitle}>
                                            <span>№ 025654869</span>  28.08.2023 14:58:25         
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
                                            </svg>
                                        </h4>
                                        <div className={styles.orderBody}>
                                            <ul className={styles.productsList}>
                                                <li className={styles.productsItem}>
                                                    <div className={styles.productTop}>Pestanas</div>
                                                    <div className={styles.productBottom}>
                                                        <div className={styles.productImage}>
                                                            <img src={`http://localhost:3001/100030.jpg`} alt="product"/>
                                                        </div>                                                        
                                                        <div className={styles.productInfo}>
                                                            <div className={styles.infoLine}>Código: 100006</div> 
                                                            <div className={styles.infoLine}>Marca: Sculptor Lash</div>
                                                            <div className={styles.infoLine}>Opções: CC/0.07/6mm</div>
                                                            <div className={styles.infoLine}>Preço: 15 €</div>                                                         
                                                            <div className={styles.infoLine}>Amount: 2</div>                                                             
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className={styles.total}>
                                                <div>Quantidade total: 5</div>
                                                <div>Montante total: 60 €</div>                                                
                                            </div>
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