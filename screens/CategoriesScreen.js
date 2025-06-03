import { Ionicons } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import CATEGORIES from '../data/categories';

// --- NUEVO: Importa tus colores ---
import Colors from '../constants/Colors.js';

function CategoriesScreen({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate('MealsOverview', {
        categoryId: itemData.item.id,
        categoryTitle: itemData.item.title,
      });
    }

    return (
      <View style={styles.gridItem}>
        <Pressable
          android_ripple={{ color: Colors.primary500 }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={pressHandler}
        >
          <View style={[styles.innerContainer, { backgroundColor: itemData.item.color || Colors.primary500 }]}>
            <Text style={styles.title}>{itemData.item.title}</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('IngredientsFilter')}
        >
          <Ionicons
            name="nutrition-outline"
            size={24}
            color={Colors.white} // Ícono blanco para que contraste con la cabecera oscura
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
      style={styles.listContainer} // Nuevo estilo para el fondo de la FlatList
    />
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.gray100, // Fondo de la lista de categorías
  },
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: Colors.white, // Fondo de cada tarjeta de categoría
    shadowColor: Colors.gray800, // Sombra oscura para las tarjetas
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // Asegúrate de que el innerContainer también tenga borderRadius para que no se salga
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray800, // Texto de la categoría gris oscuro
  },
});