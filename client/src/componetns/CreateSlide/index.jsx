import React from 'react';
import styles from './CreateSlide.module.scss';
import { AuthContext } from '../../context';

const CreateSlide = () => {

    const { setCreateMode } = React.useContext(AuthContext);
    const [file, setFile] = React.useState(null);

    const selectFile = (event) => {
        setFile(event.target.files[0]);
    }

    const closeCreatePopup = () => {
        setCreateMode(false);
    }

    const pushSlide = (e) => {
        e.preventDefault();
        if (file) {
            const slide = { img: file.name };
            try {
            fetch('http://localhost:3001/api/slide', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json'},
                    body: JSON.stringify(slide)
                }).then(res => {
                    return res.json();
                });
                alert('Успешно добавлен слайд.');               
            } catch (error) {
                alert('Error');
            }
 

            setCreateMode(false);            
        }
    }

    return (
        <div className={styles.createSlide}>
            <svg onClick={closeCreatePopup} className={styles.close} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 352 512">
                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
            <form onSubmit={pushSlide} className={styles.formSlide}>
                <div className={styles.line}>
                    <label htmlFor="slide-file" className={styles.label}>Image:</label>
                    <input id="slide-file" required tabIndex="6" type='file' className={styles.formFile}
                        onChange={selectFile}/>                    
                </div>
                <button type='submit' tabIndex='13' className={styles.button}>Create slide</button>
            </form>            
        </div>
    );
};

export default CreateSlide;