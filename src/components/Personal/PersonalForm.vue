<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Gestión de Personal</h1>
      <div class="search-container">
        <input
          type="search"
          id="search"
          v-model="searchTerm"
          placeholder="Buscar personal..."
          class="search-input"
        />
        <button @click="showDialog()" class="add-button">Agregar</button>
      </div>
    </header>

    <main>
      <table class="personal-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>DNI</th>
            <th>Estado</th>
            <th>Fecha de Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in filteredPersonal" :key="person.idPersonal">
            <td>{{ person.idPersonal }}</td>
            <td>{{ person.nombre }}</td>
            <td>{{ person.apellido }}</td>
            <td>{{ person.idRol }}</td>
            <td>{{ person.telefono }}</td>
            <td>{{ person.correo }}</td>
            <td>{{ person.dni }}</td>
            <td>{{ person.estado ? "Activo" : "Inactivo" }}</td>
            <td>{{ formatDate(person.fechNacimiento) }}</td>
            <td>
              <button @click="showDialog(person)" class="edit-button">
                <i class="la la-edit"></i> Editar
              </button>
              <button
                @click="confirmDeletePerson(person.idPersonal)"
                class="delete-button"
              >
                <i class="la la-trash"></i> Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>

    <!-- Dialog for Add/Edit Personal -->
    <div v-if="isDialogVisible" class="dialog">
      <div class="dialog-content">
        <h2>{{ dialogTitle }}</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input
              type="text"
              v-model="form.nombre"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="apellido">Apellido</label>
            <input
              type="text"
              v-model="form.apellido"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="idRol">Rol</label>
            <input
              type="number"
              v-model="form.idRol"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input
              type="text"
              v-model="form.telefono"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="correo">Correo</label>
            <input
              type="email"
              v-model="form.correo"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="dni">DNI</label>
            <input type="text" v-model="form.dni" required class="form-input" />
          </div>
          <div class="form-group">
            <label for="estado">Estado</label>
            <select v-model="form.estado" required class="form-input">
              <option :value="true">Activo</option>
              <option :value="false">Inactivo</option>
            </select>
          </div>
          <div class="form-group">
            <label for="fechNacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              v-model="form.fechNacimiento"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="idUbigeo">Ubicación</label>
            <input
              type="number"
              v-model="form.idUbigeo"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="username">Nombre de Usuario</label>
            <input
              type="text"
              v-model="form.username"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              type="password"
              v-model="form.password"
              required
              class="form-input"
            />
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
      personal: [],
      form: {
        idPersonal: 0,
        nombre: "",
        apellido: "",
        idRol: 0,
        telefono: "",
        correo: "",
        dni: "",
        estado: true,
        fechNacimiento: "",
        idUbigeo: 0,
        username: "",
        password: "",
      },
      isDialogVisible: false,
      dialogTitle: "",
    };
  },
  computed: {
    filteredPersonal() {
      if (!this.searchTerm) {
        return this.personal;
      }
      const term = this.searchTerm.toLowerCase();
      return this.personal.filter((person) =>
        Object.values(person).some((value) =>
          value.toString().toLowerCase().includes(term)
        )
      );
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES");
    },
    showDialog(person = null) {
      this.dialogTitle = person ? "Editar Personal" : "Agregar Nuevo Personal";
      this.isEditing = !!person;
      if (person) {
        this.form = { ...person };
        this.form.fechNacimiento = this.form.fechNacimiento.split("T")[0];
      } else {
        this.form = {
          idPersonal: 0,
          nombre: "",
          apellido: "",
          idRol: 0,
          telefono: "",
          correo: "",
          dni: "",
          estado: true,
          fechNacimiento: "",
          idUbigeo: 0,
          username: "",
          password: "",
        };
      }
      this.isDialogVisible = true;
    },
    hideDialog() {
      this.isDialogVisible = false;
    },
    submitForm() {
      const formData = { ...this.form };
      formData.fechNacimiento = new Date(formData.fechNacimiento).toISOString();

      if (this.isEditing) {
        // Actualizar personal existente
        this.$api
          .put(`/api/Personal/${this.form.idPersonal}`, formData)
          .then(() => {
            const index = this.personal.findIndex(
              (p) => p.idPersonal === this.form.idPersonal
            );
            this.personal.splice(index, 1, { ...formData });
            alert("Personal actualizado exitosamente.");
            this.hideDialog();
          })
          .catch((error) => {
            console.error("Error al actualizar el personal: ", error);
            alert("Ocurrió un error al actualizar el personal.");
          });
      } else {
        // Agregar nuevo personal
        this.$api
          .post("/api/Personal", formData)
          .then((response) => {
            this.personal.push(response.data);
            alert("Personal agregado exitosamente.");
            this.hideDialog();
          })
          .catch((error) => {
            console.error("Error al agregar el personal: ", error);
            alert("Ocurrió un error al agregar el personal.");
          });
      }
    },
    confirmDeletePerson(id) {
      const confirmed = confirm(
        "¿Estás seguro de que deseas eliminar este personal?"
      );
      if (confirmed) {
        this.deletePerson(id);
      }
    },
    deletePerson(id) {
      this.$api
        .delete(`/api/Personal/${id}`)
        .then(() => {
          this.personal = this.personal.filter(
            (person) => person.idPersonal !== id
          );
          alert("Personal eliminado exitosamente.");
        })
        .catch((error) => {
          console.error("Error al eliminar el personal: ", error);
          alert(
            "Ocurrió un error al eliminar el personal. Por favor, inténtalo de nuevo."
          );
        });
    },
    fetchPersonalData() {
      this.$api
        .get("/api/Personal")
        .then((response) => {
          this.personal = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los datos del personal: ", error);
        });
    },
  },
  mounted() {
    this.fetchPersonalData();
  },
};
</script>

<style>
/* Styles remain the same as in the original code */
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

.personal-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.personal-table th,
.personal-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.personal-table th {
  background-color: rgba(0, 102, 204, 0.05);
  color: var(--primary-color);
  font-weight: bold;
}

.personal-table tr:hover {
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
