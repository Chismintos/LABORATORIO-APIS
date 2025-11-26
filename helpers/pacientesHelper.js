const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../data/pacientes.json');

const read = () => {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); }
  catch { return []; }
};
const write = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');

const generarId = () => {
  const list = read();
  const n = list.length + 1;
  return 'P' + String(n).padStart(3, '0');
};

module.exports = {
  obtenerTodos() { return read(); },
  obtenerPorId(id) { return read().find(p => p.id === id); },

  existeEmail(email) {
    if (!email) return false;
    return read().some(p => p.email.toLowerCase() === email.toLowerCase());
  },

  crear({ nombre, edad, telefono, email, fechaRegistro }) {
    const pacientes = read();
    const nuevo = {
      id: generarId(),
      nombre,
      edad,
      telefono,
      email,
      fechaRegistro: fechaRegistro || new Date().toISOString().split('T')[0]
    };
    pacientes.push(nuevo);
    write(pacientes);
    return nuevo;
  },

  actualizar(id, campos) {
    const pacientes = read();
    const idx = pacientes.findIndex(p => p.id === id);
    if (idx === -1) return null;
    pacientes[idx] = { ...pacientes[idx], ...campos };
    write(pacientes);
    return pacientes[idx];
  }
};
