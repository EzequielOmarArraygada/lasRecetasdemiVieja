// screens/RecipesOverviewScreen.js
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
import RECIPES from '../data/recipes';

// Función auxiliar para normalizar nombres de ingredientes
const normalizeIngredientName = (name) => {
  return typeof name === 'string' ? name.trim().toLowerCase() : '';
};

// Función principal de filtrado y evaluación de recetas
const filterRecipesByIngredients = (recipes, selectedIngredients) => {
  if (!selectedIngredients || Object.keys(selectedIngredients).length === 0) {
    // Si no hay ingredientes seleccionados, no aplicamos filtro de ingredientes
    // y devolvemos todas las recetas con estado 'NO_APLICA'
    return recipes.map(recipe => ({
      ...recipe,
      status: 'NO_APLICA',
      missingIngredients: [],
      excessIngredients: [], // También podríamos calcular esto si es necesario
    }));
  }

  return recipes.map(recipe => {
    let missingIngredientsCount = 0;
    const recipeMissingIngredients = [];
    const recipeExcessIngredients = []; // Para los ingredientes que el usuario tiene de más

    // Recorrer los ingredientes que la receta necesita
    recipe.ingredients.forEach(requiredIngredient => {
      const normalizedRequiredName = normalizeIngredientName(requiredIngredient.name);
      const selected = selectedIngredients[normalizedRequiredName];

      if (!selected) {
        // El usuario no tiene este ingrediente
        missingIngredientsCount++;
        recipeMissingIngredients.push({
          name: requiredIngredient.name,
          quantity: requiredIngredient.quantity,
          unit: requiredIngredient.unit,
          reason: 'Falta',
        });
      } else {
        // El usuario tiene el ingrediente, ahora verificar la cantidad
        // Si el usuario no especificó cantidad o es 0, asumimos que tiene "algo"
        // Si la receta requiere cantidad, comparamos.
        const userQuantity = selected.quantity;
        const requiredQuantity = requiredIngredient.quantity;

        // Si la receta no especifica cantidad, o el usuario no especificó cantidad,
        // asumimos que el usuario "lo tiene" para el propósito de este filtro simple.
        // Pero si ambos especifican, comparamos.
        if (requiredQuantity && userQuantity !== null && userQuantity !== undefined) {
          if (userQuantity < requiredQuantity) {
            missingIngredientsCount++;
            recipeMissingIngredients.push({
              name: requiredIngredient.name,
              quantity: requiredQuantity - userQuantity, // Cantidad que falta
              unit: requiredIngredient.unit,
              reason: 'Cantidad Insuficiente',
            });
          } else if (userQuantity > requiredQuantity) {
            recipeExcessIngredients.push({
                name: requiredIngredient.name,
                quantity: userQuantity - requiredQuantity, // Cantidad de sobra
                unit: requiredIngredient.unit,
                reason: 'Cantidad de Sobra',
            });
          }
        }
        // Si la receta no requiere cantidad específica o el usuario no la puso,
        // y el ingrediente existe en la lista de seleccionados, lo consideramos "presente".
      }
    });

    let status = 'FALTAN_VARIOS';
    if (missingIngredientsCount === 0) {
      status = 'COMPLETA';
    } else if (missingIngredientsCount <= 2) { // Puedes ajustar este umbral
      status = 'CASI_COMPLETA';
    }

    return {
      ...recipe,
      status: status,
      missingIngredients: recipeMissingIngredients,
      excessIngredients: recipeExcessIngredients, // Aquí incluimos los ingredientes de sobra
    };
  });
};

function RecipesOverviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const categoryId = route.params?.categoryId;
  const searchText = route.params?.searchText;
  const selectedIngredients = route.params?.selectedIngredients;

  // Lógica principal de filtrado
  const displayedRecipes = useMemo(() => {
    let filtered = RECIPES;

    // 1. Filtrar por categoría (si se proporciona)
    if (categoryId) {
      filtered = filtered.filter(recipe => recipe.categoryIds.includes(categoryId));
    }

    // 2. Filtrar por texto de búsqueda (si se proporciona)
    if (searchText) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // 3. Filtrar y evaluar por ingredientes seleccionados
    const recipesWithStatus = filterRecipesByIngredients(filtered, selectedIngredients);

    // Opcional: Ordenar las recetas para que las completas aparezcan primero, luego las casi completas, etc.
    recipesWithStatus.sort((a, b) => {
      const statusOrder = {
        'COMPLETA': 1,
        'CASI_COMPLETA': 2,
        'NO_APLICA': 3, // Si no hay filtro de ingredientes, estas aparecen después de las completas/casi completas
        'FALTAN_VARIOS': 4,
      };
      return statusOrder[a.status] - statusOrder[b.status];
    });

    return recipesWithStatus;
  }, [categoryId, searchText, selectedIngredients]);

  // Manejar el título de la pantalla
  useLayoutEffect(() => {
    let title = 'Recetas';
    if (route.params?.categoryTitle) {
      title = route.params.categoryTitle;
    } else if (searchText) {
      title = `Resultados para "${searchText}"`;
    } else if (selectedIngredients && Object.keys(selectedIngredients).length > 0) {
      title = 'Recetas por Ingredientes';
    }
    navigation.setOptions({
      title: title,
    });
  }, [navigation, route.params?.categoryTitle, searchText, selectedIngredients]);

  // Si no hay recetas después de todos los filtros
  if (displayedRecipes.length === 0) {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>
          ¡No se encontraron recetas que coincidan con tus criterios o ingredientes!
        </Text>
      </View>
    );
  }

  // Componente de renderizado para cada item de receta
  function renderRecipeItem({ item }) {
    const handlePress = () => {
      navigation.navigate('RecipeDetail', { recipeId: item.id });
    };

    let statusColor = '#999'; // Color por defecto (gris)
    let statusText = '';
    switch (item.status) {
      case 'COMPLETA':
        statusColor = '#4CAF50'; // Verde
        statusText = '¡Puedes hacerla ahora!';
        break;
      case 'CASI_COMPLETA':
        statusColor = '#FFC107'; // Amarillo/Naranja
        statusText = `Te faltan ${item.missingIngredients.length} ingrediente(s)`;
        break;
      case 'FALTAN_VARIOS':
        statusColor = '#F44336'; // Rojo
        statusText = `Te faltan ${item.missingIngredients.length} ingrediente(s)`;
        break;
      case 'NO_APLICA':
        statusColor = '#3F51B5'; // Azul (para cuando no hay filtro de ingredientes)
        statusText = 'Ver detalles dela receta';
        break;
    }

    return (
      <View style={styles.recipeItem}>
        <Pressable
          android_ripple={{ color: '#ccc' }}
          style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
          onPress={handlePress}
        >
          <View style={styles.innerContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.details}>
                <Text style={styles.detailText}>{item.duration} min</Text>
                <Text style={styles.detailText}>{item.complexity.toUpperCase()}</Text>
              </View>
              {/* Indicador de estado de ingredientes */}
              <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
                <Text style={styles.statusText}>{statusText}</Text>
              </View>
              {/* Mostrar ingredientes faltantes si no está completa */}
              {item.status !== 'COMPLETA' && item.missingIngredients.length > 0 && (
                <View style={styles.missingIngredientsContainer}>
                  <Text style={styles.missingIngredientsTitle}>Faltan:</Text>
                  {item.missingIngredients.map((ing, index) => (
                    <Text key={index} style={styles.missingIngredientText}>
                      - {ing.name} ({ing.quantity} {ing.unit})
                    </Text>
                  ))}
                </View>
              )}
               {/* Mostrar ingredientes de sobra si hay (opcional) */}
               {item.status !== 'COMPLETA' && item.excessIngredients.length > 0 && (
                <View style={styles.excessIngredientsContainer}>
                  <Text style={styles.excessIngredientsTitle}>Te sobra:</Text>
                  {item.excessIngredients.map((ing, index) => (
                    <Text key={index} style={styles.excessIngredientText}>
                      - {ing.name} ({ing.quantity} {ing.unit})
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        </Pressable>
      </View>
    );
  }

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
}

export default RecipesOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyListText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  // --- ESTILOS PARA EL RENDERIZADO DE RECETAS ---
  recipeItem: {
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // Para que la sombra se vea en iOS
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.7, // Efecto de presión
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    // justifyContent: 'center', // Quita esto, ya no centramos verticalmente
    alignItems: 'center', // Centra horizontalmente la imagen y texto principal
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 5, // Pequeño padding para el texto
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
  },
  // --- ESTILOS PARA EL ESTADO DE INGREDIENTES ---
  statusContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'center', // Centra el contenedor del estado
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  missingIngredientsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFF3E0', // Un fondo suave para los ingredientes faltantes
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFB300', // Un borde amarillo
  },
  missingIngredientsTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#E65100', // Naranja oscuro
    marginBottom: 5,
  },
  missingIngredientText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 2,
  },
  excessIngredientsContainer: { // Nuevo estilo para ingredientes de sobra
    marginTop: 10,
    padding: 10,
    backgroundColor: '#E0F2F7', // Un fondo suave azul claro
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2196F3', // Un borde azul
  },
  excessIngredientsTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#0D47A1', // Azul oscuro
    marginBottom: 5,
  },
  excessIngredientText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 2,
  },
});