const express = require('express');
const app = express();
app.use(express.json());

app.use('/pacientes', require('./routes/pacientesRoutes'));
app.use('/doctores', require('./routes/doctoresRoutes'));
app.use('/citas', require('./routes/citasRoutes'));

app.get('/', (req, res) => {
    res.send("API de Gestión de Citas de Clínica – funcionando");
});

// Error 404
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        message: "Ruta no encontrada" 
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
