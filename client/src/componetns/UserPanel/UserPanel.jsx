import React from 'react';
import styles from './UserPanel.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context';

const UserPanel = ({ user }) => {
    const { setIsAuth } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = React.useState({});
    const [activeIndex, setActiveIndex] = React.useState('');
    const [activeOption, setActiveOption] = React.useState(0);

    const menuItems = ['Histórico de pedidos', 'Informações pessoais', 'Gerenciamento de contas'];

    React.useEffect(() => {
        axios.get(`http://localhost:3001/api/user/${user.id}`)
            .then((res) => {
                setCurrentUser(res.data);
            });
    }, []);

    const orders = currentUser.order ? currentUser.order : false;

    React.useEffect(() => {
        if (orders) {
            console.log(orders.map((order) => order.item));            
        }
    }, []);

    const removeUser = () => {
        const access = prompt('Tem certeza de que deseja excluir sua conta? Depois de excluído, você não poderá restaurá-lo. Para excluir, escreva SIM na caixa abaixo.', '');
        if (access && access.toLowerCase() === 'sim') {
            axios.delete(`http://localhost:3001/api/user?id=${user.id}`)
                .then(() => {
                    alert('A conta excluída com sucesso!');
                    localStorage.removeItem('user');
                    setIsAuth(false);
                    localStorage.removeItem('auth');
                    navigate("/login");
                });     
        } else {
            alert('Cancelar exclusão.');
        }
    }

    return (
        <div className='user-panel__wrapper'>
            <div className="user-panel__container">
                <div className={styles.content}>
                    <div className={styles.aside}>
                        <div className={styles.asideTop}>
                            <div>{user.email ? user.email : ''}</div>                            
                        </div>
                        <ul className={styles.asideMenu}>
                            {menuItems.map((option, id) => 
                                <li key={id}
                                    value={option}
                                    onClick={() => setActiveOption(id)}
                                    className={activeOption === id ? styles.asideMenuItemBlack : styles.asideMenuItem}>
                                    {option}
                                </li>                                
                            )}
                        </ul>
                    </div>
                    <div className={styles.body}>
                        <div className={activeOption === 0 ? styles.orders : styles.hidden}>
                            <ul className={styles.ordersList}>
                                {orders ? orders.map((order, index) =>  
                                 <li key={order.id} className={styles.ordersItem}>
                                    <div className={styles.orderInfo}>
                                        <h4 onClick={() => setActiveIndex(index)} className={activeIndex === index ? styles.orderTitleGold : styles.orderTitle}>
                                            <span>№ {order.id}</span>
                                                {order.createdAt.replace('T', ' ').slice(0, 19)}    
                                                <svg className={activeIndex === index ? styles.rotate : styles.chevron} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
                                            </svg>
                                        </h4>
                                        <div className={activeIndex === index ? styles.orderBody : styles.hidden}>
                                            <ul className={styles.productsList}>
                                                {order.item.map((i, pos) => 
                                                <li key={i.id} className={styles.productsItem}>
                                                        <div className={styles.productTop}>{i.title}</div>
                                                    <div className={styles.productBottom}>
                                                        <div className={styles.productImage}>
                                                            <img src={i.img ? `http://localhost:3001/`+ i.img : `http://localhost:3001/noImg.png`} alt="product"/>
                                                        </div>                                                        
                                                        <div className={styles.productInfo}>
                                                            {i.description.split('\n').map((paragraph, index) => 
                                                                <p key={index} className={styles.infoLine}>{paragraph}</p>                                                             
                                                            )}    
                                                        </div>
                                                    </div>
                                                </li>                                                    
                                                )}
                                            </ul>
                                            <div className={styles.total}>
                                                <div>Quantidade total: {order.quantity}</div>
                                                <div>Montante total: {order.sum} €</div>                                                
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                )
                                :
                                    <h4 className={styles.orderTitle}>
                                        <span>
                                           A lista de pedidos está vazia no momento. 
                                        </span>
                                    </h4>} 
                            </ul>
                        </div>
                        <button onClick={removeUser} className={activeOption === 2 ? styles.deleteAccount : styles.hidden }>Deletar conta</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPanel;