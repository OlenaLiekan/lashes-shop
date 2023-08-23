import axios from 'axios';
import React from 'react';
import styles from './UpdateProduct.module.scss';
import { AuthContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { updateProduct} from '../../http/productAPI';

const UpdateProduct = ({id, obj}) => {

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
    const { setUpdateMode } = React.useContext(AuthContext);
    const [info, setInfo] = React.useState([]);
    const [slide, setSlide] = React.useState([]);
    const [img, setImg] = React.useState(null);
    const [images, setImages] = React.useState([]);
    const [isLashes, setIsLashes] = React.useState(false);
    const [text, setText] = React.useState('');

    React.useEffect(() => {
        setName(obj.name);
        setCode(obj.code);
        setPrice(obj.price);
        setTypeId(obj.typeId);
        setBrandId(obj.brandId);
        setIsLashes(obj.isLashes);
        setText(obj.text[0].text);
        setInfo(obj.info);
        setSlide(obj.slide);
        setImg(obj.img);
        const brand = brands.find(brand => brand.id === obj.brandId);
        if (brand) {
            setBrandName(brand.name);            
        }
        const type = types.find(type => type.id === obj.typeId);
        if (type) {
            setTypeName(type.name);            
        } 
        console.log(obj.slide);
    }, [obj, brands, types]);

    const success = () => {
        alert('Novo produtos adicionado com sucesso!');
        setUpdateMode(false);  
        navigate('/auth');
        window.scrollTo(0, 0);  
    }

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

    const onChangeText = (e) => {
        setText(e.target.value);
    }

    const addInfo = () => {
        setInfo([...info, { title: "", description: "", id: Date.now() }]);
    }

    const removeInfo = (id) => {
        setInfo(info.filter(i => i.id !== id));
    }

    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? { ...i, [key]: value } : i));
    }

    const addSlide = () => {
        setSlide([...slide, { slideImg: "", id: Date.now() }]);
    }

    const removeSlide = (id) => {
        setSlide(slide.filter(i => i.id !== id));
    }

    const changeSlide = (key, value, id) => {
        setSlide(slide.map(i => i.id === id ? { ...i, [key]: value } : i));
    }

    React.useEffect(() => {
        let slideFiles = Object.entries(slide).map(([key, value]) => value);
        slideFiles = slideFiles.map((slideFile) => Object.entries(slideFile));
        slideFiles = slideFiles.map((slideFile) => slideFile.map((file) => file[1]));
        setImages(slideFiles.map((slideFile) => slideFile[0]));
    }, [slide]);

    const closeUpdatePopup = () => {
        setUpdateMode(false);
    }

    React.useEffect(() => {
        axios.get('http://localhost:3001/api/brand')
            .then((res) => {
                setBrands(res.data);
            });
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
            setTypesVisibility(false);
        }
    }

    const toggleTypeOptions = () => {
        if (typesVisibility) {
            setTypesVisibility(false);
        } else {
            setTypesVisibility(true);
            setBrandsVisibility(false);
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

    React.useEffect(() => {
        if (typeName === 'Pestanas') {
            setIsLashes(true);
        } else {
            setIsLashes(false);
        }
    }, [typeName]);

    const updateProductItem = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('code', code);
        formData.set('price', price);
        formData.set('brandId', brandId);
        formData.set('typeId', typeId);
        formData.set('text', text);
        if (img) {
            formData.set('img', img);               
        }
        formData.set('info', JSON.stringify(info));
        images.forEach((file) => {
            formData.append('slide', file);
        });           
        updateProduct(formData, id).then(data => success());      
    }

    return (
        <div className={styles.updateProduct}>
            <svg onClick={closeUpdatePopup} className={styles.close} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 352 512">
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
            <form onSubmit={updateProductItem} className={styles.formProduct}>
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
                    <div onClick={toggleBrandOptions} id="product-brand" required tabIndex="4" className={styles.formSelectBrands}>
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
                    <div onClick={toggleTypeOptions} id="product-type" required tabIndex="5" className={styles.formSelectTypes}>
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
                    <input id="product-file" tabIndex="6" type='file' className={styles.formFile}
                        onChange={selectFile}
                    />                    
                </div>
                {info.map((i) => 
                    <div className={styles.line} key={i.id}>
                        <label htmlFor="info-product_title" className={styles.label}>Info title:</label>
                        <input id="info-product_title" tabIndex="7" type='text' className={styles.formInputSmall}
                            value={i.title}
                            onChange={(e) => changeInfo('title', e.target.value, i.id)}
                        /> 
                        <label htmlFor="info-product_description" className={styles.label}>Info description:</label>
                        <input id="info-product_description" tabIndex="8" type='text' className={styles.formInputSmall}
                            value={i.description}
                            onChange={(e) => changeInfo('description', e.target.value, i.id)}
                        />
                        <button type='button' tabIndex='9' className='info-product__remove' onClick={() => removeInfo(i.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                            </svg>                                     
                        </button>
                    </div>                    
                )}
                <button type='button' className={styles.infoButton} tabIndex="10" onClick={addInfo}>Add new info</button>
                {slide.map((i) => 
                    <div className={styles.line} key={i.id}>
                        <label htmlFor="product-slide" className={styles.label}>Slide:</label>
                        <input id="product-slide" tabIndex="11" type='file' className={styles.formFile}
                            onChange={(e) => changeSlide('slideImg', e.target.files[0], i.id)}
                        />
                        <button type='button' tabIndex='12' className='slide-product__remove' onClick={() => removeSlide(i.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                            </svg>                                     
                        </button>
                    </div>                
                )}
                <button type='button' className={styles.slideButton} tabIndex="13" onClick={addSlide}>Add new slide</button>
                <label htmlFor="product-about" className={styles.label}>Description:</label>
                <textarea id="product-about" tabIndex='14' className={styles.textarea}
                    ref={inputRef}
                    value={text}
                    onChange={onChangeText}
                />
                <button type='submit' tabIndex='15' className={styles.button}>Update product</button>
            </form>            
        </div>
    );
};

export default UpdateProduct;