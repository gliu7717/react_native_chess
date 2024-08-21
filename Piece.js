import React, { useCallback } from "react";
import { StyleSheet, Image} from "react-native";
import { Gesture, GestureDetector, } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { toTranslation, SIZE, toPosition } from "./Notation";


export const PIECES= {
  br: require("./assets/br.png"),
  bp: require("./assets/bp.png"),
  bn: require("./assets/bn.png"),
  bb: require("./assets/bb.png"),
  bq: require("./assets/bq.png"),
  bk: require("./assets/bk.png"),
  wr: require("./assets/wr.png"),
  wn: require("./assets/wn.png"),
  wb: require("./assets/wb.png"),
  wq: require("./assets/wq.png"),
  wk: require("./assets/wk.png"),
  wp: require("./assets/wp.png"),
};

const Piece = ({ id, startPosition, chess, onTurn, enabled }) => {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(startPosition.x * SIZE  );
  const translateY = useSharedValue(startPosition.y * SIZE );
  const context = useSharedValue({ x: 0, y: 0 });

  const movePiece = useCallback(
    (to) => {
      const moves = chess.moves({ verbose: true });
      const from = toPosition({ x: offsetX.value, y: offsetY.value });
      const move = moves.find((m) => m.from === from && m.to === to);
      const { x, y } = toTranslation(move ? move.to : from);
      translateX.value = withTiming(
        x,
        {},
        () => (offsetX.value = translateX.value)
      );
      translateY.value = withTiming(y, {}, () => {
        offsetY.value = translateY.value;
        isGestureActive.value = false;
      });
      if (move) {
        chess.move({ from, to });
        onTurn();
      }
    },
    [chess, isGestureActive, offsetX, offsetY, onTurn, translateX, translateY]
  );

  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = { x: translateX.value, y: translateY.value };
    offsetX.value = translateX.value;
    offsetY.value = translateY.value;
    isGestureActive.value = true;
  })
  .onUpdate((event) => {
    translateX.value = event.translationX + context.value.x;
    translateY.value = event.translationY + context.value.y;
    
  })
  .onEnd(() => {
    runOnJS(movePiece)(
      toPosition({ x: translateX.value, y: translateY.value  })
    );
  })

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: isGestureActive.value ? 100 : 10,
    backgroundColor:"transparent",
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));
  const original = useAnimatedStyle(() => {
    return {
      position: "absolute",
      width: SIZE,
      height: SIZE,
      zIndex: 0,
      backgroundColor: isGestureActive.value
        ? "rgba(255, 255, 0, 0.5)"
        : "transparent",
      transform: [{ translateX: offsetX.value   }, { translateY: offsetY.value }],
    };
  });

    
  const underlay = useAnimatedStyle(() => {
    const position = toPosition({ x: translateX.value, y: translateY.value });
    const translation = toTranslation(position);
    return {
      position: "absolute",
      width: SIZE,
      height: SIZE,
      zIndex: 0,
      backgroundColor: isGestureActive.value
        ? "rgba(255, 255, 0, 0.5)"
        : "transparent",
      transform: [{ translateX: translation.x  }, { translateY: translation.y}],
    };
  });


  return (
    <>
      <Animated.View style={underlay} />
      <Animated.View style={original} />
      <GestureDetector gesture={gesture}>

        <Animated.View style={style}> 
          <Image source={PIECES[id]} style={styles.piece} />
        </Animated.View> 
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE,
    backgroundColor:'transparent',
    position:'absolute'
  },
});

export default Piece;