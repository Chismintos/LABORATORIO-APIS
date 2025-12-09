const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../data/citas.json');

const read = () => {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); }
  catch { return []; }
};
const write = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');

const generarId = () => {
  const list = read();
  const n = list.length + 1;
  return 'C' + String(n).padStart(3, '0');
};

module.exports = {
  obtenerTodas() { return read(); },
  obtenerPorId(id) { return read().find(c => c.id === id); },

  obtenerPorPaciente(pacienteId) {
    return read().filter(c => c.pacienteId === pacienteId);
  },

   eliminarPorPaciente(pacienteId) {
    const citas = read();
    const nuevasCitas = citas.filter(c => c.pacienteId !== pacienteId);
    write(nuevasCitas);
    return true;
  },

  obtenerPorDoctor(doctorId) {
    return read().filter(c => c.doctorId === doctorId);
  },

  crear({ pacienteId, doctorId, fecha, hora, motivo }) {
    const citas = read();
    const nueva = {
      id: generarId(),
      pacienteId,
      doctorId,
      fecha,
      hora,
      motivo,
      estado: 'programada'
    };
    citas.push(nueva);
    write(citas);
    return nueva;
  },

  actualizar(id, campos) {
    const citas = read();
    const idx = citas.findIndex(c => c.id === id);
    if (idx === -1) return null;
    citas[idx] = { ...citas[idx], ...campos };
    write(citas);
    return citas[idx];
  },

  existeConflicto(doctorId, fecha, hora) {
    // conflicto solo en citas 'programada'
    return read().some(c => c.doctorId === doctorId && c.fecha === fecha && c.hora === hora && c.estado === 'programada');
  },

  proximas24Horas() {
    const ahora = new Date();
    const limite = new Date(ahora.getTime() + 24 * 60 * 60 * 1000);
    return read().filter(c => {
      const dt = new Date(`${c.fecha}T${c.hora}:00`);
      return dt > ahora && dt <= limite && c.estado === 'programada';
    });
  }
};
