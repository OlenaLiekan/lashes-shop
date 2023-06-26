import React from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { scrollTop, camelize } from "../js/script";
import ProductBlock from "./ProductBlock";
import Skeleton from "./Skeleton";

const BestSellersBlock = ({ types }) => {

  const [items, setItems] = React.useState([]);
  const [typeNames, setTypeNames] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:3001/api/product?rating=5`)
      .then((res) => {
        setItems(res.data.rows);
        setIsLoading(false);
      });
    scrollTop();
  }, []);

  /*React.useEffect(() => {
    setIsLoading(true);
    axios.all([
      axios.get(`http://localhost:3001/api/product?typeId=1&rating=5`
      ),
      axios.get(`http://localhost:3001/api/product?typeId=2&rating=5`
      ),
      axios.get(`http://localhost:3001/api/product?typeId=3&rating=5`
      ),      
      axios.get(`http://localhost:3001/api/product?typeId=4&rating=5`
      ),
    ])
      .then(axios.spread((firstRes, secondRes, thirdRes, fourthRes) => {
        const res = [firstRes.data[0], secondRes.data[0], thirdRes.data[0], fourthRes.data[0]];
        setItems(res);
      }));
    setIsLoading(false);

  }, []);*/

      
  const products = items.map((item) =>
    <Link key={item.id} to={`/${item.id}`}>
      <ProductBlock {...item} />
    </Link>
  );

  

  const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />);

    return (
        <section className="best__block block-best">
          <div className="block-best__container">
            <div className="block-best__content">
              <h2 className="block-best__title">BENS POPULARES</h2>
              <div className="block-best__items product-main__items">
                {isLoading ? skeletons : products}
              </div>
              <div className="block-best__more more-best-block">
                <Link onClick={scrollTop} to="/catalog" className="more-best-block__link scroll-top">
                  Ver todo o catálogo
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
    );
};

export default BestSellersBlock;