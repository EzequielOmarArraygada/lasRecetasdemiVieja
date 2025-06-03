import { Ionicons } from '@expo/vector-icons'; // Para los iconos
import { useLayoutEffect } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

function HomeScreen({ navigation }) {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Las Recetas de Mi Vieja',
      headerStyle: { backgroundColor: '#351401' },
      headerTintColor: 'white',
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/bg-pattern.jpg')} // Asegúrate de tener esta imagen en assets/
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      {/* Capa para oscurecer el fondo */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Sección de Recetas por Categorías */}
        <Pressable
          style={({ pressed }) => [styles.sectionButton, pressed && styles.pressed]}
          onPress={() => navigation.navigate('MealsCategories')}
        >
          <Ionicons name="grid-outline" size={30} color="#351401" />
          <Text style={styles.buttonText}>Recetas por Categorías</Text>
        </Pressable>

        {/* Sección de Todas las Recetas */}
        <Pressable
          style={({ pressed }) => [styles.sectionButton, pressed && styles.pressed]}
          onPress={() => navigation.navigate('MealsOverview', { source: 'allRecipes' })}
        >
          <Ionicons name="book-outline" size={30} color="#351401" />
          <Text style={styles.buttonText}>Todas las Recetas</Text>
        </Pressable>

        {/* Sección de Cocinar con lo que tengo */}
        <Pressable
          style={({ pressed }) => [styles.sectionButton, pressed && styles.pressed]}
          onPress={() => navigation.navigate('IngredientsFilter')}
        >
          <Ionicons name="nutrition-outline" size={30} color="#351401" />
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
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginVertical: 12,
    width: '80%',
    shadowColor: '#000',
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
    color: '#351401',
    marginLeft: 15,
  },
});