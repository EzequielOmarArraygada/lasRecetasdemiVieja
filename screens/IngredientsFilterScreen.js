// screens/IngredientsFilterScreen.js
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, Dimensions, FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../constants/Colors.js'; // Asegúrate de que esta ruta sea correcta
import extractUniqueIngredientsWithUnits from '../data/ingredients';
import RECIPES from '../data/recipes';

const ASYNC_STORAGE_KEY = 'mySelectedIngredients';

const normalizeIngredientName = (name) => {
  // Aseguramos que 'name' sea una cadena antes de intentar 'trim' o 'toLowerCase'
  return (typeof name === 'string' ? name : String(name || '')).trim().toLowerCase();
};

// --- Componente memoizado para cada ingrediente seleccionado ---
const SelectedIngredientItem = React.memo(({ item, toggleIngredientSelection, updateIngredientQuantity }) => {
  // Verificación defensiva: si el ítem es nulo/indefinido, no renderizamos nada
  if (!item) {
    return null;
  }

  return (
    <View style={styles.selectedIngredientItem}>
      <View style={styles.selectedIngredientInfo}>
        {/* Asegúrate de que originalName siempre sea una cadena */}
        <Text style={styles.selectedIngredientName}>{String(item.originalName ?? '')}</Text>
        <View style={styles.quantityInputContainer}>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            // *** CAMBIO CRÍTICO AQUÍ: Manejo robusto de item.quantity ***
            // Aseguramos que el valor sea una cadena vacía si es null/undefined,
            // o una cadena si es un número.
            value={item.quantity == null ? '' : String(item.quantity)}
            onChangeText={(text) => updateIngredientQuantity(normalizeIngredientName(item.originalName), text)}
            placeholder="Cant."
            placeholderTextColor={Colors.gray500}
            maxLength={5}
          />
          {/* Asegúrate de que unit siempre sea una cadena */}
          <Text style={styles.unitText}>{String(item.unit ?? '')}</Text>
        </View>
      </View>
      <Pressable onPress={() => toggleIngredientSelection(item)} style={({ pressed }) => [styles.removeButton, pressed && styles.pressed]}>
        <Ionicons name="close-circle" size={28} color={Colors.danger} />
      </Pressable>
    </View>
  );
});

// --- Componente memoizado para cada ingrediente de la lista general ---
const IngredientItem = React.memo(({ item, isSelected, toggleIngredientSelection }) => {
  // Verificación defensiva: si el ítem es nulo/indefinido, no renderizamos nada
  if (!item) {
    return null;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.ingredientItem,
        isSelected && styles.ingredientItemSelected,
        pressed && styles.pressed,
      ]}
      onPress={() => toggleIngredientSelection(item)}
    >
      {/* Asegúrate de que name y defaultUnit siempre sean cadenas al renderizar */}
      <Text style={[styles.ingredientText, isSelected && { color: Colors.white }]}>
        {String(item.name ?? '')} {item.defaultUnit !== 'cantidad' && `(${String(item.defaultUnit ?? '')})`}
      </Text>
      {isSelected && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={Colors.white}
          style={styles.checkmarkIcon}
        />
      )}
    </Pressable>
  );
});


function IngredientsFilterScreen() {
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const navigation = useNavigation();

  const allIngredientsData = useMemo(() => {
    return extractUniqueIngredientsWithUnits(RECIPES);
  }, [RECIPES]);

  useEffect(() => {
    const loadSelectedIngredients = async () => {
      try {
        // Asegúrate de haber quitado la línea 'await AsyncStorage.clear();' de App.js después de la última prueba.
        const storedIngredients = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        if (storedIngredients !== null) {
          const parsedIngredients = JSON.parse(storedIngredients);
          if (typeof parsedIngredients === 'object' && parsedIngredients !== null) {
            const validatedIngredients = {};
            for (const key in parsedIngredients) {
              if (Object.hasOwnProperty.call(parsedIngredients, key)) {
                const ingredient = parsedIngredients[key];
                // Validación robusta de los datos recuperados:
                // Aseguramos que originalName y unit sean strings y quantity sea number o null
                if (
                  typeof ingredient === 'object' &&
                  ingredient !== null &&
                  typeof ingredient.originalName === 'string' &&
                  (typeof ingredient.quantity === 'number' || ingredient.quantity === null) &&
                  typeof ingredient.unit === 'string'
                ) {
                  validatedIngredients[normalizeIngredientName(ingredient.originalName)] = ingredient;
                } else {
                  console.warn(`Datos de ingrediente inválidos encontrados en AsyncStorage para la clave ${key}:`, ingredient);
                }
              }
            }
            setSelectedIngredients(validatedIngredients);
          } else {
            console.warn('Los datos de ingredientes almacenados no son un objeto:', parsedIngredients);
            setSelectedIngredients({});
          }
        }
      } catch (error) {
        console.error('Error al cargar los ingredientes seleccionados de AsyncStorage:', String(error));
        Alert.alert('Error', 'No se pudieron cargar los ingredientes guardados.');
        setSelectedIngredients({});
      }
    };
    loadSelectedIngredients();
  }, []);

  const saveSelectedIngredients = useCallback(async (ingredientsToSave) => {
    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(ingredientsToSave));
    } catch (error) {
      console.error('Error al guardar los ingredientes seleccionados en AsyncStorage:', String(error));
      Alert.alert('Error', 'No se pudieron guardar los ingredientes.');
    }
  }, []);

  const toggleIngredientSelection = useCallback((ingredient) => {
    setSelectedIngredients((prevSelected) => {
      const nameToNormalize = ingredient.name || ingredient.originalName;
      const normalizedName = normalizeIngredientName(nameToNormalize);

      const newSelected = { ...prevSelected };
      if (newSelected[normalizedName]) {
        delete newSelected[normalizedName];
      } else {
        newSelected[normalizedName] = {
          originalName: String(ingredient.name ?? ''), // Aseguramos que sea string
          quantity: null,
          unit: String(ingredient.defaultUnit ?? ''), // Aseguramos que sea string
        };
      }
      saveSelectedIngredients(newSelected);
      return newSelected;
    });
  }, [saveSelectedIngredients]);

  const updateIngredientQuantity = useCallback((ingredientName, quantity) => {
    setSelectedIngredients((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (newSelected[ingredientName]) {
        newSelected[ingredientName] = {
          ...newSelected[ingredientName],
          quantity: quantity === '' ? null : Number(quantity),
        };
        saveSelectedIngredients(newSelected);
      }
      return newSelected;
    });
  }, [saveSelectedIngredients]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.headerButton, pressed && styles.pressed]}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
            size={28}
            color={Colors.white}
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
            name="checkmark-done-circle"
            size={28}
            color={Colors.white}
          />
        </Pressable>
      ),
      headerStyle: { backgroundColor: Colors.primary800 },
      headerTintColor: Colors.white,
      headerTitleStyle: { fontWeight: 'bold' },
    });
  }, [navigation, selectedIngredients]);

  const renderSelected = useCallback(({ item }) => (
    <SelectedIngredientItem
      item={item}
      toggleIngredientSelection={toggleIngredientSelection}
      updateIngredientQuantity={updateIngredientQuantity}
    />
  ), [toggleIngredientSelection, updateIngredientQuantity]);

  const renderAll = useCallback(({ item }) => {
    const isSelected = !!selectedIngredients[normalizeIngredientName(item.name)];
    return (
      <IngredientItem
        item={item}
        isSelected={isSelected}
        toggleIngredientSelection={toggleIngredientSelection}
      />
    );
  }, [selectedIngredients, toggleIngredientSelection]);


  return (
    <KeyboardAvoidingView
      style={styles.fullScreen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Ingredientes Seleccionados:</Text>
        <FlatList
          data={Object.values(selectedIngredients).sort((a, b) => (a.originalName ?? '').localeCompare(b.originalName ?? ''))}
          keyExtractor={(item) => normalizeIngredientName(item.originalName)}
          renderItem={renderSelected}
          ListEmptyComponent={<Text style={styles.emptyListText}>No has seleccionado ningún ingrediente.</Text>}
          style={styles.selectedIngredientsListContainer}
          contentContainerStyle={styles.selectedIngredientsListContent}
        />

        <Text style={styles.sectionTitle}>Todos los Ingredientes:</Text>
        <FlatList
          data={allIngredientsData}
          keyExtractor={(item) => normalizeIngredientName(item.name)}
          renderItem={renderAll}
          contentContainerStyle={styles.mainListContent}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export default IngredientsFilterScreen;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.gray100,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Colors.primary800,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  headerButton: {
    marginHorizontal: 10,
  },
  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.95 }],
  },
  selectedIngredientsListContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.gray100,
    borderRadius: 12,
    backgroundColor: Colors.white,
    maxHeight: Dimensions.get('window').height * 0.35,
    minHeight: 50,
    overflow: 'hidden',
    shadowColor: Colors.gray800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  selectedIngredientsListContent: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  selectedIngredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
    backgroundColor: Colors.white,
  },
  selectedIngredientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  selectedIngredientName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray800,
    flex: 1,
    paddingRight: 5,
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    width: 120,
    backgroundColor: Colors.gray100,
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  quantityInput: {
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 60,
    textAlign: 'center',
    fontSize: 18,
    color: Colors.primary800,
    fontWeight: 'bold',
  },
  unitText: {
    marginLeft: 5,
    fontSize: 16,
    color: Colors.gray500,
  },
  removeButton: {
    padding: 5,
  },
  mainListContent: {
    paddingBottom: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: Colors.gray800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  ingredientItemSelected: {
    backgroundColor: Colors.primary500,
  },
  ingredientText: {
    fontSize: 18,
    color: Colors.gray800,
    fontWeight: '500',
    flex: 1,
  },
  checkmarkIcon: {
    marginLeft: 15,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: Colors.gray500,
  },
});