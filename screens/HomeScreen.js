
import { Ionicons } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors.js'; // Asegúrate de que esta ruta sea correcta

function HomeScreen({ navigation }) {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Las Recetas de Mi Vieja',
      headerStyle: { backgroundColor: Colors.primary800 },
      headerTintColor: Colors.white,
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/bg-pattern.jpg')}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Sección de Recetas por Categorías */}
        <Pressable
          style={({ pressed }) => [styles.sectionButton, pressed && styles.pressed]}
          onPress={() => navigation.navigate('MealsCategories')}>
          <Ionicons name="grid-outline" size={30} color={Colors.primary800} />
          <Text style={styles.buttonText}>Recetas por Categorías</Text>
        </Pressable>

        {/* Sección de Todas las Recetas */}
        <Pressable
          style={({ pressed }) => [styles.sectionButton, pressed && styles.pressed]}
          onPress={() => navigation.navigate('MealsOverview', { source: 'allRecipes' })}>
          <Ionicons name="book-outline" size={30} color={Colors.primary800} />
          <Text style={styles.buttonText}>Todas las Recetas</Text>
        </Pressable>

        {/* Sección de Cocinar con lo que tengo */}
        <Pressable
          style={({ pressed }) => [styles.sectionButton, pressed && styles.pressed]}
          onPress={() => navigation.navigate('IngredientsFilter')}>
          <Ionicons name="nutrition-outline" size={30} color={Colors.primary800} />
          <Text style={styles.buttonText}>¿Qué tenés para cocinar?</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    opacity: 0.2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginVertical: 12,
    width: '80%',
    shadowColor: Colors.gray800,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 8,
    justifyContent: 'flex-start',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gray800,
    marginLeft: 15,
  },
});