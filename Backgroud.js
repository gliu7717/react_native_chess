import React from "react";
import { View, StyleSheet,Dimensions,Image} from "react-native";

const { width,height } = Dimensions.get("window");
export const SIZE = width;
const TOPMARGIN = (height - width) /2

const Background = () => {
    return (
      <View style={{ flex: 1 }}>
        <Image source = {require("./assets/board.png")} style = {styles.board} />
      </View>
    );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  board: {
    marginTop: TOPMARGIN,
    width: SIZE,
    height: SIZE,
  },
});
export default Background;
