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

<img width="468" height="558" alt="imagen" src="https://github.com/user-attachments/assets/cccc11f3-6d86-4a3d-b3ea-20ff82e2599c" />

🔵 GET /pacientes – Listar todos los pacientes

<img width="454" height="573" alt="imagen" src="https://github.com/user-attachments/assets/8d0f8e25-ef37-496a-8ae0-f1892c5842c0" />

🔵 GET /pacientes/:id – Obtener paciente por ID

<img width="390" height="382" alt="imagen" src="https://github.com/user-attachments/assets/5c165ee3-eb33-46d7-a70a-0a42e3c0c40e" />

🔵 PUT /pacientes/:id – Actualizar datos del paciente

<img width="439" height="561" alt="imagen" src="https://github.com/user-attachments/assets/ffc72544-8aa6-4794-86c3-ed82717d0ba6" />

🔵 GET /pacientes/:id/historial – Ver historial de citas del paciente

<img width="447" height="572" alt="imagen" src="https://github.com/user-attachments/assets/e4359373-cf77-498b-9178-6e64146451a0" />

### 🥼 DOCTORES

🟢 POST /doctores – Registrar nuevo doctor

<img width="488" height="551" alt="imagen" src="https://github.com/user-attachments/assets/218f6f0d-c9f4-41d1-b53b-878dd44a03a6" />

🟢 GET /doctores – Listar todos los doctores

<img width="412" height="558" alt="imagen" src="https://github.com/user-attachments/assets/d5452a64-a50f-45b8-93a4-abc5f7a63af9" />

🟢 GET /doctores/:id – Obtener doctor por ID

<img width="379" height="464" alt="imagen" src="https://github.com/user-attachments/assets/411cd838-3747-4801-9269-e2105b4b09c2" />

🟢 GET /doctores/especialidad/:especialidad - Buscar doctores por especialidad

<img width="496" height="541" alt="imagen" src="https://github.com/user-attachments/assets/6e59beec-09e1-49fb-ba1c-39adf09ed388" />

### 📅 CITAS

🟠 POST /citas – Agendar nueva cita

<img width="411" height="563" alt="imagen" src="https://github.com/user-attachments/assets/6d273253-9c93-495a-b031-daaebb48d43f" />

🟠 GET /citas – Listar todas las citas (con filtros opcionales por fecha)

<img width="450" height="587" alt="imagen" src="https://github.com/user-attachments/assets/4d9ddc51-d256-4bdd-a73b-a073fb89bca7" />

Con filtros

<img width="415" height="434" alt="imagen" src="https://github.com/user-attachments/assets/806363ff-81ce-4bd0-8a0c-ce6aeecf7602" />

🟠 GET /citas/:id – Obtener cita por ID

<img width="382" height="428" alt="imagen" src="https://github.com/user-attachments/assets/97c1c3e8-c9ec-4b6c-9cf1-40ad291245fb" />

🟠 PUT /citas/:id/cancelar – Cancelar una cita

<img width="430" height="449" alt="imagen" src="https://github.com/user-attachments/assets/537097ab-2e42-49f8-a8be-a80a49c13856" />

🟠 GET /citas/doctor/:doctorId – Ver agenda de un doctor

<img width="453" height="563" alt="imagen" src="https://github.com/user-attachments/assets/194b0563-58e9-49a8-869f-1a5332da7564" />

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



