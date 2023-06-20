import React from "react";

import { menuInit } from "../../js/script";
import SubMenuHeader from "../SubMenuHeader";
import { Link } from "react-router-dom";

const MenuHeader = () => {

    const extensaoItems = ['Pestanas', 'Colas', 'Líquidos e preparação', 'Pinças'];
    const liftingItems = ['Passos para lift', 'Líquidos e hydratação', 'Moldes'];
    const sobrancelhasItems = ['Passos para brow lift', 'Hydratação', 'Coloração']; 

    const [activeItem, setActiveItem] = React.useState();
    const [menuItems, setMenuItems] = React.useState([]);
    const menuList = ['Extensão de pestanas', 'Lifting de pestanas', 'Sobrancelhas'];

    React.useEffect(() => {
        if (activeItem === 0) {
            setMenuItems(extensaoItems);
        } else if (activeItem === 1) {
            setMenuItems(liftingItems);
        } else {
            setMenuItems(sobrancelhasItems);
        }
    }, [activeItem]);

    return ( 
        <>
        <div className="menu__link">
            <button onClick={menuInit} type="button" className="menu__icon icon-menu"><span></span></button>
            <Link to="/catalog" className="icon-menu__text icon-menu__text_hidden">Catalogo</Link>              
        </div>
        <div className="bottom-header__menu menu-bottom-header menu">
            <nav className="menu__body">
            <Link to="/catalog" className="icon-menu__text icon-menu__text_show">Catalogo</Link>                     
                <ul className="menu__list">
                    {menuList.map((menuItem, i) => 
                        <li key={menuItem} value={menuItem} onClick={() => setActiveItem(i)} className="menu__item item-menu">
                            <div className="item-menu__link">
                                <button className="item-menu__button menu-button">
                                    {menuItem}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                                </button>
                            </div>
                        </li>
                    )}

                    <li className="menu__item item-menu">
                        <div className="item-menu__link">
                            <Link to="/acessorios" className="item-menu__button menu-link">
                                Acessórios
                            </Link>
                        </div>
                    </li>
                    <li className="menu__item item-menu">
                        <div className="item-menu__link">
                            <Link to="/luz" className="item-menu__button menu-link">
                                Luz
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
            <SubMenuHeader menuItems={menuItems} />
        </>
    );
};

export default MenuHeader;