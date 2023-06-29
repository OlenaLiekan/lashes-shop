import React from 'react';

import styles from './AdminPanel.module.scss';

const AdminPanel = () => {

    const [showPopup, setShowPopup] = React.useState(false);
    const arr = ['Category', 'Product', 'Brand', 'Slide'];

    const showOptions = () => {
        setShowPopup(true);
        window.scrollTo(0, 0);
    }

    const hideOptions = () => {
        setShowPopup(false);
        window.scrollTo(0, 0);
    }

    return (
        <div className={styles.actions}>
            {
                showPopup === true
                    ?
                    <div className={styles.popup}>
                        <div className={styles.popupBody}>
                            <form className={styles.form}>
              
                                <h3 className={styles.formTitle}>
                                    What do you want to do ?
                                </h3>
                                <button className={styles.closePopup} onClick={hideOptions}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                                        <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
                                    </svg>
                                    Back
                                </button>  
                                <div className={styles.formActions}>
                                    <button className={styles.buttonCreate}>
                                        Add
                                    </button>
                                    <button className={styles.buttonUpdate}>
                                        Update
                                    </button>
                                    <button className={styles.buttonDelete}>
                                        Delete
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    
                    <form className={styles.form}>
                        <h3 className={styles.formTitle}>
                            Where would you like to make changes?
                        </h3>
                        <div className={styles.formBody}>
                            {arr.map((item, i) => 
                                <button key={item} onClick={showOptions} className={styles.button}>
                                    {item}
                                </button>
                            )}
                        </div>
                    </form>
            }
        </div>
    );
};

export default AdminPanel;