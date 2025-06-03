// data/recipes.js

const RECIPES = [
  {
    id: 'r1',
    categoryIds: ['c1', 'c9'],
    name: 'Tostadas con Palta y Huevo',
    imageUrl: 'https://picsum.photos/seed/r1_main/800/600', // Unsplash URL replaced by Picsum
    duration: 10,
    complexity: 'Fácil',
    images: [
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/1.jpg', // Unsplash URL replaced by Picsum
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/2.jpg', // Unsplash URL replaced by Picsum
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/3.jpg', // Unsplash URL replaced by Picsum
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/4.jpg', // Unsplash URL replaced by Picsum
    ],
    ingredients: [
      { name: 'Pan integral', quantity: 2, unit: 'rebanadas' },
      { name: 'Palta madura', quantity: 1, unit: 'unidad' },
      { name: 'Huevos', quantity: 2, unit: 'unidades' },
      { name: 'Sal', quantity: null, unit: 'al gusto' }, // O quantity: 0, unit: 'cantidad variable'
      { name: 'Pimienta', quantity: null, unit: 'al gusto' }, // Separar sal y pimienta si son ingredientes distintos
      { name: 'Chile en hojuelas', quantity: null, unit: 'opcional' }, // Los opcionales o "al gusto" pueden tener quantity: null
    ],
    steps: [
      { text: 'Tostar el pan hasta que esté dorado y crujiente.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/3.jpg' }, // Unsplash URL replaced by Picsum
      { text: 'Mientras tanto, cocinar los huevos al gusto (escalfados, fritos o revueltos).', videoUrl: 'https://www.youtube.com/shorts/cjgPembiFU0?feature=share' },
      { text: 'Pisar la palta en un tazón y sazonar con sal y pimienta.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/2.jpg' }, // Unsplash URL replaced by Picsum
      { text: 'Untar la palta sobre las tostadas y colocar los huevos encima.' },
      { text: 'Decorar con chile en hojuelas si se desea y servir inmediatamente.' },
    ],
  },
  // ... tus otras recetas, si las tienes, también cámbiales las URLs por Picsum
];

export default RECIPES;