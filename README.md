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

📌 Paciente A

<img width="582" height="715" alt="imagen" src="https://github.com/user-attachments/assets/34668841-16e9-4f9a-84f6-38042975ba8f" />

📌 Paciente B

<img width="465" height="691" alt="imagen" src="https://github.com/user-attachments/assets/cdb66429-14e0-47ee-8460-43f3eff7a9c4" />

📌 Paciente C

<img width="508" height="692" alt="imagen" src="https://github.com/user-attachments/assets/be7aeb17-ce2a-4ce6-a43e-178388d5fc3a" />

📌 Doctor A

<img width="441" height="702" alt="imagen" src="https://github.com/user-attachments/assets/a8fd1d19-a750-4206-9c05-2414185b8351" />

📌 Doctor B

<img width="429" height="708" alt="imagen" src="https://github.com/user-attachments/assets/f59fa18c-96c0-4140-8bcf-a2b1ecf3a0df" />

📅 Prueba 2 - Agendar 5 citas exitosamente

✔ Cita 1

<img width="413" height="688" alt="imagen" src="https://github.com/user-attachments/assets/d8ba56cd-19f3-4be3-8f38-c904825de4bd" />

✔ Cita 2

<img width="414" height="690" alt="imagen" src="https://github.com/user-attachments/assets/f71bca09-1ee1-416a-82ac-4de516e382b7" />

✔ Cita 3

<img width="408" height="693" alt="imagen" src="https://github.com/user-attachments/assets/768677c9-9410-4a8a-90fe-3b1fd115b8d9" />

✔ Cita 4

<img width="409" height="697" alt="imagen" src="https://github.com/user-attachments/assets/478b909a-271b-4685-9663-9418e9d0bbb2" />

✔ Cita 5

<img width="401" height="694" alt="imagen" src="https://github.com/user-attachments/assets/d08cd5e9-cb23-442b-8eb9-9487ddfe50e6" />


❌ Prueba 3 - Intentar agendar una cita en horario no disponible (debe fallar)

Supongamos que D002 atiende 09:00–17:00.
Intentas antes del horario:

<img width="419" height="525" alt="imagen" src="https://github.com/user-attachments/assets/d925e4ee-44a2-4e8b-be40-c4e5c4dc048c" />

❌ Prueba 4 - Intentar agendar dos citas al mismo doctor a la misma hora (debe fallar)

Tenemos la cita 1

<img width="413" height="688" alt="imagen" src="https://github.com/user-attachments/assets/d8ba56cd-19f3-4be3-8f38-c904825de4bd" />

Y si agregamos una con mismo doctor, misma fecha y hora

<img width="543" height="515" alt="imagen" src="https://github.com/user-attachments/assets/56b73ec6-71cd-4b56-bcec-91fd271c4199" />

🔄 Prueba 5 - Cancelar una cita

La cita:

<img width="365" height="686" alt="imagen" src="https://github.com/user-attachments/assets/46b56960-78df-4c2c-bdcb-84e8ebef7556" />

Cancelada:

<img width="443" height="495" alt="imagen" src="https://github.com/user-attachments/assets/5925f84e-91df-4be7-b4b5-c91a72942a38" />


📜 Prueba 6 - Consultar historial de un paciente

Consultamos el historial del paciente P002

<img width="416" height="427" alt="imagen" src="https://github.com/user-attachments/assets/c26fdcff-bd8a-4095-af04-35b617c4e041" />

Historial del paciente 

<img width="466" height="665" alt="imagen" src="https://github.com/user-attachments/assets/6b56df26-f98e-4e55-89c5-47921cec6912" />

🔎 Prueba 7 - Buscar doctores por especialidad

Mostrar solo los doctores que tienen especialidad Cardiología

<img width="462" height="588" alt="imagen" src="https://github.com/user-attachments/assets/b44e8680-217f-495c-a751-a352b97e67c7" />

Mostrar solo los doctores que tienen especialidad Neurologia

<img width="464" height="620" alt="imagen" src="https://github.com/user-attachments/assets/354b62f2-c2d5-4e29-9685-e3a4cfd7666b" />



