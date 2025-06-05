import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, Dimensions, FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors.js';
import extractUniqueIngredientsWithUnits from '../data/ingredients';
import RECIPES from '../data/recipes';

const ASYNC_STORAGE_KEY = 'mySelectedIngredients';

const normalizeIngredientName = (name) => {
  return (typeof name === 'string' ? name : String(name || '')).trim().toLowerCase();
};

const SelectedIngredientItem = React.memo(({ item, updateIngredientQuantity, toggleIngredientSelection }) => {
  if (!item) {
    return null;
  }

  const [quantity, setQuantity] = useState(String(item.quantity || ''));

  useEffect(() => {
    setQuantity(String(item.quantity || ''));
  }, [item.quantity]);

  const handleQuantityChange = (text) => {
    setQuantity(text);
    const num = parseFloat(text);
    if (!isNaN(num) || text === '') {
      updateIngredientQuantity(item.originalName, num);
    }
  };

  return (
    <View style={styles.modalIngredientItem}>
      <View style={styles.modalIngredientInfo}>
        <Text style={styles.modalIngredientName}>{item.originalName}</Text>
        <View style={styles.quantityInputContainer}>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            onChangeText={handleQuantityChange}
            value={quantity}
            placeholder="0"
            placeholderTextColor={Colors.gray400}
            maxLength={6}
            blurOnSubmit={false}
          />
          {item.defaultUnit && item.defaultUnit !== 'cantidad' && (
            <Text style={styles.unitText}>{item.defaultUnit}</Text>
          )}
        </View>
      </View>
      <Pressable style={styles.removeButton} onPress={() => toggleIngredientSelection({ name: item.originalName })}>
        <Ionicons name="close-circle" size={24} color={Colors.red500} />
      </Pressable>
    </View>
  );
});

const IngredientItem = React.memo(({ item, isSelected, toggleIngredientSelection }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.ingredientItem,
        isSelected ? styles.selectedItem : {},
        pressed ? styles.pressedItem : {},
      ]}
      onPress={() => toggleIngredientSelection(item)}
    >
      <Text style={styles.ingredientName}>{item.name}</Text>
      {isSelected && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={Colors.primary500}
        />
      )}
    </Pressable>
  );
});

const IngredientsFilterScreen = () => {
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const uniqueIngredients = extractUniqueIngredientsWithUnits(RECIPES);
    setAvailableIngredients(uniqueIngredients);
  }, []);

  useEffect(() => {
    const loadSelectedIngredients = async () => {
      try {
        const storedIngredients = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        if (storedIngredients) {
          const parsedIngredients = JSON.parse(storedIngredients).map(item => ({
            originalName: item.originalName,
            normalizedName: normalizeIngredientName(item.originalName),
            defaultUnit: item.defaultUnit,
            quantity: item.quantity || 0,
          }));
          setSelectedIngredients(parsedIngredients);
        }
      } catch (error) {
        console.error('Error loading selected ingredients from AsyncStorage:', error);
      }
    };
    loadSelectedIngredients();
  }, []);

  useEffect(() => {
    const saveSelectedIngredients = async () => {
      try {
        await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(selectedIngredients));
      } catch (error) {
        console.error('Error saving selected ingredients to AsyncStorage:', error);
      }
    };
    saveSelectedIngredients();
  }, [selectedIngredients]);

  const toggleIngredientSelection = useCallback((ingredient) => {
    setSelectedIngredients((prevSelected) => {
      const normalizedNewIngredientName = normalizeIngredientName(ingredient.name);
      const isAlreadySelected = prevSelected.some(
        (item) => normalizeIngredientName(item.originalName) === normalizedNewIngredientName
      );

      if (isAlreadySelected) {
        return prevSelected.filter(
          (item) => normalizeIngredientName(item.originalName) !== normalizedNewIngredientName
        );
      } else {
        return [
          ...prevSelected,
          {
            originalName: ingredient.name,
            normalizedName: normalizedNewIngredientName,
            defaultUnit: ingredient.defaultUnit,
            quantity: 0,
          },
        ];
      }
    });
  }, []);

  const updateIngredientQuantity = useCallback((ingredientOriginalName, newQuantity) => {
    setSelectedIngredients((prevSelected) => {
      return prevSelected.map((item) => {
        if (normalizeIngredientName(item.originalName) === normalizeIngredientName(ingredientOriginalName)) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  }, []);

  const clearAllSelections = useCallback(() => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres borrar todos los ingredientes seleccionados?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Borrar',
          onPress: () => setSelectedIngredients([]),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  }, []);

  const filteredAvailableIngredients = useMemo(() => {
    if (!searchText) {
      return availableIngredients;
    }
    const normalizedSearchText = normalizeIngredientName(searchText);
    return availableIngredients.filter(ingredient =>
      normalizeIngredientName(ingredient.name).includes(normalizedSearchText)
    );
  }, [availableIngredients, searchText]);

  const navigateToRecipes = useCallback(() => {
    setModalVisible(false);
    // *** CAMBIO CRUCIAL AQUÍ: Usar el nombre de la ruta correcto "MealsOverview" ***
    navigation.navigate('MealsOverview', {
      selectedIngredients: selectedIngredients,
      categoryTitle: 'Recetas por Ingredientes' // O un título más adecuado
    });
  }, [navigation, selectedIngredients]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.headerButton}
          >
            <Ionicons name="list" size={24} color={Colors.primary500} />
            <Text style={styles.headerButtonText}> ({selectedIngredients.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clearAllSelections}
            style={styles.headerButton}
          >
            <Ionicons name="trash" size={24} color={Colors.red500} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, selectedIngredients.length, clearAllSelections]);


  const selectedIngredientNames = useMemo(() => {
    return new Set(selectedIngredients.map(item => normalizeIngredientName(item.originalName)));
  }, [selectedIngredients]);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.gray500} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar ingrediente..."
          placeholderTextColor={Colors.gray400}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <Pressable onPress={() => setSearchText('')} style={styles.clearSearchButton}>
            <Ionicons name="close-circle" size={20} color={Colors.gray500} />
          </Pressable>
        )}
      </View>

      <FlatList
        data={filteredAvailableIngredients}
        keyExtractor={(item) => normalizeIngredientName(item.name)}
        renderItem={({ item }) => (
          <IngredientItem
            item={item}
            isSelected={selectedIngredientNames.has(normalizeIngredientName(item.name))}
            toggleIngredientSelection={toggleIngredientSelection}
          />
        )}
        contentContainerStyle={styles.mainListContent}
        keyboardShouldPersistTaps="handled"
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView
          style={styles.modalKeyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -250}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ingredientes Seleccionados</Text>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Ionicons name="close" size={30} color={Colors.gray800} />
              </TouchableOpacity>
            </View>
            {selectedIngredients.length === 0 ? (
              <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>No hay ingredientes seleccionados aún.</Text>
              </View>
            ) : (
              <FlatList
                data={selectedIngredients.sort((a, b) => {
                  const nameA = a.originalName ?? '';
                  const nameB = b.originalName ?? '';
                  return nameA.localeCompare(nameB);
                })}
                keyExtractor={(item) => item.normalizedName}
                renderItem={({ item }) => (
                  <SelectedIngredientItem
                    item={item}
                    updateIngredientQuantity={updateIngredientQuantity}
                    toggleIngredientSelection={toggleIngredientSelection}
                  />
                )}
                contentContainerStyle={styles.modalListContent}
                keyboardShouldPersistTaps="handled"
              />
            )}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.viewRecipesButton} onPress={navigateToRecipes}>
                <Text style={styles.viewRecipesButtonText}>Ver Recetas ({selectedIngredients.length})</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.closeModalButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.gray100,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: Colors.white,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  headerButtonText: {
    color: Colors.primary500,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: Colors.gray800,
  },
  clearSearchButton: {
    marginLeft: 10,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  selectedItem: {
    backgroundColor: Colors.primary100,
    borderColor: Colors.primary500,
    borderWidth: 1,
  },
  pressedItem: {
    opacity: 0.7,
  },
  ingredientName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray800,
    flex: 1,
    paddingRight: 5,
  },

  modalKeyboardAvoidingView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 50,
    backgroundColor: Colors.gray100,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.gray800,
  },
  modalListContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 180,
  },
  modalIngredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1.41,
    elevation: 1,
  },
  modalIngredientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalIngredientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gray800,
    flex: 1,
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    width: 120,
    backgroundColor: Colors.gray100,
    borderRadius: 8,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: Colors.gray300,
  },
  quantityInput: {
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary800,
    fontWeight: 'bold',
  },
  unitText: {
    marginLeft: 5,
    fontSize: 14,
    color: Colors.gray500,
  },
  removeButton: {
    padding: 8,
    marginLeft: 10,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyListText: {
    fontSize: 18,
    color: Colors.gray500,
    textAlign: 'center',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    backgroundColor: Colors.white,
    alignItems: 'center',
    flexDirection: 'column',
  },
  viewRecipesButton: {
    backgroundColor: Colors.accent500,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  viewRecipesButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeModalButton: {
    backgroundColor: Colors.primary500,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IngredientsFilterScreen;