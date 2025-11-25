const express = require('express');
const router = express.Router();

const citas = require('../helpers/citasHelper');
const pacientes = require('../helpers/pacientesHelper');
const doctores = require('../helpers/doctoresHelper');

// Generar código Cxxx
const generarId = () => {
    const list = citas.obtenerTodas();
    return "C" + String(list.length + 1).padStart(3, '0');
};

// Obtener nombre del día
const obtenerDiaSemana = (fecha) => {
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return dias[new Date(fecha).getDay()];
};

// POST /citas – Agendar
router.post('/', (req, res) => {
    const { pacienteId, doctorId, fecha, hora, motivo } = req.body;

    if (!pacienteId || !doctorId || !fecha || !hora || !motivo)
        return res.status(400).json({ error: "Datos incompletos" });

    const paciente = pacientes.obtenerPorId(pacienteId);
    const doctor = doctores.obtenerPorId(doctorId);

    if (!paciente)
        return res.status(404).json({ error: "Paciente no existe" });

    if (!doctor)
        return res.status(404).json({ error: "Doctor no existe" });

    // Fecha futura
    if (new Date(fecha) < new Date())
        return res.status(400).json({ error: "La fecha debe ser futura" });

    // Día disponible
    const dia = obtenerDiaSemana(fecha);
    if (!doctor.diasDisponibles.includes(dia))
        return res.status(400).json({ error: "El doctor no trabaja este día" });

    // Hora disponible
    if (hora < doctor.horarioInicio || hora > doctor.horarioFin)
        return res.status(400).json({ error: "Hora fuera del horario" });

    // No duplicar citas
    const existe = citas.obtenerTodas().some(c =>
        c.doctorId === doctorId && c.fecha === fecha && c.hora === hora
    );
    if (existe)
        return res.status(400).json({ error: "El doctor ya tiene una cita en ese horario" });

    const nueva = {
        id: generarId(),
        pacienteId,
        doctorId,
        fecha,
        hora,
        motivo,
        estado: "programada"
    };

    citas.crear(nueva);
    res.status(201).json(nueva);
});

// GET /citas
router.get('/', (req, res) => {
    const { fecha, estado } = req.query;

    let lista = citas.obtenerTodas();

    if (fecha) lista = lista.filter(c => c.fecha === fecha);
    if (estado) lista = lista.filter(c => c.estado === estado);

    res.json(lista);
});

// GET /citas/:id
router.get('/:id', (req, res) => {
    const c = citas.obtenerPorId(req.params.id);
    if (!c) return res.status(404).json({ error: "Cita no encontrada" });

    res.json(c);
});

// PUT /citas/:id/cancelar
router.put('/:id/cancelar', (req, res) => {
    const cita = citas.obtenerPorId(req.params.id);

    if (!cita)
        return res.status(404).json({ error: "Cita no encontrada" });

    if (cita.estado !== "programada")
        return res.status(400).json({ error: "Solo se pueden cancelar citas programadas" });

    const actualizado = citas.actualizar(req.params.id, { estado: "cancelada" });

    res.json(actualizado);
});

// GET /citas/doctor/:doctorId – Agenda del doctor
router.get('/doctor/:doctorId', (req, res) => {
    const lista = citas.obtenerTodas().filter(c => c.doctorId === req.params.doctorId);
    res.json(lista);
});

module.exports = router;
