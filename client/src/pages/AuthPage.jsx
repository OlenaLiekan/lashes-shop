import React from 'react';
import { AuthContext } from '../context';

const AuthPage = () => {

    const { isAuth, setIsAuth, adminMode} = React.useContext(AuthContext);

    const data = localStorage.getItem('user');
    const user = JSON.parse(data);
    
    return (
        <div className="main__account account-main">
            <div className="account-main__container">
                <div className="account-main__content">
                    <h1 className="account-main__title">
                        Ola!
                    </h1>
                    <h2 className="account-main__subtitle">
                        Fico feliz em vê-lo novamente
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
                        </svg>
                    </h2>
                    <div className="account-main__body body-account">
                        {
                            !adminMode 
                                ?
                                <>панель юзера</>
                                :
                                <>admin panel</>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;