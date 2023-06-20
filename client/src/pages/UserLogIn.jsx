import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { login } from '../http/userAPI.js';

const UserLogIn = () => {

    const inputRef = React.useRef();

    const navigate = useNavigate();
    const [currentUser, setUser] = React.useState({});
    const [email, setEmail] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passValue, setPassValue] = React.useState('');
    const { user} = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState();

    const logIn = async () => {
        let data;
        data = await login();
        user.setUser(user);
        user.setIsAuth(true);
        navigate('/auth');
    }

    const updateEmailValue = React.useCallback(
        debounce((str) => {
            setEmailValue(str);
        }, 600),
        [],
    );

    const updatePassValue = React.useCallback(
        debounce((str) => {
            setPassValue(str);
        }, 600),
        [],
    );

    const onChangeInputEmail = (event) => { 
        setEmail(event.target.value);
        updateEmailValue(event.target.value);
    };
    const onChangeInputPass = (event) => { 
        setPassword(event.target.value);
        updatePassValue(event.target.value);
    };

    /*React.useEffect(() => {
        if (emailValue) {
            setIsLoading(true);
                axios.
                    get(`https://63f3d329de3a0b242b49f97f.mockapi.io/users?email=${emailValue}`)
                    .then((res) => {
                        setUser(...res.data);
                        setIsLoading(false);
                    });
        }   
    }, [emailValue]);
 

    
    const login = event => {
        event.preventDefault();
        if (currentUser) {
            if (currentUser.email === emailValue.toLowerCase()) {
                if (currentUser.password === password) {
                    setIsAuth(true);
                    localStorage.setItem('auth', 'true');  
                    if (currentUser.role === 'admin') {
                        navigate('/admin');
                        setAdminMode(true);                    
                    } else {
                        const userData = JSON.stringify(currentUser);   
                        localStorage.setItem('user', userData); 
                        navigate('/account');
                    }
                }
            }             
        }

    }*/


    const scroll = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div className="main__login login-main">
            <div className="login-main__container">
                <div className="login-main__content">
                    <form onSubmit={logIn} className="login-main__form form-login">
                        <h2 className="form-login__title">
                            Faça login na sua conta pessoal.
                        </h2>
                        <div className="form-login__line">
                            <label htmlFor="userEmail" className="form-login__label">E-mail</label>
                            <input required id="userEmail" type="email" name='email' autoComplete='off' tabIndex="1" className="form-login__input"
                                ref={inputRef}
                                value={email}
                                onChange={onChangeInputEmail} />                            
                        </div>
                        <div className={"form-login__line form-login__line_err"}>
                            E-mail inválido!
                        </div>
                        <div className="form-login__line">
                            <label htmlFor="userPassword" className="form-login__label">Senha</label>
                            <input required id="userPassword" type="password" name='password' autoComplete='off' tabIndex="2" className="form-login__input"
                                ref={inputRef}
                                value={password}
                                onChange={onChangeInputPass}/>                            
                        </div>
                        <div className={currentUser && passValue.length && currentUser.password !== password ? "form-login__line form-login__line_error _error" : "form-login__line form-login__line_error"}>
                            Senha inválida!
                        </div>
                        <button type="submit" tabIndex="3" className={ email && password ? "form-login__button _active" : "form-login__button"}>Entre</button>
                    </form>
                    <p className="login-main__text">
                        Não tem uma conta pessoal?
                        <Link to="/create-account" onClick={scroll} className="login-main__link">                            
                            Crie aqui.
                        </Link>                            
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserLogIn;