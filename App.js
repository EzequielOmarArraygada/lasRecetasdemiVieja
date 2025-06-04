// App.js
import { registerRootComponent } from 'expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

import Ionicons from '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf';
import AsyncStorage from '@react-native-async-storage/async-storage'; // <-- ¡AÑADE ESTA LÍNEA!
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Ionicons': Ionicons,
  });

  React.useEffect(() => {
    async function prepareApp() {
      try {
        // --- INICIO DE SECCIÓN TEMPORAL PARA DEPURACIÓN ---
        // *** ¡IMPORTANTE! ELIMINA ESTA LÍNEA DESPUÉS DE LA PRUEBA INICIAL EXITOSA! ***
        await AsyncStorage.clear(); // Esta línea borrará TODO el AsyncStorage al inicio
        // --- FIN DE SECCIÓN TEMPORAL PARA DEPURACIÓN ---

        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      }
    }
    prepareApp();
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