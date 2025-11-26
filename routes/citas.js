const express = require('express');
const router = express.Router();
const citasH = require('../helpers/citasHelper');
const pacientesH = require('../helpers/pacientesHelper');
const doctoresH = require('../helpers/doctoresHelper');

const obtenerDiaSemana = (fecha) => {
  const dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  return dias[new Date(fecha).getDay()];
};

// POST /citas - agendar
router.post('/', (req, res) => {
  const { pacienteId, doctorId, fecha, hora, motivo } = req.body;
  if (!pacienteId || !doctorId || !fecha || !hora || !motivo) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios.' });
  }

  const paciente = pacientesH.obtenerPorId(pacienteId);
  if (!paciente) return res.status(404).json({ success: false, message: 'Paciente no existe.' });

  const doctor = doctoresH.obtenerPorId(doctorId);
  if (!doctor) return res.status(404).json({ success: false, message: 'Doctor no existe.' });

  // Fecha futura (estrictamente mayor que hoy)
  const hoy = new Date();
  const fechaObj = new Date(`${fecha}T00:00:00`);
  const hoy00 = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  if (fechaObj <= hoy00) {
    return res.status(400).json({ success: false, message: 'La fecha debe ser futura.' });
  }

  // Día disponible
  const dia = obtenerDiaSemana(fecha);
  if (!doctor.diasDisponibles.includes(dia)) {
    return res.status(400).json({ success: false, message: 'El doctor no trabaja ese día.' });
  }

  // Hora dentro de horario [inicio, fin)
  if (hora < doctor.horarioInicio || hora >= doctor.horarioFin) {
    return res.status(400).json({ success: false, message: 'Hora fuera del horario del doctor.' });
  }

  // Conflicto de cita
  if (citasH.existeConflicto(doctorId, fecha, hora)) {
    return res.status(400).json({ success: false, message: 'El doctor ya tiene una cita en ese horario.' });
  }

  const nueva = citasH.crear({ pacienteId, doctorId, fecha, hora, motivo });
  return res.status(201).json({ success: true, message: 'Cita agendada correctamente.', data: nueva });
});

// GET /citas  -> filtros ?fecha=YYYY-MM-DD&estado=programada
router.get('/', (req, res) => {
  const { fecha, estado } = req.query;
  let lista = citasH.obtenerTodas();
  if (fecha) lista = lista.filter(c => c.fecha === fecha);
  if (estado) lista = lista.filter(c => c.estado === estado);
  res.json({ success: true, data: lista });
});

// GET /citas/:id
router.get('/:id', (req, res) => {
  const c = citasH.obtenerPorId(req.params.id);
  if (!c) return res.status(404).json({ success: false, message: 'Cita no encontrada.' });
  res.json({ success: true, data: c });
});

// PUT /citas/:id/cancelar
router.put('/:id/cancelar', (req, res) => {
  const c = citasH.obtenerPorId(req.params.id);
  if (!c) return res.status(404).json({ success: false, message: 'Cita no encontrada.' });
  if (c.estado !== 'programada') {
    return res.status(400).json({ success: false, message: 'Solo se pueden cancelar citas en estado "programada".' });
  }
  const actualizado = citasH.actualizar(req.params.id, { estado: 'cancelada' });
  res.json({ success: true, message: 'Cita cancelada correctamente.', data: actualizado });
});

// GET /citas/doctor/:doctorId
router.get('/doctor/:doctorId', (req, res) => {
  const lista = citasH.obtenerPorDoctor(req.params.doctorId);
  res.json({ success: true, data: lista });
});

// GET /citas/proximas -> próximas 24 horas
router.get('/proximas/24h', (req, res) => {
  const prox = citasH.proximas24Horas();
  res.json({ success: true, data: prox });
});

// Estadísticas
// GET /citas/estadisticas/doctores -> doctor con más citas (programadas + otras)
router.get('/estadisticas/doctores', (req, res) => {
  const all = citasH.obtenerTodas();
  const contador = {};
  all.forEach(c => {
    contador[c.doctorId] = (contador[c.doctorId] || 0) + 1;
  });
  const items = Object.entries(contador).sort((a,b) => b[1]-a[1]);
  if (items.length === 0) return res.json({ success: true, data: null, message: 'No hay citas.' });
  const topId = items[0][0];
  const doctor = doctoresH.obtenerPorId(topId);
  res.json({ success: true, data: { doctor, totalCitas: items[0][1] } });
});

// GET /citas/estadisticas/especialidades -> especialidad más solicitada
router.get('/estadisticas/especialidades', (req, res) => {
  const all = citasH.obtenerTodas();
  const contador = {};
  all.forEach(c => {
    const doc = doctoresH.obtenerPorId(c.doctorId);
    const esp = doc ? doc.especialidad : 'Desconocida';
    contador[esp] = (contador[esp] || 0) + 1;
  });
  const items = Object.entries(contador).sort((a,b) => b[1]-a[1]);
  if (items.length === 0) return res.json({ success: true, data: null, message: 'No hay citas.' });
  res.json({ success: true, data: { especialidad: items[0][0], totalCitas: items[0][1] } });
});

module.exports = router;
