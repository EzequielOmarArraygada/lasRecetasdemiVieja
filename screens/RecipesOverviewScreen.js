// screens/RecipesOverviewScreen.js
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useMemo } from 'react';
import {
  FlatList,
  Image,
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

// Función principal de filtrado y evaluación de recetas
const filterRecipesByIngredients = (recipes, selectedIngredientsWithQuantity) => {
  const selectedIngredientsMap = new Map();
  if (selectedIngredientsWithQuantity && selectedIngredientsWithQuantity.length > 0) {
    selectedIngredientsWithQuantity.forEach(item => {
      selectedIngredientsMap.set(normalizeIngredientName(item.originalName), item.quantity);
    });
  }

  // Si no hay ingredientes seleccionados por el usuario, no se mostrará ninguna receta por ingredientes.
  if (selectedIngredientsMap.size === 0) {
    return [];
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

    recipe.ingredients.forEach(requiredIngredient => {
      const normalizedRequiredName = normalizeIngredientName(requiredIngredient.name);
      const userHasIngredient = selectedIngredientsMap.has(normalizedRequiredName);
      const userQuantity = selectedIngredientsMap.get(normalizedRequiredName) || 0;

      if (userHasIngredient) {
        hasAtLeastOneMatchingIngredient = true;
      }

      if (!userHasIngredient || userQuantity < requiredIngredient.quantity) {
        missingIngredientsCount++;
        recipeMissingIngredients.push(requiredIngredient.name);
      }
    });

    if (hasAtLeastOneMatchingIngredient) {
      selectedIngredientsMap.forEach((userQuantity, normalizedUserName) => {
        if (!requiredRecipeIngredientNames.has(normalizedUserName)) {
          recipeExcessIngredients.push(normalizedUserName);
        }
      });

      let status = 'NO_APLICA';
      if (missingIngredientsCount === 0) {
        status = 'COMPLETA';
      } else if (missingIngredientsCount <= 2) {
        status = 'CASI_COMPLETA';
      } else {
        status = 'INCOMPLETA';
      }

      filteredAndEvaluatedRecipes.push({
        ...recipe,
        status,
        missingIngredients: recipeMissingIngredients,
        excessIngredients: recipeExcessIngredients,
      });
    }
  });

  return filteredAndEvaluatedRecipes;
};


const RecipesOverviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // ***** LÍNEA CORREGIDA *****
  // Si route.params es undefined, se usa un objeto vacío {} como respaldo.
  const { categoryId, selectedIngredients } = route.params || {};

  const displayedRecipes = useMemo(() => {
    let recipesToDisplay = [];

    if (selectedIngredients && selectedIngredients.length > 0) {
      recipesToDisplay = filterRecipesByIngredients(RECIPES, selectedIngredients);
      recipesToDisplay.sort((a, b) => {
        const statusOrder = { 'COMPLETA': 1, 'CASI_COMPLETA': 2, 'INCOMPLETA': 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
    } else if (categoryId) {
      recipesToDisplay = RECIPES.filter(
        (recipeItem) => recipeItem.categoryIds.indexOf(categoryId) >= 0
      );
      recipesToDisplay = recipesToDisplay.map(recipe => ({
        ...recipe,
        status: 'NO_APLICA',
        missingIngredients: [],
        excessIngredients: [],
      }));
    } else {
      recipesToDisplay = RECIPES.map(recipe => ({
        ...recipe,
        status: 'NO_APLICA',
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


  const renderRecipeItem = ({ item }) => {
    const handlePress = () => {
      navigation.navigate('RecipeDetail', { recipeId: item.id });
    };

    let statusColor = Colors.gray500;
    let statusText = '';
    if (item.status === 'COMPLETA') {
      statusColor = Colors.green500;
      statusText = 'Ingredientes Completos';
    } else if (item.status === 'CASI_COMPLETA') {
      statusColor = Colors.orange500;
      statusText = `Faltan ${item.missingIngredients.length} ingrediente(s)`;
    } else if (item.status === 'INCOMPLETA') {
      statusColor = Colors.red500;
      statusText = `Faltan ${item.missingIngredients.length} ingrediente(s)`;
    } else { // 'NO_APLICA'
      statusText = 'No aplica filtro de ingredientes';
      statusColor = Colors.gray500;
    }

    return (
      <Pressable
        style={({ pressed }) => [styles.recipeItem, pressed && styles.pressedItem]}
        onPress={handlePress}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>{item.duration}m</Text>
          <Text style={styles.detailText}>{item.complexity}</Text>
        </View>
        <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
        {item.status === 'CASI_COMPLETA' || item.status === 'INCOMPLETA' ? (
          <View style={styles.missingIngredientsContainer}>
            <Text style={styles.missingIngredientsTitle}>Faltantes:</Text>
            {item.missingIngredients.map((ingredient, index) => (
              <Text key={index} style={styles.missingIngredientText}>
                • {ingredient}
              </Text>
            ))}
          </View>
        ) : null}
        {item.excessIngredients && item.excessIngredients.length > 0 ? (
          <View style={styles.excessIngredientsContainer}>
            <Text style={styles.excessIngredientsTitle}>Tienes de sobra:</Text>
            {item.excessIngredients.map((ingredient, index) => (
              <Text key={index} style={styles.excessIngredientText}>
                • {ingredient}
              </Text>
            ))}
          </View>
        ) : null}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {displayedRecipes.length === 0 ? (
        <View style={styles.emptyList}>
          <Text style={styles.emptyListText}>No se encontraron recetas con los ingredientes seleccionados.</Text>
        </View>
      ) : (
        <FlatList
          data={displayedRecipes}
          keyExtractor={(item) => item.id}
          renderItem={renderRecipeItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.gray100,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 18,
    color: Colors.gray500,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  recipeItem: {
    backgroundColor: Colors.white,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressedItem: {
    opacity: 0.8,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
  },
  statusContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'center',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  missingIngredientsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFF3E0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFB300',
    marginHorizontal: 10,
  },
  missingIngredientsTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#E65100',
    marginBottom: 5,
  },
  missingIngredientText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 2,
  },
  excessIngredientsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  excessIngredientsTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#2E7D32',
    marginBottom: 5,
  },
  excessIngredientText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 2,
  },
});

export default RecipesOverviewScreen;