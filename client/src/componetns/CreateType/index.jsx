import axios from 'axios';
import React from 'react';
import styles from './CreateType.module.scss';
import { AuthContext } from '../../context';

const CreateType = () => {

    const [categories, setCategories] = React.useState([]);
    const { createMode, setCreateMode } = React.useContext(AuthContext);

    const closeCreatePopup = () => {
        setCreateMode(false);
    }

    React.useEffect(() => {
        axios.get('http://localhost:3001/api/category')
            .then((res) => {
                setCategories(res.data);
            });
    }, []);

    const pushType = (e) => {
        e.preventDefault();
        setCreateMode(false);
    }

    return (
        <div className={styles.createType}>
            <svg onClick={closeCreatePopup} className={styles.close} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 352 512">
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
            <form className={styles.formType}>
                <div className={styles.line}>
                    <label htmlFor="type-name" className={styles.label} placeholder='Name'>Name:</label>
                    <input id="type-name" required tabIndex="1" type='text' className={styles.formInput}></input>                    
                </div>
                <div className={styles.line}>
                    <label htmlFor="type-category" className={styles.label}>Category:</label>
                    <select id="type-category" required tabIndex="5" className={styles.formSelect}>
                        {categories ? categories.map((category) => 
                            <option key={category.name} value={category.name} className={styles.option}>{category.name}</option>
                        ) : ''}
                    </select>                    
                </div>
                <div className={styles.line}>
                    <label htmlFor="type-file" className={styles.label}>Image:</label>
                    <input id="type-file" required tabIndex="6" type='file' className={styles.formFile}></input>                    
                </div>
                <button type='submit' onSubmit={pushType} tabIndex='13' className={styles.button}>Create type</button>
            </form>            
        </div>
    );
};

export default CreateType;