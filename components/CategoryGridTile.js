import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'; // 

function CategoryGridTile({ title, color, onPress }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
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
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // <-- Aquí se usa Platform
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
    borderRadius: 8, // Este border radius también es importante para que el ripple no se salga
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black', // Asegura un color de texto visible
  },
});