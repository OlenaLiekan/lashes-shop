import React from 'react';
import { changeAccessData, changeData, onReadonly } from '../js/script';
import axios from 'axios';
import debounce from 'lodash.debounce';

const UserPage = () => {

    const [newName, setNewName] = React.useState('');
    const [newSurname, setNewSurname] = React.useState('');
    const [newPhone, setNewPhone] = React.useState('');
    const [phoneValue, setPhoneValue] = React.useState('');
    const [newEmail, setNewEmail] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [checkPass, setCheckPass] = React.useState('');
    
    const [editNameMode, setEditNameMode] = React.useState(false);
    const [editSurnameMode, setEditSurnameMode] = React.useState(false);
    const [editPhoneMode, setEditPhoneMode] = React.useState(false);
    const [editEmailMode, setEditEmailMode] = React.useState(false);

    const [exEmail, setExEmail] = React.useState({});
    const [exPhone, setExPhone] = React.useState({});
    
    const inputRef = React.useRef();

    const data = localStorage.getItem('user');
    const user = JSON.parse(data);

    React.useEffect(() => {
        if (user) {
            setNewName(user.name);
            setNewSurname(user.lastName);
            setNewPhone(user.phone);
            setNewEmail(user.email);
        }
    }, []);

    const onChangeNewName = (event) => { 
        setEditNameMode(true);
        setNewName(event.target.value ? event.target.value[0].toUpperCase() + event.target.value.slice(1) : '');            
    };

    const onChangeNewSurname = (event) => { 
        setEditSurnameMode(true);
        setNewSurname(event.target.value ? event.target.value[0].toUpperCase() + event.target.value.slice(1) : '');
    };

    const updatePhoneValue = React.useCallback(
        debounce((str) => {
            setPhoneValue(str);
        }, 600),
        [],
    );

    const onChangeNewPhone = (event) => { 
        setEditPhoneMode(true);
        setNewPhone(event.target.value);
        updatePhoneValue(event.target.value);
    };

    const updateEmailValue = React.useCallback(
        debounce((str) => {
            setEmailValue(str);
        }, 800),
        [],
    );

    const onChangeNewEmail = (event) => { 
        setEditEmailMode(true);
        setNewEmail(event.target.value);
        updateEmailValue(event.target.value);
    };

    const onChangePass = (event) => { 
        setPassword(event.target.value);
    };

    const onChangeNewPass = (event) => { 
        setNewPassword(event.target.value);
    };
    const onChangeCheckPass = (event) => { 
        setCheckPass(event.target.value);
    };


    React.useEffect(() => {
        if (emailValue) {
            axios
                .get(`https://63f3d329de3a0b242b49f97f.mockapi.io/users?search=${emailValue}`)
                .then((res) => {
                    setExEmail(...res.data);                         
                });            
        }
    }, [emailValue]);

    React.useEffect(() => {
        if (phoneValue) {
            axios
                .get(`https://63f3d329de3a0b242b49f97f.mockapi.io/users?search=${phoneValue.substring(1)}`)
                .then((res) => {
                    setExPhone(...res.data);                           
                });            
        }
    }, [phoneValue]);

    const uniEmail = newEmail === user.email ? true : false;
    const uniPhone = newPhone === user.phone ? true : false;


    const postData = (e) => {
        e.preventDefault();
        if (uniEmail && uniPhone) {
            user.name = newName;             
            user.lastName = newSurname;
            user.phone = newPhone;
            user.email = newEmail;
            const newData = { name: user.name, lastName: user.lastName, phone: user.phone, email: user.email};
            fetch(`https://63f3d329de3a0b242b49f97f.mockapi.io/users/${user.id}/`, {
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    // Send your data in the request body as JSON
                    body: JSON.stringify(newData)
                }).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                });
    
            setEditNameMode(false);
            setEditSurnameMode(false);
            setEditPhoneMode(false);
            setEditEmailMode(false);
            setEditNameMode(false);
            onReadonly();
            const userData = JSON.stringify(user); 
            localStorage.setItem('user', userData);   
            setExEmail({});
            setExPhone({});
            alert("Seus dados alterados com sucesso!");
        }

    }

    const changePass = (e) => {
        e.preventDefault();
        if (password === user.password) {
            if (newPassword === checkPass) {
                user.password = newPassword;
                const newData = { password: user.password };
                fetch(`https://63f3d329de3a0b242b49f97f.mockapi.io/users/${user.id}/`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                // Send your data in the request body as JSON
                body: JSON.stringify(newData)
                }).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                });
                const userData = JSON.stringify(user); 
                localStorage.setItem('user', userData); 
                setPassword('');
                setNewPassword('');
                setCheckPass('');
                alert("Sua senha alterada com sucesso!");
            }
        }
    }

    
    return (
        <div className="main__account account-main">
            <div className="account-main__container">
                <div className="account-main__content">
                    <h1 className="account-main__title">
                        Ola, {user.name} !
                    </h1>
                    <h2 className="account-main__subtitle">
                        Fico feliz em vê-lo novamente
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
                        </svg>
                    </h2>
                    <div className="account-main__body">
                        <div className="account-main__user-info user-info">
                            <form onSubmit={postData} className="login-main__form form-login">
                                <h3 className="form-login__title">
                                    Dados pessoais
                                </h3>
                                <div className="form-login__line form-user-info__line">
                                    <label htmlFor="userName" className="form-login__label">Nome</label>
                                    <input required id="userName" readOnly type="text" tabIndex="1" name='name' autoComplete='off' className="form-login__input form-user-info__input"
                                        ref={inputRef}
                                        value={newName}
                                        onChange={onChangeNewName}/>                            
                                </div>
                                <div className="form-login__line form-user-info__line">
                                    <label htmlFor="userSurname" className="form-login__label">Sobrenome</label>
                                    <input required id="userSurname" readOnly type="text" tabIndex="2" name='surname' autoComplete='off' className="form-login__input form-user-info__input"
                                        ref={inputRef}
                                        value={newSurname}
                                        onChange={onChangeNewSurname}/>                            
                                </div>
                                <div className="form-login__line form-user-info__line">
                                    <label htmlFor="userPhone" className="form-login__label">Número de telefone</label>
                                    <input required id="userPhone" type="tel" readOnly tabIndex="3" name='phone' pattern="[+]{1}[0-9]{12}" autoComplete='off' className="form-login__input form-user-info__input"
                                        ref={inputRef}
                                        value={!editPhoneMode ? user.phone : newPhone}
                                        onChange={onChangeNewPhone}/>                            
                                </div>
                                <div className={editPhoneMode && newPhone.length === 13 && !uniPhone ? "form-login__line form-login__line_err _error" : "form-login__line form-login__line_error"}>
                                    Este número de telefone já existe.
                                </div>
                                <div className="form-login__line form-user-info__line">
                                    <label htmlFor="userEmail" className="form-login__label">E-mail</label>
                                    <input required id="userEmail" readOnly type="email" tabIndex="4" name='email' autoComplete='off' className="form-login__input form-user-info__input"
                                        ref={inputRef}
                                        value={newEmail}
                                        onChange={onChangeNewEmail}/>                            
                                </div>
                                <div className={editEmailMode && emailValue && !uniEmail ? "form-login__line form-login__line_error _error" : "form-login__line form-login__line_error"}>
                                    Este e-mail já existe.
                                </div>
                                <div className="form-login__line form-user-info__line">
                                    <button onClick={changeData} type="button" tabIndex="5" className="form-login__button edit-data-btn button_black">Editar dados</button>
                                    <button type="submit" tabIndex="6" className="form-login__button change-data-btn">Enviar dados</button>                                    
                                </div>
                            </form>
                        </div>
                        <div className="account-main__user-access user-access">
                            <form onSubmit={changePass} className="access-main__form form-login">
                                <h3 className="form-login__title">
                                    Dados de acesso
                                </h3>
                                <button onClick={changeAccessData} type="button" tabIndex="9" className="form-login__button form-access__button button_black">Alterar a senha</button>
                                <div className="form-access__body">
                                    <div className="form-login__line form-access__line">
                                        <label htmlFor="userPassword" className="form-login__label">Senha</label>
                                        <input required id="userPassword" type="password" tabIndex="10" name='oldPass' placeholder="Senha Antiga" autoComplete='off' className="form-login__input form-access__input"
                                            ref={inputRef}
                                            value={password}
                                            onChange={onChangePass}/>                            
                                    </div>
                                    <div className={password && password !== user.password ? "form-login__line form-access__line form-login__line_err _error" : "form-login__line form-access__line form-login__line_error"}>
                                        Senha incorreta!
                                    </div>
                                    <div className="form-login__line form-access__line">
                                        <label htmlFor="userNewPassword" className="form-login__label">Nova Senha</label>
                                        <input required id="userNewPassword" type="password" tabIndex="11" name='newPass' placeholder="Criar um novo" autoComplete='off' className="form-login__input form-access__input"
                                            ref={inputRef}
                                            value={newPassword}
                                            onChange={onChangeNewPass}/>                            
                                    </div>
                                    <div className="form-login__line form-access__line">
                                        <label htmlFor="userCheckPassword" className="form-login__label">Verifique a senha</label>
                                        <input required id="userCheckPassword" type="password" tabIndex="12" name='checkPass' placeholder="Repita a nova senha" autoComplete='off' className="form-login__input form-access__input"
                                            ref={inputRef}
                                            value={checkPass}
                                            onChange={onChangeCheckPass}/>                            
                                    </div>
                                    <div className={checkPass && newPassword !== checkPass ? "form-login__line form-access__line form-login__line_err _error" : "form-login__line form-access__line form-login__line_error"}>
                                        As senhas não correspondem.
                                    </div>
                                    <button type="submit" tabIndex="13" className="form-login__button form-access-submit-btn">Enviar</button>                                      
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;