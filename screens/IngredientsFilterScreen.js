import { Ionicons } from '@expo/vector-icons'; // Para los íconos de checkbox/cruz
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import ALL_INGREDIENTS from '../data/ingredients'; // Importa la lista de todos los ingredientes únicos

// Clave para guardar en AsyncStorage
const ASYNC_STORAGE_KEY = 'mySelectedIngredients';

function IngredientsFilterScreen() {
  // Estado para guardar los ingredientes que el usuario ha seleccionado como disponibles
  // Usamos un objeto para un acceso más rápido por nombre
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const navigation = useNavigation();

  // Cargar ingredientes seleccionados de AsyncStorage al inicio
  useEffect(() => {
    const loadSelectedIngredients = async () => {
      try {
        const storedIngredients = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        if (storedIngredients !== null) {
          setSelectedIngredients(JSON.parse(storedIngredients));
        }
      } catch (error) {
        console.error('Error al cargar los ingredientes de AsyncStorage:', error);
        Alert.alert('Error', 'No se pudieron cargar tus ingredientes guardados.');
      }
    };
    loadSelectedIngredients();
  }, []);

  // Guardar ingredientes seleccionados en AsyncStorage cada vez que cambian
  useEffect(() => {
    const saveSelectedIngredients = async () => {
      try {
        await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(selectedIngredients));
      } catch (error) {
        console.error('Error al guardar los ingredientes en AsyncStorage:', error);
        Alert.alert('Error', 'No se pudieron guardar tus ingredientes.');
      }
    };
    saveSelectedIngredients();
  }, [selectedIngredients]);


  // Función para manejar la selección/deselección de un ingrediente
  const toggleIngredient = useCallback((ingredientName) => {
    setSelectedIngredients(prevSelected => {
      const newSelected = { ...prevSelected };
      if (newSelected[ingredientName]) {
        delete newSelected[ingredientName]; // Deseleccionar
      } else {
        newSelected[ingredientName] = true; // Seleccionar
      }
      return newSelected;
    });
  }, []); // No dependencies for useCallback, as it only uses prevSelected state

  // Función para renderizar cada ítem de ingrediente en la FlatList
  const renderIngredientItem = ({ item }) => {
    const isSelected = selectedIngredients[item];
    return (
      <Pressable
        onPress={() => toggleIngredient(item)}
        style={({ pressed }) => [
          styles.ingredientItem,
          isSelected ? styles.ingredientItemSelected : null,
          pressed ? styles.ingredientItemPressed : null,
        ]}
      >
        <Text style={styles.ingredientText}>{item}</Text>
        {isSelected ? (
          <Ionicons name="checkbox-outline" size={24} color="#4CAF50" />
        ) : (
          <Ionicons name="square-outline" size={24} color="#777" />
        )}
      </Pressable>
    );
  };

  // Configurar el header de la pantalla (opcional)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Mis Ingredientes',
      // Puedes añadir botones al header aquí si lo deseas
      // Por ejemplo, para limpiar todos los ingredientes
      // headerRight: () => (
      //   <Pressable onPress={() => Alert.alert('Limpiar', '¿Deseas limpiar todos los ingredientes seleccionados?', [{text: 'No'}, {text: 'Sí', onPress: () => setSelectedIngredients({})}])}>
      //     <Ionicons name="trash-outline" size={24} color={Platform.OS === 'ios' ? '#007AFF' : 'white'} />
      //   </Pressable>
      // ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tus ingredientes disponibles</Text>
      <FlatList
        data={ALL_INGREDIENTS}
        keyExtractor={(item) => item} // El ingrediente mismo es único, úsalo como key
        renderItem={renderIngredientItem}
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
    paddingBottom: 20, // Espacio al final de la lista
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
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
    elevation: 2, // Para Android
  },
  ingredientItemSelected: {
    borderColor: '#4CAF50', // Borde verde si seleccionado
    backgroundColor: '#e6ffe6', // Fondo ligeramente verde si seleccionado
  },
  ingredientItemPressed: {
    opacity: 0.7, // Efecto de presión
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
    flex: 1, // Permite que el texto ocupe el espacio restante
    marginRight: 10,
  },
});