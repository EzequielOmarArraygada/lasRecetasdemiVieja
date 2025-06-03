import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa tus pantallas existentes
import CategoriesScreen from '../screens/CategoriesScreen';
import IngredientsFilterScreen from '../screens/IngredientsFilterScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import RecipesOverviewScreen from '../screens/RecipesOverviewScreen';


const Stack = createNativeStackNavigator();

function MealsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: '#3f2f25' },
      }}
    >
      <Stack.Screen
        name="MealsCategories"
        component={CategoriesScreen}
        options={{
          title: 'Todas las Categorías',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="MealsOverview"
        component={RecipesOverviewScreen}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{
          title: 'Detalle de la Receta',
        }}
      />
      {/* <-- AÑADE ESTA NUEVA PANTALLA PARA LOS INGREDIENTES --> */}
      <Stack.Screen
        name="IngredientsFilter"
        component={IngredientsFilterScreen}
        options={{
          title: 'Mis Ingredientes',
        }}
      />
    </Stack.Navigator>
  );
}

// El componente principal de navegación que exporta AppNavigator.js
export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* El Stack Navigator es ahora el navegador principal de nuevo */}
      <MealsStackNavigator />
    </NavigationContainer>
  );
}