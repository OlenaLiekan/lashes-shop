import React from 'react'
import styles from "./Categories.module.scss";
import axios from 'axios';

function Categories({ arrItem, categoryId, onChangeCategory }) {

  const [items, setItems] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:3001/api/brand`,
      )
      .then((res) => {
        setBrands(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);
  
/*React.useEffect(() => {
    items.map((obj) => {
      for (let key of Object.keys(obj)) {
        if (key === arrItem) {
          for (let value of Object.values(obj)) {
            setCategories(value);
          }    
        }
      }            
    })    
    onChangeCategory(0);  
}, [items, arrItem, isLoading]);*/
  
  return (
    <>
      <ul className="product-main__categories">
        <li onClick={() => onChangeCategory(0)} className={categoryId === 0 ? "active" : ""}>
          <button className={styles.categoryProducts}>
            Todos
          </button>
        </li>
        { brands.map((brandName) => (
           <li key={brandName.id} onClick={() => onChangeCategory(brandName.id)} className={categoryId === brandName.id ? "active" : ""} >
            <button className={styles.categoryProducts}>
              {brandName.name}
            </button>
            </li>
        ))
        }
      </ul>
    </>    
  );
}

export default Categories;