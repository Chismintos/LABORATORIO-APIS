const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../data/doctores.json');

const leer = () => {
    try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); }
    catch { return []; }
};
const escribir = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

module.exports = {
    obtenerTodos() { return leer(); },
    obtenerPorId(id) { return leer().find(d => d.id === id); },
    crear(doctor) {
        const data = leer();
        data.push(doctor);
        escribir(data);
        return doctor;
    }
};
