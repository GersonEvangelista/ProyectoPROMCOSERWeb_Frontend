<template>
  <div class="container">
    <header class="header">
      <div class="logo-container">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m9p9F1866neG0zpLvS5528VER0rVXF.png"
          alt="PROMCOSER Logo"
          class="logo"
        />
      </div>
      <div class="header-divider"></div>
      <h1 class="title">Gestión de Partes Diarios</h1>
    </header>

    <main>
      <button @click="downloadPdf" class="detalles-button">
        Exportar a PDF
      </button>
      <button @click="downloadExcel" class="detalles-button">
        Exportar a Excel
      </button>

      <table class="parte-table">
        <thead>
          <tr>
            <th v-if="false">ID Parte</th>
            <th v-if="false">Serie</th>
            <th>Fecha</th>
            <th>Firmas</th>
            <th>Horómetro Inicio</th>
            <th>Horómetro Final</th>
            <th>Cliente</th>
            <th>Personal</th>
            <th>Maquinaria</th>
            <th>Lugar Trabajo</th>
            <th>Petróleo</th>
            <th>Aceite</th>
            <th>Próximo Mantenimiento</th>
            <th>Editar</th>
            <th>Mostrar</th>
          </tr>
          <tr>
            <th v-if="false">
              <input
                type="text"
                v-model="filters.idParteDiario"
                placeholder="Filtrar..."
              />
            </th>
            <th v-if="false">
              <input
                type="text"
                v-model="filters.serie"
                placeholder="Filtrar..."
              />
            </th>
            <th><input type="date" v-model="filters.fecha" /></th>
            <th>
              <select v-model="filters.firmas">
                <option value="">Todos</option>
                <option value="true">Firmado</option>
                <option value="false">No firmado</option>
              </select>
            </th>
            <th>
              <input
                type="number"
                v-model="filters.horometroInicio"
                placeholder="Filtrar..."
              />
            </th>
            <th>
              <input
                type="number"
                v-model="filters.horometroFinal"
                placeholder="Filtrar..."
              />
            </th>
            <th>
              <input
                type="text"
                v-model="filters.cliente"
                placeholder="Filtrar..."
              />
            </th>
            <th>
              <input
                type="text"
                v-model="filters.personal"
                placeholder="Filtrar..."
              />
            </th>
            <th>
              <input
                type="text"
                v-model="filters.maquinaria"
                placeholder="Filtrar..."
              />
            </th>
            <th>
              <input
                type="text"
                v-model="filters.lugarTrabajo"
                placeholder="Filtrar..."
              />
            </th>
            <th>
              <input
                type="number"
                v-model="filters.petroleo"
                placeholder="Filtrar..."
              />
            </th>
            <th>
              <input
                type="number"
                v-model="filters.aceite"
                placeholder="Filtrar..."
              />
            </th>
            <th>
              <input type="date" v-model="filters.proximoMantenimiento" />
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="parte in filteredPartes" :key="parte.idParteDiario">
            <td v-if="false">{{ parte.idParteDiario }}</td>
            <td v-if="false">{{ parte.serie }}</td>
            <td>{{ new Date(parte.fecha).toLocaleDateString() }}</td>
            <td>{{ parte.firmas ? "Firmado" : "No firmado" }}</td>
            <td>{{ parte.horometroInicio }}</td>
            <td>{{ parte.horometroFinal }}</td>
            <td>{{ parte.cliente }}</td>
            <td>{{ parte.personal }}</td>
            <td>{{ parte.maquinaria }}</td>
            <td>{{ parte.lugarTrabajo }}</td>
            <td>{{ parte.petroleo }}</td>
            <td>{{ parte.aceite }}</td>
            <td>
              {{ new Date(parte.proximoMantenimiento).toLocaleDateString() }}
            </td>
            <td>
              <button class="edit-button-new" @click="editarParte(parte)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
            </td>
            <td>
              <button class="detalles-button" @click="mostrarDetalle(parte)">
                Detalles
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="detalle-table" v-if="detalles.length > 0">
        <thead>
          <tr>
            <th v-if="false">ID Detalle</th>
            <th v-if="false">ID Parte Diario</th>
            <th>Horas</th>
            <th>Trabajo Efectuado</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="detalle in detalles" :key="detalle.idDetalleParteDiario">
            <td v-if="false">{{ detalle.idDetalleParteDiario }}</td>
            <td v-if="false">{{ detalle.idParteDiario }}</td>
            <td>{{ detalle.horas }}</td>
            <td>{{ detalle.trabajoEfectuado }}</td>
            <td>{{ detalle.descripcion }}</td>
          </tr>
        </tbody>
      </table>
    </main>

    <!-- Modal de edición -->
    <div v-if="showEditModal" class="modal-new">
      <div class="modal-content-new">
        <h2 class="modal-title">Editar Parte Diario</h2>
        <form @submit.prevent="guardarEdicion" class="edit-form">
          <div class="form-row">
            <div class="form-group-new">
              <label for="fecha">Fecha</label>
              <input type="datetime-local" id="fecha" v-model="parteEditando.fecha" class="form-input">
            </div>
            <div class="form-group-new">
              <label for="firmas">Firmas</label>
              <input type="checkbox" id="firmas" v-model="parteEditando.firmas" class="form-checkbox">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group-new">
              <label for="horometroInicio">Horómetro Inicio</label>
              <input type="number" id="horometroInicio" v-model="parteEditando.horometroInicio" class="form-input">
            </div>
            <div class="form-group-new">
              <label for="horometroFinal">Horómetro Final</label>
              <input type="number" id="horometroFinal" v-model="parteEditando.horometroFinal" class="form-input">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group-new">
              <label for="idCliente">Cliente</label>
              <input type="number" id="idCliente" v-model="parteEditando.idCliente" class="form-input">
            </div>
            <div class="form-group-new">
              <label for="idPersonal">Personal</label>
              <input type="number" id="idPersonal" v-model="parteEditando.idPersonal" class="form-input">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group-new">
              <label for="idMaquinaria">Maquinaria</label>
              <input type="number" id="idMaquinaria" v-model="parteEditando.idMaquinaria" class="form-input">
            </div>
            <div class="form-group-new">
              <label for="lugarTrabajo">Lugar de Trabajo</label>
              <input type="text" id="lugarTrabajo" v-model="parteEditando.lugarTrabajo" class="form-input">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group-new">
              <label for="petroleo">Petróleo</label>
              <input type="number" step="0.1" id="petroleo" v-model="parteEditando.petroleo" class="form-input">
            </div>
            <div class="form-group-new">
              <label for="aceite">Aceite</label>
              <input type="number" step="0.1" id="aceite" v-model="parteEditando.aceite" class="form-input">
            </div>
          </div>

          <div class="form-group-new">
            <label for="proximoMantenimiento">Próximo Mantenimiento</label>
            <input type="datetime-local" id="proximoMantenimiento" v-model="parteEditando.proximoMantenimiento" class="form-input">
          </div>

          <div class="form-actions-new">
            <button type="button" class="cancel-button-new" @click="cancelarEdicion">
              Cancelar
            </button>
            <button type="submit" class="save-button-new">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "ParteDiarioTable",
  data() {
    return {
      jsonData: [],
      partes: [],
      detalles: [],
      filters: {
        idParteDiario: "",
        serie: "",
        fecha: "",
        firmas: "",
        horometroInicio: "",
        horometroFinal: "",
        cliente: "",
        personal: "",
        maquinaria: "",
        lugarTrabajo: "",
        petroleo: "",
        aceite: "",
        proximoMantenimiento: "",
      },
      showEditModal: false,
      parteEditando: null,
      activeComponent: 'tablaPartes',
      parteSeleccionada: null,
    };
  },
  computed: {
    filteredPartes() {
      return this.partes.filter((parte) => {
        return Object.keys(this.filters).every((key) => {
          if (this.filters[key] === "") return true;
          const parteValue = parte[key]?.toString().toLowerCase() || "";
          const filterValue = this.filters[key]?.toString().toLowerCase();
          return parteValue.includes(filterValue);
        });
      });
    },
  },
  methods: {
    async obtenerNombreCompleto(endpoint, id) {
      if (!id) {
        console.warn(`ID inválido para ${endpoint}`);
        return null;
      }

      try {
        const response = await this.$api.get(`${endpoint}/${id}`);
        const data = response.data;
        if (data && data.nombre && data.apellido) {
          return `${data.nombre} ${data.apellido}`;
        } else if (data && data.nombre) {
          return data.nombre;
        }
        return "Sin información";
      } catch (error) {
        console.error(`Error al obtener datos de ${endpoint}/${id}:`, error);
        return "Error al obtener";
      }
    },
    async obtenerDescripcionMaquinaria(endpoint, id) {
      if (!id) {
        console.warn(`ID inválido para ${endpoint}`);
        return null;
      }

      try {
        const response = await this.$api.get(`${endpoint}/${id}`);
        const data = response.data;

        if (data && data.modelo && data.marca) {
          return `${data.placa} - ${data.modelo}`;
        } else if (data && data.modelo) {
          return data.modelo;
        } else if (data && data.marca) {
          return data.placa;
        }

        return "Sin descripción";
      } catch (error) {
        console.error(`Error al obtener datos de ${endpoint}/${id}:`, error);
        return "Error al obtener descripción";
      }
    },
    async obtenerPartesPdfExcel() {
      this.loading = true;
      this.error = null;

      try {
        const response = await this.$api.get("/api/ParteDiarios");
        const partes = response.data;

        this.jsonData = await Promise.all(
          partes.map(async (parte) => {
            const cliente = await this.obtenerNombreCompleto(
              "/api/Clientes",
              parte.idCliente
            );
            const personal = await this.obtenerNombreCompleto(
              "/api/Personal",
              parte.idPersonal
            );
            const maquinaria = await this.obtenerDescripcionMaquinaria(
              "/api/Maquinaria",
              parte.idMaquinaria
            );

            return {
              idParteDiario: parte.idParteDiario,
              serie: parte.serie,
              fecha: parte.fecha.split("T")[0],
              firmas: parte.firmas,
              horometroInicio: parte.horometroInicio,
              horometroFinal: parte.horometroFinal,
              cliente: cliente,
              personal: personal,
              maquinaria: maquinaria,
              lugarTrabajo: parte.lugarTrabajo,
              petroleo: parte.petroleo,
              aceite: parte.aceite,
              proximoMantenimiento: parte.proximoMantenimiento.split("T")[0],
            };
          })
        );
      } catch (err) {
        console.error("Error al obtener partes:", err);
        this.error = err.message || "Error al obtener los datos";
      } finally {
        this.loading = false;
      }
    },
    downloadExcel() {
      if (this.jsonData.length === 0) {
        alert("No hay datos para descargar");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(this.jsonData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "ParteDiario");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "ParteDiario.xlsx";
      link.click();
    },
    async generarArrayConDetalles() {
      try {
        const partesResponse = await this.$api.get("/api/ParteDiarios");
        const partes = partesResponse.data;

        this.jsonData = await Promise.all(
          partes.map(async (parte) => {
            const detallesResponse = await this.$api.get(
              `/api/DetalleParteDiarios/ParteDiario/${parte.idParteDiario}`
            );
            const detalles = detallesResponse.data || [];

            return {
              idParteDiario: parte.idParteDiario,
              serie: parte.serie,
              fech: parte.firmas ? "Sí" : "No",
              horometroInicio: parte.horometroInicio,
              horometroFinal: parte.horometroFinal,
              cliente: await this.obtenerNombreCompleto(
                "/api/Clientes",
                parte.idCliente
              ),
              personal: await this.obtenerNombreCompleto(
                "/api/Personal",
                parte.idPersonal
              ),
              maquinaria: await this.obtenerDescripcionMaquinaria(
                "/api/Maquinaria",
                parte.idMaquinaria
              ),
              lugarTrabajo: parte.lugarTrabajo,
              petroleo: parte.petroleo,
              aceite: parte.aceite,
              proximoMantenimiento: parte.proximoMantenimiento.split("T")[0],
              detalles,
            };
          })
        );
      } catch (error) {
        console.error("Error al generar el array con detalles:", error);
      }
    },
    async downloadPdf() {
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.setTextColor(40);
      doc.text("Reporte Completo de Partes Diarios", 14, 10);

      let startY = 20;

      for (const parte of this.jsonData) {
        doc.setFontSize(12);
        doc.setTextColor(40);
        doc.text(`Parte Diario #${parte.idParteDiario}`, 14, startY);
        startY += 6;

        doc.autoTable({
          startY,
          head: [
            ["Serie", "Fecha", "Firmas", "Cliente", "Personal", "Maquinaria"],
          ],
          body: [
            [
              parte.serie,
              parte.fecha,
              parte.firmas ? "Firmado" : "No firmado",
              parte.cliente,
              parte.personal,
              parte.maquinaria,
            ],
          ],
          theme: "striped",
          headStyles: {
            fillColor: [41, 128, 185],
            textColor: [255, 255, 255],
            fontSize: 10,
          },
          styles: { fontSize: 10 },
          bodyStyles: { textColor: [40, 40, 40] },
        });
        startY = doc.lastAutoTable.finalY + 10;

        let detalles = [];
        try {
          const response = await this.$api.get(
            `/api/DetalleParteDiariosConS/ParteDiario/${parte.idParteDiario}`
          );
          detalles = response.data;
        } catch (error) {
          console.error(
            `Error al obtener detalles para Parte Diario #${parte.idParteDiario}:`,
            error
          );
          detalles = [];
        }

        if (detalles.length > 0) {
          doc.setFontSize(10);
          doc.setTextColor(40);
          doc.text("Detalles:", 14, startY);
          startY += 6;

          doc.autoTable({
            startY,
            head: [["Horas", "Trabajo Efectuado", "Descripción"]],
            body: detalles.map((detalle) => [
              detalle.horas,
              detalle.trabajoEfectuado,
              detalle.descripcion,
            ]),
            theme: "grid",
            headStyles: {
              fillColor: [100, 100, 100],
              textColor: [255, 255, 255],
              fontSize: 9,
            },
            styles: { fontSize: 9 },
            bodyStyles: { textColor: [40, 40, 40] },
          });
          startY = doc.lastAutoTable.finalY + 10;
        } else {
          doc.setFontSize(10);
          doc.setTextColor(150, 0, 0);
          doc.text("No hay detalles para este Parte Diario.", 14, startY);
          startY += 10;
        }

        if (startY > 270) {
          doc.addPage();
          startY = 20;
        }
      }

      doc.save("PartesDiarios_Reporte.pdf");
    },
    async obtenerPartes() {
      this.loading = true;
      this.error = null;

      try {
        const response = await this.$api.get("/api/ParteDiarios");
        const partes = response.data;

        this.partes = await Promise.all(
          partes.map(async (parte) => {
            const cliente = await this.obtenerNombreCompleto(
              "/api/Clientes",
              parte.idCliente
            );
            const personal = await this.obtenerNombreCompleto(
              "/api/Personal",
              parte.idPersonal
            );
            const maquinaria = await this.obtenerDescripcionMaquinaria(
              "/api/Maquinaria",
              parte.idMaquinaria
            );

            return {
              ...parte,
              cliente,
              personal,
              maquinaria,
            };
          })
        );
      } catch (error) {
        console.error("Error al obtener partes diarios:", error);
        this.error = error.message || "Error al obtener los datos";
      } finally {
        this.loading = false;
      }
    },
    obtenerDetalles(idParteDiario) {
      this.$api
        .get("/api/DetalleParteDiariosConS")
        .then((response) => {
          if (response.data && Array.isArray(response.data)) {
            this.detalles = response.data.filter(
              (detalle) => detalle.idParteDiario === idParteDiario
            );

            if (this.detalles.length > 0) {
              console.log(
                `Detalles filtrados para idParteDiario ${idParteDiario}:`,
                this.detalles
              );
            } else {
              console.warn(
                `No se encontraron detalles para idParteDiario ${idParteDiario}.`
              );
            }
          } else {
            console.error(
              "La respuesta no tiene el formato esperado o no contiene un array de datos."
            );
          }
        })
        .catch((error) => {
          console.error("Error al obtener los detalles:", error);
        });
    },
    mostrarDetalle(parte) {
      this.obtenerDetalles(parte.idParteDiario);
    },
    editarParte(parte) {
      this.parteEditando = { ...parte };
      this.showEditModal = true;
    },
    cancelarEdicion() {
      this.showEditModal = false;
      this.parteEditando = null;
    },
    async guardarEdicion() {
      try {
        const response = await this.$api.put(`/api/ParteDiario/${this.parteEditando.idParteDiario}`, this.parteEditando);
        if (response.status === 200) {
          const index = this.partes.findIndex(p => p.idParteDiario === this.parteEditando.idParteDiario);
          if (index !== -1) {
            this.partes[index] = { ...this.parteEditando };
          }
          this.showEditModal = false;
          this.parteEditando = null;
          this.$q.notify({
            message: 'Parte Diario actualizado con éxito',
            color: 'positive'
          });
        }
      } catch (error) {
        console.error('Error al actualizar el Parte Diario:', error);
        this.$q.notify({
          message: 'Error al actualizar el Parte Diario',
          color: 'negative'
        });
      }
    },
    abrirComponente(componente, idParteDiario) {
      this.activeComponent = componente;
      this.parteSeleccionada = idParteDiario;
    },
  },
  mounted() {
    this.obtenerPartes();
    this.obtenerPartesPdfExcel();
  },
};
</script>

<style>
:root {
  --primary-color: #0066cc;
  --primary-hover: #0052a3;
  --secondary-color: #ff3333;
  --secondary-hover: #cc0000;
  --background-color: #f8f9fa;
  --text-color: #333;
  --border-color: #e0e0e0;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background: linear-gradient(to bottom, #ffffff, var(--background-color));
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.logo-container {
  width: 160px;
  height: 64px;
  position: relative;
}

.logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.header-divider {
  width: 1px;
  height: 48px;
  background-color: var(--border-color);
  margin: 0 20px;
  display: none;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: var(--primary-color);
  margin: 0 auto;
  text-align: center;
}

.parte-table, .detalle-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.parte-table th,
.parte-table td,
.detalle-table th,
.detalle-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.parte-table th,
.detalle-table th {
  background-color: rgba(0, 102, 204, 0.05);
  color: var(--primary-color);
  font-weight: bold;
}

.parte-table tr:hover,
.detalle-table tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.parte-table th input[type="text"],
.parte-table th input[type="date"],
.parte-table th input[type="number"],
.parte-table th select {
  width: 100%;
  padding: 6px;
  margin-top: 4px;
  font-size: 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-sizing: border-box;
}

.detalles-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.detalles-button:hover {
  background-color: var(--primary-hover);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.edit-button-new {
  background-color: transparent;
  color: #0066cc;
  border: none;
  padding: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.edit-button-new:hover {
  transform: scale(1.1);
}

.modal-new {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content-new {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group-new {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group-new label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;
}

.form-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #0066cc;
}

.form-checkbox {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 4px;
}

.form-actions-new {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.save-button-new {
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-button-new:hover {
  background-color: #0052a3;
}

.cancel-button-new {
  background-color: #ff3333;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-button-new:hover {
  background-color: #cc0000;
}

@media (min-width: 768px) {
  .header {
    flex-wrap: nowrap;
  }

  .header-divider {
    display: block;
  }

  .title {
    font-size: 28px;
  }
}
</style>
