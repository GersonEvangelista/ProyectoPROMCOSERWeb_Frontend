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
          />
          <button @click="showDialog()" class="add-button">Agregar</button>
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
            <select v-model="form.idRol" required class="form-input">
              <option value="1">Ingeniero</option>
              <option value="2">Operario</option>
              <option value="3">Administrador</option>
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

      // Validate password (more than 5 characters)
      if (this.form.password.length <= 5) {
        this.$q.notify({
          message: "La contraseña debe tener más de 5 caracteres.",
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
            color: "positive",
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
          return "Ingeniero";
        case 2:
          return "Operario";
        case 3:
          return "Administrador";
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
  display: flex;
  align-items: flex-start;
  padding: 24px;
}

.logo-container {
  width: 200px;
  height: 80px;
  margin-right: 20px;
}

.logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.header-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title {
  color: #0066cc;
  margin: 0 0 15px 0;
  font-size: 28px;
}

.search-container {
  display: flex;
  align-items: center;
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
  max-width: 400px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.dialog-content h2 {
  text-align: center;
  color: var(--primary-color);
  font-size: 24px;
  margin-bottom: 20px;
}

.dialog-content form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  font-size: 16px;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.form-group .form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
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
