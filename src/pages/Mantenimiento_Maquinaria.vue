<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Gestión de Maquinaria</h1>
      <div class="search-container">
        <input
          type="search"
          id="search"
          v-model="searchTerm"
          placeholder="Buscar maquinaria..."
          class="search-input"
        />
        <button @click="showDialog()" class="add-button">Agregar</button>
      </div>
    </header>

    <main>
      <table class="machinery-table">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Año Compra</th>
            <th>Horómetro Compra</th>
            <th>Horómetro Actual</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="machine in filteredMachinery" :key="machine.id_maquinaria">
            <td>{{ machine.placa }}</td>
            <td>{{ machine.modelo }}</td>
            <td>{{ machine.marca }}</td>
            <td>{{ machine.anio_compra }}</td>
            <td>{{ machine.horometro_compra }}</td>
            <td>{{ machine.horometro_actual }}</td>
            <td>{{ machine.estado ? "Activo" : "Inactivo" }}</td>
            <td>
              <button @click="showDialog(machine)" class="edit-button">
                <i class="la la-edit"></i> Editar
              </button>
              <button
                @click="confirmDeleteMachine(machine.id_maquinaria)"
                class="delete-button"
              >
                <i class="la la-trash"></i> Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>

    <!-- Dialog for Add/Edit Machinery -->
    <div v-if="isDialogVisible" class="dialog">
      <div class="dialog-content">
        <h2>{{ dialogTitle }}</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="placa">Placa</label>
            <input
              type="text"
              v-model="form.placa"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="modelo">Modelo</label>
            <input
              type="text"
              v-model="form.modelo"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="marca">Marca</label>
            <input
              type="text"
              v-model="form.marca"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="anio_compra">Año de Compra</label>
            <input
              type="number"
              v-model="form.anio_compra"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="horometro_compra">Horómetro de Compra</label>
            <input
              type="number"
              v-model="form.horometro_compra"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="horometro_actual">Horómetro Actual</label>
            <input
              type="number"
              v-model="form.horometro_actual"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="estado">Estado</label>
            <select v-model="form.estado" required class="form-input">
              <option :value="true">Activo</option>
              <option :value="false">Inactivo</option>
            </select>
          </div>
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
      isEditing: false,
      searchTerm: "",
      machinery: [],
      form: {
        placa: "",
        modelo: "",
        marca: "",
        anio_compra: null,
        horometro_compra: null,
        horometro_actual: null,
        estado: true,
      },
      isDialogVisible: false,
      dialogTitle: "",
    };
  },
  computed: {
    filteredMachinery() {
      if (!this.searchTerm) {
        return this.machinery;
      }
      const term = this.searchTerm.toLowerCase();
      return this.machinery.filter((machine) =>
        Object.values(machine).some((value) =>
          value.toString().toLowerCase().includes(term)
        )
      );
    },
  },
  methods: {
    showDialog(machine = null) {
      this.dialogTitle = machine
        ? "Editar Maquinaria"
        : "Agregar Nueva Maquinaria";
      this.isEditing = !!machine;
      if (machine) {
        this.form = { ...machine };
      } else {
        this.form = {
          placa: "",
          modelo: "",
          marca: "",
          anio_compra: null,
          horometro_compra: null,
          horometro_actual: null,
          estado: true,
        };
      }
      this.isDialogVisible = true;
    },
    hideDialog() {
      this.isDialogVisible = false;
    },
    submitForm() {
      if (this.isEditing) {
        // Actualizar maquinaria existente
        this.$api
          .put(`/Maquinaria/${this.form.id_maquinaria}`, this.form)
          .then(() => {
            const index = this.machinery.findIndex(
              (m) => m.id_maquinaria === this.form.id_maquinaria
            );
            this.machinery.splice(index, 1, { ...this.form });
            alert("Maquinaria actualizada exitosamente.");
            this.hideDialog();
          })
          .catch((error) => {
            console.error("Error al actualizar la maquinaria: ", error);
            alert("Ocurrió un error al actualizar la maquinaria.");
          });
      } else {
        // Agregar nueva maquinaria
        this.$api
          .post("/Maquinaria", this.form)
          .then((response) => {
            this.machinery.push(response.data);
            alert("Maquinaria agregada exitosamente.");
            this.hideDialog();
          })
          .catch((error) => {
            console.error("Error al agregar la maquinaria: ", error);
            alert("Ocurrió un error al agregar la maquinaria.");
          });
      }
    },

    confirmDeleteMachine(id) {
      const confirmed = confirm(
        "¿Estás seguro de que desea eliminar esta maquinaria?"
      );
      if (confirmed) {
        this.deleteMachine(id);
      }
    },
    deleteMachine(id) {
      this.$api
        .delete(`/Maquinaria/${id}`)
        .then(() => {
          this.machinery = this.machinery.filter(
            (machine) => machine.id_maquinaria !== id
          );
          alert("Maquinaria eliminada exitosamente.");
        })
        .catch((error) => {
          console.error("Error al eliminar la maquinaria: ", error);
          alert(
            "Ocurrió un error al eliminar la maquinaria. Por favor, inténtalo de nuevo"
          );
        });
    },
    normalizeMachineryData(machine) {
      return {
        id_maquinaria: machine.idMaquinaria,
        placa: machine.placa,
        modelo: machine.modelo,
        marca: machine.marca,
        anio_compra: machine.anioCompra,
        horometro_compra: machine.horometroCompra,
        horometro_actual: machine.horometroActual,
        estado: machine.estado,
      };
    },
    fetchMachineryData() {
      let endpointURL = "/Maquinaria";
      this.$api
        .get(endpointURL)
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

.edit-button,
.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.edit-button i,
.delete-button i {
  font-size: 20px;
  color: #0066cc;
}

.edit-button:hover i,
.delete-button:hover i {
  color: #0052a3;
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

.machinery-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.machinery-table th,
.machinery-table td {
  padding: 12px;
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

.dialog {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.dialog-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group .form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.submit-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  flex: 1;
  margin-right: 10px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: var(--primary-hover);
}

.cancel-button {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  flex: 1;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: var(--secondary-hover);
}
</style>
