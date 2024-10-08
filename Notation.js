/* eslint-disable prefer-destructuring */
import { Position } from "chess.js";
import { Dimensions } from "react-native";
import { Vector } from "react-native-redash";

const { width } = Dimensions.get("window");
export const SIZE = width / 9;

export const toTranslation = (to) => {
  "worklet";
  // worklet don't support destructuring yet
  const tokens = to.split("");
  const col = tokens[0];
  const row = tokens[1];
  if (!col || !row) {
    throw new Error("Invalid notation: " + to);
  }
  const indexes = {
    x: col.charCodeAt(0) - "a".charCodeAt(0),
    y: parseInt(row, 10) - 1,
  };
  return {
    x: indexes.x * SIZE,
    y: 7 * SIZE - indexes.y * SIZE,
  };
};

export const toPosition = ({ x, y }) => {
  "worklet";
  const col = String.fromCharCode(97 + Math.round( (x ) / SIZE));
  const row = `${8 - Math.round( (y) / SIZE)}`;
  return `${col}${row}`;
};