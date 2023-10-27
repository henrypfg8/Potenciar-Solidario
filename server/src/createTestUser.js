const {User} = require('./models/user'); // Importa el modelo User y otras dependencias

async function createTestUser() {
  try {
    // Datos del usuario de prueba
    const testUser = {
      name: 'Usuario',
      lastname: 'Prueba',
      description: 'Este es un usuario de prueba.',
      DNI: 12345678,
      birth_date: "2020-3-3",
      phone: 1234567890,
      profile_picture: 'ruta/de/imagen.jpg',
      habitual_location_of_residence: 'Residencia habitual',
      geographical_area_residence: 'Área geográfica de residencia',
      admin: false,
    };

    // Crea el usuario de prueba en la base de datos
    const newUser = await User.create(testUser);

    console.log('Usuario de prueba creado:', newUser.toJSON());
  } catch (error) {
    console.error('Error al crear el usuario de prueba:', error);
  }
}

// Llama a la función para crear el usuario de prueba
createTestUser();
