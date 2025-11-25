# 📘 LABORATORIO APIS – EVALUACIÓN  
### Sistema de Gestión de Citas Médicas (API REST)

---

# 🏫 **Portada Institucional**

**Institución:** Instituto Tecnológico de Ensenada  
**Carrera:** Ingeniería en Sistemas Computacionales  
**Materia:** Desarrollo Web Front End  
**Actividad:** LABORATORIO APIS – EVALUACIÓN  
**Estudiante:** Cristian Yahir Garcia Hernandez  
**Docente:** Xenia Padilla  
**Fecha:** 24 de noviembre del 2025  

---

# 📌 **Descripción del Proyecto**

Este proyecto consiste en el desarrollo de una API REST para la gestión de una clínica médica.  
El sistema permite manejar **pacientes**, **doctores** y **citas**, aplicando validaciones, lógica de negocio y persistencia mediante archivos JSON.

La API fue desarrollada con **Node.js + Express**, utilizando lectura/escritura de archivos mediante módulos helpers especializados.

---

# 🚀 **Instrucciones de Instalación**

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/usuario/clinica-api.git
cd proyecto
```
### 2️⃣ Instalar dependencias
```bash
npm install express
```

### 3️⃣ Verificar la estructura del proyecto
```bash
/project
  ├── data/
  │     ├── citas.json
  │     ├── doctores.json
  │     └── pacientes.json
  ├── helpers/
  │     ├── citasHelper.js
  │     ├── doctoresHelper.js
  │     └── pacientesHelper.js
  ├── routes/
  │     ├── citas.js
  │     ├── doctores.js
  │     └── pacientes.js
  ├── index.js
  ├── package.json
  └── README.md
```
### 5️⃣ Iniciar el servidor
```bash
npm start
http://localhost:3000
```

# 🛠 Documentación de Endpoints

### 👤 PACIENTES

🔵 POST /pacientes – Registrar nuevo paciente

🔵 GET /pacientes – Listar todos los pacientes

🔵 GET /pacientes/:id – Obtener paciente por ID

🔵 PUT /pacientes/:id – Actualizar datos del paciente

🔵 GET /pacientes/:id/historial – Ver historial de citas del paciente

### 🥼 DOCTORES

🟢 POST /doctores – Registrar nuevo doctor

🟢 GET /doctores – Listar todos los doctores

🟢 GET /doctores/:id – Obtener doctor por ID

🟢 GET /doctores/especialidad/:especialidad - Buscar doctores por especialidad

### 📅 CITAS

🟠 POST /citas – Agendar nueva cita

🟠 GET /citas – Listar todas las citas (con filtros opcionales por fecha)

🟠 GET /citas/:id – Obtener cita por ID

🟠 PUT /citas/:id/cancelar – Cancelar una cita

🟠 GET /citas/doctor/:doctorId – Ver agenda de un doctor

# 🧪 Casos de Prueba para verificar su sistema

✔ Prueba 1 — Crear 3 pacientes, 2 doctores

✔ Agendar 5 citas exitosamente

✔ Intentar agendar una cita en horario no disponible (debe fallar)

✔ Intentar agendar dos citas al mismo doctor a la misma hora (debe fallar)

✔ Cancelar una cita

✔ Consultar historial de un paciente

✔ Buscar doctores por especialidad
