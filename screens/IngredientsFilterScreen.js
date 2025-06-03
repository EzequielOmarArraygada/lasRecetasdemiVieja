import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import extractUniqueIngredientsWithUnits from '../data/ingredients';
import RECIPES from '../data/recipes';

const ASYNC_STORAGE_KEY = 'mySelectedIngredients';

const normalizeIngredientName = (name) => name.trim().toLowerCase();

function IngredientsFilterScreen() {
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const navigation = useNavigation();

  const allIngredientsData = useMemo(() => {
    return extractUniqueIngredientsWithUnits(RECIPES);
  }, [RECIPES]);

  useEffect(() => {
    const loadSelectedIngredients = async () => {
      try {
        const storedIngredients = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        if (storedIngredients) {
          setSelectedIngredients(JSON.parse(storedIngredients));
        }
      } catch (error) {
        console.error('Error al cargar ingredientes seleccionados:', error);
      }
    };
    loadSelectedIngredients();
  }, []);

  useEffect(() => {
    const saveSelectedIngredients = async () => {
      try {
        await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(selectedIngredients));
      } catch (error) {
        console.error('Error al guardar ingredientes seleccionados:', error);
      }
    };
    saveSelectedIngredients();
  }, [selectedIngredients]);

  const toggleIngredient = (ingredientName) => {
    setSelectedIngredients(prevSelected => {
      const newSelected = { ...prevSelected };
      // Usar ingredientName.name para normalizar y acceder
      if (newSelected[normalizeIngredientName(ingredientName.name)]) {
        delete newSelected[normalizeIngredientName(ingredientName.name)];
      } else {
        newSelected[normalizeIngredientName(ingredientName.name)] = {
          quantity: ingredientName.defaultUnit === 'cantidad' ? 1 : null, // Default quantity, can be changed
          unit: ingredientName.defaultUnit || 'cantidad',
        };
      }
      return newSelected;
    });
  };

  const updateIngredientQuantity = (ingredientName, quantity) => {
    setSelectedIngredients(prevSelected => ({
      ...prevSelected,
      [normalizeIngredientName(ingredientName)]: {
        ...prevSelected[normalizeIngredientName(ingredientName)],
        quantity: quantity === '' ? null : Number(quantity),
      },
    }));
  };

  const clearAllSelected = useCallback(() => {
    Alert.alert(
      'Limpiar Ingredientes',
      '¿Estás seguro de que quieres deseleccionar todos los ingredientes?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => setSelectedIngredients({}),
        },
      ]
    );
  }, []);

  const applyIngredientsFilter = useCallback(() => {
    const selectedIngredientNames = Object.keys(selectedIngredients);
    if (selectedIngredientNames.length === 0) {
      Alert.alert(
        'Sin Ingredientes Seleccionados',
        'No has seleccionado ningún ingrediente. ¿Quieres ver todas las recetas disponibles?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Ver Todas',
            onPress: () => {
              navigation.navigate('MealsOverview', {
                screen: 'MealsOverview',
                params: {
                  selectedIngredients: [],
                  screenTitle: 'Todas las Recetas',
                },
              });
            },
          },
        ]
      );
      return;
    }

    navigation.navigate('MealsOverview', {
      screen: 'MealsOverview',
      params: {
        selectedIngredients: selectedIngredientNames,
        screenTitle: 'Recetas con tus Ingredientes',
      },
    });
  }, [navigation, selectedIngredients]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={applyIngredientsFilter}
          style={({ pressed }) => ({
            padding: 8,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Ionicons
            name="checkmark-done-circle-outline"
            size={28}
            color={Platform.OS === 'ios' ? '#007AFF' : 'white'}
          />
        </Pressable>
      ),
      headerLeft: () => (
        <Pressable
          onPress={clearAllSelected}
          style={({ pressed }) => ({
            padding: 8,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Ionicons
            name="trash-outline"
            size={24}
            color={Platform.OS === 'ios' ? '#FF3B30' : 'white'}
          />
        </Pressable>
      ),
    });
  }, [navigation, applyIngredientsFilter, clearAllSelected]);


  const renderIngredientItem = ({ item }) => {
    const normalizedName = normalizeIngredientName(item.name);
    const isSelected = !!selectedIngredients[normalizedName]; // Verifica si existe en el objeto
    const quantity = selectedIngredients[normalizedName]?.quantity;
    const unit = selectedIngredients[normalizedName]?.unit || item.defaultUnit; // Usa la unidad guardada o la por defecto

    return (
      <Pressable
        onPress={() => toggleIngredient(item)}
        style={({ pressed }) => [
          styles.ingredientItem,
          isSelected && styles.ingredientItemSelected,
          pressed && styles.ingredientItemPressed,
        ]}
      >
        <View style={styles.ingredientRow}>
          <Ionicons
            name={isSelected ? 'checkbox-outline' : 'square-outline'}
            size={24}
            color={isSelected ? '#4CAF50' : '#888'}
          />
          {/* ESTA ES LA LÍNEA CRÍTICA: item.name debe estar envuelto en <Text> */}
          <Text style={styles.ingredientText}>{item.name}</Text> 
          {isSelected && unit !== 'al gusto' && unit !== 'opcional' && (
            <View style={styles.quantityInputContainer}>
              <TextInput
                style={styles.quantityInput}
                keyboardType="numeric"
                onChangeText={(text) => updateIngredientQuantity(item.name, text)}
                value={quantity !== null ? String(quantity) : ''}
                placeholder="Cant."
              />
              <Text style={styles.unitText}>{unit}</Text>
            </View>
          )}
        </View>
        {isSelected && (unit === 'al gusto' || unit === 'opcional') && (
          <Text style={styles.noteText}>({unit})</Text>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tus Ingredientes</Text>
      <FlatList
        data={allIngredientsData}
        renderItem={renderIngredientItem}
        keyExtractor={(item) => item.name} // Usa item.name como key
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

export default IngredientsFilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  ingredientItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 6,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ingredientItemSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#e6ffe6',
  },
  ingredientItemPressed: {
    opacity: 0.7,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 60,
    textAlign: 'center',
    marginRight: 5,
  },
  unitText: {
    fontSize: 14,
    color: '#666',
  },
  noteText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: -5,
  },
});