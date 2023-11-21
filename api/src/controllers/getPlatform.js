const Platform = require('../models/Platform'); // Importa tu modelo de plataforma aquí

const savePlatformsFromString = async (platformsString) => {
  try {
    // Divide el string en un array de plataformas
    const platformsArray = platformsString.split(',').map((platform) => platform.trim());

    for (const platform of platformsArray) {
      const existingPlatform = await Platform.findOne({ where: { name: platform } });

      if (!existingPlatform) {
        await Platform.create({ name: platform });
        console.log(`Plataforma "${platform}" guardada en la base de datos.`);
      } else {
        console.log(`La plataforma "${platform}" ya existe en la base de datos.`);
      }
    }
  } catch (error) {
    console.error('Error al guardar las plataformas en la base de datos:', error);
    throw new Error('Error al guardar las plataformas en la base de datos');
  }
};

module.exports = {
  savePlatformsFromString,
};
