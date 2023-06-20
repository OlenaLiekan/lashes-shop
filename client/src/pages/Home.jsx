import React from 'react';

import BestSellersBlock from '../componetns/BestSellersBlock';
import BrandsBlock from '../componetns/BrandsBlock';
import MainSliderBlock from '../componetns/MainSliderBlock';

const Home = () => { 
    return (
      <div className="main__content">
        <MainSliderBlock />
        <BrandsBlock />
        <BestSellersBlock />
      </div>
    );
};

export default Home;