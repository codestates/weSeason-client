import React from "react";
import icon from "../../../images/icon/btn-icon.png";
import "./clothesList.css";

type ClothesListProps = {
  clothes: string[];
};

const ClothesList = ({ clothes }: ClothesListProps) => {
  const nameList = clothes.map((cloth, idx) => {
    return (
      <p className="clothesList__data-cloth" key={idx}>
        {cloth}
      </p>
    );
  });

  return (
    <>
      <div id="clothesList">
        <div id="clothesList__box">
          <div id="clothesList__left">
            <img id="clothesList__icon" src={icon} alt="lamp"></img>
          </div>
          <div id="clothesList__data">{nameList}</div>
        </div>
      </div>
    </>
  );
};

export default ClothesList;
