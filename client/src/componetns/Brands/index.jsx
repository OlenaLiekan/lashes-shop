import React from 'react'
import styles from "./Brands.module.scss";
import axios from 'axios';

function Brands({ type, brandId, onChangeBrand }) {

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
  }, [type]);
  
  return (
      <ul className="product-main__categories">
        <li onClick={() => onChangeBrand(0)} className={brandId === 0 ? "active" : ""}>
          <button className={styles.brandProducts}>
            Todos
          </button>
        </li>
        {brands.map((brandName) => (
          <li key={brandName.id} onClick={() => onChangeBrand(brandName.id)} className={brandId === brandName.id ? "active" : ""} >
                <button className={styles.brandProducts}>
                  {brandName.name}
                </button>
            </li>
        ))
        }
      </ul>  
  );
}

export default Brands;