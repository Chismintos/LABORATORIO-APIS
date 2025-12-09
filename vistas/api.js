const API_URL = 'http://localhost:3000';

const api = {
  // Función base para todos los fetches
  async fetch(endpoint, options = {}) {
    try {
      console.log(`📡 GET ${API_URL}${endpoint}`); // Debug
      
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      const text = await response.text();
      console.log(`📡 Response:`, text); // Debug

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      return JSON.parse(text);
    } catch (error) {
      console.error(`❌ Error en ${endpoint}:`, error);
      throw error;
    }
  },

  // ==================== PACIENTES ====================
  pacientes: {
    getAll: () => api.fetch('/pacientes'),
    getById: (id) => api.fetch(`/pacientes/${id}`),
    create: (data) => api.fetch('/pacientes', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => api.fetch(`/pacientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => api.fetch(`/pacientes/${id}`, {
      method: 'DELETE'
    }),
    getHistorial: (id) => api.fetch(`/pacientes/${id}/historial`)
  },

  // ==================== DOCTORES ====================
doctores: {
  getAll: () => api.fetch('/doctores'),
  getById: (id) => api.fetch(`/doctores/${id}`),
  create: (data) => api.fetch('/doctores', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => api.fetch(`/doctores/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  }),
  getByEspecialidad: (especialidad) => api.fetch(`/doctores/especialidad/${especialidad}`),
  getAgenda: (id) => api.fetch(`/doctores/${id}/agenda`)
},


  // ==================== CITAS ====================
  citas: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return api.fetch(`/citas${query ? '?' + query : ''}`);
    },
    getById: (id) => api.fetch(`/citas/${id}`),
    create: (data) => api.fetch('/citas', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => api.fetch(`/citas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => api.fetch(`/citas/${id}`, {
      method: 'DELETE'
    }),
    getByDoctor: (doctorId) => api.fetch(`/citas/doctor/${doctorId}`),
    getByPaciente: (pacienteId) => api.fetch(`/citas/paciente/${pacienteId}`),
    getProximas24h: () => api.fetch('/citas/proximas/24h')
  },

  // ==================== ESTADÍSTICAS ====================
  estadisticas: {
    getDoctores: () => api.fetch('/estadisticas/doctores'),
    getCitasHoy: () => {
      const hoy = new Date().toISOString().split('T')[0];
      return api.citas.getAll({ fecha: hoy });
    }
  }
};