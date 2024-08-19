import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Dimensions  } from 'react-native';
import Background from './Backgroud';
const { width } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
        <Background />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },  
});
