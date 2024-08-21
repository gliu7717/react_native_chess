import { StyleSheet, View,Dimensions  } from 'react-native';
import Board from './Board';
const { width } = Dimensions.get("window");
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";


export default function App() {
  return (
    <GestureHandlerRootView>

    <View style={styles.container}>
        <Board />
    </View>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },  
});
