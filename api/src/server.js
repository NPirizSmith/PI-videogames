const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./models'); // Importa la instancia de Sequelize
const router = require("../src/routes")

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

server.use("/", router)

app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
});