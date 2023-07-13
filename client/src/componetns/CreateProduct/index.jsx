import axios from 'axios';
import React from 'react';
import styles from './CreateProduct.module.scss';
import { AuthContext } from '../../context';

const CreateProduct = () => {

    const [brands, setBrands] = React.useState([]);
    const [types, setTypes] = React.useState([]);
    const { createMode, setCreateMode } = React.useContext(AuthContext);
    const [info, setInfo] = React.useState([]);
    const [slide, setSlide] = React.useState([]);

    const addInfo = () => {
        setInfo([...info, { title: "", description: "", number: Date.now() }]);
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    }

    const addSlide = () => {
        setSlide([...slide, { img: "", number: Date.now() }]);
    }

    const removeSlide = (number) => {
        setSlide(slide.filter(i => i.number !== number));
    }

    const closeCreatePopup = () => {
        setCreateMode(false);
    }

    React.useEffect(() => {
        axios.get('http://localhost:3001/api/brand')
            .then((res) => {
                setBrands(res.data);
            });
        console.log(brands);
    }, []);

    React.useEffect(() => {
        axios.get('http://localhost:3001/api/type')
            .then((res) => {
                setTypes(res.data.slice(1));
            });
    }, []);

    const pushProduct = (e) => {
        e.preventDefault();
        setCreateMode(false);
    }

    return (
        <div className={styles.createProduct}>
            <svg onClick={closeCreatePopup} className={styles.close} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 352 512">
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
            <form className={styles.formProduct}>
                <div className={styles.line}>
                    <label htmlFor="product-name" className={styles.label} placeholder='Name'>Name:</label>
                    <input id="product-name" required tabIndex="1" type='text' className={styles.formInput}></input>                    
                </div>
                <div className={styles.line}>
                    <label htmlFor="product-code" className={styles.label}>Code:</label>
                    <input id="product-code" required tabIndex="2" type='text' className={styles.formInputSmall}></input> 
                    <label htmlFor="product-price" className={styles.label}>Price:</label>                    
                    <input id="product-price" required tabIndex="3" type='number' className={styles.formInputSmall}></input>
                </div>
                <div className={styles.line}>
                    <label htmlFor="product-brand" className={styles.label}>Brand:</label>
                    <select id="product-brand" required tabIndex="4" className={styles.formSelect}>
                        {brands ? brands.map((brand) => 
                            <option key={brand.name} value={brand.id} className={styles.option}>{brand.name}</option> 
                        ) : ""}
                    </select>
                    <label htmlFor="product-type" className={styles.label}>Type:</label>
                    <select id="product-type" required tabIndex="5" className={styles.formSelect}>
                        {types ? types.map((type) => 
                            <option key={type.name} value={type.name} className={styles.option}>{type.name}</option>
                        ) : ''}
                    </select>                    
                </div>
                <div className={styles.line}>
                    <label htmlFor="product-file" className={styles.label}>Photo:</label>
                    <input id="product-file" required tabIndex="6" type='file' className={styles.formFile}></input>                    
                </div>
                <button type='button' className={styles.infoButton} tabIndex="7" onClick={addInfo}>Add new info</button>
                {info.map((i) => 
                    <div className={styles.line} key={i.number}>
                        <label htmlFor="info-product_title" className={styles.label}>Info title:</label>
                        <input id="info-product_title" tabIndex="8" type='text' className={styles.formInputSmall}></input>  
                        <label htmlFor="info-product_description" className={styles.label}>Info description:</label>
                        <input id="info-product_description" tabIndex="9" type='text' className={styles.formInputSmall}></input>
                        <button type='button' tabIndex='10' className='info-product__remove' onClick={() => removeInfo(i.number)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                            </svg>                                     
                        </button>
                    </div>                    
                )}
                <button type='button' className={styles.slideButton} tabIndex="11" onClick={addSlide}>Add new slide</button>
                {slide.map((i) => 
                    <div className={styles.line} key={i.number}>
                        <label htmlFor="product-slide" className={styles.label}>Slide:</label>
                        <input id="product-slide" tabIndex="12" type='file' className={styles.formFile}></input>
                        <button type='button' tabIndex='13' className='slide-product__remove' onClick={() => removeSlide(i.number)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                            </svg>                                     
                        </button>
                    </div>                
                )}
                <label htmlFor="product-about" className={styles.label}>Description:</label>
                <textarea id="product-about" tabIndex='14' className={styles.textarea}></textarea>
                <button type='submit' onSubmit={pushProduct} tabIndex='15' className={styles.button}>Create product</button>
            </form>            
        </div>
    );
};

export default CreateProduct;