import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView, // Para permitir desplazamiento si el contenido es largo
  Image,      // Para mostrar imágenes
  FlatList,   // Para el carrusel de imágenes y/o imágenes en pasos
  Dimensions, // Para obtener el ancho de la pantalla para el carrusel
  Linking,    // Para abrir enlaces de video (si implementamos videos)
  Pressable   // Para hacer las imágenes/videos de los pasos clicables
} from 'react-native';
import RECIPES from '../data/recipes'; // ¡Importa tus datos de recetas!
import { useRoute, useNavigation } from '@react-navigation/native'; // Para obtener parámetros y navegar

const { width } = Dimensions.get('window'); // Obtiene el ancho de la pantalla

function RecipeDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const recipeId = route.params.recipeId;
  const selectedRecipe = RECIPES.find(recipe => recipe.id === recipeId);

  // Usamos useLayoutEffect para establecer el título de la pantalla
  useLayoutEffect(() => {
    if (selectedRecipe) {
      navigation.setOptions({
        title: selectedRecipe.name,
      });
    }
  }, [navigation, selectedRecipe]);

  if (!selectedRecipe) {
    return (
      <View style={styles.centered}>
        <Text>No se encontró la receta.</Text>
      </View>
    );
  }

  // Función para renderizar un ítem de imagen en el carrusel
  const renderCarouselImage = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={styles.carouselImage}
      // OPCIONAL: Para depuración, puedes agregar onLoad, onError
      onLoad={() => console.log('Imagen de carrusel cargada:', item)}
      onError={(error) => console.log('Error al cargar imagen de carrusel:', item, error.nativeEvent.error)}
    />
  );

  // Función para renderizar un paso (puede incluir imagen/video)
  const renderStep = ({ item, index }) => (
    <View style={styles.stepItem} key={index}>
      <Text style={styles.stepText}>{index + 1}. {item.text}</Text>
      {item.imageUrl && ( // Si el paso tiene una imagen
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.stepImage}
          onLoad={() => console.log('Imagen de paso cargada:', item.imageUrl)}
          onError={(error) => console.log('Error al cargar imagen de paso:', item.imageUrl, error.nativeEvent.error)}
        />
      )}
      {item.videoUrl && ( // Si el paso tiene un video (mostrará un botón para abrir)
        <Pressable
          onPress={() => Linking.openURL(item.videoUrl)}
          style={styles.videoButton}
        >
          <Text style={styles.videoButtonText}>Ver video explicativo</Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Carrusel de Imágenes de la Receta Terminada */}
      {selectedRecipe.images && selectedRecipe.images.length > 0 ? (
        <FlatList
          data={selectedRecipe.images}
          renderItem={renderCarouselImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled // Para que se desplace una imagen a la vez
          showsHorizontalScrollIndicator={false}
          snapToInterval={width} // Ajusta el snap al ancho de la pantalla
          decelerationRate="fast"
          style={styles.carouselContainer}
        />
      ) : ( // Si no hay carrusel, muestra la imagen principal antigua
        <Image
          style={styles.image}
          source={{ uri: selectedRecipe.imageUrl }}
          onLoad={() => console.log('Imagen principal cargada:', selectedRecipe.imageUrl)}
          onError={(error) => console.log('Error al cargar imagen principal:', selectedRecipe.imageUrl, error.nativeEvent.error)}
        />
      )}

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{selectedRecipe.name}</Text>

        <Text style={styles.subtitle}>Tiempo de preparación: {selectedRecipe.duration} minutos</Text>
        <Text style={styles.subtitle}>Dificultad: {selectedRecipe.complexity}</Text>

        <Text style={styles.subtitle}>Ingredientes:</Text>
        {/* MODIFICACIÓN AQUÍ para el formato de los ingredientes */}
        {selectedRecipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.listItem}>
            • {ingredient.name}
            {ingredient.quantity && ingredient.quantity > 0 ? ` (${ingredient.quantity}` : ''}
            {ingredient.quantity && ingredient.quantity > 0 && ingredient.unit ? ` ${ingredient.unit})` : ''}
            {/* Si la cantidad es null/0 y la unidad es "al gusto" u "opcional" */}
            {!ingredient.quantity && (ingredient.unit === 'al gusto' || ingredient.unit === 'opcional') ? ` (${ingredient.unit})` : ''}
          </Text>
        ))}
        {/* FIN DE LA MODIFICACIÓN */}


        <Text style={styles.subtitle}>Pasos de preparación:</Text>
        {selectedRecipe.steps && selectedRecipe.steps.length > 0 ? (
          <FlatList
            data={selectedRecipe.steps}
            renderItem={renderStep}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false} // Deshabilita el scroll del FlatList para que lo maneje el ScrollView padre
          />
        ) : (
          <Text style={styles.listItem}>No hay pasos de preparación disponibles.</Text>
        )}

        {/* Puedes agregar más detalles aquí si los tienes en tus datos */}
      </View>
    </ScrollView>
  );
}

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Estilo para la imagen individual (si no hay carrusel)
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    // backgroundColor: 'lightgray', // <-- Ya no es necesario el fondo de color, quítalo si quieres
  },
  // Estilos para el carrusel
  carouselContainer: {
    height: 250, // Altura del carrusel
    // backgroundColor: 'lightblue', // <-- Ya no es necesario el fondo de color, quítalo si quieres
  },
  carouselImage: {
    width: width, // El ancho de la imagen será el ancho de la pantalla
    height: '100%',
    resizeMode: 'cover',
    // backgroundColor: 'lightgreen', // <-- Ya no es necesario el fondo de color, quítalo si quieres
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#555',
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
    color: '#666',
  },
  stepItem: { // Estilo para cada paso
    marginBottom: 15,
  },
  stepText: { // Estilo para el texto del paso
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  stepImage: { // Estilo para imágenes dentro de los pasos
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 10,
    // backgroundColor: 'pink', // <-- Ya no es necesario el fondo de color, quítalo si quieres
  },
  videoButton: { // Estilo para el botón de video en los pasos
    backgroundColor: '#4CAF50', // Un verde para el botón de video
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start', // Para que el botón no ocupe todo el ancho
  },
  videoButtonText: { // Estilo para el texto del botón de video
    color: 'white',
    fontWeight: 'bold',
  }
});