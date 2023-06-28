import React from 'react';

import styles from './AdminPanel.module.scss';

const AdminPanel = () => {
    return (
        <div className={styles.actions}>
            <form className={styles.form}>
                <h3 className={styles.formTitle}>
                    Catalog Manager
                </h3>
                <div className={styles.formBody}>
                    <button className={styles.buttonCreate}>
                        Add a new category
                    </button>
                    <button className={styles.buttonUpdate}>
                        Update category data
                    </button>
                    <button className={styles.buttonDelete}>
                        Delete category
                    </button>
                </div>
            </form>
            <form className={styles.form}>
                <h3 className={styles.formTitle}>
                    Product Manager
                </h3>
                <div className={styles.formBody}>
                    <button className={styles.buttonCreate}>
                        Add a new product
                    </button>
                    <button className={styles.buttonUpdate}>
                        Update product data
                    </button>
                    <button className={styles.buttonDelete}>
                        Delete product
                    </button>                    
                </div>
            </form>
            <form className={styles.form}>
                <h3 className={styles.formTitle}>
                    Brand Manager
                </h3>
                <div className={styles.formBody}>
                    <button className={styles.buttonCreate}>
                        Add a new brand
                    </button>
                    <button className={styles.buttonUpdate}>
                        Update brand data
                    </button>
                    <button className={styles.buttonDelete}>
                        Delete brand
                    </button>
                </div>
            </form>
            <form className={styles.form}>
                <h3 className={styles.formTitle}>
                    Slider Manager
                </h3>
                <div className={styles.formBody}>
                    <button className={styles.buttonCreate}>
                        Add a new slide
                    </button>
                    <button className={styles.buttonUpdate}>
                        Update slide
                    </button>
                    <button className={styles.buttonDelete}>
                        Delete slide
                    </button>                    
                </div>
            </form>
        </div>
    );
};

export default AdminPanel;