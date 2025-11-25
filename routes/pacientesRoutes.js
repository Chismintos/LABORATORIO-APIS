const express = require('express');
const router = express.Router();
const pacientes = require('../helpers/pacientesHelper');
const citas = require('../helpers/citasHelper');

// Generar ID automático Pxxx
const generarId = () => {
    const list = pacientes.obtenerTodos();
    return "P" + String(list.length + 1).padStart(3, '0');
};

// POST /pacientes
router.post('/', (req, res) => {
    const { nombre, edad, telefono, email } = req.body;

    if (!nombre || !edad || !telefono || !email)
        return res.status(400).json({ error: "Datos incompletos" });

    if (edad <= 0)
        return res.status(400).json({ error: "Edad inválida" });

    if (pacientes.obtenerTodos().some(p => p.email === email))
        return res.status(400).json({ error: "El email ya está registrado" });

    const nuevo = {
        id: generarId(),
        nombre,
        edad,
        telefono,
        email,
        fechaRegistro: new Date().toISOString().split('T')[0]
    };

    pacientes.crear(nuevo);
    res.status(201).json(nuevo);
});

// GET /pacientes
router.get('/', (req, res) => {
    res.json(pacientes.obtenerTodos());
});

// GET /pacientes/:id
router.get('/:id', (req, res) => {
    const p = pacientes.obtenerPorId(req.params.id);
    if (!p) return res.status(404).json({ error: "Paciente no encontrado" });
    res.json(p);
});

// PUT /pacientes/:id
router.put('/:id', (req, res) => {
    const actualizado = pacientes.actualizar(req.params.id, req.body);
    if (!actualizado)
        return res.status(404).json({ error: "Paciente no encontrado" });

    res.json(actualizado);
});

// GET /pacientes/:id/historial
router.get('/:id/historial', (req, res) => {
    const historial = citas.obtenerTodas().filter(c => c.pacienteId === req.params.id);
    res.json(historial);
});

module.exports = router;
