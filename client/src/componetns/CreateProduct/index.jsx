import axios from 'axios';
import React from 'react';
import styles from './CreateProduct.module.scss';
import { AuthContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../http/productAPI';

const CreateProduct = () => {

    const inputRef = React.useRef();
    const navigate = useNavigate();

    const [brands, setBrands] = React.useState([]);
    const [types, setTypes] = React.useState([]);
    const [typeId, setTypeId] = React.useState(1);
    const [brandId, setBrandId] = React.useState(1);
    const [typeName, setTypeName] = React.useState('Select type');
    const [brandName, setBrandName] = React.useState('Select brand');
    const [typesVisibility, setTypesVisibility] = React.useState(false);
    const [brandsVisibility, setBrandsVisibility] = React.useState(false);
    const [name, setName] = React.useState('');
    const [code, setCode] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const { createMode, setCreateMode } = React.useContext(AuthContext);
    const [info, setInfo] = React.useState([]);
    const [slide, setSlide] = React.useState([]);
    const [img, setImg] = React.useState(null);

    const selectFile = (event) => {
        setImg(event.target.files[0]);
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeCode = (e) => {
        setCode(e.target.value);
    }

    const onChangePrice = (e) => {
        setPrice(e.target.value);
    }

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

    const toggleBrandOptions = () => {
        if (brandsVisibility) {
            setBrandsVisibility(false);
        } else {
            setBrandsVisibility(true);
        }
    }

    const toggleTypeOptions = () => {
        if (typesVisibility) {
            setTypesVisibility(false);
        } else {
            setTypesVisibility(true);
        }
    }

    const hideBrandOptions = (id, name) => {
        setBrandId(id);
        setBrandName(name);
        setBrandsVisibility(false);
    }

    const hideTypeOptions = (id, name) => {
        setTypeId(id);
        setTypeName(name);
        setTypesVisibility(false);
    }

    const pushProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('code', code);
        formData.append('price', price);
        formData.append('brandId', brandId);
        formData.append('typeId', typeId);
        formData.append('img', img);
        createProduct(formData);
        alert('Novo produtos adicionado com sucesso!');
        setCreateMode(false);  
        navigate('/auth');
        window.scrollTo(0, 0);
    }

    return (
        <div className={styles.createProduct}>
            <svg onClick={closeCreatePopup} className={styles.close} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 352 512">
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
            <form onSubmit={pushProduct} className={styles.formProduct}>
                <div className={styles.line}>
                    <label htmlFor="product-name" className={styles.label} placeholder='Name'>Name:</label>
                    <input id="product-name" required tabIndex="1" type='text' className={styles.formInput}
                        ref={inputRef}
                        value={name}
                        onChange={onChangeName}
                    />                    
                </div>
                <div className={styles.line}>
                    <label htmlFor="product-code" className={styles.label}>Code:</label>
                    <input id="product-code" required tabIndex="2" type='text' className={styles.formInputSmall}
                        ref={inputRef}
                        value={code}
                        onChange={onChangeCode}
                    /> 
                    <label htmlFor="product-price" className={styles.label}>Price:</label>                    
                    <input id="product-price" required tabIndex="3" type='text' className={styles.formInputSmall}
                        ref={inputRef}
                        value={price}
                        onChange={onChangePrice}
                    />
                </div>
                <div className={styles.line}>
                    <label htmlFor="product-brand" className={styles.label}>Brand:</label>
                    <div onClick={toggleBrandOptions} id="product-brand" required tabIndex="4" className={styles.formSelect}>
                        {brandName}
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
                        </svg>
                    </div>
                    {brandsVisibility ? 
                        <div className={styles.brandOptions}>
                            {brands ? brands.map((brand) => 
                                <div key={brand.name} value={brand.id} onClick={() => hideBrandOptions(brand.id, brand.name)} className={styles.option}>{brand.name}</div> 
                            ) : ""}                            
                        </div>                        
                        : ''
                    }
                    <label htmlFor="product-type" className={styles.label}>Type:</label>
                    <div onClick={toggleTypeOptions} id="product-type" required tabIndex="5" className={styles.formSelect}>
                        {typeName}
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
                        </svg>
                    </div>  
                    {typesVisibility ? 
                        <div className={styles.typeOptions}>
                            {types ? types.map((type) => 
                                <div key={type.name} onClick={() => hideTypeOptions(type.id, type.name)} value={type.name} className={styles.option}>{type.name}</div>
                            ) : ''}                            
                        </div>                          
                        : ""
                    }
                </div>
                <div className={styles.line}>
                    <label htmlFor="product-file" className={styles.label}>Photo:</label>
                    <input id="product-file" required tabIndex="6" type='file' className={styles.formFile}
                        onChange={selectFile}
                    />                    
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
                <button type='submit' tabIndex='15' className={styles.button}>Create product</button>
            </form>            
        </div>
    );
};

export default CreateProduct;