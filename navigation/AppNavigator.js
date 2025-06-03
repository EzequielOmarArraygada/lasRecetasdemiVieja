// navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa tus pantallas existentes
import CategoriesScreen from '../screens/CategoriesScreen';
import HomeScreen from '../screens/HomeScreen';
import IngredientsFilterScreen from '../screens/IngredientsFilterScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import RecipesOverviewScreen from '../screens/RecipesOverviewScreen';

// --- NUEVO: Importa tus colores ---
import Colors from '../constants/Colors.js';


const Stack = createNativeStackNavigator();

function MealsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary800 }, // Usa el azul más oscuro para la cabecera
        headerTintColor: Colors.white, // El texto de la cabecera será blanco
        contentStyle: { backgroundColor: Colors.gray100 }, // Fondo general de las pantallas un gris muy claro
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MealsCategories"
        component={CategoriesScreen}
        options={{
          title: 'Categorías de Recetas',
          headerShown: true,
          // Puedes personalizar más aquí si quieres un color de cabecera diferente para esta pantalla
          // headerStyle: { backgroundColor: Colors.primary500 },
          // headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="MealsOverview"
        component={RecipesOverviewScreen}
        options={({ route }) => ({
            title: route.params?.categoryTitle || 'Recetas',
            headerShown: true,
        })}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{
          title: 'Detalle de la Receta',
          headerShown: true,
          // Aquí también puedes aplicar colores, por ejemplo:
          // headerStyle: { backgroundColor: Colors.primary500 },
          // headerTintColor: Colors.gray800, // O un color oscuro para el texto del título si el fondo es claro
        }}
      />
      <Stack.Screen
        name="IngredientsFilter"
        component={IngredientsFilterScreen}
        options={{
          title: 'Mis Ingredientes',
          headerShown: true,
          // Aquí también puedes aplicar colores:
          // headerStyle: { backgroundColor: Colors.primary500 },
          // headerTintColor: Colors.gray800,
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MealsStackNavigator />
    </NavigationContainer>
  );
}