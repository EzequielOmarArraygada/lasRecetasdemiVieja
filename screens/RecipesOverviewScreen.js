import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useMemo } from 'react';
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../constants/Colors.js';
import RECIPES from '../data/recipes';

// Función auxiliar para normalizar nombres de ingredientes
const normalizeIngredientName = (name) => {
  return typeof name === 'string' ? name.trim().toLowerCase() : '';
};

// Función principal de filtrado y evaluación de recetas (mantener la que ya tienes)
const filterRecipesByIngredients = (recipes, selectedIngredientsWithQuantity) => {
  const selectedIngredientsMap = new Map();
  if (selectedIngredientsWithQuantity && selectedIngredientsWithQuantity.length > 0) {
    selectedIngredientsWithQuantity.forEach(item => {
      selectedIngredientsMap.set(normalizeIngredientName(item.originalName), item.quantity);
    });
  }

  if (selectedIngredientsMap.size === 0) {
    // Si no hay ingredientes seleccionados por el usuario, no se mostrará ninguna receta por ingredientes.
    // Es decir, si el usuario va a "Ver Recetas" pero no seleccionó nada, la lista estará vacía.
    return []; // Devolver una lista vacía para no mostrar nada si no hay ingredientes seleccionados
  }

  const filteredAndEvaluatedRecipes = [];

  recipes.forEach(recipe => {
    let missingIngredientsCount = 0;
    const recipeMissingIngredients = [];
    const recipeExcessIngredients = [];
    let hasAtLeastOneMatchingIngredient = false;

    const requiredRecipeIngredientNames = new Set(
      recipe.ingredients.map(ing => normalizeIngredientName(ing.name))
    );

    // 1. Verificar ingredientes que el usuario tiene y la receta necesita
    selectedIngredientsMap.forEach((userQuantity, normalizedUserIngredientName) => {
      const requiredIngredient = recipe.ingredients.find(
        ing => normalizeIngredientName(ing.name) === normalizedUserIngredientName
      );

      if (requiredIngredient) {
        hasAtLeastOneMatchingIngredient = true;
        // Lógica para verificar cantidad si es relevante, de momento solo existencia
        // Si tienes más de lo necesario o justo lo necesario, se considera que lo tienes.
        // Podríamos refinar esto para verificar unidades y cantidades exactas.
      } else {
        // El usuario tiene un ingrediente que la receta no necesita
        recipeExcessIngredients.push({ name: normalizedUserIngredientName, quantity: userQuantity });
      }
    });

    // 2. Verificar ingredientes que la receta necesita y al usuario le faltan
    recipe.ingredients.forEach(requiredIngredient => {
      const normalizedRequiredName = normalizeIngredientName(requiredIngredient.name);
      if (!selectedIngredientsMap.has(normalizedRequiredName)) {
        missingIngredientsCount++;
        recipeMissingIngredients.push(requiredIngredient);
      }
    });

    let status = 'DESCONOCIDO'; // Estado por defecto
    if (missingIngredientsCount === 0 && hasAtLeastOneMatchingIngredient) {
      status = 'TIENE_TODO'; // Tiene todos los ingredientes necesarios
    } else if (missingIngredientsCount > 0 && hasAtLeastOneMatchingIngredient) {
      status = 'FALTAN_ALGUNOS'; // Tiene algunos, pero le faltan otros
    } else if (missingIngredientsCount > 0 && !hasAtLeastOneMatchingIngredient) {
      status = 'NO_TIENE_NINGUNO'; // No tiene ninguno de los necesarios
    } else if (hasAtLeastOneMatchingIngredient && missingIngredientsCount === 0 && recipeExcessIngredients.length > 0) {
        status = 'TIENE_SOBRA'; // Tiene todo lo necesario y además otros que no usa
    }


    // Solo añadir recetas que tengan al menos un ingrediente en común O si no se está filtrando por ingredientes.
    // Si la pantalla es para mostrar todas las recetas (no hay selectedIngredients), todas se añaden.
    // Si se está filtrando por ingredientes, solo se añaden las que tienen algo en común.
    if (hasAtLeastOneMatchingIngredient || selectedIngredientsMap.size === 0) {
      filteredAndEvaluatedRecipes.push({
        ...recipe,
        status: status,
        missingIngredients: recipeMissingIngredients,
        excessIngredients: recipeExcessIngredients,
      });
    }
  });

  // Si no se seleccionó ningún ingrediente, se muestran todas las recetas.
  // Esto es para el caso en que se navegue a la pantalla desde "Todas las Recetas".
  // Si filterRecipesByIngredients se llama con selectedIngredientsWithQuantity vacío, devolvemos todas las recetas originales
  // a menos que la lógica superior decida filtrar.
  if (selectedIngredientsWithQuantity && selectedIngredientsWithQuantity.length === 0) {
      return recipes.map(recipe => ({ // Todas las recetas, sin estado de ingredientes
          ...recipe,
          status: 'NO_APLICA',
          missingIngredients: [],
          excessIngredients: [],
      }));
  }

  return filteredAndEvaluatedRecipes;
};

// --- Nuevo componente para renderizar cada item de receta ---
// Lo definimos fuera del componente principal para evitar re-renderizados innecesarios.
const RecipeItem = ({ recipe, onPress }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'TIENE_TODO':
        return { backgroundColor: Colors.success500 }; // Verde
      case 'FALTAN_ALGUNOS':
        return { backgroundColor: Colors.warning500 }; // Naranja
      case 'NO_TIENE_NINGUNO':
        return { backgroundColor: Colors.error500 }; // Rojo
      case 'TIENE_SOBRA':
        return { backgroundColor: Colors.info500 }; // Azul claro
      case 'NO_APLICA':
      default:
        return { backgroundColor: Colors.gray500 }; // Gris (para cuando no se filtra por ingredientes)
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'TIENE_TODO':
        return 'Tienes todos los ingredientes';
      case 'FALTAN_ALGUNOS':
        return `Te faltan ${recipe.missingIngredients.length} ingrediente(s)`;
      case 'NO_TIENE_NINGUNO':
        return 'No tienes ingredientes para esta receta';
      case 'TIENE_SOBRA':
        return 'Tienes todo, y te sobran ingredientes';
      case 'NO_APLICA':
      default:
        return 'No aplica filtro de ingredientes';
    }
  };

  return (
    <View style={styles.recipeItem}>
      <Pressable
        android_ripple={{ color: Colors.gray300 }}
        style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
        onPress={() => onPress(recipe.id)} // Llama a la función onPress pasando el ID
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{recipe.name}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>{recipe.duration}m</Text>
            <Text style={styles.detailText}>{recipe.complexity}</Text>
          </View>
          {recipe.status && recipe.status !== 'NO_APLICA' && ( // Solo muestra el estado si hay filtro de ingredientes
            <View style={[styles.statusContainer, getStatusStyle(recipe.status)]}>
              <Text style={styles.statusText}>{getStatusText(recipe.status)}</Text>
            </View>
          )}

          {/* Mostrar ingredientes faltantes si el estado lo indica */}
          {recipe.status === 'FALTAN_ALGUNOS' && recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
            <View style={styles.missingIngredientsContainer}>
              <Text style={styles.missingIngredientsTitle}>Ingredientes Faltantes:</Text>
              {recipe.missingIngredients.map((ing, index) => (
                <Text key={index} style={styles.missingIngredientText}>- {ing.name} ({ing.quantity || 's/c'} {ing.unit || ''})</Text>
              ))}
            </View>
          )}
           {/* Mostrar ingredientes de sobra si el estado lo indica */}
           {recipe.status === 'TIENE_SOBRA' && recipe.excessIngredients && recipe.excessIngredients.length > 0 && (
            <View style={styles.excessIngredientsContainer}>
              <Text style={styles.excessIngredientsTitle}>Ingredientes que te sobran:</Text>
              {recipe.excessIngredients.map((ing, index) => (
                <Text key={index} style={styles.excessIngredientText}>- {ing.name}</Text>
              ))}
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};


const RecipesOverviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // LÍNEA 56 (ya corregida):
  const { categoryId, selectedIngredients } = route.params || {};

  // console.log('Valor de route:', route); // Mantén esto temporalmente si quieres depurar más
  // console.log('Valor de route.params:', route.params); // Mantén esto temporalmente si quieres depurar más


  const displayedRecipes = useMemo(() => {
    let recipesToDisplay = [];

    if (selectedIngredients && selectedIngredients.length > 0) {
      recipesToDisplay = filterRecipesByIngredients(RECIPES, selectedIngredients);
    } else if (categoryId) {
      recipesToDisplay = RECIPES.filter(
        (recipeItem) => recipeItem.categoryIds.indexOf(categoryId) >= 0
      );
    } else {
      // Si no hay categoryId ni selectedIngredients, muestra todas las recetas
      recipesToDisplay = RECIPES.map(recipe => ({
        ...recipe,
        status: 'NO_APLICA', // Estado por defecto para todas las recetas
        missingIngredients: [],
        excessIngredients: [],
      }));
    }
    return recipesToDisplay;
  }, [categoryId, selectedIngredients]);


  useLayoutEffect(() => {
    let headerTitle = 'Recetas';

    if (route.params?.categoryTitle) {
      headerTitle = route.params.categoryTitle;
    } else if (selectedIngredients && selectedIngredients.length > 0) {
      headerTitle = 'Recetas por Ingredientes';
    }

    navigation.setOptions({
      title: headerTitle,
    });
  }, [navigation, route.params?.categoryTitle, selectedIngredients]);

  // Función para manejar el press en cada receta (pasa al detalle de la receta)
  const renderRecipeItem = ({ item }) => {
    const pressHandler = (recipeId) => {
      navigation.navigate('RecipeDetail', {
        recipeId: recipeId,
      });
    };
    return <RecipeItem recipe={item} onPress={pressHandler} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedRecipes}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipeItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RecipesOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.gray100, // Fondo de la pantalla
  },
  // --- Estilos para la Card de Receta ---
  recipeItem: {
    margin: 16,
    borderRadius: 10,
    backgroundColor: Colors.white,
    elevation: 5, // Sombra para Android
    shadowColor: Colors.gray800, // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // Esconde contenido desbordado en Android
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.8, // Efecto de presión en iOS
  },
  innerContainer: {
    borderRadius: 10,
    overflow: 'hidden', // Asegura que la imagen respete el borderRadius del contenedor
  },
  image: {
    width: '100%',
    height: 200, // Altura fija para las imágenes de las recetas
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    margin: 8,
    color: Colors.primary800,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 5, // Un poco de padding superior para separar del título
  },
  detailText: {
    fontSize: 14,
    color: Colors.gray600, // Color gris para los detalles
    marginHorizontal: 8,
  },
  // --- ESTILOS PARA EL ESTADO DE INGREDIENTES ---
  statusContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 10, // Margen para que no toque los bordes
    alignSelf: 'center', // Centra el contenedor del estado
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  missingIngredientsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.warning100, // Un fondo suave para los ingredientes faltantes
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.warning500, // Un borde amarillo-naranja
    marginHorizontal: 10,
    marginBottom: 10, // Espacio inferior
  },
  missingIngredientsTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.warning700, // Naranja oscuro
    marginBottom: 5,
  },
  missingIngredientText: {
    fontSize: 14,
    color: Colors.gray700,
    marginBottom: 2,
  },
  excessIngredientsContainer: { // Nuevo estilo para ingredientes de sobra
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.info100, // Fondo azul claro
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.info500, // Borde azul
    marginHorizontal: 10,
    marginBottom: 10, // Espacio inferior
  },
  excessIngredientsTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.info700, // Azul oscuro
    marginBottom: 5,
  },
  excessIngredientText: {
    fontSize: 14,
    color: Colors.gray700,
    marginBottom: 2,
  },
});