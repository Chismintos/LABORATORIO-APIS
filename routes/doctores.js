const express = require('express');
const router = express.Router();
const doctoresH = require('../helpers/doctoresHelper');

// POST /doctores
router.post('/', (req, res) => {
  const { nombre, especialidad, horarioInicio, horarioFin, diasDisponibles } = req.body;

  if (!nombre || !especialidad || !horarioInicio || !horarioFin || !diasDisponibles) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios.' });
  }
  if (!(Array.isArray(diasDisponibles) && diasDisponibles.length > 0)) {
    return res.status(400).json({ success: false, message: 'diasDisponibles no puede estar vacío.' });
  }
  // Validar horario (HH:MM) - simple comparación de strings funciona con formato 24h
  if (horarioInicio >= horarioFin) {
    return res.status(400).json({ success: false, message: 'Horario inválido: inicio debe ser menor que fin.' });
  }
  if (doctoresH.existeNombreEspecialidad(nombre, especialidad)) {
    return res.status(400).json({ success: false, message: 'Ya existe un doctor con ese nombre y especialidad.' });
  }

  const nuevo = doctoresH.crear({ nombre, especialidad, horarioInicio, horarioFin, diasDisponibles });
  res.status(201).json({ success: true, message: 'Doctor registrado correctamente.', data: nuevo });
});

// GET /doctores
router.get('/', (req, res) => {
  const all = doctoresH.obtenerTodos();
  res.json({ success: true, data: all });
});

// GET /doctores/:id
router.get('/:id', (req, res) => {
  const d = doctoresH.obtenerPorId(req.params.id);
  if (!d) return res.status(404).json({ success: false, message: 'Doctor no encontrado.' });
  res.json({ success: true, data: d });
});

// GET /doctores/especialidad/:especialidad
router.get('/especialidad/:especialidad', (req, res) => {
  const all = doctoresH.obtenerTodos();
  const encontrados = all.filter(d => d.especialidad.toLowerCase() === req.params.especialidad.toLowerCase());
  res.json({ success: true, data: encontrados });
});

// GET /doctores/disponibles?fecha=YYYY-MM-DD&hora=HH:MM
// Retorna doctores que trabajan ese día y hora y que no tienen cita programada en ese slot
const citasH = require('../helpers/citasHelper');

// PUT /doctores/:id  -> actualizar doctor completo
// PUT /doctores/:id  -> actualizar doctor
router.put('/:id', (req, res) => {
  const { nombre, especialidad, horarioInicio, horarioFin, diasDisponibles } = req.body;

  const doctor = doctoresH.obtenerPorId(req.params.id);
  if (!doctor)
    return res.status(404).json({ success: false, message: 'Doctor no encontrado.' });

  const actualizado = doctoresH.actualizar(req.params.id, {
    nombre,
    especialidad,
    horarioInicio,
    horarioFin,
    diasDisponibles
  });

  res.json({ success: true, message: 'Doctor actualizado correctamente.', data: actualizado });
});



function obtenerDiaSemana(fecha) {
  const dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  return dias[new Date(fecha).getDay()];
}

router.get('/disponibles', (req, res) => {
  const { fecha, hora } = req.query;
  if (!fecha || !hora) {
    return res.status(400).json({ success: false, message: 'Debe enviar fecha y hora como query params.' });
  }

  const all = doctoresH.obtenerTodos();
  const disponibles = all.filter(d => {
    const dia = obtenerDiaSemana(fecha);
    if (!d.diasDisponibles.includes(dia)) return false;
    if (hora < d.horarioInicio || hora >= d.horarioFin) return false;
    // verificar conflicto de citas
    if (citasH.existeConflicto(d.id, fecha, hora)) return false;
    return true;
  });

  res.json({ success: true, data: disponibles });
});



module.exports = router;
