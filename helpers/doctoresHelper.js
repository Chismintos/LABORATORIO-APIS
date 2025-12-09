const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../data/doctores.json');

const read = () => {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); }
  catch { return []; }
};
const write = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');

const generarId = () => {
  const list = read();
  const n = list.length + 1;
  return 'D' + String(n).padStart(3, '0');
};

module.exports = {
  obtenerTodos() { return read(); },
  obtenerPorId(id) { return read().find(d => d.id === id); },

  existeNombreEspecialidad(nombre, especialidad) {
    if (!nombre || !especialidad) return false;
    return read().some(d =>
      d.nombre.toLowerCase() === nombre.toLowerCase() &&
      d.especialidad.toLowerCase() === especialidad.toLowerCase()
    );
  },

  crear({ nombre, especialidad, horarioInicio, horarioFin, diasDisponibles }) {
    const doctores = read();
    const nuevo = {
      id: generarId(),
      nombre,
      especialidad,
      horarioInicio,
      horarioFin,
      diasDisponibles
    };
    doctores.push(nuevo);
    write(doctores);
    return nuevo;
  },

  
  actualizar(id, data) {
    const doctores = read();
    const index = doctores.findIndex(d => d.id === id);

    if (index === -1) return null;

    doctores[index] = {
      ...doctores[index],
      ...data
    };

    write(doctores);
    return doctores[index];
  }
};

