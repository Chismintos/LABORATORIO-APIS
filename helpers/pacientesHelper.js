const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../data/pacientes.json');

const leer = () => {
    try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); }
    catch { return []; }
};
const escribir = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

module.exports = {
    obtenerTodos() { return leer(); },
    obtenerPorId(id) { return leer().find(p => p.id === id); },
    crear(paciente) {
        const data = leer();
        data.push(paciente);
        escribir(data);
        return paciente;
    },
    actualizar(id, newData) {
        const data = leer();
        const index = data.findIndex(p => p.id === id);
        if (index === -1) return null;
        data[index] = { ...data[index], ...newData };
        escribir(data);
        return data[index];
    }
};
