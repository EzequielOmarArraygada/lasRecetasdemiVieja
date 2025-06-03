import { Ionicons } from '@expo/vector-icons'; // <-- Importa Ionicons
import { useLayoutEffect } from 'react'; // <-- Asegúrate de tener useLayoutEffect
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import CATEGORIES from '../data/categories';

function CategoriesScreen({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      // Navega directamente a MealsOverview, ya no necesitas el nombre del Drawer
      navigation.navigate('MealsOverview', {
        categoryId: itemData.item.id,
        categoryTitle: itemData.item.title, // Asegúrate de usar item.title si así están tus datos
      });
    }

    return (
      <View style={styles.gridItem}>
        <Pressable
          android_ripple={{ color: '#ccc' }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={pressHandler}
        >
          <View style={[styles.innerContainer, { backgroundColor: itemData.item.color }]}>
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
          onPress={() => navigation.navigate('IngredientsFilter')} // Navega a la nueva pantalla
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <Ionicons
            name="nutrition-outline" // O el ícono que prefieras para ingredientes
            size={24}
            color={Platform.OS === 'ios' ? '#007AFF' : 'white'} // Color del ícono
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
    />
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4, // Android shadow
    backgroundColor: 'white', // Fallback for iOS shadow
    shadowColor: 'black', // iOS shadow
    shadowOpacity: 0.25, // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowRadius: 8, // iOS shadow
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // Mantenemos el overflow si usas Platform en estilos de aquí
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  // headerButtonText y headerButtonPressed ya no deberían ser necesarios aquí si no hay buscador
});