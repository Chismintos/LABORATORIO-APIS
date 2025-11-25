const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../data/citas.json');

const leer = () => {
    try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); }
    catch { return []; }
};
const escribir = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

module.exports = {
    obtenerTodas() { return leer(); },
    obtenerPorId(id) { return leer().find(c => c.id === id); },

    crear(cita) {
        const citas = leer();
        citas.push(cita);
        escribir(citas);
        return cita;
    },

    actualizar(id, newData) {
        const citas = leer();
        const index = citas.findIndex(c => c.id === id);
        if (index === -1) return null;

        citas[index] = { ...citas[index], ...newData };
        escribir(citas);
        return citas[index];
    }
};
