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
      <h1 class="title">Gestión de Maquinaria</h1>
      <div class="search-container">
        <button @click="showDialog()" class="add-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="plus-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Agregar
        </button>
      </div>
    </header>

    <main>
      <table class="machinery-table">
        <thead>
          <tr>
            <th>
              Placa
              <input
                type="text"
                v-model="filters.placa"
                placeholder="Filtrar Placa"
                class="column-filter"
              />
            </th>
            <th>
              Modelo
              <input
                type="text"
                v-model="filters.modelo"
                placeholder="Filtrar Modelo"
                class="column-filter"
              />
            </th>
            <th>
              Marca
              <input
                type="text"
                v-model="filters.marca"
                placeholder="Filtrar Marca"
                class="column-filter"
              />
            </th>
            <th>
              Año Compra
              <input
                type="number"
                v-model="filters.anioCompra"
                placeholder="Filtrar Año"
                class="column-filter"
              />
            </th>
            <th>
              Horómetro Compra
              <input
                type="number"
                v-model="filters.horometroCompra"
                placeholder="Filtrar Horómetro Compra"
                class="column-filter"
              />
            </th>
            <th>
              Horómetro Actual
              <input
                type="number"
                v-model="filters.horometroActual"
                placeholder="Filtrar Horómetro Actual"
                class="column-filter"
              />
            </th>
            <th>
              Estado
              <select v-model="filters.estado" class="column-filter">
                <option value="">Todos</option>
                <option :value="true">Activo</option>
                <option :value="false">Inactivo</option>
              </select>
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="machine in filteredMachinery" :key="machine.idMaquinaria">
            <td>{{ machine.placa }}</td>
            <td>{{ machine.modelo }}</td>
            <td>{{ machine.marca }}</td>
            <td>{{ machine.anioCompra }}</td>
            <td>{{ machine.horometroCompra }}</td>
            <td>{{ machine.horometroActual }}</td>
            <td>{{ machine.estado ? "Activo" : "Inactivo" }}</td>
            <td>
              <button @click="showDialog(machine)" class="edit-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  ></path>
                  <path
                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  ></path>
                </svg>
              </button>
              <button
                @click="confirmDeleteMachine(machine.idMaquinaria)"
                class="delete-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Diálogo de confirmación para eliminar -->
      <div
        v-if="isConfirmDialogVisible"
        class="dialog"
        @click.self="closeConfirmDialog"
      >
        <div class="dialog-content">
          <h2>Confirmación</h2>
          <p>¿Estás seguro de que deseas eliminar esta maquinaria?</p>
          <div class="confirm-buttons">
            <button @click="confirmDelete" class="confirm-button">
              Sí, eliminar
            </button>
            <button @click="closeConfirmDialog" class="cancel-button">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Dialogo para agregar/editar maquinaria -->
    <div v-if="isDialogVisible" class="dialog">
      <div class="dialog-content">
        <h2>{{ dialogTitle }}</h2>
        <form @submit.prevent="submitForm">
          <!-- Contenedor de cuadrícula para los campos del formulario -->
          <div class="form-grid">
            <div class="form-group">
              <label>Placa</label>
              <input
                type="text"
                v-model="form.placa"
                class="form-input"
                required
              />
            </div>
            <div class="form-group">
              <label>Modelo</label>
              <input
                type="text"
                v-model="form.modelo"
                class="form-input"
                required
              />
            </div>
            <div class="form-group">
              <label>Marca</label>
              <input
                type="text"
                v-model="form.marca"
                class="form-input"
                required
              />
            </div>
            <div class="form-group">
              <label>Año Compra</label>
              <input
                type="number"
                v-model="form.anioCompra"
                class="form-input"
                required
              />
            </div>
            <div class="form-group">
              <label>Horómetro Compra</label>
              <input
                type="number"
                v-model="form.horometroCompra"
                class="form-input"
                required
              />
            </div>
            <div class="form-group">
              <label>Horómetro Actual</label>
              <input
                type="number"
                v-model="form.horometroActual"
                class="form-input"
                required
              />
            </div>
            <div class="form-group" v-if="isEditing">
              <label>Estado</label>
              <select v-model="form.estado" class="form-input" required>
                <option :value="true">Activo</option>
                <option :value="false">Inactivo</option>
              </select>
            </div>
          </div>
          <!-- Acciones del formulario -->
          <div class="form-actions">
            <button type="submit" class="submit-button">Guardar</button>
            <button type="button" @click="hideDialog" class="cancel-button">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false, // Nueva variable para saber si es edición o agregar
      searchTerm: "",
      machinery: [],
      filters: {
        placa: "",
        modelo: "",
        marca: "",
        anioCompra: null,
        horometroCompra: null,
        horometroActual: null,
        estado: "",
      },
      isDialogVisible: false,
      dialogTitle: "",
      form: {
        idMaquinaria: null, // Agregado para identificar el ID de edición
        placa: "",
        modelo: "",
        marca: "",
        anioCompra: null,
        horometroCompra: null,
        horometroActual: null,
        estado: true,
      },
      isConfirmDialogVisible: false, // Controla la visibilidad del diálogo
      machineryToDelete: null, // Almacena la maquinaria seleccionada para eliminar
    };
  },
  computed: {
    filteredMachinery() {
      return this.machinery.filter((machine) => {
        return (
          (this.filters.placa
            ? machine.placa.includes(this.filters.placa)
            : true) &&
          (this.filters.modelo
            ? machine.modelo.includes(this.filters.modelo)
            : true) &&
          (this.filters.marca
            ? machine.marca.includes(this.filters.marca)
            : true) &&
          (this.filters.anioCompra
            ? machine.anioCompra === Number(this.filters.anioCompra)
            : true) &&
          (this.filters.horometroCompra
            ? machine.horometroCompra === Number(this.filters.horometroCompra)
            : true) &&
          (this.filters.horometroActual
            ? machine.horometroActual === Number(this.filters.horometroActual)
            : true) &&
          (this.filters.estado !== ""
            ? machine.estado === JSON.parse(this.filters.estado)
            : true)
        );
      });
    },
  },
  methods: {
    confirmDelete() {
      if (this.machineryToDelete) {
        this.deleteMachine(this.machineryToDelete); // Llama a la función de eliminación
        this.closeConfirmDialog(); // Cierra el cuadro de confirmación
      }
    },
    closeConfirmDialog() {
      this.isConfirmDialogVisible = false; // Oculta el cuadro de confirmación
      this.machineryToDelete = null; // Limpia el ID de la maquinaria
    },

    showDialog(machine = null) {
      this.isEditing = !!machine;
      this.dialogTitle = machine
        ? "Editar Maquinaria"
        : "Agregar Nueva Maquinaria";
      this.form = machine
        ? { ...machine }
        : {
            idMaquinaria: null,
            placa: "",
            modelo: "",
            marca: "",
            anioCompra: null,
            horometroCompra: null,
            horometroActual: null,
            estado: true,
          };
      this.isDialogVisible = true;
    },
    hideDialog() {
      this.isDialogVisible = false;
    },
    submitForm() {
      const placaExiste = this.machinery.some(
        (machine) =>
          machine.placa === this.form.placa &&
          (!this.isEditing || machine.idMaquinaria !== this.form.idMaquinaria)
      );
      if (placaExiste) {
        this.$q.notify({
          message: "La placa ya existe. Por favor, ingrese una placa única.",
          color: "red",
          timeout: 3000,
          position: "top",
        });
        return;
      }

      if (this.isEditing) {
        this.$api;
        let token = JSON.parse(localStorage.getItem("userData")).token;
        //console.log(token)

        let headers = {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        };
        this.$api
          .put(`/api/Maquinaria/${this.form.idMaquinaria}`, this.form, headers)
          .then(() => {
            const index = this.machinery.findIndex(
              (m) => m.idMaquinaria === this.form.idMaquinaria
            );

            this.machinery.splice(index, 1, { ...this.form });
            //alert("Maquinaria actualizada exitosamente.");
            this.hideDialog();
            this.$q.notify({
              message: "Actualización exitoso",
              color: "positive",
              timeout: 3000,
              position: "top",
            });
          })
          .catch((error) => {
            const errorMessage =
              error.response && error.response.data
                ? error.response.data
                : error.message;
            this.$q.notify({
              message: "Error al actualizar la maquinaria: " + errorMessage,
              color: "positive",
              timeout: 3000,
              position: "top",
            });
          });
      } else {
        const { idMaquinaria, ...maquinariaData } = this.form;

        let token = JSON.parse(localStorage.getItem("userData")).token;
        //console.log(token)

        let headers = {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        };
        this.$api
          .post("/api/Maquinaria", maquinariaData, headers)
          .then((response) => {
            this.machinery.push(response.data);
            //alert("Maquinaria agregada exitosamente.");
            this.hideDialog();
            this.fetchMachineryData();
            this.$q.notify({
              message: "Registro exitoso",
              color: "positive",
              timeout: 3000,
              position: "top",
            });
          })
          .catch((error) => {
            const errorMessage =
              error.response && error.response.data
                ? error.response.data
                : error.message;

            console.log("Error al agregar la maquinaria: " + errorMessage);
          });
      }
    },

    confirmDeleteMachine(id) {
      this.machineryToDelete = id; // Almacena el ID de la maquinaria a eliminar
      this.isConfirmDialogVisible = true; // Muestra el diálogo
    },
    deleteMachine(id) {
      let token = JSON.parse(localStorage.getItem("userData")).token;
      //console.log(token)

      let headers = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      this.$api
        .delete(`/api/Maquinaria/${id}`, headers)
        .then(() => {
          this.machinery = this.machinery.filter(
            (machine) => machine.idMaquinaria !== id
          );
          //alert("Maquinaria eliminada exitosamente.");
          this.$q.notify({
            message: "Eliminación exitosa",
            color: "red",
            timeout: 3000,
            position: "top",
          });
        })
        .catch((error) => {
          console.error("Error al eliminar la maquinaria: ", error);
          console.log(
            "Ocurrió un error al eliminar la maquinaria. Por favor, inténtalo de nuevo"
          );
        });
    },
    normalizeMachineryData(machine) {
      return {
        idMaquinaria: machine.idMaquinaria,
        placa: machine.placa,
        modelo: machine.modelo,
        marca: machine.marca,
        anioCompra: machine.anioCompra,
        horometroCompra: machine.horometroCompra,
        horometroActual: machine.horometroActual,
        estado: machine.estado,
      };
    },
    fetchMachineryData() {
      let token = JSON.parse(localStorage.getItem("userData")).token;
      //console.log(token)

      let headers = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };

      this.$api
        .get("/api/Maquinaria", headers)
        .then((response) => {
          this.machinery = response.data.map(this.normalizeMachineryData);
        })
        .catch((error) => {
          console.log("Error al obtener los datos de maquinaria: " + error);
        });
    },
  },
  mounted() {
    this.fetchMachineryData();
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
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.column-filter {
  width: 130px;
  font-size: 12px;
}
.header {
  width: 95%;
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
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
  margin: 0;
  flex-grow: 1;
}
.search-container {
  display: flex;
  align-items: center;
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
.machinery-table {
  width: auto;
  max-width: 1px;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 0 auto; /* Centra la tabla */
}

.machinery-table th,
.machinery-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.machinery-table th {
  background-color: rgba(0, 102, 204, 0.05);
  color: var(--primary-color);
  font-weight: bold;
}

.machinery-table tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
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

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.submit-button,
.cancel-button {
  width: 48%;
  margin: 0;
}
.submit-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
  background-color: var(--primary-hover);
  transform: scale(1.02);
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
  width: 90%;
  max-width: 600px;
  max-height: 90%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
h2#dialogTitle {
  font-size: 26px;
  margin-bottom: 20px;
  font-weight: bold;
  color: var(--primary-color);
  text-align: center;
  text-transform: uppercase;
}

.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 15px;
  color: var(--text-color);
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 15px;
  background-color: #f9f9f9;
  transition: border-color 0.3s, background-color 0.3s;
}
.form-group input:focus,
.form-group select:focus {
  border-color: var(--primary-color);
  background-color: #ffffff;
  outline: none;
}
.submit-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}
.submit-button:hover {
  background-color: var(--primary-hover);
  transform: scale(1.02);
}
.submit-button:active {
  transform: scale(0.98);
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
  max-width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-height: 800px;
  overflow-y: auto;
}
.dialog-content h2 {
  margin-bottom: 10px;
  color: #ff3333;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  flex-grow: 1;
}

.dialog-content p {
  margin-bottom: 20px;
}
.confirm-buttons {
  display: flex;
  justify-content: space-around;
}
.confirm-button {
  background-color: #ff3333;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
.cancel-button {
  background-color: #f50909;
  color: #ffffff;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}
.confirm-button:hover {
  background-color: #cc0000;
}
.cancel-button:hover {
  background-color: #aaa;
  transform: scale(1.02);
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.form-group .form-input {
  width: 100%;
}
.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
