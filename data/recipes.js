// data/recipes.js

const RECIPES = [
  {
    id: 'r1',
    categoryIds: ['c1', 'c9'],
    name: 'Tostadas con Palta y Huevo',
    imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/1.jpg',
    duration: 10,
    complexity: 'Fácil',
    images: [
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/1.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/2.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/3.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/4.jpg',
    ],
    ingredients: [
      { name: 'Pan integral', quantity: 2, unit: 'rebanadas' },
      { name: 'Palta madura', quantity: 1, unit: 'unidad' },
      { name: 'Huevos', quantity: 2, unit: 'unidades' },
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta', quantity: null, unit: 'al gusto' },
      { name: 'Chile en hojuelas', quantity: null, unit: 'opcional' },
    ],
    steps: [
      { text: 'Tostar el pan hasta que esté dorado y crujiente.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/3.jpg' },
      { text: 'Mientras tanto, cocinar los huevos al gusto (escalfados, fritos o revueltos).', videoUrl: 'https://www.youtube.com/shorts/cjgPembiFU0?feature=share' },
      { text: 'Pisar la palta en un tazón y sazonar con sal y pimienta.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/4.jpg' },
      { text: 'Montar la palta pisada sobre el pan tostado.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/2.jpg' },
      { text: 'Colocar los huevos cocidos encima de la palta.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/1.jpg' },
      { text: 'Espolvorear con chile en hojuelas (opcional) y servir inmediatamente.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Tostadas%20con%20Palta%20y%20Huevo/4.jpg' },
    ],
  },
  {
    id: 'r2',
    categoryIds: ['c2', 'c6'],
    name: 'Ensalada Caprese con Reducción Balsámica',
    imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Ensalada%20Caprese%20con%20Reducci%C3%B3n%20Bals%C3%A1mica/1.jpg',
    duration: 15,
    complexity: 'Fácil',
    images: [
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Ensalada%20Caprese%20con%20Reducci%C3%B3n%20Bals%C3%A1mica/1.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Ensalada%20Caprese%20con%20Reducci%C3%B3n%20Bals%C3%A1mica/2.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Ensalada%20Caprese%20con%20Reducci%C3%B3n%20Bals%C3%A1mica/3.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Ensalada%20Caprese%20con%20Reducci%C3%B3n%20Bals%C3%A1mica/4.jpg',
    ],
    ingredients: [
      { name: 'Tomates cherry', quantity: 250, unit: 'gramos' },
      { name: 'Mozzarella fresca (bocconcinis)', quantity: 200, unit: 'gramos' },
      { name: 'Hojas de albahaca fresca', quantity: 1, unit: 'puñado' },
      { name: 'Aceite de oliva virgen extra', quantity: 30, unit: 'ml' }, // 2 cucharadas = 30ml
      { name: 'Vinagre balsámico', quantity: 60, unit: 'ml' }, // 4 cucharadas = 60ml
      { name: 'Miel', quantity: 5, unit: 'ml' }, // 1 cucharadita = 5ml
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta negra', quantity: null, unit: 'al gusto' },
    ],
    steps: [
      { text: 'Lavar y cortar los tomates cherry por la mitad.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Ensalada%20Caprese/1.jpg' },
      { text: 'Escurrir bien los bocconcinis de mozzarella.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Ensalada%20Caprese/2.jpg' },
      { text: 'En un plato, alternar los tomates, la mozzarella y las hojas de albahaca.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Ensalada%20Caprese/3.jpg' },
      { text: 'Para la reducción balsámica: en una sartén pequeña, combinar el vinagre balsámico y la miel. Llevar a ebullición y luego reducir el fuego a bajo, cocinando hasta que la mezcla espese ligeramente (unos 5-7 minutos).', videoUrl: 'https://www.youtube.com/watch?v=quZv3uKSEfY' },
      { text: 'Rociar la ensalada con el aceite de oliva y la reducción balsámica.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Ensalada%20Caprese/1.jpg' },
      { text: 'Sazonar con sal y pimienta negra al gusto antes de servir.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Ensalada%20Caprese/3.jpg' },
    ],
  },
  {
    id: 'r3',
    categoryIds: ['c3', 'c10'],
    name: 'Milanesa a la Napolitana con Puré',
    imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Milanesa%20a%20la%20Napolitana%20con%20Pur%C3%A9/2.jpg',
    duration: 45,
    complexity: 'Media',
    images: [
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Milanesa%20a%20la%20Napolitana%20con%20Pur%C3%A9/2.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Milanesa%20a%20la%20Napolitana%20con%20Pur%C3%A9/1.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Milanesa%20a%20la%20Napolitana%20con%20Pur%C3%A9/3.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Milanesa%20a%20la%20Napolitana%20con%20Pur%C3%A9/4.jpg',
    ],
    ingredients: [
      { name: 'Carne para milanesas', quantity: 4, unit: 'filetes' },
      { name: 'Pan rallado', quantity: 200, unit: 'gramos' },
      { name: 'Huevos', quantity: 2, unit: 'unidades' },
      { name: 'Harina', quantity: 50, unit: 'gramos' },
      { name: 'Aceite para freír', quantity: null, unit: 'cantidad necesaria' },
      { name: 'Salsa de tomate', quantity: 200, unit: 'ml' },
      { name: 'Jamón cocido', quantity: 100, unit: 'gramos' },
      { name: 'Mozzarella', quantity: 150, unit: 'gramos' },
      { name: 'Orégano', quantity: null, unit: 'al gusto' },
      { name: 'Papas', quantity: 500, unit: 'gramos' },
      { name: 'Leche', quantity: 50, unit: 'ml' },
      { name: 'Manteca', quantity: 20, unit: 'gramos' },
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta', quantity: null, unit: 'al gusto' },
    ],
    steps: [
      { text: 'Empanar las milanesas: pasar por harina, luego por huevo batido y finalmente por pan rallado. Presionar bien para que el pan se adhiera.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Milanesa%20a%20la%20Napolitana/1.jpg' },
      { text: 'Freír las milanesas en aceite caliente hasta que estén doradas por ambos lados. Retirar y colocar sobre papel absorbente.', videoUrl: 'https://www.youtube.com/watch?v=5T61K2UCVyg' },
      { text: 'Precalentar el horno a 180°C (350°F).', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Milanesa%20a%20la%20Napolitana/2.jpg' },
      { text: 'Colocar las milanesas fritas en una fuente para horno. Cubrir cada milanesa con salsa de tomate, una feta de jamón y mozzarella rallada. Espolvorear con orégano.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Milanesa%20a%20la%20Napolitana/3.jpg' },
      { text: 'Llevar al horno hasta que el queso se gratine y burbujee.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Milanesa%20a%20la%20Napolitana/3.jpg' },
      { text: 'Mientras tanto, preparar el puré: pelar y hervir las papas hasta que estén tiernas. Pisar las papas con leche, manteca, sal y pimienta hasta obtener un puré suave.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Milanesa%20a%20la%20Napolitana/1.jpg' },
      { text: 'Servir las milanesas a la napolitana acompañadas de puré de papas.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Milanesa%20a%20la%20Napolitana/3.jpg' },
    ],
  },
  {
    id: 'r4',
    categoryIds: ['c4'],
    name: 'Cheesecake de Frutos Rojos (sin horno)',
    imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Cheesecake%20de%20Frutos%20Rojos%20(sin%20horno)/1.jpg',
    duration: 30, // Tiempo de preparación, más el enfriado
    complexity: 'Media',
    images: [
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Cheesecake%20de%20Frutos%20Rojos%20(sin%20horno)/1.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Cheesecake%20de%20Frutos%20Rojos%20(sin%20horno)/2.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Cheesecake%20de%20Frutos%20Rojos%20(sin%20horno)/3.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Cheesecake%20de%20Frutos%20Rojos%20(sin%20horno)/4.jpg',
    ],
    ingredients: [
      { name: 'Galletas de vainilla (tipo María)', quantity: 200, unit: 'gramos' },
      { name: 'Manteca derretida', quantity: 100, unit: 'gramos' },
      { name: 'Queso crema', quantity: 500, unit: 'gramos' },
      { name: 'Azúcar impalpable', quantity: 150, unit: 'gramos' },
      { name: 'Crema de leche (nata para montar)', quantity: 200, unit: 'ml' },
      { name: 'Esencia de vainilla', quantity: 5, unit: 'ml' }, // 1 cucharadita = 5ml
      { name: 'Gelatina sin sabor', quantity: 7, unit: 'gramos' },
      { name: 'Agua', quantity: 50, unit: 'ml' }, // Unificado a 'Agua' y en ml
      { name: 'Frutos rojos (fresas, arándanos, frambuesas)', quantity: 200, unit: 'gramos' },
      { name: 'Azúcar', quantity: 50, unit: 'gramos' },
      { name: 'Agua', quantity: 30, unit: 'ml' }, // 2 cucharadas = 30ml
    ],
    steps: [
      { text: 'Para la base: triturar las galletas hasta obtener migas finas. Mezclar con la manteca derretida y presionar firmemente en la base de un molde desmontable (aprox. 20 cm de diámetro). Refrigerar por 15 minutos.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Cheesecake%20de%20Frutos%20Rojos/1.jpg' },
      { text: 'Para el relleno: batir el queso crema con el azúcar impalpable y la esencia de vainilla hasta que esté suave y cremoso.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Cheesecake%20de%20Frutos%20Rojos/2.jpg' },
      { text: 'En un recipiente aparte, hidratar la gelatina sin sabor en agua (los 50ml) por 5 minutos y luego calentar en microondas (o a baño María) hasta que se disuelva completamente. Dejar entibiar.', videoUrl: 'https://www.youtube.com/shorts/cjgPembiFU0?feature=share' },
      { text: 'Montar la crema de leche hasta que esté firme. Incorporar suavemente la crema montada al queso crema batido, junto con la gelatina disuelta.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Cheesecake%20de%20Frutos%20Rojos/2.jpg' },
      { text: 'Verter el relleno sobre la base de galletas en el molde. Refrigerar por al menos 4 horas (idealmente toda la noche) hasta que esté bien firme.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Cheesecake%20de%20Frutos%20Rojos/3.jpg' },
      { text: 'Para la salsa de frutos rojos: en una cacerola pequeña, combinar los frutos rojos, el azúcar y el agua (los 30ml). Cocinar a fuego medio por 5-7 minutos, aplastando las frutas ligeramente, hasta que la salsa espese. Dejar enfriar completamente.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Cheesecake%20de%20Frutos%20Rojos/1.jpg' },
      { text: 'Desmoldar el cheesecake y cubrir con la salsa de frutos rojos antes de servir.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Cheesecake%20de%20Frutos%20Rojos/3.jpg' },
    ],
  },
  {
    id: 'r5',
    categoryIds: ['c5'],
    name: 'Bruschettas Variadas',
    imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Bruschettas%20Variadas/1.jpg',
    duration: 20,
    complexity: 'Fácil',
    images: [
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Bruschettas%20Variadas/1.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Bruschettas%20Variadas/2.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Bruschettas%20Variadas/3.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Bruschettas%20Variadas/4.jpg',
    ],
    ingredients: [
      { name: 'Pan ciabatta o baguette', quantity: 1, unit: 'unidad' },
      { name: 'Aceite de oliva virgen extra', quantity: null, unit: 'cantidad necesaria' },
      { name: 'Ajo', quantity: 1, unit: 'diente' },
      { name: 'Tomates cherry', quantity: 150, unit: 'gramos' },
      { name: 'Albahaca fresca', quantity: 1, unit: 'puñado' },
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta negra', quantity: null, unit: 'al gusto' },
      { name: 'Palta', quantity: 1, unit: 'unidad' },
      { name: 'Jugo de limón', quantity: 5, unit: 'ml' }, // 1 cucharadita = 5ml
      { name: 'Queso de cabra', quantity: 100, unit: 'gramos' },
      { name: 'Miel', quantity: 5, unit: 'ml' }, // 1 cucharadita = 5ml
    ],
    steps: [
      { text: 'Cortar el pan en rebanadas de aproximadamente 1.5 cm de grosor. Rociar con aceite de oliva y tostar en horno o sartén hasta que estén doradas.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Bruschettas%20Variadas/1.jpg' },
      { text: 'Frotar cada rebanada de pan tostado con un diente de ajo.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Bruschettas%20Variadas/1.jpg' },
      { text: 'Para la bruschetta de tomate y albahaca: picar los tomates cherry y la albahaca. Mezclar con un chorrito de aceite de oliva, sal y pimienta. Colocar sobre algunas rebanadas de pan.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Bruschettas%20Variadas/2.jpg' },
      { text: 'Para la bruschetta de palta: pisar la palta con jugo de limón, sal y pimienta. Untar sobre otras rebanadas de pan.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Bruschettas%20Variadas/3.jpg' },
      { text: 'Para la bruschetta de queso de cabra y miel: untar queso de cabra sobre las rebanadas restantes y rociar con un poco de miel.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Bruschettas%20Variadas/3.jpg' },
      { text: 'Servir inmediatamente.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Bruschettas%20Variadas/2.jpg' },
    ],
  },
  {
    id: 'r6',
    categoryIds: ['c6', 'c9'],
    name: 'Curry de Garbanzos y Espinacas',
    imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Curry%20de%20Garbanzos%20y%20Espinacas/1.jpg',
    duration: 30,
    complexity: 'Media',
    images: [
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Curry%20de%20Garbanzos%20y%20Espinacas/1.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Curry%20de%20Garbanzos%20y%20Espinacas/2.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Curry%20de%20Garbanzos%20y%20Espinacas/3.jpg',
    ],
    ingredients: [
      { name: 'Aceite de coco o vegetal', quantity: 15, unit: 'ml' }, // 1 cucharada = 15ml
      { name: 'Cebolla', quantity: 1, unit: 'unidad' },
      { name: 'Jengibre fresco', quantity: 5, unit: 'ml rallado' }, // 1 cucharadita = 5ml
      { name: 'Ajo', quantity: 2, unit: 'dientes picados' },
      { name: 'Pasta de curry rojo', quantity: 30, unit: 'ml' }, // 2 cucharadas = 30ml
      { name: 'Leche de coco', quantity: 400, unit: 'ml' },
      { name: 'Tomates triturados', quantity: 200, unit: 'gramos' },
      { name: 'Garbanzos cocidos', quantity: 400, unit: 'gramos escurridos' },
      { name: 'Espinacas frescas', quantity: 200, unit: 'gramos' },
      { name: 'Caldo de verduras', quantity: 100, unit: 'ml' },
      { name: 'Jugo de lima', quantity: 15, unit: 'ml' }, // 1 cucharada = 15ml
      { name: 'Cilantro fresco', quantity: null, unit: 'para decorar' },
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Arroz basmati', quantity: null, unit: 'para acompañar' },
    ],
    steps: [
      { text: 'En una olla grande, calentar el aceite a fuego medio. Añadir la cebolla picada y cocinar hasta que esté transparente, unos 5 minutos.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Curry%20de%20Garbanzos%20y%20Espinacas/1.jpg' },
      { text: 'Agregar el jengibre y el ajo, y cocinar por 1 minuto más hasta que estén fragantes.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Curry%20de%20Garbanzos%20y%20Espinacas/1.jpg' },
      { text: 'Incorporar la pasta de curry rojo y cocinar, revolviendo, por 2 minutos para que los sabores se desarrollen.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Curry%20de%20Garbanzos%20y%20Espinacas/2.jpg' },
      { text: 'Verter la leche de coco, los tomates triturados y el caldo de verduras. Llevar a ebullición, luego reducir el fuego y cocinar a fuego lento por 10 minutos.', videoUrl: 'https://www.youtube.com/watch?v=quZv3uKSEfY' },
      { text: 'Añadir los garbanzos cocidos y cocinar por otros 5 minutos.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Curry%20de%20Garbanzos%20y%20Espinacas/2.jpg' },
      { text: 'Incorporar las espinacas frescas en varias adiciones, dejando que se marchiten antes de añadir más. Cocinar hasta que todas las espinacas estén tiernas.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Curry%20de%20Garbanzos%20y%20Espinacas/3.jpg' },
      { text: 'Retirar del fuego y añadir el jugo de lima. Sazonar con sal al gusto.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Curry%20de%20Garbanzos%20y%20Espinacas/3.jpg' },
      { text: 'Servir caliente acompañado de arroz basmati y decorado con cilantro fresco.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Curry%20de%20Garbanzos%20y%20Espinacas/3.jpg' },
    ],
  },
  {
    id: 'r7',
    categoryIds: ['c7'],
    name: 'Lasaña de Verduras Vegana',
    imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Lasa%C3%B1a%20de%20Verduras%20Vegana/1.jpg',
    duration: 60,
    complexity: 'Avanzada',
    images: [
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Lasa%C3%B1a%20de%20Verduras%20Vegana/1.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Lasa%C3%B1a%20de%20Verduras%20Vegana/2.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Lasa%C3%B1a%20de%20Verduras%20Vegana/3.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Lasa%C3%B1a%20de%20Verduras%20Vegana/4.jpg',
    ],
    ingredients: [
      { name: 'Láminas de lasaña (aptas para veganos)', quantity: 12, unit: 'unidades' },
      { name: 'Calabacín (zapallito)', quantity: 2, unit: 'unidades' },
      { name: 'Berenjena', quantity: 1, unit: 'unidad grande' },
      { name: 'Pimiento rojo', quantity: 1, unit: 'unidad' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad' },
      { name: 'Tomate triturado', quantity: 400, unit: 'gramos' },
      { name: 'Ajo', quantity: 2, unit: 'dientes picados' },
      { name: 'Aceite de oliva', quantity: 30, unit: 'ml' }, // 2 cucharadas = 30ml
      { name: 'Leche vegetal (almendras, soja)', quantity: 500, unit: 'ml' },
      { name: 'Harina de trigo', quantity: 3, unit: 'cucharadas' },
      { name: 'Nuez moscada', quantity: null, unit: 'al gusto' },
      { name: 'Levadura nutricional', quantity: 2, unit: 'cucharadas' },
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta', quantity: null, unit: 'al gusto' },
      { name: 'Espinacas frescas', quantity: 150, unit: 'gramos' },
    ],
    steps: [
      { text: 'Cortar el calabacín y la berenjena en rodajas finas. Saltearlos en una sartén con un poco de aceite de oliva hasta que estén tiernos. Reservar.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Lasana%20de%20Verduras%20Vegana/1.jpg' },
      { text: 'Para la salsa de tomate: en la misma sartén, rehogar la cebolla y el pimiento picados. Añadir el ajo y luego el tomate triturado. Cocinar a fuego lento por 15 minutos. Sazonar.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Lasana%20de%20Verduras%20Vegana/1.jpg' },
      { text: 'Para la bechamel vegana: en una olla, derretir 15ml de aceite de oliva, añadir la harina y cocinar por 1 minuto. Incorporar gradualmente la leche vegetal, batiendo constantemente para evitar grumos. Cocinar hasta que espese. Sazonar con sal, pimienta y nuez moscada. Añadir la levadura nutricional al final.', videoUrl: 'https://www.youtube.com/watch?v=quZv3uKSEfY' },
      { text: 'Montar la lasaña: en una fuente para horno, colocar una capa fina de salsa de tomate, luego láminas de lasaña, una capa de verduras salteadas y espinacas frescas. Cubrir con bechamel. Repetir las capas hasta terminar, finalizando con bechamel.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Lasana%20de%20Verduras%20Vegana/2.jpg' },
      { text: 'Hornear en horno precalentado a 180°C (350°F) por 25-30 minutos, o hasta que la lasaña esté dorada y burbujeante.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Lasana%20de%20Verduras%20Vegana/3.jpg' },
      { text: 'Dejar reposar unos minutos antes de cortar y servir.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Lasana%20de%20Verduras%20Vegana/3.jpg' },
    ],
  },
  {
    id: 'r8',
    categoryIds: ['c8'],
    name: 'Brownies Sin Gluten',
    imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Brownies%20Sin%20Gluten/1.jpg',
    duration: 40,
    complexity: 'Media',
    images: [
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Brownies%20Sin%20Gluten/1.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Brownies%20Sin%20Gluten/2.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Brownies%20Sin%20Gluten/3.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Brownies%20Sin%20Gluten/4.jpg',
    ],
    ingredients: [
      { name: 'Chocolate negro (70% cacao)', quantity: 150, unit: 'gramos' },
      { name: 'Manteca', quantity: 100, unit: 'gramos' },
      { name: 'Azúcar', quantity: 200, unit: 'gramos' },
      { name: 'Huevos grandes', quantity: 3, unit: 'unidades' },
      { name: 'Harina de arroz', quantity: 50, unit: 'gramos' },
      { name: 'Cacao en polvo sin azúcar', quantity: 30, unit: 'gramos' },
      { name: 'Polvo para hornear (sin gluten)', quantity: 5, unit: 'ml' }, // 1 cucharadita = 5ml
      { name: 'Sal', quantity: 2.5, unit: 'ml' }, // 0.5 cucharadita = 2.5ml
      { name: 'Esencia de vainilla', quantity: 5, unit: 'ml' }, // 1 cucharadita = 5ml
      { name: 'Nueces picadas (opcional)', quantity: 50, unit: 'gramos' },
    ],
    steps: [
      { text: 'Precalentar el horno a 175°C (350°F). Engrasar y enharinar (con harina de arroz) un molde cuadrado (aprox. 20x20 cm).', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Brownies%20Sin%20Gluten/1.jpg' },
      { text: 'Derretir el chocolate negro con la manteca a baño María o en microondas en intervalos cortos. Revolver hasta obtener una mezcla suave. Dejar entibiar.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Brownies%20Sin%20Gluten/1.jpg' },
      { text: 'En un bol grande, batir los huevos con el azúcar hasta que estén pálidos y cremosos. Añadir la esencia de vainilla.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Brownies%20Sin%20Gluten/2.jpg' },
      { text: 'Incorporar la mezcla de chocolate derretido a la mezcla de huevos y azúcar, batiendo hasta combinar.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Brownies%20Sin%20Gluten/2.jpg' },
      { text: 'En un recipiente aparte, tamizar la harina de arroz, el cacao en polvo, el polvo para hornear y la sal. Añadir esta mezcla a los ingredientes húmedos, integrando con una espátula hasta que no queden grumos. Si usas, añadir las nueces picadas.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Brownies%20Sin%20Gluten/3.jpg' },
      { text: 'Verter la mezcla en el molde preparado y extender uniformemente.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Brownies%20Sin%20Gluten/3.jpg' },
      { text: 'Hornear por 25-30 minutos, o hasta que al insertar un palillo en el centro, este salga con algunas migas húmedas (no completamente limpio, los brownies húmedos son mejores).', videoUrl: 'https://www.youtube.com/watch?v=5T61K2UCVyg' },
      { text: 'Dejar enfriar completamente en el molde antes de cortar en cuadrados y servir.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Brownies%20Sin%20Gluten/3.jpg' },
    ],
  },
  {
    id: 'r9',
    categoryIds: ['c9'],
    name: 'Wrap de Pollo y Vegetales',
    imageUrl: 'https://picsum.photos/seed/r9_main/800/600',
    duration: 20,
    complexity: 'Fácil',
    images: [
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Wrap%20de%20Pollo%20y%20Vegetales/1.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Wrap%20de%20Pollo%20y%20Vegetales/2.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Wrap%20de%20Pollo%20y%20Vegetales/3.jpg',
    ],
    ingredients: [
      { name: 'Tortillas de trigo (wraps)', quantity: 4, unit: 'unidades' },
      { name: 'Pechuga de pollo cocida y desmenuzada', quantity: 200, unit: 'gramos' },
      { name: 'Lechuga', quantity: 1, unit: 'taza picada' },
      { name: 'Tomate', quantity: 1, unit: 'unidad picado' },
      { name: 'Zanahoria rallada', quantity: 0.5, unit: 'taza' },
      { name: 'Maíz (choclo) en grano', quantity: 0.5, unit: 'taza' },
      { name: 'Mayonesa ligera', quantity: 30, unit: 'ml' }, // 2 cucharadas = 30ml
      { name: 'Mostaza dijon', quantity: 5, unit: 'ml' }, // 1 cucharadita = 5ml
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta', quantity: null, unit: 'al gusto' },
    ],
    steps: [
      { text: 'En un bol grande, mezclar el pollo desmenuzado con la mayonesa y la mostaza. Sazonar con sal y pimienta.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Wrap%20de%20Pollo%20y%20Vegetales/1.jpg' },
      { text: 'Calentar ligeramente las tortillas en una sartén o microondas para que sean más flexibles.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Wrap%20de%20Pollo%20y%20Vegetales/1.jpg' },
      { text: 'Extender cada tortilla. Colocar una capa de lechuga, luego el pollo preparado, el tomate picado, la zanahoria rallada y el maíz.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Wrap%20de%20Pollo%20y%20Vegetales/2.jpg' },
      { text: 'Doblar los lados de la tortilla hacia el centro y luego enrollar firmemente desde la parte inferior hacia arriba para formar el wrap.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Wrap%20de%20Pollo%20y%20Vegetales/3.jpg' },
      { text: 'Cortar los wraps por la mitad si se desea y servir.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Wrap%20de%20Pollo%20y%20Vegetales/3.jpg' },
    ],
  },
  {
    id: 'r10',
    categoryIds: ['c10'],
    name: 'Locro Argentino',
    imageUrl: 'https://picsum.photos/seed/r10_main/800/600',
    duration: 180, // Horas
    complexity: 'Muy Difícil',
    images: [
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Locro%20Argentino/1.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Locro%20Argentino/2.jpg',
      'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Locro%20Argentino/3.jpg',
    ],
    ingredients: [
      { name: 'Maíz blanco partido', quantity: 250, unit: 'gramos' },
      { name: 'Porotos (frijoles) blancos', quantity: 150, unit: 'gramos' },
      { name: 'Calabaza (zapallo)', quantity: 500, unit: 'gramos en cubos' },
      { name: 'Panceta salada', quantity: 200, unit: 'gramos' },
      { name: 'Chorizo colorado', quantity: 1, unit: 'unidad' },
      { name: 'Falda o osobuco', quantity: 300, unit: 'gramos' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad grande' },
      { name: 'Pimiento rojo', quantity: 1, unit: 'unidad' },
      { name: 'Ajo', quantity: 2, unit: 'dientes picados' },
      { name: 'Pimentón dulce', quantity: 15, unit: 'ml' }, // 1 cucharada = 15ml
      { name: 'Comino', quantity: 2.5, unit: 'ml' }, // 0.5 cucharadita = 2.5ml
      { name: 'Orégano', quantity: 2.5, unit: 'ml' }, // 0.5 cucharadita = 2.5ml
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Agua o caldo', quantity: 3, unit: 'litros' },
      { name: 'Aceite', quantity: 30, unit: 'ml' }, // 2 cucharadas = 30ml
      { name: 'Verdeo (para la salsa picante)', quantity: 2, unit: 'tallos' },
      { name: 'Ají molido (para la salsa picante)', quantity: 5, unit: 'ml' }, // 1 cucharadita = 5ml
      { name: 'Pimentón dulce (para la salsa picante)', quantity: 5, unit: 'ml' }, // 1 cucharadita = 5ml
    ],
    steps: [
      { text: 'Remojar el maíz blanco partido y los porotos blancos en recipientes separados con abundante agua durante al menos 12 horas o toda la noche.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Locro%20Argentino/1.jpg' },
      { text: 'Al día siguiente, escurrir el maíz y los porotos. En una olla grande con agua, cocinar el maíz por separado hasta que esté tierno (aprox. 1.5 - 2 horas). Hacer lo mismo con los porotos.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Locro%20Argentino/1.jpg' },
      { text: 'En otra olla grande o caldero, calentar el aceite y dorar la panceta cortada en cubos y las carnes. Retirar y reservar.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Locro%20Argentino/2.jpg' },
      { text: 'En la misma olla, rehogar la cebolla y el pimiento picados hasta que estén blandos. Añadir el ajo picado, pimentón dulce, comino y orégano. Cocinar por 1 minuto más.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Locro%20Argentino/2.jpg' },
      { text: 'Incorporar el maíz y los porotos cocidos, la calabaza en cubos, las carnes y la panceta reservadas. Añadir el agua o caldo hasta cubrir. Llevar a ebullición y luego reducir el fuego a mínimo. Cocinar a fuego lento por al menos 1.5 a 2 horas, revolviendo ocasionalmente, hasta que el locro espese y todos los ingredientes estén muy tiernos. Añadir más líquido si es necesario.', videoUrl: 'https://www.youtube.com/shorts/cjgPembiFU0?feature=share' },
      { text: 'Mientras el locro se cocina, preparar la salsa picante (grasita colorada): en una sartén pequeña, calentar un poco de aceite (o la grasa que soltó la panceta). Retirar del fuego y añadir el verdeo picado, ají molido y pimentón dulce. Revolver bien. Esta salsa se sirve por encima del locro al momento de comer.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Locro%20Argentino/3.jpg' },
      { text: 'Sazonar el locro con sal al gusto. Servir bien caliente con una cucharada de la salsa picante por encima.', imageUrl: 'https://storage.googleapis.com/imagenes-recetas-argentinas/Recetas/Locro%20Argentino/3.jpg' },
    ],
  },
  {
    id: 'r11',
    categoryIds: ['c3', 'c10'],
    name: 'Estofado de Carne',
    imageUrl: 'https://picsum.photos/seed/r11_main/800/600', // Placeholder
    duration: 120,
    complexity: 'Avanzada',
    images: [
      'https://picsum.photos/seed/r11_1/800/600', // Placeholder
      'https://picsum.photos/seed/r11_2/800/600', // Placeholder
      'https://picsum.photos/seed/r11_3/800/600', // Placeholder
    ],
    ingredients: [
      { name: 'Ossobuco o corte de carne', quantity: 1, unit: 'kg' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad grande' },
      { name: 'Morrón rojo', quantity: 0.5, unit: 'unidad' },
      { name: 'Ajo', quantity: 2, unit: 'dientes' },
      { name: 'Aceite', quantity: 60, unit: 'ml' }, // 4 cucharadas
      { name: 'Tomates (enteros o picados)', quantity: 2, unit: 'unidades grandes' }, // Asumo 2 grandes o una lata de triturados
      { name: 'Agua', quantity: null, unit: 'cantidad necesaria' }, // Se ajusta durante la cocción
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta', quantity: null, unit: 'al gusto' },
      { name: 'Ají molido', quantity: null, unit: 'al gusto' },
      { name: 'Orégano', quantity: null, unit: 'al gusto' },
      { name: 'Laurel', quantity: 2, unit: 'hojas' },
    ],
    steps: [
      { text: 'Picar la cebolla y el morrón en cuadraditos chicos. Picar el ajo. Salar la carne y condimentar con pimienta. Quitar exceso de grasa.' },
      { text: 'En una olla, calentar 45ml de aceite (3 cucharadas) y sellar la carne por todos lados, dando vuelta con dos tenedores. Retirar y dejar en un plato.' },
      { text: 'A la misma olla agregar 15ml más de aceite (1 cucharada) y saltear la cebolla, el morrón y el ajo. Salar a gusto y agregar ají molido, orégano, pimienta y dos hojas de laurel. Cuando la cebolla esté un poco dorada agregar la carne y volcar 200ml de agua (asumo 1 vaso). Revolver.' },
      { text: 'Agregar los tomates, enteros o picados. Agregar suficiente agua caliente para cubrir la carne hasta la mitad. Probar y rectificar la sal y la pimienta.' },
      { text: 'Tapar bien, bajar el fuego a mínimo y dejar cocinar por lo menos una hora y media, revolviendo de vez en cuando. Si se seca mucho, agregar chorritos de agua.' },
      { text: 'Cuando la carne esté bien tierna (debe deshacerse), cortar el estofado en rodajas, si se usó un corte de carne entero y servir.' },
    ],
  },
  {
    id: 'r12',
    categoryIds: ['c10'], // Podría ir en c10 o si creamos una de 'Horneados Salados'
    name: 'Sopa Paraguaya',
    imageUrl: 'https://picsum.photos/seed/r12_main/800/600', // Placeholder
    duration: 60,
    complexity: 'Media',
    images: [
      'https://picsum.photos/seed/r12_1/800/600', // Placeholder
      'https://picsum.photos/seed/r12_2/800/600', // Placeholder
      'https://picsum.photos/seed/r12_3/800/600', // Placeholder
    ],
    ingredients: [
      { name: 'Cebolla', quantity: 2, unit: 'unidades grandes' },
      { name: 'Grasa de pella o aceite', quantity: 4, unit: 'cucharadas' }, // Convertir a ml si es necesario, 60ml
      { name: 'Queso (cuartirolo o semiduro)', quantity: 250, unit: 'gramos' },
      { name: 'Queso de rallar', quantity: 50, unit: 'gramos' },
      { name: 'Huevos', quantity: 4, unit: 'unidades' },
      { name: 'Leche', quantity: 0.5, unit: 'litros' }, // Asumo 1/2 litro
      { name: 'Harina de maíz (polenta)', quantity: 250, unit: 'gramos' },
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Polvo de hornear', quantity: 1, unit: 'cucharadita' }, // Convertir a ml si es necesario, 5ml
    ],
    steps: [
      { text: 'Picar la cebolla y rehogarla en 60ml de grasa de pella o aceite hasta que esté transparente. Dejar enfriar.' },
      { text: 'En un bol grande, mezclar el queso cuartirolo cortado en cubos pequeños, el queso de rallar, los huevos y la leche.' },
      { text: 'Agregar la harina de maíz (polenta), la sal y el polvo de hornear. Mezclar bien hasta integrar.' },
      { text: 'Incorporar la cebolla rehogada fría a la mezcla.' },
      { text: 'Verter la preparación en una fuente para horno engrasada y enharinada.' },
      { text: 'Hornear en horno precalentado a 180°C (350°F) por aproximadamente 40 minutos o hasta que esté dorada y firme.' },
      { text: 'Retirar del horno, dejar entibiar y cortar en porciones para servir.' },
    ],
  },
  {
    id: 'r13',
    categoryIds: ['c5'], // Aperitivos y Snacks
    name: 'Chipá',
    imageUrl: 'https://picsum.photos/seed/r13_main/800/600', // Placeholder
    duration: 50,
    complexity: 'Media',
    images: [
      'https://picsum.photos/seed/r13_1/800/600', // Placeholder
      'https://picsum.photos/seed/r13_2/800/600', // Placeholder
      'https://picsum.photos/seed/r13_3/800/600', // Placeholder
    ],
    ingredients: [
      { name: 'Almidón de mandioca', quantity: 500, unit: 'gramos' },
      { name: 'Grasa de cerdo o manteca', quantity: 150, unit: 'gramos' },
      { name: 'Queso semiduro (tipo Mar del Plata, barra)', quantity: 200, unit: 'gramos rallado' },
      { name: 'Queso de rallar (tipo Sardo, Reggianito)', quantity: 100, unit: 'gramos' },
      { name: 'Huevos', quantity: 3, unit: 'unidades' },
      { name: 'Sal', quantity: 5, unit: 'ml' }, // 1 cucharadita = 5ml
      { name: 'Leche', quantity: null, unit: 'cantidad necesaria (aprox. 150-200ml)' }, // Ajustar a ml
    ],
    steps: [
      { text: 'Precalentar el horno a 200°C (390°F).' },
      { text: 'En un bol grande, desmenuzar la grasa de cerdo o manteca con los dedos. Incorporar el almidón de mandioca y la sal, mezclando bien hasta obtener una textura arenosa.' },
      { text: 'Agregar los huevos y los quesos rallados. Mezclar hasta integrar.' },
      { text: 'Incorporar la leche de a poco, amasando hasta obtener una masa suave y homogénea que no se pegue a las manos. La cantidad de leche puede variar.' },
      { text: 'Formar bolitas de unos 3-4 cm de diámetro con la masa.' },
      { text: 'Disponer las bolitas en una placa para horno ligeramente engrasada, dejando espacio entre ellas.' },
      { text: 'Hornear por 15-20 minutos, o hasta que estén dorados por fuera y el queso burbujee. Deben estar tiernos por dentro.' },
      { text: 'Servir los chipá calientes.' },
    ],
  },
  {
    id: 'r14',
    categoryIds: ['c3', 'c10'],
    name: 'Pastel de Mandioca',
    imageUrl: 'https://picsum.photos/seed/r14_main/800/600', // Placeholder
    duration: 90,
    complexity: 'Avanzada',
    images: [
      'https://picsum.photos/seed/r14_1/800/600', // Placeholder
      'https://picsum.photos/seed/r14_2/800/600', // Placeholder
      'https://picsum.photos/seed/r14_3/800/600', // Placeholder
    ],
    ingredients: [
      { name: 'Mandioca', quantity: 1, unit: 'kg' },
      { name: 'Leche', quantity: 150, unit: 'ml' }, // Asumo 150ml
      { name: 'Manteca', quantity: 50, unit: 'gramos' },
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Carne picada', quantity: 500, unit: 'gramos' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad grande' },
      { name: 'Morrón rojo', quantity: 1, unit: 'unidad' },
      { name: 'Ajo', quantity: 2, unit: 'dientes' },
      { name: 'Aceite', quantity: 30, unit: 'ml' }, // 2 cucharadas = 30ml
      { name: 'Pimentón dulce', quantity: 5, unit: 'ml' }, // 1 cucharadita = 5ml
      { name: 'Comino', quantity: 2.5, unit: 'ml' }, // 0.5 cucharadita = 2.5ml
      { name: 'Huevo duro', quantity: 2, unit: 'unidades' },
      { name: 'Queso rallado (para gratinar)', quantity: 50, unit: 'gramos' },
    ],
    steps: [
      { text: 'Para el puré de mandioca: pelar la mandioca y cortarla en trozos. Hervirla en abundante agua con sal hasta que esté muy tierna. Escurrir bien.' },
      { text: 'Pisar la mandioca caliente hasta obtener un puré. Agregar la leche tibia y la manteca, mezclando hasta que quede cremoso. Sazonar con sal al gusto. Reservar.' },
      { text: 'Para el relleno: picar la cebolla, el morrón y el ajo. En una sartén con aceite, rehogar la cebolla y el morrón hasta que estén tiernos. Añadir el ajo y cocinar por 1 minuto más.' },
      { text: 'Incorporar la carne picada y cocinar, desmenuzándola con una cuchara, hasta que esté dorada. Condimentar con pimentón dulce, comino, sal y pimienta.' },
      { text: 'Picar los huevos duros y agregarlos al relleno de carne. Mezclar.' },
      { text: 'Armado del pastel: en una fuente para horno, colocar la mitad del puré de mandioca y extenderlo bien.' },
      { text: 'Distribuir el relleno de carne sobre el puré de mandioca.' },
      { text: 'Cubrir con el resto del puré de mandioca y espolvorear con queso rallado.' },
      { text: 'Hornear en horno precalentado a 180°C (350°F) por 25-30 minutos, o hasta que esté dorado y burbujeante.' },
      { text: 'Dejar reposar unos minutos antes de servir.' },
    ],
  },
  {
    id: 'r15',
    categoryIds: ['c2', 'c3', 'c6', 'c10'], // Almuerzo, Cena, Vegetariano, Cocina Argentina
    name: 'Tortilla de Papas',
    imageUrl: 'https://picsum.photos/seed/r15_main/800/600', // Placeholder
    duration: 75, // Aproximadamente 1 hora y 15 minutos (preparación y cocción)
    complexity: 'Media',
    images: [
      'https://picsum.photos/seed/r15_1/800/600', // Placeholder
      'https://picsum.photos/seed/r15_2/800/600', // Placeholder
      'https://picsum.photos/seed/r15_3/800/600', // Placeholder
    ],
    ingredients: [
      { name: 'Papas', quantity: 1, unit: 'kg' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad grande' },
      { name: 'Huevos', quantity: 6, unit: 'unidades' },
      { name: 'Aceite vegetal', quantity: 250, unit: 'ml' }, // Para freír las papas y cebollas
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta', quantity: null, unit: 'al gusto' },
    ],
    steps: [
      { text: 'Pelar las papas y cortarlas en rodajas finas (aproximadamente 4mm) o en cubos pequeños. Es importante que sean de tamaño uniforme para una cocción pareja.' },
      { text: 'Picar finamente la cebolla en juliana o cuadraditos pequeños.' },
      { text: 'En una sartén grande y profunda, calentar el aceite vegetal (aproximadamente 200 ml, se usa más al inicio y se escurre). Cuando esté caliente, agregar las papas y cocinar a fuego medio-bajo. El objetivo es confitarlas, no freírlas hasta que doren de inmediato. Deben quedar blandas y cocidas, pero no doradas al principio.' },
      { text: 'Cuando las papas comiencen a ablandarse (después de unos 15-20 minutos), agregar la cebolla picada a la sartén. Cocinar junto con las papas hasta que la cebolla esté transparente y las papas estén bien tiernas. Revolver ocasionalmente para asegurar una cocción uniforme.' },
      { text: 'Una vez que las papas y cebollas estén listas, retirar del fuego y escurrir el exceso de aceite. Se puede usar un colador o colocar sobre papel absorbente. Dejar enfriar un poco (unos 10-15 minutos).' },
      { text: 'Mientras tanto, en un bol grande, batir los huevos con la sal y la pimienta hasta que estén bien integrados.' },
      { text: 'Incorporar las papas y cebollas escurridas y tibias a la mezcla de huevos. Mezclar bien, asegurándose de que todas las papas queden cubiertas por el huevo.' },
      { text: 'En la misma sartén (limpia si es necesario, o con un chorrito mínimo del aceite original), calentar a fuego medio. Verter la mezcla de papas y huevo en la sartén. Extender uniformemente.' },
      { text: 'Cocinar a fuego bajo durante unos 10-15 minutos, o hasta que los bordes comiencen a cuajarse y la base esté dorada. Para el punto deseado (más o menos jugosa), el tiempo puede variar.' },
      { text: 'Con la ayuda de un plato más grande que la sartén, cubrir la sartén y dar vuelta la tortilla con un movimiento rápido y seguro. Deslizar la tortilla nuevamente a la sartén para cocinar el otro lado.' },
      { text: 'Cocinar por otros 5-10 minutos, o hasta que la tortilla esté dorada por ambos lados y tenga el punto de cocción deseado en el centro. Mover la sartén suavemente para evitar que se pegue y emparejar los bordes con una espátula.' },
      { text: 'Una vez lista, deslizar la tortilla a un plato y servir caliente o a temperatura ambiente. Se puede acompañar con una ensalada.' },
    ],
  },
  {
    id: 'r16',
    categoryIds: ['c2', 'c3', 'c10'], // Almuerzo, Cena, Cocina Argentina
    name: 'Pastel de Papas',
    imageUrl: 'https://picsum.photos/seed/r16_main/800/600', // Placeholder
    duration: 80, // Aproximadamente 1 hora y 20 minutos
    complexity: 'Media',
    images: [
      'https://picsum.photos/seed/r16_1/800/600',
      'https://picsum.photos/seed/r16_2/800/600',
      'https://picsum.photos/seed/r16_3/800/600',
    ],
    ingredients: [
      { name: 'Papas', quantity: 1, unit: 'kg' },
      { name: 'Carne picada', quantity: 500, unit: 'gr' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad grande' },
      { name: 'Pimiento morrón', quantity: 0.5, unit: 'unidad' },
      { name: 'Ajo', quantity: 2, unit: 'dientes' },
      { name: 'Puré de tomates', quantity: 125, unit: 'ml' },
      { name: 'Caldo de carne o verdura', quantity: 250, unit: 'ml' },
      { name: 'Manteca', quantity: 50, unit: 'gr' },
      { name: 'Leche', quantity: 50, unit: 'ml' },
      { name: 'Queso rallado', quantity: 100, unit: 'gr' },
      { name: 'Huevo (para pintar)', quantity: 1, unit: 'unidad' },
      { name: 'Aceite', quantity: null, unit: 'c/n' },
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta', quantity: null, unit: 'al gusto' },
      { name: 'Nuez moscada', quantity: null, unit: 'al gusto' },
      { name: 'Comino molido', quantity: 0.5, unit: 'cucharadita' },
      { name: 'Pimentón dulce', quantity: 1, unit: 'cucharada' },
    ],
    steps: [
      { text: 'Pelar las papas, cortarlas en trozos grandes y hervirlas en agua con sal hasta que estén bien cocidas. Escurrir y pisarlas hasta obtener un puré. Agregar la manteca, leche, sal, pimienta y nuez moscada. Mezclar bien y reservar.' },
      { text: 'Picar la cebolla, el pimiento morrón y el ajo finamente. En una sartén grande con un poco de aceite, sofreír las verduras hasta que estén transparentes.' },
      { text: 'Agregar la carne picada a la sartén y cocinar hasta que esté dorada y suelte su jugo. Condimentar con sal, pimienta, comino y pimentón dulce.' },
      { text: 'Incorporar el puré de tomates y el caldo de carne. Cocinar a fuego lento durante unos 15 minutos, revolviendo ocasionalmente, hasta que el líquido se reduzca y el relleno espese.' },
      { text: 'Precalentar el horno a 180°C. En una fuente para horno, colocar una capa de puré de papas en el fondo, extendiéndola de manera uniforme.' },
      { text: 'Luego, agregar una capa del relleno de carne. Cubrir con otra capa de puré de papas. Espolvorear generosamente con queso rallado.' },
      { text: 'Batir el huevo restante y pintar la superficie del pastel para un mejor dorado (opcional, pero recomendado).' },
      { text: 'Llevar al horno precalentado durante 30-40 minutos, o hasta que la superficie esté dorada y burbujeante. Retirar del horno y dejar reposar unos minutos antes de servir.' },
    ],
  },
  {
    id: 'r17',
    categoryIds: ['c2', 'c3', 'c6'], // Almuerzo, Cena, Vegetariano
    name: 'Risotto de Hongos',
    imageUrl: 'https://picsum.photos/seed/r17_main/800/600',
    duration: 45, // Aproximadamente 45 minutos
    complexity: 'Media',
    images: [
      'https://picsum.photos/seed/r17_1/800/600',
      'https://picsum.photos/seed/r17_2/800/600',
    ],
    ingredients: [
      { name: 'Arroz Arborio o Carnaroli', quantity: 300, unit: 'gr' },
      { name: 'Hongos variados (champiñones, portobello, gírgolas)', quantity: 250, unit: 'gr' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad mediana' },
      { name: 'Ajo', quantity: 2, unit: 'dientes' },
      { name: 'Vino blanco seco', quantity: 200, unit: 'ml' },
      { name: 'Caldo de verduras caliente', quantity: 1, unit: 'litro' },
      { name: 'Manteca fría', quantity: 80, unit: 'gr' },
      { name: 'Queso parmesano rallado', quantity: 80, unit: 'gr' },
      { name: 'Aceite de oliva', quantity: null, unit: 'c/n' },
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta', quantity: null, unit: 'al gusto' },
      { name: 'Perejil fresco picado', quantity: null, unit: 'para decorar' },
    ],
    steps: [
      { text: 'Picar finamente la cebolla y los dientes de ajo. Limpiar los hongos y filetearlos o cortarlos en trozos.' },
      { text: 'En una olla o sartén profunda a fuego medio, calentar un poco de aceite de oliva y un trozo de manteca. Sofreír la cebolla hasta que esté transparente. Añadir el ajo y cocinar por un minuto más sin que se dore.' },
      { text: 'Incorporar los hongos fileteados y saltearlos hasta que suelten su líquido y estén ligeramente dorados. Salpimentar.' },
      { text: 'Agregar el arroz a la olla y remover constantemente por 2 minutos para que los granos se "nacararen" (se vuelvan translúcidos).' },
      { text: 'Verter el vino blanco y cocinar, removiendo, hasta que el alcohol se evapore casi por completo.' },
      { text: 'Comenzar a añadir el caldo de verduras caliente, de a un cucharón a la vez, revolviendo constantemente y esperando a que el arroz absorba el líquido antes de agregar más. Repetir este proceso durante unos 18-20 minutos, o hasta que el arroz esté al dente y tenga una textura cremosa.' },
      { text: 'Retirar del fuego y añadir la manteca fría y el queso parmesano rallado. Mezclar vigorosamente (mantecar) hasta que la manteca se derrita y el queso se integre, logrando una textura bien cremosa.' },
      { text: 'Ajustar la sal y la pimienta al gusto. Servir inmediatamente, decorado con perejil fresco picado si lo desea.' },
    ],
  },
  {
    id: 'r18',
    categoryIds: ['c2', 'c3', 'c6', 'c9'], // Almuerzo, Cena, Vegetariano, Rápido y Fácil
    name: 'Sopa Crema de Zapallo',
    imageUrl: 'https://picsum.photos/seed/r18_main/800/600',
    duration: 45, // Aproximadamente 45 minutos
    complexity: 'Baja',
    images: [
      'https://picsum.photos/seed/r18_1/800/600',
      'https://picsum.photos/seed/r18_2/800/600',
    ],
    ingredients: [
      { name: 'Zapallo (cabutia o anco)', quantity: 800, unit: 'gr' },
      { name: 'Cebolla', quantity: 1, unit: 'unidad mediana' },
      { name: 'Zanahoria', quantity: 1, unit: 'unidad' },
      { name: 'Puerro', quantity: 1, unit: 'unidad (opcional)' },
      { name: 'Papa', quantity: 1, unit: 'unidad pequeña (opcional, para cremosidad extra)' },
      { name: 'Caldo de verduras', quantity: 750, unit: 'ml' },
      { name: 'Crema de leche (opcional)', quantity: 200, unit: 'ml' },
      { name: 'Aceite de oliva o manteca', quantity: null, unit: 'c/n' },
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta', quantity: null, unit: 'al gusto' },
      { name: 'Nuez moscada', quantity: null, unit: 'al gusto (opcional)' },
    ],
    steps: [
      { text: 'Pelar y cortar el zapallo, la cebolla, la zanahoria (y el puerro/papa si se usan) en cubos medianos. Para el zapallo, retire las semillas y las hebras.' },
      { text: 'En una olla grande a fuego medio, calentar un poco de aceite de oliva o manteca. Rehogar la cebolla y el puerro (si se usa) hasta que estén transparentes.' },
      { text: 'Añadir el zapallo, la zanahoria y la papa (si se usa). Saltear por unos minutos.' },
      { text: 'Cubrir las verduras con el caldo de verduras. Llevar a ebullición, luego bajar el fuego, tapar y cocinar a fuego lento durante unos 25-30 minutos, o hasta que las verduras estén muy tiernas.' },
      { text: 'Retirar del fuego. Con una licuadora de mano o una licuadora de vaso, triturar las verduras con el caldo hasta obtener una crema homogénea y sin grumos.' },
      { text: 'Volver la sopa a la olla. Si se desea una sopa más cremosa, agregar la crema de leche. Calentar a fuego bajo sin dejar que hierva. Salpimentar a gusto y añadir una pizca de nuez moscada si se desea.' },
      { text: 'Servir caliente, se puede acompañar con croutones de pan o un hilo de aceite de oliva.' },
    ],
  },
  {
    id: 'r19',
    categoryIds: ['c6', 'c7', 'c9'], // Vegetariano, Vegano, Rápido y Fácil
    name: 'Panaché de Verduras',
    imageUrl: 'https://picsum.photos/seed/r19_main/800/600',
    duration: 35, // Aproximadamente 35 minutos
    complexity: 'Baja',
    images: [
      'https://picsum.photos/seed/r19_1/800/600',
      'https://picsum.photos/seed/r19_2/800/600',
    ],
    ingredients: [
      { name: 'Papas pequeñas', quantity: 4, unit: 'unidades' },
      { name: 'Zanahorias', quantity: 2, unit: 'unidades' },
      { name: 'Brócoli', quantity: 0.5, unit: 'unidad (media cabeza)' },
      { name: 'Coliflor', quantity: 0.5, unit: 'unidad (media cabeza)' },
      { name: 'Chauchas (judías verdes)', quantity: 200, unit: 'gr' },
      { name: 'Espárragos verdes', quantity: 1, unit: 'manojo' },
      { name: 'Guisantes (arvejas) congelados', quantity: 100, unit: 'gr' },
      { name: 'Ajo', quantity: 2, unit: 'dientes' },
      { name: 'Aceite de oliva virgen extra', quantity: null, unit: 'c/n' },
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta', quantity: null, unit: 'al gusto' },
      { name: 'Vinagre de jerez (opcional)', quantity: 15, unit: 'ml' },
      { name: 'Hierbas frescas (perejil, ciboulette)', quantity: null, unit: 'para decorar' },
    ],
    steps: [
      { text: 'Lavar y limpiar todas las verduras. Pelar las papas y zanahorias. Cortar las papas en cuartos o rodajas gruesas, las zanahorias en rodajas o bastones. Separar el brócoli y la coliflor en floretes. Cortar los extremos de las chauchas. Cortar los espárragos en tercios si son muy largos.' },
      { text: 'En una olla grande con agua hirviendo y sal, cocinar las verduras en tandas según su dureza. Primero papas y zanahorias (unos 10-15 minutos). Luego agregar brócoli, coliflor, chauchas y espárragos (unos 5-8 minutos más). Finalmente, los guisantes (los últimos 2-3 minutos). El objetivo es que queden tiernas pero firmes (al dente).' },
      { text: 'Escurrir bien las verduras cocidas. Opcionalmente, pasarlas por agua helada para detener la cocción y mantener su color vibrante.' },
      { text: 'Picar finamente los dientes de ajo. En una sartén grande, calentar un buen chorro de aceite de oliva. Agregar el ajo picado y saltear hasta que esté fragante (no quemar).' },
      { text: 'Incorporar todas las verduras cocidas a la sartén. Saltearlas a fuego medio-alto por unos minutos para que se doren ligeramente y se impregnen del sabor del ajo y el aceite. Salpimentar al gusto.' },
      { text: 'Si lo desea, rociar con un poco de vinagre de jerez para darle un toque especial. Servir el panaché de verduras caliente, espolvoreado con hierbas frescas picadas.' },
    ],
  },
  {
    id: 'r20',
    categoryIds: ['c2', 'c3', 'c9'], // Almuerzo, Cena, Rápido y Fácil
    name: 'Pollo con Mostaza y Miel',
    imageUrl: 'https://picsum.photos/seed/r20_main/800/600',
    duration: 35, // Aproximadamente 35 minutos
    complexity: 'Baja',
    images: [
      'https://picsum.photos/seed/r20_1/800/600',
      'https://picsum.photos/seed/r20_2/800/600',
    ],
    ingredients: [
      { name: 'Pechugas o muslos de pollo sin hueso', quantity: 4, unit: 'unidades' },
      { name: 'Miel', quantity: 3, unit: 'cucharadas' },
      { name: 'Mostaza Dijon (o regular)', quantity: 3, unit: 'cucharadas' },
      { name: 'Ajo', quantity: 2, unit: 'dientes picados' },
      { name: 'Aceite de oliva o manteca', quantity: null, unit: 'c/n' },
      { name: 'Caldo de pollo o agua', quantity: 100, unit: 'ml' },
      { name: 'Crema de leche (opcional)', quantity: 100, unit: 'ml' },
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta', quantity: null, unit: 'al gusto' },
      { name: 'Perejil fresco picado', quantity: null, unit: 'para decorar' },
    ],
    steps: [
      { text: 'Limpiar las piezas de pollo y sazonarlas con sal y pimienta.' },
      { text: 'En una sartén grande, calentar el aceite de oliva o manteca a fuego medio-alto. Dorar las piezas de pollo por ambos lados hasta que estén bien selladas y ligeramente doradas (aproximadamente 4-5 minutos por lado). Retirar el pollo de la sartén y reservarlo.' },
      { text: 'En la misma sartén, bajar el fuego a medio-bajo. Agregar el ajo picado y sofreírlo por 1 minuto hasta que esté fragante.' },
      { text: 'Incorporar la miel y la mostaza, mezclando bien con una cuchara de madera. Añadir el caldo de pollo (o agua) y revolver hasta obtener una salsa homogénea. Si se desea una salsa más cremosa, agregar la crema de leche en este punto y mezclar.' },
      { text: 'Regresar el pollo a la sartén, bañándolo con la salsa. Cocinar a fuego medio por 10-15 minutos más, o hasta que el pollo esté completamente cocido y la salsa haya espesado ligeramente, volteando las piezas de vez en cuando para que se impregnen bien.' },
      { text: 'Ajustar la sal y la pimienta al gusto. Servir caliente, decorado con perejil fresco picado si lo desea. Acompañar con arroz, puré o papas al horno.' },
    ],
  },
  {
    id: 'r21',
    categoryIds: ['c2', 'c3', 'c5', 'c10'], // Almuerzo, Cena, Aperitivos, Cocina Argentina
    name: 'Empanadas de Carne (Horneadas)',
    imageUrl: 'https://picsum.photos/seed/r21_main/800/600',
    duration: 90, // Aproximadamente 1 hora y 30 minutos
    complexity: 'Media',
    images: [
      'https://picsum.photos/seed/r21_1/800/600',
      'https://picsum.photos/seed/r21_2/800/600',
      'https://picsum.photos/seed/r21_3/800/600',
    ],
    ingredients: [
      { name: 'Tapas para empanadas (para horno)', quantity: 24, unit: 'unidades' },
      { name: 'Carne picada o nalga cortada a cuchillo', quantity: 500, unit: 'gr' },
      { name: 'Cebolla', quantity: 2, unit: 'unidades medianas' },
      { name: 'Cebolla de verdeo', quantity: 2, unit: 'tallos' },
      { name: 'Morrón rojo', quantity: 0.5, unit: 'unidad' },
      { name: 'Huevos duros', quantity: 3, unit: 'unidades' },
      { name: 'Aceitunas verdes o negras', quantity: 100, unit: 'gr' },
      { name: 'Grasa vacuna o aceite vegetal', quantity: null, unit: 'c/n' },
      { name: 'Comino molido', quantity: 1, unit: 'cucharadita' },
      { name: 'Pimentón dulce', quantity: 2, unit: 'cucharadas' },
      { name: 'Ají molido (opcional)', quantity: 0.5, unit: 'cucharadita' },
      { name: 'Sal', quantity: null, unit: 'al gusto' },
      { name: 'Pimienta', quantity: null, unit: 'al gusto' },
      { name: 'Huevo (para pintar)', quantity: 1, unit: 'unidad' },
    ],
    steps: [
      { text: 'Para el relleno (el "recado"): picar la cebolla y el morrón finamente. Calentar un poco de grasa vacuna o aceite en una sartén grande a fuego medio. Rehogar la cebolla y el morrón hasta que estén transparentes.' },
      { text: 'Añadir la carne picada (o cortada a cuchillo) a la sartén. Cocinar, desmenuzando con una cuchara de madera, hasta que esté dorada. Escurrir el exceso de grasa si es mucho.' },
      { text: 'Retirar del fuego y condimentar con comino, pimentón dulce, ají molido (si se usa), sal y pimienta. Mezclar bien. Dejar enfriar el recado por completo antes de usarlo. Esto es clave para que las empanadas no se rompan y el sabor se asiente. Si es posible, preparar el día anterior y refrigerar.' },
      { text: 'Una vez el recado esté frío, agregar la cebolla de verdeo picada finamente (la parte verde y un poco de la blanca), los huevos duros picados y las aceitunas picadas. Mezclar suavemente.' },
      { text: 'Precalentar el horno a 180°C (horno medio-alto). Preparar una bandeja para horno engrasada o con papel de horno.' },
      { text: 'Distribuir las tapas de empanadas sobre una superficie limpia. Colocar una porción de relleno en el centro de cada tapa, sin excederse para poder cerrarlas bien.' },
      { text: 'Humeder los bordes de la tapa con un poco de agua. Doblar la tapa por la mitad formando un semicírculo y presionar los bordes para sellar. Hacer el "repulgue" (el doblez característico) o simplemente presionar con un tenedor para asegurar el cierre.' },
      { text: 'Colocar las empanadas en la bandeja preparada. Batir un huevo y pintar la superficie de cada empanada para que queden doradas al hornear.' },
      { text: 'Hornear durante 15-20 minutos, o hasta que estén doradas y cocidas. El tiempo puede variar según el horno.' },
      { text: 'Retirar del horno y servir calientes. Son ideales para acompañar con una salsa picante (chimichurri) o solas.' },
    ],
  },
];

export default RECIPES;