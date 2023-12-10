import React from 'react';
import style from './Stars.module.css';
import filledStar from "./filledStar.png"
import halfStar from './halfStar.png';
import emptyStar from './emptyStar.png';

const Stars = ({ rating }) => {
  const starPercentage = (Math.round(rating * 2) / 10) * 100;
  const starStyle = {
    width: `${starPercentage}%`
  };

  return (
    <div className={style.starsOuter}>
      <div className={style.starsInner} style={starStyle}>
        {Array.from(Array(5).keys()).map((_, index) => {
          let   starImage;
          if (index + 0.5 <= rating) {
            starImage = filledStar; // Estrella llena
          } else if (index < Math.ceil(rating)) {
            starImage = halfStar; // Media estrella
          } else {
            starImage = emptyStar; // Estrella vacía
          }
          return <img key={index} src={starImage} alt="star" className={style.stars} />;
        })}
      </div>
    </div>
  );
};

export default Stars;