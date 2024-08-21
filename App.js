import { StyleSheet, View,Dimensions  } from 'react-native';
import Board from './Board';
const { width } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
        <Board />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },  
});
