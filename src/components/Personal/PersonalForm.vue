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
      <div class="header-content">
        <h1 class="title">Gestión de Personal</h1>
        <div class="search-container">
          <input
            type="search"
            id="search"
            v-model="searchTerm"
            placeholder="Buscar personal..."
            class="search-input"
            @input="applyFilters"
          />
          <button @click="showAddDialog()" class="add-button">
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
      </div>
    </header>

    <main>
      <table class="personal-table">
        <thead>
          <tr>
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
          <tr>
            <th>
              <input
                v-model="filters.nombre"
                @input="applyFilters"
                placeholder="Filtrar Nombre..."
              />
            </th>
            <th>
              <input
                v-model="filters.apellido"
                @input="applyFilters"
                placeholder="Filtrar Apellido..."
              />
            </th>
            <th>
              <select v-model="filters.idRol" @change="applyFilters">
                <option value="">Todos</option>
                <option value="1">Administrador</option>
                <option value="2">Operario</option>
              </select>
            </th>
            <th>
              <input
                v-model="filters.telefono"
                @input="applyFilters"
                placeholder="Filtrar Teléfono..."
              />
            </th>
            <th>
              <input
                v-model="filters.correo"
                @input="applyFilters"
                placeholder="Filtrar Correo..."
              />
            </th>
            <th>
              <input
                v-model="filters.dni"
                @input="applyFilters"
                placeholder="Filtrar DNI..."
              />
            </th>
            <th>
              <select v-model="filters.estado" @change="applyFilters">
                <option value="">Todos</option>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </th>
            <th>
              <input
                v-model="filters.fechNacimiento"
                @input="applyFilters"
                placeholder="Filtrar Fecha..."
                type="date"
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in filteredPersonal" :key="person.idPersonal">
            <td>{{ person.nombre }}</td>
            <td>{{ person.apellido }}</td>
            <td>{{ getRoleName(person.idRol) }}</td>
            <td>{{ person.telefono }}</td>
            <td>{{ person.correo }}</td>
            <td>{{ person.dni }}</td>
            <td>{{ person.estado ? "Activo" : "Inactivo" }}</td>
            <td>{{ formatDate(person.fechNacimiento) }}</td>
            <td>
              <button @click="showEditDialog(person)" class="edit-button">
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
                @click="confirmDeletePerson(person.idPersonal)"
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
    </main>

    <!-- Dialog for Add Personal -->
    <div v-if="isAddDialogVisible" class="dialog">
      <div class="dialog-content">
        <h2>Agregar Nuevo Personal</h2>
        <form @submit.prevent="submitAddForm" class="form-grid">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input
              type="text"
              v-model="addForm.nombre"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="apellido">Apellido</label>
            <input
              type="text"
              v-model="addForm.apellido"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="idRol">Rol</label>
            <select v-model="addForm.idRol" required class="form-input">
              <option value="1">Administrador</option>
              <option value="2">Operario</option>
            </select>
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input
              type="text"
              v-model="addForm.telefono"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="correo">Correo</label>
            <input
              type="email"
              v-model="addForm.correo"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="dni">DNI</label>
            <input
              type="text"
              v-model="addForm.dni"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="fechNacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              v-model="addForm.fechNacimiento"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="username">Nombre de Usuario</label>
            <input
              type="text"
              v-model="addForm.username"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              type="password"
              v-model="addForm.password"
              required
              class="form-input"
            />
          </div>
          <button type="submit" class="submit-button">Guardar</button>
          <button type="button" @click="hideAddDialog" class="cancel-button">
            Cancelar
          </button>
        </form>
      </div>
    </div>

    <!-- Dialog for Edit Personal -->
    <div v-if="isEditDialogVisible" class="dialog">
      <div class="dialog-content">
        <h2>Editar Personal</h2>
        <form @submit.prevent="submitEditForm" class="form-grid">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input
              type="text"
              v-model="editForm.nombre"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="apellido">Apellido</label>
            <input
              type="text"
              v-model="editForm.apellido"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="idRol">Rol</label>
            <select v-model="editForm.idRol" required class="form-input">
              <option value="1">Administrador</option>
              <option value="2">Operario</option>
            </select>
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input
              type="text"
              v-model="editForm.telefono"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="correo">Correo</label>
            <input
              type="email"
              v-model="editForm.correo"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="dni">DNI</label>
            <input
              type="text"
              v-model="editForm.dni"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="estado">Estado</label>
            <select v-model="editForm.estado" required class="form-input">
              <option :value="true">Activo</option>
              <option :value="false">Inactivo</option>
            </select>
          </div>
          <div class="form-group">
            <label for="fechNacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              v-model="editForm.fechNacimiento"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="username">Nombre de Usuario</label>
            <input
              type="text"
              v-model="editForm.username"
              required
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              type="password"
              v-model="editForm.password"
              required
              class="form-input"
            />
          </div>
          <button type="submit" class="submit-button">Guardar</button>
          <button type="button" @click="hideEditDialog" class="cancel-button">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  </div>
  <div v-if="isDeleteDialogVisible" class="dialog">
    <div class="dialog-content delete-confirmation">
      <h2>Confirmación</h2>
      <p>¿Estás seguro de que deseas eliminar este personal?</p>
      <div class="confirmation-buttons">
        <button @click="executeDelete" class="delete-confirm-button">
          Sí, eliminar
        </button>
        <button @click="hideDeleteDialog" class="delete-cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
      personal: [],
      isAddDialogVisible: false,
      isEditDialogVisible: false,
      addForm: {
        nombre: "",
        apellido: "",
        idRol: 0,
        telefono: "",
        correo: "",
        dni: "",
        fechNacimiento: "",
        username: "",
        password: "",
      },
      editForm: {
        idPersonal: 0,
        nombre: "",
        apellido: "",
        idRol: 0,
        telefono: "",
        correo: "",
        dni: "",
        estado: true,
        fechNacimiento: "",
        username: "",
        password: "",
      },
      filters: {
        nombre: "",
        apellido: "",
        idRol: "",
        telefono: "",
        correo: "",
        dni: "",
        estado: "",
        fechNacimiento: "",
      },
      isDeleteDialogVisible: false,
      personToDeleteId: null,
    };
  },
  computed: {
    filteredPersonal() {
      return this.personal.filter((person) => {
        const matchesSearch =
          this.searchTerm === "" ||
          person.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          person.apellido.toLowerCase().includes(this.searchTerm.toLowerCase());

        return (
          matchesSearch &&
          Object.keys(this.filters).every((key) => {
            if (!this.filters[key]) return true;
            if (key === "estado") {
              return person[key].toString() === this.filters[key];
            }
            if (key === "fechNacimiento") {
              return person[key].startsWith(this.filters[key]);
            }
            if (key === "idRol") {
              return Number(person[key]) === Number(this.filters[key]);
            }
            return person[key]
              .toString()
              .toLowerCase()
              .includes(this.filters[key].toLowerCase());
          })
        );
      });
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES");
    },
    showAddDialog() {
      this.isAddDialogVisible = true;
    },
    hideAddDialog() {
      this.isAddDialogVisible = false;
      this.resetAddForm();
    },
    showEditDialog(person) {
      this.editForm = { ...person };
      this.editForm.fechNacimiento = this.editForm.fechNacimiento.split("T")[0];
      this.isEditDialogVisible = true;
    },
    hideEditDialog() {
      this.isEditDialogVisible = false;
      this.resetEditForm();
    },
    resetAddForm() {
      this.addForm = {
        nombre: "",
        apellido: "",
        idRol: 0,
        telefono: "",
        correo: "",
        dni: "",
        fechNacimiento: "",
        username: "",
        password: "",
      };
    },
    resetEditForm() {
      this.editForm = {
        idPersonal: 0,
        nombre: "",
        apellido: "",
        idRol: 0,
        telefono: "",
        correo: "",
        dni: "",
        estado: true,
        fechNacimiento: "",
        username: "",
        password: "",
      };
    },
    submitAddForm() {
      if (!this.validateForm(this.addForm)) {
        return;
      }

      const formData = { ...this.addForm, estado: true, idUbigeo: 1 };
      formData.fechNacimiento = new Date(formData.fechNacimiento).toISOString();

      let token = JSON.parse(localStorage.getItem("userData")).token;
      //console.log(token)

      let headers = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };

      this.$api
        .post("/api/Personal", formData, headers)
        .then((response) => {
          const result = response.data;

          // Manejar los códigos de error específicos
          if (result === -2) {
            this.$q.notify({
              message: "El DNI ya está en uso.",
              color: "negative",
              timeout: 3000,
              position: "top",
            });
          } else if (result === -3) {
            this.$q.notify({
              message: "El correo ya está en uso.",
              color: "negative",
              timeout: 3000,
              position: "top",
            });
          } else if (result > 0) {
            // Registro exitoso
            this.$q.notify({
              message: "Registro exitoso.",
              color: "positive",
              timeout: 3000,
              position: "top",
            });
            this.personal.push(result);
            this.hideAddDialog();
            this.fetchPersonalData();
          } else {
            // Otros errores no esperados
            this.$q.notify({
              message: "Error desconocido al agregar el personal.",
              color: "negative",
              timeout: 3000,
              position: "top",
            });
          }
        })
        .catch((error) => {
          console.error("Error al agregar el personal: ", error);
          alert("Ocurrió un error al agregar el personal.");
        });
    },
    submitEditForm() {
      if (!this.validateForm(this.editForm)) {
        return;
      }

      const formData = { ...this.editForm, idUbigeo: 1 };
      formData.fechNacimiento = new Date(formData.fechNacimiento).toISOString();

      let token = JSON.parse(localStorage.getItem("userData")).token;
      //console.log(token)

      let headers = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      this.$api
        .put(`/api/Personal/${this.editForm.idPersonal}`, formData, headers)
        .then(() => {
          this.$q.notify({
            message: "Actualización exitosa",
            color: "positive",
            timeout: 3000,
            position: "top",
          });
          const index = this.personal.findIndex(
            (p) => p.idPersonal === this.editForm.idPersonal
          );
          this.personal.splice(index, 1, { ...formData });
          this.hideEditDialog();
          this.fetchPersonalData();
        })
        .catch((error) => {
          console.error("Error al actualizar el personal: ", error);
          alert("Ocurrió un error al actualizar el personal.");
        });
    },
    validateForm(form) {
      if (
        !/^[a-zA-Z\s]+$/.test(form.nombre) ||
        !/^[a-zA-Z\s]+$/.test(form.apellido)
      ) {
        this.$q.notify({
          message: "El nombre y apellido deben contener solo letras.",
          color: "red",
          timeout: 3000,
          position: "top",
        });
        return false;
      }

      if (!/^\d{9}$/.test(form.telefono)) {
        this.$q.notify({
          message: "El número de teléfono debe contener 9 dígitos.",
          color: "red",
          timeout: 3000,
          position: "top",
        });
        return false;
      }

      if (!form.correo.includes("@")) {
        this.$q.notify({
          message: "El correo electrónico debe contener @.",
          color: "red",
          timeout: 3000,
          position: "top",
        });
        return false;
      }

      if (!/^\d{8}$/.test(form.dni)) {
        this.$q.notify({
          message: "El DNI debe contener 8 dígitos numéricos.",
          color: "red",
          timeout: 3000,
          position: "top",
        });
        return false;
      }

      return true;
    },
    confirmDeletePerson(id) {
      this.personToDeleteId = id;
      this.isDeleteDialogVisible = true;
    },
    hideDeleteDialog() {
      this.isDeleteDialogVisible = false;
      this.personToDeleteId = null;
    },
    executeDelete() {
      if (this.personToDeleteId) {
        this.deletePerson(this.personToDeleteId);
        this.hideDeleteDialog();
      }
    },
    deletePerson(id) {
      let token = JSON.parse(localStorage.getItem("userData")).token;
      //console.log(token)

      let headers = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      this.$api
        .delete(`/api/Personal/${id}/logical-delete`, headers)
        .then(() => {
          this.$q.notify({
            message: "Eliminación exitosa",
            color: "red",
            timeout: 3000,
            position: "top",
          });
          /*this.personal = this.personal.filter(
            (person) => person.idPersonal !== id
          );*/
          setTimeout(() => {
            this.fetchPersonalData();
          }, 750);
        })
        .catch((error) => {
          console.error("Error al eliminar el personal: ", error);
          alert(
            "Ocurrió un error al eliminar el personal. Por favor, inténtalo de nuevo."
          );
        });
    },
    fetchPersonalData() {
      let token = JSON.parse(localStorage.getItem("userData")).token;
      //console.log(token)

      let headers = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      let token = JSON.parse(localStorage.getItem("userData")).token;
      //console.log(token)

      let headers = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };

      this.$api
        .get("/api/Personal")
        .then((response) => {
          this.personal = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los datos del personal: ", error);
        });
    },
    getRoleName(idRol) {
      switch (idRol) {
        case 1:
          return "Administrador";
        case 2:
          return "Operario";
        default:
          return "Desconocido";
      }
    },
    applyFilters() {
      // Este método se llama cuando se cambian los filtros
      // No es necesario implementarlo explícitamente ya que
      // el filtrado se realiza en la propiedad computada filteredPersonal
    },
  },
  mounted() {
    this.fetchPersonalData();
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
  display: flex;
  align-items: center;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  gap: 24px;
}

.logo-container {
  width: 150px;
  height: 60px;
  flex-shrink: 0;
}

.logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.header-content {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 24px;
}

.title {
  color: var(--primary-color);
  margin: 0;
  font-size: 28px;
  white-space: nowrap;
}

.search-container {
  display: flex;
  align-items: center;
  max-width: 300px;
  width: 100%;
}

.search-input {
  width: 100%;
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
  width: 20px;
  height: 20px;
  margin-right: 5px;
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

.personal-table th input,
.personal-table th select {
  width: 100%;
  padding: 6px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 12px;
}

.edit-button,
.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.edit-button svg,
.delete-button svg {
  width: 20px;
  height: 20px;
}

.edit-button svg {
  color: var(--primary-color);
}

.delete-button svg {
  color: var(--secondary-color);
}

.edit-button:hover svg,
.delete-button:hover svg {
  opacity: 0.8;
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
  max-width: 1000px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.dialog-content h2 {
  text-align: center;
  color: var(--primary-color);
  font-size: 24px;
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0;
}

.form-group label {
  font-weight: bold;
  font-size: 14px;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.form-group .form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
}

.submit-button,
.cancel-button {
  grid-column: 3;
  margin: 0;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button {
  grid-row: 3;
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.submit-button:hover {
  background-color: var(--primary-hover);
}

.cancel-button {
  grid-row: 4;
  background-color: var(--secondary-color);
  color: white;
  border: none;
}

.cancel-button:hover {
  background-color: var(--secondary-hover);
}
.delete-confirmation {
  max-width: 400px !important;
  text-align: center;
  padding: 2rem !important;
}

.delete-confirmation h2 {
  color: #333;
  margin-bottom: 1rem;
}

.delete-confirmation p {
  color: #666;
  margin-bottom: 1.5rem;
}

.confirmation-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.delete-confirm-button {
  background-color: #ff3333;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.delete-confirm-button:hover {
  background-color: #cc0000;
}

.delete-cancel-button {
  background-color: #e0e0e0;
  color: #666;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.delete-cancel-button:hover {
  background-color: #d0d0d0;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .logo-container {
    margin: 0 auto;
  }

  .header-content {
    flex-direction: column;
    gap: 16px;
  }

  .title {
    text-align: center;
  }

  .search-container {
    max-width: none;
  }

  .add-button {
    width: 100%;
    justify-content: center;
    margin-left: 0;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .submit-button,
  .cancel-button {
    grid-column: 1;
  }
}
</style>
