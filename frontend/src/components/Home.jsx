import React from 'react'
import "../App.css";
import Carousel from './Carousel';
import Marquee from './Marquee';
import { StyleSheetManager } from 'styled-components';
import Products from './Products';
import CategoryBoxes from './CategoryBoxes';
import Slider from './Slider';
import Brands from './Brands';
import ShoppingInfo from './ShoppingInfo';
export default function Home() {
  const DATA_LIST = [
    "İlk Alışverişe Kargo Bedava!",
    "Güneş Gözlüklerinde 2 Al 1 Öde!",
    "1000 TL ve Üstü Alışverişinizde 100 TL İndirim!"
  ];
  return (
    <div>
      <Carousel/>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== 'move' && prop !== 'time'}>
        <div className='wrapper-marquee'>
          <Marquee list={DATA_LIST} time={35} />
        </div>
      </StyleSheetManager>   
      <Products/>
      <CategoryBoxes/>
      <Slider/>
      <Brands/>
      <ShoppingInfo/>
    </div>
  )
}
