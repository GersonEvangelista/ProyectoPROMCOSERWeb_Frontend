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
          <input
            type="search"
            id="search"
            placeholder="Buscar cliente..."
            class="search-input"
            v-model="searchQuery"
            @input="filtrarClientes"
          />
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
              <th v-if="false">ID Cliente</th>
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
                <select v-model="filters.tipoCliente">
                  <option value="">Todos</option>
                  <option value="natural">Natural</option>
                  <option value="empresa">Empresa</option>
                </select>
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
                <select v-model="filters.estado">
                  <option value="">Todos</option>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
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
              <td v-if="false">{{ cliente.idCliente }}</td>
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
                <button class="delete-button" @click="EliminarCliente(cliente)">
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

      <div
        v-if="showDialog"
        id="addEditDialog"
        class="dialog"
        @click.self="cerrarDialog"
      >
        <div class="dialog-content">
          <h2 id="dialogTitle">Agregar Nuevo Cliente</h2>
          <form id="clientForm">
            <div class="form-grid">
              <div class="form-column">
                <div class="form-group">
                  <label for="tipoCliente">Tipo Cliente</label>
                  <select
                    id="tipoCliente"
                    name="tipoCliente"
                    required
                    v-model="tipoCliente"
                    @change="handleTipoClienteChange"
                  >
                    <option value="natural">Natural</option>
                    <option value="empresa">Empresa</option>
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
                <div class="form-group" v-if="divDNI">
                  <label for="dni">DNI</label>
                  <input
                    type="text"
                    id="dni"
                    name="dni"
                    required
                    v-model="dni"
                  />
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
              </div>
              <div class="form-column">
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
                <div class="form-group" v-if="false">
                  <label for="estado">Estado</label>
                  <select id="estado" name="estado" required v-model="estado">
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
                <div class="form-group" v-if="divRazonSocial">
                  <label for="razonSocial">Razón Social</label>
                  <input
                    type="text"
                    id="razonSocial"
                    name="razonSocial"
                    required
                    v-model="razonSocial"
                  />
                </div>
                <div class="form-group" v-if="divRUC">
                  <label for="ruc">RUC</label>
                  <input
                    type="text"
                    id="ruc"
                    name="ruc"
                    required
                    v-model="ruc"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="submit-button"
              @click.prevent="saveClient"
            >
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
          <h2 id="dialogTitle">Actualizar Cliente</h2>
          <form id="updateClientForm">
            <div class="form-grid">
              <div class="form-column">
                <div class="form-group">
                  <label for="tipoCliente">Tipo Cliente</label>
                  <select
                    id="tipoCliente"
                    name="tipoCliente"
                    required
                    v-model="updatetipoCliente"
                    @change="handleTipoClienteChangeUpdate"
                  >
                    <option value="natural">Natural</option>
                    <option value="empresa">Empresa</option>
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
                <div class="form-group" v-if="divDNIupdate">
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
              </div>
              <div class="form-column">
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
                  <select
                    id="estado"
                    name="estado"
                    required
                    v-model="updateestado"
                  >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
                <div class="form-group" v-if="divRazonSocialupdate">
                  <label for="razonSocial">Razón Social</label>
                  <input
                    type="text"
                    id="razonSocial"
                    name="razonSocial"
                    required
                    v-model="updaterazonSocial"
                  />
                </div>
                <div class="form-group" v-if="divRUCupdate">
                  <label for="ruc">RUC</label>
                  <input
                    type="text"
                    id="ruc"
                    name="ruc"
                    required
                    v-model="updateruc"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="submit-button"
              @click.prevent="updateClient"
            >
              Actualizar
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
      tipoCliente: "natural", // Valor inicial
      divDNI: true, // Mostrar DNI inicialmente
      divRUC: false, // Ocultar RUC inicialmente
      divRazonSocial: false,
      divDNIupdate: true,
      divRUCupdate: false,
      divRazonSocialupdate: false,
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
    handleTipoClienteChange() {
      if (this.tipoCliente === "natural") {
        // Resetea los campos de empresa si se selecciona Cliente Natural
        this.divRUC = false;
        this.divRazonSocial = false;
        this.divDNI = true;
      } else if (this.tipoCliente === "empresa") {
        this.divRUC = true;
        this.divRazonSocial = true;
        // Resetea los campos de cliente natural si se selecciona Cliente Empresa
        this.divDNI = false;
      }
    },
    handleTipoClienteChangeUpdate() {
      if (this.updatetipoCliente === "natural") {
        // Mostrar campos para cliente natural
        this.divDNIupdate = true;
        this.divRUCupdate = false;
        this.divRazonSocialupdate = false;
      } else if (this.updatetipoCliente === "empresa") {
        // Mostrar campos para cliente empresa
        this.divDNIupdate = false;
        this.divRUCupdate = true;
        this.divRazonSocialupdate = true;
      }
    },

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

      // Aplica la lógica de visibilidad de campos
      this.handleTipoClienteChangeUpdate();
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
        // !this.dni ||
        !this.telefono ||
        !this.correo ||
        !this.direccion
        // !this.estado
        // || !this.razonSocial ||
        // !this.ruc
      ) {
        this.mostrarNotificacionFail("Por favor, complete todos los campos.");
        return;
      }

      // Verificar si el DNI o RUC ya existen en la lista de clientes
      const clienteExistente = this.clientes.find(
        (cliente) => cliente.dni === this.dni || cliente.ruc === this.ruc
      );

      if (clienteExistente) {
        this.mostrarNotificacionFail(
          "El cliente con este DNI o RUC ya está registrado."
        );
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
          // Actualizar la lista de clientes después de guardar
          this.mostrarNotificacion("Se creo el nuevo cliente correctamente");
          this.obtenerClientes();
          this.cerrarDialog(); // Cerrar el diálogo
          this.limpiar();
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
        // !this.updatedni ||
        !this.updatetelefono ||
        !this.updatecorreo ||
        !this.updatedireccion ||
        !this.updateestado
        // || !this.updaterazonSocial ||
        // !this.updateruc
      ) {
        this.mostrarNotificacionFail("Se actualizo correctamente");
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
          this.mostrarNotificacion("Se actualizo correctamente");
          this.cerrarDialogUpdate();
          this.obtenerClientes();
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

      // Construir el objeto actualizado solo cambiando el estado
      const client = {
        ...this.clienteParaEliminar, // Copia los datos del cliente seleccionado
        estado: false, // Cambia el estado a inactivo (eliminación lógica)
      };

      // Construir el endpoint correctamente
      const endpointURL = `/api/Clientes/${this.clienteParaEliminar.idCliente}`;

      // Hacer la solicitud PUT para actualizar el cliente
      this.$api
        .put(endpointURL, client)
        .then((response) => {
          console.log(
            "Cliente actualizado con eliminación lógica:",
            response.data
          );
          this.obtenerClientes(); // Recargar la lista de clientes
          this.cerrarConfirmDialog(); // Cerrar el cuadro de confirmación
          this.clienteParaEliminar = null; // Limpiar la selección
        })
        .catch((error) => {
          console.error("Error al actualizar el cliente:", error);
        });
    },

    async mostrarNotificacion(mensaje) {
      // Crear y mostrar la notificación
      const notification = document.createElement("div");
      notification.className = "custom-notification";
      notification.innerText = mensaje;

      // Añadir la notificación al cuerpo del documento
      document.body.appendChild(notification);

      // Esperar unos segundos (pausa simulada)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Ocultar y eliminar la notificación
      notification.style.opacity = "0";
      setTimeout(() => {
        notification.remove();
      }, 500); // Tiempo para el desvanecimiento
    },
    async mostrarNotificacionFail(mensaje) {
      // Crear y mostrar la notificación
      const notification = document.createElement("div");
      notification.className = "custom-notification-fail";
      notification.innerText = mensaje;

      // Añadir la notificación al cuerpo del documento
      document.body.appendChild(notification);

      // Esperar unos segundos (pausa simulada)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Ocultar y eliminar la notificación
      notification.style.opacity = "0";
      setTimeout(() => {
        notification.remove();
      }, 500); // Tiempo para el desvanecimiento
    },
    limpiar() {
      // Restablece los valores de los campos del formulario
      this.tipoCliente = "natural"; // Valor predeterminado
      this.nombre = "";
      this.apellido = "";
      this.dni = "";
      this.telefono = "";
      this.correo = "";
      this.direccion = "";
      this.estado = "true"; // Activo por defecto
      this.razonSocial = "";
      this.ruc = "";

      // Restablece la visibilidad de los campos
      this.divDNI = true;
      this.divRUC = false;
      this.divRazonSocial = false;
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
  transition: opacity 0.3s;
}

.edit-button:hover,
.delete-button:hover {
  opacity: 0.7;
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.dialog-content {
  width: 80%;
  max-width: 500px;
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
.dialog-content {
  width: 90%; /* Cambiado de 80% a 90% para hacerlo más ancho */
  max-width: 900px; /* Ajusta el ancho máximo en píxeles */
  max-height: 90%; /* Altura máxima */
  background-color: white; /* Fondo blanco */
  padding: 20px; /* Espaciado interno */
  border-radius: 8px; /* Bordes redondeados */
  overflow-y: auto; /* Activar scroll si es necesario */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra */
}

.custom-notification {
  position: fixed;
  top: 60px;
  right: 20px;
  background-color: #4caf50; /* Color verde */
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  font-weight: bold;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.5s ease, transform 0.3s ease;
  transform: translateY(0);
}

.custom-notification-fail {
  position: fixed;
  top: 60px;
  right: 20px;
  background-color: #f81a1a; /* Color verde */
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  font-weight: bold;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.5s ease, transform 0.3s ease;
  transform: translateY(0);
}
.custom-notification.hide {
  opacity: 0;
  transform: translateY(-20px);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dos columnas iguales */
  gap: 20px; /* Espaciado entre columnas */
}

.form-column {
  display: flex;
  flex-direction: column;
}

.dialog-content {
  width: 90%;
  max-width: 800px; /* Asegúrate de que el cuadro de diálogo sea ancho */
  padding: 20px;
  border-radius: 8px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.submit-button {
  grid-column: span 2; /* Hace que el botón ocupe ambas columnas */
  margin-top: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dos columnas iguales */
  gap: 20px; /* Espaciado entre columnas */
}

.form-column {
  display: flex;
  flex-direction: column;
}

.dialog-content {
  width: 90%;
  max-width: 800px; /* Asegúrate de que el cuadro de diálogo sea ancho */
  padding: 20px;
  border-radius: 8px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.submit-button {
  grid-column: span 2; /* Hace que el botón ocupe ambas columnas */
  margin-top: 20px;
}
</style>
