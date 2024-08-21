import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Chess } from "chess.js";
import Background from "./Backgroud";
import Piece from "./Piece";

const { width } = Dimensions.get("window");

function useConst(initialValue){
  const ref = useRef();
  if (ref.current === undefined) {
    // Box the value in an object so we can tell if it's initialized even if the initializer
    // returns/is undefined
    ref.current = {
      value:
        typeof initialValue === "function"
          ? // eslint-disable-next-line @typescript-eslint/ban-types
            (initialValue)()
          : initialValue,
    };
  }
  return ref.current.value;
}

const Board = () => {
  const chess = useConst(() => new Chess());
  const [state, setState] = useState({
    player: "w",
    board: chess.board(),
  });

  const onTurn = useCallback(() => {
    setState({
      player: state.player === "w" ? "b" : "w",
      board: chess.board(),
    });
  }, [chess, state.player]);

  return (
    <View style={styles.container}>
      <Background />
      {state.board.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
            return (
              <Piece
                key={`${x}-${y}`}
                id={`${piece.color}${piece.type}`}
                startPosition={{ x, y }}
                chess={chess}
                onTurn={onTurn}
                enabled={state.player === piece.color}
              />
            );
          }
          return null;
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width,
      height: width,
      backgroundColor:"transparent"
    },
});  

export default Board;