// screens/IngredientsFilterScreen.js
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import extractUniqueIngredientsWithUnits from '../data/ingredients';
import RECIPES from '../data/recipes';

const ASYNC_STORAGE_KEY = 'mySelectedIngredients';

const normalizeIngredientName = (name) => {
  // Asegúrate de que 'name' sea una cadena antes de intentar 'trim'
  return typeof name === 'string' ? name.trim().toLowerCase() : '';
};

function IngredientsFilterScreen() {
  const [selectedIngredients, setSelectedIngredients] = useState({}); // { normalizedName: { quantity: number|null, unit: string, originalName: string } }
  const navigation = useNavigation();

  // Obtener todos los ingredientes únicos con sus unidades por defecto
  const allIngredientsData = useMemo(() => {
    return extractUniqueIngredientsWithUnits(RECIPES);
  }, [RECIPES]); // Dependencia de RECIPES, aunque es una constante

  // Cargar ingredientes seleccionados de AsyncStorage al inicio
  useEffect(() => {
    const loadSelectedIngredients = async () => {
      try {
        const storedIngredients = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        if (storedIngredients !== null) {
          const parsedIngredients = JSON.parse(storedIngredients);
          // *** IMPORTANTE: Valida los datos analizados antes de establecer el estado ***
          if (typeof parsedIngredients === 'object' && parsedIngredients !== null) {
            const validatedIngredients = {};
            for (const key in parsedIngredients) {
              if (Object.hasOwnProperty.call(parsedIngredients, key)) {
                const ingredient = parsedIngredients[key];
                // Asegurarse de que el objeto ingrediente tenga las propiedades esperadas
                if (
                  typeof ingredient === 'object' &&
                  ingredient !== null &&
                  typeof ingredient.originalName === 'string' && // Verificar 'originalName'
                  (typeof ingredient.quantity === 'number' || ingredient.quantity === null) &&
                  typeof ingredient.unit === 'string'
                ) {
                  // Asegurar que la clave (key) también esté normalizada si se carga desde AsyncStorage
                  // Ya que `normalizeIngredientName` se usa para generar las claves al guardar
                  validatedIngredients[normalizeIngredientName(ingredient.originalName)] = ingredient;
                } else {
                  console.warn(`Datos de ingrediente inválidos encontrados en AsyncStorage para la clave ${key}:`, ingredient);
                  // Opcionalmente, podrías eliminar esta entrada inválida o registrarla de forma más prominente
                }
              }
            }
            setSelectedIngredients(validatedIngredients);
          } else {
            console.warn('Los datos de ingredientes almacenados no son un objeto:', parsedIngredients);
            setSelectedIngredients({}); // Restablecer si los datos están mal formados
          }
        }
      } catch (error) {
        console.error('Error al cargar los ingredientes seleccionados de AsyncStorage:', error);
        Alert.alert('Error', 'No se pudieron cargar los ingredientes guardados.');
        setSelectedIngredients({}); // Restablecer el estado en caso de error
      }
    };
    loadSelectedIngredients();
  }, []);

  const saveSelectedIngredients = useCallback(async (ingredientsToSave) => {
    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(ingredientsToSave));
    } catch (error) {
      console.error('Error al guardar los ingredientes seleccionados en AsyncStorage:', error);
      Alert.alert('Error', 'No se pudieron guardar los ingredientes.');
    }
  }, []);


  const toggleIngredientSelection = useCallback((ingredient) => {
    setSelectedIngredients((prevSelected) => {
      // *** CAMBIO AQUÍ: Usar ingredient.name para ingredientes de la lista principal,
      //     pero para la lista de seleccionados (cuando se elimina), el 'item'
      //     viene con 'originalName'. Necesitamos manejar ambos casos o
      //     asegurarnos de que 'ingredient' siempre tenga 'name' o 'originalName' consistente.
      //     La forma más segura es pasar siempre la propiedad que contiene el nombre.
      const nameToNormalize = ingredient.name || ingredient.originalName; // Usa 'name' si existe, sino 'originalName'
      const normalizedName = normalizeIngredientName(nameToNormalize);

      const newSelected = { ...prevSelected };
      if (newSelected[normalizedName]) {
        delete newSelected[normalizedName];
      } else {
        newSelected[normalizedName] = {
          originalName: ingredient.name, // Cuando seleccionamos, 'ingredient.name' es el que viene de allIngredientsData
          quantity: null, // Cantidad por defecto
          unit: ingredient.defaultUnit, // Usar la unidad por defecto
        };
      }
      saveSelectedIngredients(newSelected); // Guardar cambios inmediatamente
      return newSelected;
    });
  }, [saveSelectedIngredients]);

  const updateIngredientQuantity = useCallback((ingredientName, quantity) => {
    setSelectedIngredients((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (newSelected[ingredientName]) {
        newSelected[ingredientName] = {
          ...newSelected[ingredientName],
          quantity: quantity === '' ? null : Number(quantity), // Guardar como null o número
        };
        saveSelectedIngredients(newSelected); // Guardar cambios inmediatamente
      }
      return newSelected;
    });
  }, [saveSelectedIngredients]);

  // useLayoutEffect para el botón del encabezado (ya en tu código)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.headerButton, pressed && styles.pressed]}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
            size={24}
            color={Platform.OS === 'ios' ? '#007AFF' : 'white'}
          />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate('MealsOverview', {
              selectedIngredients: selectedIngredients,
            });
          }}
          style={({ pressed }) => [styles.headerButton, pressed && styles.pressed]}
        >
          <Ionicons
            name="checkmark"
            size={24}
            color={Platform.OS === 'ios' ? '#007AFF' : 'white'}
          />
        </Pressable>
      ),
    });
  }, [navigation, selectedIngredients]);


  const renderSelectedIngredientItem = ({ item }) => (
    <View style={styles.selectedIngredientItem}>
      <View style={styles.selectedIngredientInfo}>
        <Text style={styles.selectedIngredientName}>{item.originalName}</Text>
        <View style={styles.quantityInputContainer}>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={item.quantity === null ? '' : item.quantity.toString()}
            onChangeText={(text) => updateIngredientQuantity(normalizeIngredientName(item.originalName), text)}
            placeholder="Cant."
          />
          <Text style={styles.unitText}>{item.unit}</Text>
        </View>
      </View>
      <Pressable onPress={() => toggleIngredientSelection(item)} style={({ pressed }) => [styles.removeButton, pressed && styles.pressed]}>
        <Ionicons name="close-circle" size={24} color="red" />
      </Pressable>
    </View>
  );

  const renderIngredientItem = ({ item }) => {
    const isSelected = !!selectedIngredients[normalizeIngredientName(item.name)];
    return (
      <Pressable
        style={({ pressed }) => [
          styles.ingredientItem,
          isSelected && styles.ingredientItemSelected,
          pressed && styles.pressed,
        ]}
        onPress={() => toggleIngredientSelection(item)}
      >
        <Text style={styles.ingredientText}>
          {item.name} {item.defaultUnit !== 'cantidad' && `(${item.defaultUnit})`}
        </Text>
        {isSelected && (
          <Ionicons
            name="checkmark-circle"
            size={20}
            color="white"
            style={styles.checkmarkIcon}
          />
        )}
      </Pressable>
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Ingredientes Seleccionados:</Text>
      <FlatList
        data={Object.values(selectedIngredients).sort((a, b) => (a.originalName || '').localeCompare(b.originalName || ''))}
        // *** CAMBIO CLAVE AQUÍ: usar item.originalName para keyExtractor en la lista de seleccionados ***
        keyExtractor={(item) => normalizeIngredientName(item.originalName)}
        renderItem={renderSelectedIngredientItem}
        ListEmptyComponent={<Text style={styles.emptyListText}>No has seleccionado ningún ingrediente.</Text>}
        style={styles.selectedIngredientsListContainer}
        contentContainerStyle={styles.selectedIngredientsListContent}
      />

      <Text style={styles.sectionTitle}>Todos los Ingredientes:</Text>
      <FlatList
        data={allIngredientsData}
        keyExtractor={(item) => normalizeIngredientName(item.name)}
        renderItem={renderIngredientItem}
        contentContainerStyle={styles.mainListContent}
      />
    </View>
  );
}

export default IngredientsFilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // El contenedor principal debe tener flex: 1 para que sus hijos puedan crecer
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
    paddingHorizontal: 5,
  },
  headerButton: {
    marginHorizontal: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  // --- Estilos para los ingredientes seleccionados ---
  selectedIngredientsListContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white',
    // NO maxHeight aquí
  },
  selectedIngredientsListContent: {
    flexGrow: 0, // Esto es crucial para que se adapte al contenido
    paddingVertical: 5,
  },
  selectedIngredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedIngredientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  selectedIngredientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    width: 120,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    width: 60,
    textAlign: 'center',
    fontSize: 16,
  },
  unitText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    padding: 5,
  },
  // --- Estilos para la FlatList principal de todos los ingredientes ---
  mainListContent: {
    paddingBottom: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ingredientItemSelected: {
    backgroundColor: '#4CAF50',
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  checkmarkIcon: {
    marginLeft: 10,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});