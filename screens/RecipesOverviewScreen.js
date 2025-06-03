import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Platform,
  // Quitamos TextInput y Keyboard de aquí, ya no están en esta pantalla
} from 'react-native';
import RECIPES from '../data/recipes';
import { useNavigation, useRoute } from '@react-navigation/native';

function RecipesOverviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const categoryId = route.params?.categoryId;
  const searchText = route.params?.searchText; // <-- ¡Obtenemos el searchText!
  const screenTitle = route.params?.categoryTitle || 'Todas las Recetas'; // Título general o de categoría/búsqueda

  // Filtra las recetas en función de los parámetros recibidos
  const displayedRecipes = RECIPES.filter(recipe => {
    let matchesCategory = true;
    let matchesSearch = true;

    // Si hay categoryId, filtra por categoría
    if (categoryId) {
      matchesCategory = recipe.categoryIds.includes(categoryId);
    }

    // Si hay searchText, filtra por texto (en el nombre de la receta)
    if (searchText) {
      matchesSearch = recipe.name.toLowerCase().includes(searchText.toLowerCase());
    }

    return matchesCategory && matchesSearch; // Una receta debe coincidir con ambos (si existen)
  });


  // Usa useLayoutEffect para establecer el título de la pantalla
  useLayoutEffect(() => {
    navigation.setOptions({
      title: screenTitle, // El título ya viene de los parámetros
    });
  }, [navigation, screenTitle]);


  function renderRecipeItem(itemData) {
    function pressHandler() {
      navigation.navigate('RecipeDetail', {
        recipeId: itemData.item.id,
      });
    }

    return (
      <View style={styles.recipeItem}>
        <Pressable
          android_ripple={{ color: '#ccc' }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={pressHandler}
        >
          <Text style={styles.recipeTitle}>{itemData.item.name}</Text>
        </Pressable>
      </View>
    );
  }

  // Mensajes si no hay recetas filtradas
  if (displayedRecipes.length === 0) {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>
          {searchText
            ? `No se encontraron recetas con "${searchText}".`
            : 'No hay recetas para esta categoría.'
          }
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedRecipes}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipeItem}
        // keyboardShouldPersistTaps ya no es necesario aquí si el buscador se movió
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
  // Eliminamos el estilo searchBar de aquí
  recipeItem: {
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1,
    padding: 15,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});