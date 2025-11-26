const express = require('express');
const app = express();
app.use(express.json());

app.use('/pacientes', require('./routes/pacientes'));
app.use('/doctores', require('./routes/doctores'));
app.use('/citas', require('./routes/citas'));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'API Clínica funcionando' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Error interno del servidor' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
