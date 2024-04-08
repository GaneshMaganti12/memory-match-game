import React from "react";
import "./Cards.css";

function Cards(props) {
  const { data, handleClick, isFlip } = props;

  const clickHandle = () => {
    handleClick(data);
  };

  return (
    <div className={isFlip ? "flip-card" : "cards"} onClick={clickHandle}>
      <div className="front"></div>
      <div className="back">
        <img alt={data.name} className="image" src={data.imageUrl} />
      </div>
    </div>
  );
}

export default Cards;
