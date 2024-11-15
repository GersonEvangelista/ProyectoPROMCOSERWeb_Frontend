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
        <h1 class="title">Gestión de Clientes</h1>
        <div class="search-container">
          <button
            type="button"
            id="addClientBtn"
            class="add-button"
            @click="AgregarCliente"
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
        <table class="client-table">
          <thead>
            <tr>
              <th>ID Cliente</th>
              <th>Tipo Cliente</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Estado</th>
              <th>Razón Social</th>
              <th>RUC</th>
              <th>Acciones</th>
            </tr>
            <tr>
              <th>
                <input
                  type="text"
                  v-model="filters.idCliente"
                  placeholder="Filtrar..."
                />
              </th>
              <th>
                <input
                  type="text"
                  v-model="filters.tipoCliente"
                  placeholder="Filtrar..."
                />
              </th>
              <th>
                <input
                  type="text"
                  v-model="filters.nombre"
                  placeholder="Filtrar..."
                />
              </th>
              <th>
                <input
                  type="text"
                  v-model="filters.apellido"
                  placeholder="Filtrar..."
                />
              </th>
              <th>
                <input
                  type="text"
                  v-model="filters.dni"
                  placeholder="Filtrar..."
                />
              </th>
              <th>
                <input
                  type="text"
                  v-model="filters.telefono"
                  placeholder="Filtrar..."
                />
              </th>
              <th>
                <input
                  type="text"
                  v-model="filters.correo"
                  placeholder="Filtrar..."
                />
              </th>
              <th>
                <input
                  type="text"
                  v-model="filters.direccion"
                  placeholder="Filtrar..."
                />
              </th>
              <th>
                <input
                  type="text"
                  v-model="filters.estado"
                  placeholder="Filtrar..."
                />
              </th>
              <th>
                <input
                  type="text"
                  v-model="filters.razonSocial"
                  placeholder="Filtrar..."
                />
              </th>
              <th>
                <input
                  type="text"
                  v-model="filters.ruc"
                  placeholder="Filtrar..."
                />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in filteredClientes" :key="cliente.idCliente">
              <td>{{ cliente.idCliente }}</td>
              <td>{{ cliente.tipoCliente }}</td>
              <td>{{ cliente.nombre }}</td>
              <td>{{ cliente.apellido }}</td>
              <td>{{ cliente.dni }}</td>
              <td>{{ cliente.telefono }}</td>
              <td>{{ cliente.correo }}</td>
              <td>{{ cliente.direccion }}</td>
              <td>{{ cliente.estado ? "Activo" : "Inactivo" }}</td>
              <td>{{ cliente.razonSocial }}</td>
              <td>{{ cliente.ruc }}</td>
              <td>
                <button class="edit-button" @click="ActualizarCliente(cliente)">
                  Editar
                </button>

                <button class="delete-button" @click="EliminarCliente(cliente)">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      <div
        v-if="showDialog"
        id="addEditDialog"
        class="dialog"
        @click.self="cerrarDialog"
      >
        <div class="dialog-content">
          <h2 id="dialogTitle">Agregar Nuevo Cliente</h2>
          <form id="clientForm">
            
            <div class="form-group">
              <label for="tipoCliente">Tipo Cliente</label>
              <select
                id="tipoCliente"
                name="tipoCliente"
                required
                v-model="tipoCliente"
              >
                <option value="natural">natural</option>
                <option value="empresa">empresa</option>
              </select>
            </div>

            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                v-model="nombre"
              />
            </div>
            <div class="form-group">
              <label for="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                required
                v-model="apellido"
              />
            </div>
            <div class="form-group">
              <label for="dni">DNI</label>
              <input type="text" id="dni" name="dni" required v-model="dni" />
            </div>
            <div class="form-group">
              <label for="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                required
                v-model="telefono"
              />
            </div>
            <div class="form-group">
              <label for="correo">Correo</label>
              <input
                type="email"
                id="correo"
                name="correo"
                required
                v-model="correo"
              />
            </div>
            <div class="form-group">
              <label for="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                required
                v-model="direccion"
              />
            </div>
            <div class="form-group">
              <label for="estado">Estado</label>
              <select id="estado" name="estado" required v-model="estado">
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
            <div class="form-group">
              <label for="razonSocial">Razón Social</label>
              <input
                type="text"
                id="razonSocial"
                name="razonSocial"
                required
                v-model="razonSocial"
              />
            </div>
            <div class="form-group">
              <label for="ruc">RUC</label>
              <input type="text" id="ruc" name="ruc" required v-model="ruc" />
            </div>
            <button type="submit" class="submit-button" @click="saveClient">
              Agregar
            </button>
          </form>
        </div>
      </div>
      <div
        v-if="updateShowCliente"
        id="addEditDialog"
        class="dialog"
        @click.self="cerrarDialogUpdate"
      >
        <div class="dialog-content">
          <h2 id="dialogTitle">Actualizar datos del Cliente</h2>
          <form id="clientForm">
            <div class="form-group">
              <label for="idCliente">ID Cliente</label>
              <input
                type="number"
                id="idCliente"
                v-model="updateIdCliente"
                name="idCliente"
                required
              />
            </div>
            <div class="form-group">
              <label for="tipoCliente">Tipo Cliente</label>
              <select
                id="tipoCliente"
                name="tipoCliente"
                required
                v-model="updatetipoCliente"
              >
                <option value="natural">natural</option>
                <option value="empresa">empresa</option>
              </select>
            </div>

            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                v-model="updatenombre"
              />
            </div>
            <div class="form-group">
              <label for="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                required
                v-model="updateapellido"
              />
            </div>
            <div class="form-group">
              <label for="dni">DNI</label>
              <input
                type="text"
                id="dni"
                name="dni"
                required
                v-model="updatedni"
              />
            </div>
            <div class="form-group">
              <label for="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                required
                v-model="updatetelefono"
              />
            </div>
            <div class="form-group">
              <label for="correo">Correo</label>
              <input
                type="email"
                id="correo"
                name="correo"
                required
                v-model="updatecorreo"
              />
            </div>
            <div class="form-group">
              <label for="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                required
                v-model="updatedireccion"
              />
            </div>
            <div class="form-group">
              <label for="estado">Estado</label>
              <select id="estado" name="estado" required v-model="updateestado">
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
            <div class="form-group">
              <label for="razonSocial">Razón Social</label>
              <input
                type="text"
                id="razonSocial"
                name="razonSocial"
                required
                v-model="updaterazonSocial"
              />
            </div>
            <div class="form-group">
              <label for="ruc">RUC</label>
              <input
                type="text"
                id="ruc"
                name="ruc"
                required
                v-model="updateruc"
              />
            </div>
            <button type="submit" class="submit-button" @click="updateClient">
              Actulizar
            </button>
          </form>
        </div>
      </div>
      <div
        v-if="showConfirmDialog"
        class="dialog"
        @click.self="cerrarConfirmDialog"
      >
        <div class="dialog-content">
          <h2>Confirmación</h2>
          <p>¿Estás seguro de que deseas eliminar este cliente?</p>
          <div class="confirm-buttons">
            <button @click="deleteClient" class="confirm-button">
              Sí, eliminar
            </button>
            <button @click="cerrarConfirmDialog" class="cancel-button">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "ClientTable",
  data() {
    return {
      clientes: [], // Lista de clientes obtenida de la API
      clienteParaEliminar: null, // Cliente seleccionado para eliminar
      searchQuery: "", // Almacena la consulta de búsqueda
      filters: {
        idCliente: "",
        tipoCliente: "",
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        correo: "",
        direccion: "",
        estado: "",
        razonSocial: "",
        ruc: "",
      },
      isEdit: false, // Para diferenciar entre agregar o editar
      dialogTitle: "Agregar Nuevo Cliente",
      showDialog: false, // Controla la visibilidad del diálogo
      updateShowCliente: false,
      showConfirmDialog: false,
    };
  },
  computed: {
    filteredClientes() {
      // Aplica el filtro de búsqueda por nombre además de los filtros individuales
      return this.clientes.filter((cliente) => {
        const searchMatch = cliente.nombre
          ?.toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const filtersMatch = Object.keys(this.filters).every((key) => {
          return (
            cliente[key]
              ?.toString()
              .toLowerCase()
              .includes(this.filters[key].toLowerCase()) ||
            this.filters[key] === ""
          );
        });
        return searchMatch && filtersMatch;
      });
    },
  },
  methods: {
    obtenerClientes() {
      this.$api
        .get("/api/Clientes")
        .then((response) => {
          this.clientes = response.data;
          console.log("Clientes obtenidos:", JSON.stringify(this.clientes));
        })
        .catch((error) => {
          console.error("Error al obtener los clientes:", error);
        });
    },
    AgregarCliente() {
      this.showDialog = true; // Muestra el diálogo
    },
    EliminarCliente(cliente) {
      this.clienteParaEliminar = cliente;
      this.showConfirmDialog = true; // Muestra el cuadro de confirmación
    },
    cerrarConfirmDialog() {
      this.showConfirmDialog = false; // Cierra el cuadro de confirmación
    },
    cerrarDialog() {
      this.showDialog = false; // Cierra el cuadro de agregar
    },
    ActualizarCliente(cliente) {
      // Asigna los datos del cliente seleccionado a los campos del cuadro de diálogo
      this.updateIdCliente = cliente.idCliente;
      this.updatetipoCliente = cliente.tipoCliente;
      this.updatenombre = cliente.nombre;
      this.updateapellido = cliente.apellido;
      this.updatedni = cliente.dni;
      this.updatetelefono = cliente.telefono;
      this.updatecorreo = cliente.correo;
      this.updatedireccion = cliente.direccion;
      this.updateestado = cliente.estado ? "true" : "false";
      this.updaterazonSocial = cliente.razonSocial;
      this.updateruc = cliente.ruc;

      // Muestra el cuadro de diálogo de actualización
      this.updateShowCliente = true;
    },
    cerrarDialogUpdate() {
      this.updateShowCliente = false; // Cierra el cuadro de actualización
    },
    saveClient() {
      // Verificar si todos los campos están completos
      if (
        !this.tipoCliente ||
        !this.nombre ||
        !this.apellido ||
        !this.dni ||
        !this.telefono ||
        !this.correo ||
        !this.direccion ||
        !this.estado ||
        !this.razonSocial ||
        !this.ruc
      ) {
        alert("Por favor, complete todos los campos.");
        return;
      }

      const endpointURL = "/api/Clientes";
      const cliente = {
        idCliente: 0,
        tipoCliente: this.tipoCliente,
        telefono: this.telefono,
        correo: this.correo,
        direccion: this.direccion,
        estado: this.estado === "true",
        nombre: this.nombre,
        apellido: this.apellido,
        dni: this.dni,
        razonSocial: this.razonSocial,
        ruc: this.ruc,
      };
      console.log(cliente);
      this.$api
        .post(endpointURL, cliente)
        .then((response) => {
          console.log("Cliente guardado con éxito:", JSON.stringify(response));
        })
        .catch((error) => {
          console.log("Error al guardar el cliente:", error);
        });
    },
    updateClient() {
      // Verificar si todos los campos están completos
      if (
        !this.updatetipoCliente ||
        !this.updatenombre ||
        !this.updateapellido ||
        !this.updatedni ||
        !this.updatetelefono ||
        !this.updatecorreo ||
        !this.updatedireccion ||
        !this.updateestado ||
        !this.updaterazonSocial ||
        !this.updateruc
      ) {
        alert("Por favor, complete todos los campos.");
        return;
      }

      const cliente = {
        idCliente: this.updateIdCliente,
        tipoCliente: this.updatetipoCliente,
        telefono: this.updatetelefono,
        correo: this.updatecorreo,
        direccion: this.updatedireccion,
        estado: this.updateestado === "true",
        nombre: this.updatenombre,
        apellido: this.updateapellido,
        dni: this.updatedni,
        razonSocial: this.updaterazonSocial,
        ruc: this.updateruc,
      };

      const endpointURL = "/api/Clientes/" + this.updateIdCliente;
      console.log(cliente);

      this.$api
        .put(endpointURL, cliente)
        .then((response) => {
          console.log(
            "Cliente actualizado con éxito:",
            JSON.stringify(response)
          );
        })
        .catch((error) => {
          console.log("Error al actualizar el cliente:", error);
        });
    },
    deleteClient() {
      if (!this.clienteParaEliminar) {
        console.error("No hay cliente seleccionado para eliminar.");
        return;
      }

      const endpointURL = "/api/Clientes/" + this.clienteParaEliminar.idCliente;

      this.$api
        .delete(endpointURL)
        .then((response) => {
          console.log("Cliente eliminado con éxito:", JSON.stringify(response));
          this.obtenerClientes(); // Recargar la lista de clientes
          this.cerrarConfirmDialog(); // Cerrar el cuadro de confirmación
          this.clienteParaEliminar = null; // Limpiar la selección del cliente
        })
        .catch((error) => {
          console.error("Error al eliminar el cliente:", error);
        });
    },
  },
  mounted() {
    this.obtenerClientes(); // Llama al método para obtener los clientes al montar el componente
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

.add-button svg {
  margin-right: 5px;
}

.client-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.client-table th,
.client-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.client-table th {
  background-color: rgba(0, 102, 204, 0.05);
  color: var(--primary-color);
  font-weight: bold;
}

.client-table tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.client-table th input[type="text"] {
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
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
  display: flex;
  align-items: center; /* Centra el contenido verticalmente */
  justify-content: center; /* Centra el contenido horizontalmente */
  z-index: 1;
}

.dialog-content {
  width: 80%; /* Ajusta el ancho según tus necesidades */
  max-width: 500px; /* Limita el ancho máximo para evitar que se expanda demasiado */
  max-height: 90%; /* Limita la altura para permitir scroll */
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  overflow-y: auto; /* Permite desplazamiento vertical solo dentro del cuadro */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Agrega sombra para mayor enfoque */
}

h2#dialogTitle {
  font-size: 26px; /* Aumenta un poco el tamaño del título */
  margin-bottom: 20px;
  font-weight: bold;
  color: var(--primary-color);
  text-align: center;
  text-transform: uppercase; /* Cambia a mayúsculas para dar más énfasis */
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 15px; /* Aumenta el tamaño de la etiqueta para mejor visibilidad */
  color: var(--text-color); /* Asegura que el color sea consistente */
}

.form-group input,
.form-group select {
  width: 100%; /* Asegura que los select también ocupen el ancho completo */
  padding: 10px; /* Incrementa el padding para una experiencia de entrada más cómoda */
  border: 1px solid var(--border-color);
  border-radius: 6px; /* Un borde ligeramente más redondeado para un aspecto moderno */
  font-size: 15px;
  background-color: #f9f9f9; /* Agrega un color de fondo claro para diferenciar los campos */
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
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
  display: flex;
  align-items: center; /* Centra el contenido verticalmente */
  justify-content: center; /* Centra el contenido horizontalmente */
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
}

.dialog-content h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #ff3333;
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
</style>
