const express = require('express');
const router = express.Router();
const pacientesH = require('../helpers/pacientesHelper');
const citasH = require('../helpers/citasHelper');

// POST /pacientes
router.post('/', (req, res) => {
  const { nombre, edad, telefono, email, fechaRegistro } = req.body;

  if (!nombre || !edad || !telefono || !email) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios.' });
  }
  if (Number(edad) <= 0) {
    return res.status(400).json({ success: false, message: 'La edad debe ser mayor a 0.' });
  }
  if (pacientesH.existeEmail(email)) {
    return res.status(400).json({ success: false, message: 'El email ya está registrado.' });
  }

  const nuevo = pacientesH.crear({ nombre, edad: Number(edad), telefono, email, fechaRegistro });
  return res.status(201).json({ success: true, message: 'Paciente registrado correctamente.', data: nuevo });
});

// GET /pacientes
router.get('/', (req, res) => {
  const all = pacientesH.obtenerTodos();
  res.json({ success: true, data: all });
});

// GET /pacientes/:id
router.get('/:id', (req, res) => {
  const p = pacientesH.obtenerPorId(req.params.id);
  if (!p) return res.status(404).json({ success: false, message: 'Paciente no encontrado.' });
  res.json({ success: true, data: p });
});

// PUT /pacientes/:id
router.put('/:id', (req, res) => {
  const existing = pacientesH.obtenerPorId(req.params.id);
  if (!existing) return res.status(404).json({ success: false, message: 'Paciente no encontrado.' });

  // Si se actualiza email, verificar unicidad
  if (req.body.email && req.body.email !== existing.email) {
    if (pacientesH.existeEmail(req.body.email)) {
      return res.status(400).json({ success: false, message: 'El email ya está registrado en otro paciente.' });
    }
  }

  const actualizado = pacientesH.actualizar(req.params.id, req.body);
  res.json({ success: true, message: 'Paciente actualizado correctamente.', data: actualizado });
});

// GET /pacientes/:id/historial
router.get('/:id/historial', (req, res) => {
  const paciente = pacientesH.obtenerPorId(req.params.id);
  if (!paciente) return res.status(404).json({ success: false, message: 'Paciente no encontrado.' });

  const historial = citasH.obtenerPorPaciente(req.params.id);
  res.json({ success: true, data: historial });
});

module.exports = router;
