import React from 'react';
import styles from './UserPanel.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context';
import CreateAddress from '../CreateAddress/CreateAddress';
import UpdateAddress from '../UpdateAddress/UpdateAddress';
import { updateUser } from '../../http/userAPI';

const UserPanel = ({ user }) => {
    const { setIsAuth } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = React.useState({});
    const [activeIndex, setActiveIndex] = React.useState('');
    const [activeOption, setActiveOption] = React.useState(0);
    const [activeAddress, setActiveAddress] = React.useState(0);
    const { updateAddressMode, setUpdateAddressMode } = React.useContext(AuthContext);
    const { createAddressMode, setCreateAddressMode } = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const [orders, setOrders] = React.useState(null);
    const [addresses, setAddresses] = React.useState([]);

    const menuItems = ['Histórico de pedidos', 'Endereços', 'Gerenciamento de contas'];

    React.useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:3001/api/user/${user.id}`)
            .then((res) => {
                setCurrentUser(res.data);
                setOrders(res.data.order);
                setAddresses(res.data.address);
                setIsLoading(false);
            });
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

    const editData = () => {
        setUpdateAddressMode(true);
        window.scrollTo(0, 0);
    }

    const cancelAction = () => {
        setUpdateAddressMode(false);
    }

    const cancelCreating = () => {
        setCreateAddressMode(false);
        window.scrollTo(0, 0);
    }

    const removeAddress = (addressId) => {
        if (window.confirm('Are you sure you want to delete address?')) {
            const formData = new FormData();
            const id = currentUser.id;
            formData.set('userId', id);
            formData.append('deletedAddressId', addressId);
            updateUser(formData, id).then(alert('Success'));
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
                                {orders && !isLoading ? orders.map((order, index) =>  
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
                                    isLoading
                                        ?
                                        <span>
                                            Por favor, aguarde. Informações do pedido carregando...                                            
                                        </span>
                                        :
                                        <h4 className={styles.orderTitle}>
                                            <span>
                                                Você ainda não fez nenhum pedido.
                                            </span>
                                        </h4>}  
                            </ul>
                        </div>
                        <div className={activeOption === 1 && !updateAddressMode ? styles.userInfo : styles.hidden}>
                            {!createAddressMode
                                ? 
                            <div className={styles.newAddress}> 
                                <button onClick={() => setCreateAddressMode(true)} className={styles.addAddress}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                    </svg>
                                </button>
                                Adicionar novo endereço
                            </div>
                                :
                                ''
                            }
                            {createAddressMode ? <CreateAddress userId={currentUser.id} /> : ''}
                            {
                            !createAddressMode && addresses
                                ? 
                                addresses.map((address, aIndex) => 
                                    <div key={address.id} className={styles.addressItem}>
                                        <ul className={styles.userInfoTop}>
                                            <li className={styles.infoLine}>
                                                {address.firstName + ' ' + address.lastName} {address.mainAddress ? <span className={styles.colorGold}>(primário)</span> : ''}
                                            </li>
                                            <li className={styles.infoLine}>Código postal/ZIP: {address.postalCode}</li>
                                        </ul>           
                                        <div className={styles.userAddress}>
                                            <h3 onClick={() => setActiveAddress(aIndex)} className={styles.addressTitle}>
                                                Endereço:
                                                <svg className={aIndex === activeAddress ? styles.rotate : ''} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                    <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
                                                </svg>
                                            </h3>
                                            <div className={aIndex === activeAddress ? styles.paragraphs : styles.hidden}>
                                                <p className={styles.addressLine}>{address.firstName } {address.lastName }</p>  
                                                <p className={styles.addressLine}>{address.email }</p> 
                                                <p className={styles.addressLine}>{address.phone }</p>                                
                                                <p className={styles.addressLine}>{address.company }</p>
                                                <p
                                                    className={styles.addressLine}>
                                                    {address.firstAddress}, {address.secondAddress ? address.secondAddress + ',' : ''} {address.city}, {address.region}, {address.country}, {address.postalCode}
                                                </p>
                                            </div>
                                        </div>
                                        <button onClick={editData} className={styles.updateAddressBtn}>Editar</button>
                                        <button onClick={() => removeAddress(address.id)} className={styles.deleteAddressBtn}>Deletar</button>
                                    </div>                            
                                )
                            :
                            'Ainda não há endereços salvos.'
                            }
                        </div>
                        {updateAddressMode ? <UpdateAddress userId={currentUser.id} /> : ''}
                        <button onClick={cancelAction} className={activeOption === 1 && updateAddressMode ? styles.cancelBtn : styles.hidden}>Сancelar</button>
                        <button onClick={cancelCreating} className={activeOption === 1 && createAddressMode ? styles.cancelBtn : styles.hidden}>Cancelar</button>            
                                    
                        <div className={activeOption === 2 ? styles.actions : styles.hidden}>
                            <ul className={styles.userInfoTop}>
                                <li className={styles.infoLine}>
                                    {currentUser.firstName + ' ' + currentUser.lastName}
                                </li>
                                <li className={styles.infoLine}>{currentUser.email}</li>
                                <li className={styles.infoLine}>{currentUser.phone}</li>
                            </ul>
                            <button className={styles.changeData}>Alterar dados</button>
                            <button className={styles.changePassword}>Alterar a senha</button>
                            <button onClick={removeUser} className={styles.deleteAccount}>Deletar conta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPanel;