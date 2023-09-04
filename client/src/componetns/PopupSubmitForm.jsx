import React from 'react';
import { useNavigate } from 'react-router-dom';
import { scrollTop } from '../js/script';

import { useForm, ValidationError } from '@formspree/react';
import { clearItems } from '../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../http/userAPI';
import axios from 'axios';

const PopupSubmitForm = ({totalCount}) => {

    const inputRef = React.useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [users, setUsers] = React.useState([]);
    const [username, setUsername] = React.useState('');
    const [surname, setSurname] = React.useState('');    
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [orderNumber, setOrderNumber] = React.useState('');
    const [firstAddress, setFirstAddress] = React.useState('');
    const [secondAddress, setSecondAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [region, setRegion] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');
    const [company, setCompany] = React.useState('');

    React.useEffect(() => {
        if (user) {
            setUsername(user.firstName);
            setSurname(user.lastName);
            setPhone(user.phone);
            setEmail(user.email);
        }
        axios.get(`http://localhost:3001/api/user?role=USER`)
            .then((res) => {
                setUsers(res.data);
        });
    }, []);

    const onChangeCompany = (event) => { 
        setCompany(event.target.value ? event.target.value[0].toUpperCase() + event.target.value.slice(1) : '');            
    };

    const onChangeUsername = (event) => { 
        setUsername(event.target.value ? event.target.value[0].toUpperCase() + event.target.value.slice(1) : '');            
    };

    const onChangeSurname = (event) => { 
        setSurname(event.target.value ? event.target.value[0].toUpperCase() + event.target.value.slice(1) : '');
    };

    const onChangePhone = (event) => { 
        setPhone(event.target.value);
    };

    const onChangeEmail = (event) => { 
        setEmail(event.target.value);
    };

    const onChangeFAddress = (event) => { 
        setFirstAddress(event.target.value);            
    };

    const onChangeSAddress = (event) => { 
        setSecondAddress(event.target.value);            
    };

    const onChangeCity = (event) => { 
        setCity(event.target.value ? event.target.value[0].toUpperCase() + event.target.value.slice(1) : '');            
    };

    const onChangeCountry = (event) => { 
        setCountry(event.target.value ? event.target.value[0].toUpperCase() + event.target.value.slice(1) : '');            
    };

    const onChangeRegion = (event) => { 
        setRegion(event.target.value ? event.target.value[0].toUpperCase() + event.target.value.slice(1) : '');            
    };

    const onChangePostalCode = (event) => { 
        setPostalCode(event.target.value);            
    };

    const data = localStorage.getItem('user');
    const user = JSON.parse(data);

    const { items, totalPrice } = useSelector((state) => state.cart);

    const order = items.map((item, index) => (
        (index > 0 ? '\n\n' : '') + (index + 1) + '. ' + item.name
        +
        '\nMarca: ' + item.company
        +
        '\nCódigo: ' + item.code + '\n'
        +
        (item.curlArr ? 'Curvatura: ' + item.curlArr + '\n' : '')
        +
        (item.thicknessArr ? 'Grossura: ' + item.thicknessArr + ' mm\n' : '')
        +
        (item.lengthArr ? 'Tamanho: ' + item.lengthArr + ' mm\n' : '')
        +
        (item.isLashes ? '' : item.info.map((obj) => obj.title + ': ' + obj.description + '\n') )
        +
        'Preço: ' + item.price + ' €\n'
        +
        'Quantidade: ' + item.count))
        +
        '\n\nQuantidade total: ' + totalCount
        +
        '\nMontante total: ' + totalPrice.toFixed(2) + ' €'
    ;
    
    React.useEffect(() => {
        if (users.length) {
            setOrderNumber(users.map((user) => user.order[user.order.length - 1].id));    
        }

        console.log(+orderNumber + 1);
    }, [users]);

    const submitForm = () => {
        const formData = new FormData();
        const id = user.id;
        formData.append('userId', id);
        formData.append('items', JSON.stringify(items));
        formData.append('quantity', totalCount);
        formData.append('sum', totalPrice.toFixed(2));
        updateUser(formData, id);
        localStorage.setItem('orderId', orderNumber ? (+orderNumber) + 1 : '');            
        dispatch(
            clearItems()
        ); 
        navigate('/success');
        scrollTop();            
    } 

    const [state, handleSubmit] = useForm("xqkoljrq");
    if (state.succeeded) {
        return submitForm();
    }
    
    return (
        <div className="cart__popup popup-cart">
            <div className="popup-cart__content">
                <button className="popup-cart__close">
                    Fechar
                </button>
                <div className="popup-cart__body">
                    <form onSubmit={handleSubmit} id="form" className="popup-cart__form popup-form">
                        <div className="popup-form__text">
                            Por favor, deixe seus dados para fazer um pedido.
                        </div>
                        <div className="popup-form__line">
                            <label htmlFor="user-name-input" className="popup-form__label">Primeiro Nome</label>
                            <input required id="user-name-input" tabIndex="1" autoComplete="off" type="text" name="name" data-error="Error" placeholder='Nome' className="popup-form__input _req"
                                ref={inputRef}
                                value={username}
                                onChange={onChangeUsername}/>
                        </div>
                        <div className="popup-form__line">
                            <label htmlFor="user-surname-input" className="popup-form__label">Último Nome</label>
                            <input required id="user-surname-input" tabIndex="2" autoComplete="off" type="text" name="surname" data-error="Error" placeholder="Sobrenome" className="popup-form__input"
                                ref={inputRef}
                                value={surname}
                                onChange={onChangeSurname}/>
                        </div>
                        <div className="popup-form__line">
                            <label htmlFor="user-company-input" className="popup-form__label">Empresa</label>
                            <input id="user-company-input" tabIndex="3" autoComplete="off" type="text" name="company" data-error="Error" className="popup-form__input"
                                ref={inputRef}
                                value={company}
                                onChange={onChangeCompany}/>
                        </div>
                        <div className="popup-form__line">
                            <label htmlFor="user-contact-input" className="popup-form__label">Telefone</label>
                            <input required id="user-contact-input" tabIndex="4" autoComplete="off" type="tel" pattern="[+]{1}[0-9]{12}" name="contact" data-error="Error" placeholder="+351XXXXXXXXXX" className="popup-form__input _req"
                                ref={inputRef}
                                value={phone}
                                onChange={onChangePhone}/>
                        </div>
                        <div className="popup-form__line">
                            <label htmlFor="user-email-input" className="popup-form__label">E-mail</label>
                            <input required id="user-email-input" tabIndex="5" autoComplete="off" type="email" name="email" data-error="Error" placeholder="example@email.com" className="popup-form__input _req _email" 
                                ref={inputRef}
                                value={email}
                                onChange={onChangeEmail}/>
                            <ValidationError 
                                prefix="Email" 
                                field="email"
                                errors={state.errors}
                            />
                        </div>
                        <div className="popup-form__line">
                            <label htmlFor="user-f-address-input" className="popup-form__label">Morada №1</label>
                            <input required id="user-f-address-input" tabIndex="6" autoComplete="off" type="text" name="firstAddress" data-error="Error" className="popup-form__input"
                                ref={inputRef}
                                value={firstAddress}
                                onChange={onChangeFAddress}/>
                        </div>
                        <div className="popup-form__line">
                            <label htmlFor="user-s-address-input" className="popup-form__label">Morada №2</label>
                            <input id="user-s-address-input" tabIndex="7" autoComplete="off" type="text" name="secondAddress" data-error="Error" className="popup-form__input"
                                ref={inputRef}
                                value={secondAddress}
                                onChange={onChangeSAddress}/>
                        </div>
                        <div className="popup-form__line">
                            <label htmlFor="user-city-input" className="popup-form__label">Cidade</label>
                            <input required id="user-city-input" tabIndex="8" autoComplete="off" type="text" name="city" data-error="Error" className="popup-form__input"
                                ref={inputRef}
                                value={city}
                                onChange={onChangeCity}/>
                        </div>
                        <div className="popup-form__line">
                            <label htmlFor="user-country-input" className="popup-form__label">País</label>
                            <input required id="user-country-input" tabIndex="9" autoComplete="off" type="text" name="country" data-error="Error" className="popup-form__input"
                                ref={inputRef}
                                value={country}
                                onChange={onChangeCountry}/>
                        </div>
                        <div className="popup-form__line">
                            <label htmlFor="user-region-input" className="popup-form__label">Província</label>
                            <input required id="user-region-input" tabIndex="10" autoComplete="off" type="text" name="region" data-error="Error" className="popup-form__input"
                                ref={inputRef}
                                value={region}
                                onChange={onChangeRegion}/>
                        </div>
                        <div className="popup-form__line">
                            <label htmlFor="user-postal-code-input" className="popup-form__label">Código postal/ZIP</label>
                            <input required id="user-postal-code-input" tabIndex="11" autoComplete="off" type="text" name="postal-code" data-error="Error" className="popup-form__input"
                                ref={inputRef}
                                value={postalCode}
                                onChange={onChangePostalCode}/>
                        </div>
                        <div className="popup-form__line">
                            <label hidden htmlFor="order" className="popup-form__label">Ordem: </label>
                            <textarea hidden id="order" readOnly name="order" value={order} className="popup-form__textarea _order"/>                            
                        </div>

                        <div className="popup-form__line popup-line__textarea">
                            <label htmlFor="user-comment" className="popup-form__label">Comente</label>
                            <textarea id="user-comment" tabIndex="12" className="popup-form__textarea" name="comment" placeholder='Ola! Aqui você pode deixar suas dúvidas ou desejos.' cols="10" rows="5" maxLength="150"/> 
                            <ValidationError 
                                prefix="Comment" 
                                field="comment"
                                errors={state.errors}
                            />
                        </div>
                        <button type="submit" disabled={state.submitting} tabIndex="13" className="popup-form__button checkout scroll-top">
                            Enviar
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                        </button>
                    </form>                   
                </div>
            </div>
        </div>
    );
};

export default PopupSubmitForm;
