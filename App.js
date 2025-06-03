import { registerRootComponent } from 'expo';
import React from 'react'; // <-- ¡AÑADE ESTA LÍNEA!
import { StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

import Ionicons from '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Ionicons': Ionicons,
  });

  React.useEffect(() => { // Aquí usamos React.useEffect, por eso necesitamos el import
    async function hideSplash() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

registerRootComponent(App);