// navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa tus pantallas existentes
import CategoriesScreen from '../screens/CategoriesScreen';
import IngredientsFilterScreen from '../screens/IngredientsFilterScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import RecipesOverviewScreen from '../screens/RecipesOverviewScreen';
// --- NUEVO: Importa tu nueva HomeScreen ---
import HomeScreen from '../screens/HomeScreen';


const Stack = createNativeStackNavigator();

function MealsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#351401' }, // Un color base para la cabecera, puedes cambiarlo
        headerTintColor: 'white',
        contentStyle: { backgroundColor: '#3f2f25' }, // Color de fondo general de las pantallas
      }}
    >
      {/* --- CAMBIO CLAVE: HomeScreen como primera pantalla --- */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false, // Ocultamos la cabecera por defecto para darle control a HomeScreen
        }}
      />
      <Stack.Screen
        name="MealsCategories"
        component={CategoriesScreen}
        options={{
          title: 'Categorías de Recetas', // Título para esta pantalla
          headerShown: true, // Aseguramos que la cabecera sea visible
        }}
      />
      <Stack.Screen
        name="MealsOverview"
        component={RecipesOverviewScreen}
        options={({ route }) => ({
            title: route.params?.categoryTitle || 'Recetas', // El título se puede pasar por parámetros
            headerShown: true, // Aseguramos que la cabecera sea visible
        })}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{
          title: 'Detalle de la Receta',
          headerShown: true, // Aseguramos que la cabecera sea visible
        }}
      />
      <Stack.Screen
        name="IngredientsFilter"
        component={IngredientsFilterScreen}
        options={{
          title: 'Mis Ingredientes',
          headerShown: true, // Aseguramos que la cabecera sea visible
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* Aquí podría ir un DrawerNavigator si lo necesitas más adelante */}
      <MealsStackNavigator />
    </NavigationContainer>
  );
}