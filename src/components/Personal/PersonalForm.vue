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
          <tr>
            <th>
              <input
                v-model="filters.idPersonal"
                @input="applyFilters"
                placeholder="Filtrar ID..."
              />
            </th>
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
            <td>{{ person.idPersonal }}</td>
            <td>{{ person.nombre }}</td>
            <td>{{ person.apellido }}</td>
            <td>{{ getRoleName(person.idRol) }}</td>
            <td>{{ person.telefono }}</td>
            <td>{{ person.correo }}</td>
            <td>{{ person.dni }}</td>
            <td>{{ person.estado ? "Activo" : "Inactivo" }}</td>
            <td>{{ formatDate(person.fechNacimiento) }}</td>
            <td>
              <button @click="showDialog(person)" class="edit-button">
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

    <!-- Dialog for Add/Edit Personal -->
    <div v-if="isDialogVisible" class="dialog">
      <div class="dialog-content">
        <h2>{{ dialogTitle }}</h2>
        <form @submit.prevent="submitForm" class="form-grid">
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
            <select v-model="form.idRol" required class="form-input">
              <option value="1">Administrador</option>
              <option value="2">Operario</option>
            </select>
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
          <button type="submit" class="submit-button">Guardar</button>
          <button type="button" @click="hideDialog" class="cancel-button">
            Cancelar
          </button>
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
        username: "",
        password: "",
      },
      isDialogVisible: false,
      dialogTitle: "",
      filters: {
        idPersonal: "",
        nombre: "",
        apellido: "",
        idRol: "",
        telefono: "",
        correo: "",
        dni: "",
        estado: "",
        fechNacimiento: "",
      },
    };
  },
  computed: {
    filteredPersonal() {
      return this.personal.filter((person) => {
        return (
          Object.keys(this.filters).every((key) => {
            if (!this.filters[key]) return true;
            if (key === "estado") {
              return person[key].toString() === this.filters[key];
            }
            if (key === "fechNacimiento") {
              return person[key].startsWith(this.filters[key]);
            }
            return person[key]
              .toString()
              .toLowerCase()
              .includes(this.filters[key].toLowerCase());
          }) &&
          (this.searchTerm === "" ||
            Object.values(person).some((value) =>
              value
                .toString()
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase())
            ))
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
    showDialog(person = null) {
      this.dialogTitle = person ? "Editar Personal" : "Agregar Nuevo Personal";
      this.isEditing = !!person;
      if (person) {
        this.form = { ...person };

        // Llamada a la API para obtener datos adicionales basados en el id
        this.$api
          .get(`/api/Personal/${this.form.idPersonal}`)
          .then((response) => {
            // Actualiza 'form' con los datos obtenidos
            this.form = { ...response.data };
            this.form.fechNacimiento = this.form.fechNacimiento.split("T")[0];
          })
          .catch((error) => {
            console.error("Error al obtener los datos del personal:", error);
          });
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
      // Validate input fields
      if (!this.validateForm()) {
        return;
      }

      const formData = { ...this.form, idUbigeo: 1 };
      formData.fechNacimiento = new Date(formData.fechNacimiento).toISOString();

      if (this.isEditing) {
        // Actualizar personal existente
        this.$api
          .put(`/api/Personal/${this.form.idPersonal}`, formData)
          .then(() => {
            this.$q.notify({
              message: "Actualización exitosa",
              color: "positive",
              timeout: 3000,
              position: "top",
            });
            const index = this.personal.findIndex(
              (p) => p.idPersonal === this.form.idPersonal
            );
            console.log(formData);
            this.personal.splice(index, 1, { ...formData });
            this.hideDialog();
            setTimeout(() => {
              this.fetchPersonalData();
            }, 1000);
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
            this.$q.notify({
              message: "Registro exitoso",
              color: "positive",
              timeout: 3000,
              position: "top",
            });
            const newPerson = {
              idPersonal: response.data.idPersonal,
              nombre: response.data.nombre,
              apellido: response.data.apellido,
              idRol: response.data.idRol,
              telefono: response.data.telefono,
              correo: response.data.correo,
              dni: response.data.dni,
              estado: response.data.estado,
              fechNacimiento: response.data.fechNacimiento,
              username: response.data.username,
              password: response.data.password,
            };
            this.personal.push(newPerson);
            this.hideDialog();
            setTimeout(() => {
              this.fetchPersonalData();
            }, 1000);
          })
          .catch((error) => {
            console.error("Error al agregar el personal: ", error);
            alert("Ocurrió un error al agregar el personal.");
          });
      }
    },

    validateForm() {
      // Validate name and surname (only letters)
      if (
        !/^[a-zA-Z\s]+$/.test(this.form.nombre) ||
        !/^[a-zA-Z\s]+$/.test(this.form.apellido)
      ) {
        this.$q.notify({
          message: "El nombre y apellido deben contener solo letras.",
          color: "red",
          timeout: 3000,
          position: "top",
        });
        return false;
      }

      // Validate phone number (9 digits)
      if (!/^\d{9}$/.test(this.form.telefono)) {
        this.$q.notify({
          message: "El número de teléfono debe contener 9 dígitos.",
          color: "red",
          timeout: 3000,
          position: "top",
        });
        return false;
      }

      // Validate email (must contain @)
      if (!this.form.correo.includes("@")) {
        this.$q.notify({
          message: "El correo electrónico debe contener @.",
          color: "red",
          timeout: 3000,
          position: "top",
        });
        return false;
      }

      // Validate DNI (8 digits)
      if (!/^\d{8}$/.test(this.form.dni)) {
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
          this.$q.notify({
            message: "Eliminación exitosa",
            color: "red",
            timeout: 3000,
            position: "top",
          });
          this.personal = this.personal.filter(
            (person) => person.idPersonal !== id
          );
          //alert("Personal eliminado exitosamente.");
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
