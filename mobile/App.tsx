import { StatusBar } from 'expo-status-bar';
import 'nativewind/css';
import { StyleSheet, Text, View } from 'react-native';
import './src/styles/globals.css';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
