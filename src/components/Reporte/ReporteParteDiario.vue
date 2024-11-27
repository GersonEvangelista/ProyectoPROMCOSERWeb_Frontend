<template>
  <body>
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
              <!-- Descripción del cliente -->
              <td>{{ parte.personal }}</td>
              <!-- Descripción del personal -->
              <td>{{ parte.maquinaria }}</td>
              <!-- Descripción de la maquinaria -->
              <td>{{ parte.lugarTrabajo }}</td>
              <td>{{ parte.petroleo }}</td>
              <td>{{ parte.aceite }}</td>
              <td>
                {{ new Date(parte.proximoMantenimiento).toLocaleDateString() }}
              </td>
              <td>
                <button class="detalles-button" @click="mostrarDetalle(parte)">
                  Detalles
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <table class="detalle-table">
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

      <div v-if="activeComponent === 'tablaPartes'">
        <!-- Tabla de Partes Diarios -->
        <table class="parte-table">
          <thead>
            <tr>
              <th>ID Parte</th>
              <th>Serie</th>
              <th>Fecha</th>
              <th>Firmas</th>
              <th>Horómetro Inicio</th>
              <th>Horómetro Final</th>
              <th>Cliente</th>
              <th>Mostrar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="parte in filteredPartes" :key="parte.idParteDiario">
              <td>{{ parte.idParteDiario }}</td>
              <td>{{ parte.serie }}</td>
              <td>{{ new Date(parte.fecha).toLocaleDateString() }}</td>
              <td>{{ parte.firmas ? "Firmado" : "No firmado" }}</td>
              <td>{{ parte.horometroInicio }}</td>
              <td>{{ parte.horometroFinal }}</td>
              <td>{{ parte.idCliente }}</td>
              <td>
                <button
                  @click="abrirComponente('detalle', parte.idParteDiario)"
                >
                  Mostrar Detalles
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="activeComponent === 'detalle'">
        <!-- Componente de Detalles -->
        <reporte-detalle-parte-diario
          :id-parte-diario="parteSeleccionada"
          @volver="abrirComponente('tablaPartes')"
        />
      </div>
    </div>
  </body>
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
      partes: [], // Lista de partes obtenida de la API
      detalles: [], // Lista de detalles filtrados por ID
      filters: {
        idParteDiario: "",
        serie: "",
        fecha: "",
        firmas: "",
        horometroInicio: "",
        horometroFinal: "",
        cliente: "", // Cambiado de idCliente a cliente
        personal: "", // Cambiado de idPersonal a personal
        maquinaria: "", // Cambiado de idMaquinaria a maquinaria
        lugarTrabajo: "",
        petroleo: "",
        aceite: "",
        proximoMantenimiento: "",
      },
    };
  },
  computed: {
    filteredPartes() {
      return this.partes.filter((parte) => {
        return Object.keys(this.filters).every((key) => {
          if (this.filters[key] === "") return true; // No filtrar si el campo está vacío
          const parteValue = parte[key]?.toString().toLowerCase() || ""; // Convertir a string y manejar null/undefined
          const filterValue = this.filters[key]?.toString().toLowerCase(); // Convertir a string
          return parteValue.includes(filterValue); // Comparar cadenas
        });
      });
    },
  },
  methods: {
    async obtenerNombreCompleto(endpoint, id) {
      if (!id) {
        console.warn(`ID inválido para ${endpoint}`);
        return null; // Si el ID no es válido, retorna null
      }

      try {
        const response = await this.$api.get(`${endpoint}/${id}`);
        const data = response.data;
        if (data && data.nombre && data.apellido) {
          return `${data.nombre} ${data.apellido}`; // Devuelve el nombre completo
        } else if (data && data.nombre) {
          return data.nombre; // Devuelve el nombre si no hay apellido
        }
        return "Sin información"; // Si no hay datos válidos, retorna un texto predeterminado
      } catch (error) {
        console.error(`Error al obtener datos de ${endpoint}/${id}:`, error);
        return "Error al obtener"; // En caso de error, retorna un texto predeterminado
      }
    },
    async obtenerDescripcionMaquinaria(endpoint, id) {
      if (!id) {
        console.warn(`ID inválido para ${endpoint}`);
        return null; // Si el ID no es válido, retorna null
      }

      try {
        const response = await this.$api.get(`${endpoint}/${id}`);
        const data = response.data;

        if (data && data.modelo && data.marca) {
          return `${data.placa} - ${data.modelo}`; // Devuelve "Marca - Modelo"
        } else if (data && data.modelo) {
          return data.modelo; // Devuelve solo el modelo si no hay marca
        } else if (data && data.marca) {
          return data.placa; // Devuelve solo la marca si no hay modelo
        }

        return "Sin descripción"; // Si no hay datos válidos, retorna un texto predeterminado
      } catch (error) {
        console.error(`Error al obtener datos de ${endpoint}/${id}:`, error);
        return "Error al obtener descripción"; // En caso de error, retorna un texto predeterminado
      }
    },

    async obtenerPartesPdfExcel() {
      this.loading = true;
      this.error = null;

      try {
        const response = await this.$api.get("/api/ParteDiarios");
        const partes = response.data;

        // Mapeo asíncrono para obtener nombres completos
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
              fecha: parte.fecha.split("T")[0], // Formato 'YYYY-MM-DD'
              firmas: parte.firmas,
              horometroInicio: parte.horometroInicio,
              horometroFinal: parte.horometroFinal,
              cliente: cliente, // Nombre completo del cliente
              personal: personal, // Nombre completo del personal
              maquinaria: maquinaria, // Nombre de la maquinaria
              lugarTrabajo: parte.lugarTrabajo,
              petroleo: parte.petroleo,
              aceite: parte.aceite,
              proximoMantenimiento: parte.proximoMantenimiento.split("T")[0], // Formato 'YYYY-MM-DD'
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

      // Crear una hoja de cálculo (worksheet) a partir del JSON
      const worksheet = XLSX.utils.json_to_sheet(this.jsonData);

      // Crear un libro de trabajo (workbook)
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "ParteDiario");

      // Generar archivo Excel
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Crear un objeto Blob para descarga
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      // Crear enlace de descarga
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "ParteDiario.xlsx"; // Nombre del archivo
      link.click();
    },
    async generarArrayConDetalles() {
      try {
        const partesResponse = await this.$api.get("/api/ParteDiarios");
        const partes = partesResponse.data;

        const arrayConDetalles = await Promise.all(
          partes.map(async (parte) => {
            const detallesResponse = await this.$api.get(
              `/api/DetalleParteDiarios/ParteDiario/${parte.idParteDiario}`
            );
            const detalles = detallesResponse.data || [];

            return {
              idParteDiario: parte.idParteDiario,
              serie: parte.serie,
              fecha: parte.fecha.split("T")[0], // Formato 'YYYY-MM-DD'
              firmas: parte.firmas ? "Sí" : "No",
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
              detalles, // Agregar los detalles obtenidos
            };
          })
        );

        this.jsonData = arrayConDetalles; // Almacenar el array para usarlo posteriormente
      } catch (error) {
        console.error("Error al generar el array con detalles:", error);
      }
    },
    async downloadPdf() {
      const doc = new jsPDF();

      // Título principal
      doc.setFontSize(16);
      doc.setTextColor(40);
      doc.text("Reporte Completo de Partes Diarios", 14, 10);

      let startY = 20; // Inicio de la posición Y

      for (const parte of this.jsonData) {
        // Encabezado de cada Parte Diario
        doc.setFontSize(12);
        doc.setTextColor(40);
        doc.text(`Parte Diario #${parte.idParteDiario}`, 14, startY);
        startY += 6;

        // Información general del Parte Diario
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
            fillColor: [41, 128, 185], // Azul para encabezados
            textColor: [255, 255, 255], // Texto blanco
            fontSize: 10,
          },
          styles: { fontSize: 10 },
          bodyStyles: { textColor: [40, 40, 40] },
        });
        startY = doc.lastAutoTable.finalY + 10; // Actualizar la posición Y

        // Obtener los detalles del Parte Diario desde el endpoint
        let detalles = [];
        try {
          const response = await this.$api.get(
            `/api/DetalleParteDiariosConS/ParteDiario/${parte.idParteDiario}`
          );
          detalles = response.data; // Asignar los detalles obtenidos
        } catch (error) {
          console.error(
            `Error al obtener detalles para Parte Diario #${parte.idParteDiario}:`,
            error
          );
          detalles = []; // Si hay error, asignar arreglo vacío
        }

        // Añadir la tabla de detalles al PDF
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
              fillColor: [100, 100, 100], // Gris oscuro para encabezados
              textColor: [255, 255, 255], // Texto blanco
              fontSize: 9,
            },
            styles: { fontSize: 9 },
            bodyStyles: { textColor: [40, 40, 40] },
          });
          startY = doc.lastAutoTable.finalY + 10; // Actualizar la posición Y
        } else {
          doc.setFontSize(10);
          doc.setTextColor(150, 0, 0); // Rojo para texto sin detalles
          doc.text("No hay detalles para este Parte Diario.", 14, startY);
          startY += 10;
        }

        // Salto de página si necesario
        if (startY > 270) {
          doc.addPage();
          startY = 20; // Reiniciar la posición Y en la nueva página
        }
      }

      // Descargar el archivo PDF
      doc.save("PartesDiarios_Reporte.pdf");
    },
    async obtenerPartes() {
      this.loading = true;
      this.error = null;

      try {
        const response = await this.$api.get("/api/ParteDiarios");
        const partes = response.data;

        // Mapeo asíncrono para obtener descripciones completas
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
              ...parte, // Mantén los datos originales
              cliente, // Agrega el nombre del cliente
              personal, // Agrega el nombre del personal
              maquinaria, // Agrega la descripción de la maquinaria
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
          // Verifica si la respuesta contiene datos en un array
          if (response.data && Array.isArray(response.data)) {
            // Filtra los datos basándose en el idParteDiario
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
      // Llama a obtenerDetalles pasando el ID del parte seleccionado
      this.obtenerDetalles(parte.idParteDiario);
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

.detalle-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.detalle-table th,
.detalle-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.detalle-table th {
  background-color: rgba(0, 102, 204, 0.05);
  color: var(--primary-color);
  font-weight: bold;
}

.detalle-table tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
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
  font-size: 28px; /* Ajusta el tamaño si es necesario */
  font-weight: bold;
  color: var(--primary-color);
  margin: 0 auto; /* Centra horizontalmente */
  text-align: center; /* Centra el texto */
}

.search-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
}

.search-input {
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
}

.add-button {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 10px;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: var(--secondary-hover);
}

.add-button svg {
  margin-right: 5px;
}

.parte-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.parte-table th,
.parte-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.parte-table th {
  background-color: rgba(0, 102, 204, 0.05);
  color: var(--primary-color);
  font-weight: bold;
}

.parte-table tr:hover {
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

.action-buttons {
  display: flex;
  gap: 8px;
}

.edit-button,
.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.edit-button svg {
  color: var(--primary-color);
}

.delete-button svg {
  color: var(--secondary-color);
}

.submit-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: var(--primary-hover);
}

@media (min-width: 768px) {
  .header {
    flex-wrap: nowrap;
  }

  .header-divider {
    display: block;
  }

  .search-container {
    width: auto;
    margin-top: 0;
  }

  .title {
    font-size: 28px;
  }
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.dialog-content {
  width: 80%;
  max-width: 500px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.dialog-content h2 {
  font-size: 26px;
  margin-bottom: 20px;
  font-weight: bold;
  color: var(--primary-color);
}

.dialog-content p {
  margin-bottom: 20px;
}

.confirm-buttons {
  display: flex;
  justify-content: space-around;
}

.confirm-button {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.cancel-button {
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.confirm-button:hover {
  background-color: #cc0000;
}

.cancel-button:hover {
  background-color: #aaa;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  z-index: 9999;
}

.notification.success {
  background-color: #4caf50;
}

.notification.error {
  background-color: #f44336;
}
.detalles-button {
  background-color: var(--primary-color); /* Color principal */
  color: white; /* Color del texto */
  border: none;
  padding: 9px 15px; /* Espaciado interno */
  border-radius: 8px; /* Bordes redondeados */
  font-size: 14px; /* Tamaño del texto */
  font-weight: bold; /* Texto en negrita */
  cursor: pointer;
  transition: all 0.3s ease; /* Animación suave */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra */
}

.detalles-button:hover {
  background-color: var(
    --primary-hover
  ); /* Cambio de color al pasar el mouse */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* Aumenta la sombra */
  transform: translateY(-2px); /* Efecto de levantamiento */
}

.detalles-button:active {
  background-color: var(--primary-hover); /* Color más oscuro al hacer clic */
  transform: translateY(1px); /* Efecto de presión */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra reducida */
}
</style>
