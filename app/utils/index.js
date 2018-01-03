import React from 'react';
import { base } from './constants';
import * as Icons from 'components/Icons';


export function CSSToHex(cssColor) {
  return parseInt(`0x${cssColor.substring(1)}`, 16);
}


export function shadeColor(color, percent) {
	let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;
  G = (G<255)?G:255;
  B = (B<255)?B:255;

  let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
};


export function getMeasurementsFromDimensions({ x, y, z }) {
  return { width: base * x, height: base * y || (base * 2) / 1.5, depth: base * z };
}


export function displayNameFromDimensions(dimensions) {
  return `${dimensions.x}x${dimensions.z}`;
}


export function getBrickIconFromDimensions(dimensions) {
  const Icon = Icons[`B${dimensions.x}x${dimensions.z}`];
  return <Icon />;
}
