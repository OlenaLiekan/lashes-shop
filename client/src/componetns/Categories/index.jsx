import React from 'react'
import styles from "./Categories.module.scss";
import axios from 'axios';

function Categories({ arrItem, categoryId, onChangeCategory }) {

  const [items, setItems] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://6418aa9675be53f451e4d45a.mockapi.io/categories`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);

  }, []);
  
React.useEffect(() => {
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
}, [items, arrItem, isLoading]);
  
  return (
    <>
      <ul className="product-main__categories">
        { categories.map((categoryName, i) => (
           <li key={categoryName} onClick={() => onChangeCategory(i)} className={categoryId === i ? "active" : ""} >
            <button className={styles.categoryProducts}>
              {categoryName}
            </button>
            </li>
        ))
        }
      </ul>
    </>    
  );
}

export default Categories;