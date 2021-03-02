/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { iconList } from './iconList';
import cloud from '../../../images/icon/cloud.png';
import './clothesItem.css';
import { connect } from 'react-redux';

type ClothesItemProps = {
  clothes: string[];
  temp: number;
};

type IconNamesType = {
  name: string;
  class: string;
};

const ClothesItem = ({ clothes, temp }: ClothesItemProps) => {
  const [iconLength, setIconLength] = useState<number>(0);
  const [iconNames, setIconNames] = useState<any[]>([]);

  useEffect(() => {
    let validItemList = clothes
      .filter((el: string) => {
        for (let cloth of iconList) {
          if (cloth.name === el) {
            return true;
          }
        }
      })
      .map((el: string) => {
        for (let cloth of iconList) {
          if (cloth.name === el) {
            return cloth;
          }
        }
      });

    if (validItemList.length >= 6) {
      validItemList = validItemList.slice(0, 5);
    }
    setIconLength(validItemList.length);
    setIconNames(validItemList);
  }, [clothes]);

  const clothesItemTag = iconNames.map((cloth: IconNamesType, idx: number) => {
    return (
      <div
        className={`clothesItem__item clothesItem__item--length-${iconLength}`}
        key={idx}
      >
        <img
          className={`clothesItem__cloud clothesItem__cloud-${idx}`}
          src={cloud}
          alt='cloud'
        ></img>
        <div
          className={`${cloth.class} clothesItem__cloth-length--${iconLength} clothesItem__cloth-${idx}`}
        ></div>
      </div>
    );
  });

  return (
    <>
      <div className={`clothesItem clothesItem-length--${iconLength}`}>
        {clothesItemTag}
      </div>
      <div id='clothesItem__temp-info'>{temp}°C</div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return { temp: state.weatherReducer.temp };
};

export default connect(mapStateToProps)(ClothesItem);
