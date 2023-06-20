import React from "react";

import styles from "./Search.module.scss";

import debounce from 'lodash.debounce';

import axios from "axios";

import { SearchContext } from '../../App';
import { setSearch } from "../../redux/slices/filterSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Search = () => { 
    const [items, setItems] = React.useState([]);
    const [value, setValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true); 
    const { searchValue, setSearchValue } = React.useContext(SearchContext);
    const inputRef = React.useRef();
    const dispatch = useDispatch();

    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        inputRef.current.focus();
    };

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 500),
        [],
    );

    const onChangeInput = (event) => { 
        dispatch(setSearch());
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };


    React.useEffect(() => {
        if (searchValue) {
            setIsLoading(true);
                axios
                .get(
                    `https://localhost:3001/api/product?name=${searchValue}`,
                )
                .then((res) => {
                    if (res.data.length > 0) {
                        setItems(res.data);
                    }
                });
            setIsLoading(false);            
            console.log(items);
            window.scrollTo(0, 0);            
        }
        setItems([]);
    }, [searchValue]);



    return (
        <div className="body-header__search search-header">
            <form className="search-header__form">
                <div className="search-header__button _icon-search">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 
                        44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208
                        208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4
                        9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7
                        0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128
                        0 70.7-57.2 128-128 128z" />
                    </svg>
                </div>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={onChangeInput}
                    className="search-header__input"
                    autoComplete="off" type="text"
                    placeholder="Procurar"
                />
                {value && (
                    <svg
                        onClick={onClickClear}
                        className={styles.clearIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 352 512">
                        <path
                            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 
                            0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93
                            89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19
                            0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28
                            12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48
                            0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                        />
                    </svg>
                )}
            </form>
            {
                value ?
                    <div className="search-header__results">
                        <div className="search-header__body">
                            <ul className="search-header__list search-list">
                                {isLoading ? '' : items.map((item) =>
                                    <Link to={`/${item.storage}/${item.id}`} key={item.code} value={item.title} onClick={onClickClear} >
                                        <li className="search-list__item">
                                            {item.title} {item.subtitle ? item.subtitle : ''}
                                        </li>                                        
                                    </Link>
                                )
                                }
                                {!items.length ? <li className="search-list__item_none">Produto não encontrado</li> : '' }
                            </ul>                            
                        </div>
                    </div>
                    :
                    ''
            }
        </div>
    );
};

export default Search;