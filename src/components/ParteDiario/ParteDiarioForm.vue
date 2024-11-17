<template>
  <q-page padding class="parte-diario-page">
    <div class="logo-container">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m9p9F1866neG0zpLvS5528VER0rVXF.png"
        alt="PROMCOSER Logo"
        class="logo"
      />
    </div>
    <h1 class="text-h4 q-mb-md text-center text-primary">Parte Diario</h1>
    <q-card class="q-mb-md form-card">
      <q-card-section>
        <div class="text-h6 text-secondary">Registro de Parte Diario</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="guardarParteDiario" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select
                filled
                v-model="idClienteSeleccionado"
                :options="clientesAllOptions"
                option-value="idCliente"
                option-label="nombre"
                label="Cliente"
                use-input
                @filter="filterClientes"
                :rules="[(val) => !!val || 'Campo requerido']"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No se encontraron resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-12 col-md-6">
              <q-select
                filled
                v-model="idMaquinariaSeleccionado"
                :options="maquinariasAllOptions"
                option-value="idMaquinaria"
                option-label="placa"
                label = "Placa de la maquina"
                use-input
                @filter="filterMaquinarias"
                :rules="[(val) => !!val || 'Campo requerido']"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No se encontraron resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                filled
                v-model="parteDiario.fecha"
                label="Fecha"
                type="date"
                :rules="[(val) => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select
                filled
                v-model="idOperadorSeleccionado"
                :options="operadoresAllOptions"
                option-value = "idPersonal"
                option-label = "nombre"
                label="Operador"
                use-input
                @filter="filterOperadores"
                :rules="[(val) => !!val || 'Campo requerido']"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No se encontraron resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                filled
                v-model="parteDiario.horometroInicio"
                label="Horómetro Inicio"
                type="number"
                :rules="[(val) => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                v-model="parteDiario.horometroFinal"
                label="Horómetro Final"
                type="number"
                :rules="[(val) => !!val || 'Campo requerido']"
              />
            </div>
          </div>

          <q-input
            filled
            v-model="parteDiario.lugarTrabajo"
            label="Lugar de Trabajo"
            :rules="[(val) => !!val || 'Campo requerido']"
          />

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-input
                filled
                v-model="parteDiario.petroleo"
                label="Petróleo (L)"
                type="number"
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                filled
                v-model="parteDiario.aceiteHidraulico"
                label="Aceite Hidráulico (L)"
                type="number"
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                filled
                v-model="parteDiario.proximoMantenimiento"
                label="Próximo Mantenimiento"
                type="date"
              />
            </div>
          </div>

          <q-checkbox
            v-model="parteDiario.firmado"
            label="Firmado por el operador y el cliente"
          />

          <q-separator class="q-my-md" />

          <div class="text-h6 text-secondary q-mb-md">
            Detalles del Parte Diario
          </div>

          <q-list bordered separator>
            <q-item
              v-for="(detalle, index) in parteDiario.detalles"
              :key="index"
            >
              <q-item-section>
                <q-input
                  filled
                  v-model="detalle.horas"
                  type="number"
                  label="Horas"
                  :rules="[(val) => !!val || 'Campo requerido']"
                />
              </q-item-section>
              <q-item-section>
                <q-input
                  filled
                  v-model="detalle.trabajoEfectuado"
                  label="Trabajo Efectuado"
                  :rules="[(val) => !!val || 'Campo requerido']"
                />
              </q-item-section>
              <q-item-section>
                <q-input
                  filled
                  v-model="detalle.descripcion"
                  type="textarea"
                  label="Descripción"
                  :rules="[(val) => !!val || 'Campo requerido']"
                />
              </q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  round
                  color="negative"
                  icon="delete"
                  @click="eliminarDetalle(index)"
                />
              </q-item-section>
            </q-item>
          </q-list>

          <q-btn
            label="Agregar Detalle"
            icon="add"
            color="secondary"
            @click="agregarDetalle"
            class="q-mt-sm"
          />

          <q-btn
            label="Guardar Parte Diario"
            type="submit"
            color="primary"
            class="full-width q-mt-md"
          />
        </q-form>
      </q-card-section>
    </q-card>

    <q-card class="activities-card">
      <q-card-section>
        <div class="text-h6 text-secondary">Partes Diarios Registrados</div>
      </q-card-section>

      <q-card-section>
        <q-list v-if="partesDiarios.length > 0" bordered separator>
          <q-expansion-item
            v-for="parte in partesDiarios"
            :key="parte.id"
            :label="`${parte.fecha} - ${parte.cliente}`"
            header-class="text-primary"
          >
            <q-card>
              <q-card-section>
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <p>
                      <strong>Placa de la Máquina:</strong>
                      {{ parte.placaMaquina }}
                    </p>
                    <p><strong>Operador:</strong> {{ parte.operador }}</p>
                    <p>
                      <strong>Lugar de Trabajo:</strong>
                      {{ parte.lugarTrabajo }}
                    </p>
                    <p>
                      <strong>Horómetro Inicio:</strong>
                      {{ parte.horometroInicio }}
                    </p>
                    <p>
                      <strong>Horómetro Final:</strong>
                      {{ parte.horometroFinal }}
                    </p>
                  </div>
                  <div class="col-12 col-md-6">
                    <p><strong>Petróleo:</strong> {{ parte.petroleo }} L</p>
                    <p>
                      <strong>Aceite Hidráulico:</strong>
                      {{ parte.aceiteHidraulico }} L
                    </p>
                    <p>
                      <strong>Próximo Mantenimiento:</strong>
                      {{ parte.proximoMantenimiento }}
                    </p>
                    <p>
                      <strong>Firmado:</strong>
                      {{ parte.firmado ? "Sí" : "No" }}
                    </p>
                  </div>
                </div>
                <q-separator class="q-my-md" />
                <div class="text-h6 text-secondary q-mb-md">
                  Detalles del Parte Diario
                </div>
                <q-list bordered separator>
                  <q-item
                    v-for="(detalle, index) in parte.detalles"
                    :key="index"
                  >
                    <q-item-section>
                      <p><strong>Horas:</strong> {{ detalle.horas }}</p>
                      <p>
                        <strong>Trabajo Efectuado:</strong>
                        {{ detalle.trabajoEfectuado }}
                      </p>
                      <p>
                        <strong>Descripción:</strong> {{ detalle.descripcion }}
                      </p>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <div v-else class="text-center q-pa-md">
          No hay partes diarios registrados.
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      partesDiarios: [],
      parteDiario: {
        cliente: null,
        placaMaquina: null,
        operador: null,
        serie: null,
        fecha: "",
        horometroInicio: "",
        horometroFinal: "",
        lugarTrabajo: "",
        petroleo: "",
        aceiteHidraulico: "",
        proximoMantenimiento: "",
        firmado: false,
        detalles: [],
      },
      clientesOptions: [],
      clientesAllOptions: [],
      maquinariasOptions: [],
      maquinariasAllOptions: [],
      operadoresOptions: [],
      operadoresAllOptions: [],
      idMaquinariaSeleccionado: null,
      idClienteSeleccionado: null,
      idOperadorSeleccionado: null,
    };
  },
  methods: {
    // Función para obtener los clientes desde la API
    async fetchClientes() {
      try {
        const response = await this.$api.get("/api/Clientes");
        //console.log(response);
        this.clientesOptions = response.data.map((cliente) => cliente.nombre);
        this.clientesAllOptions = response.data;
       /*  console.log("Clientes: " + JSON.stringify(this.clientesAllOptions));
        console.log(
          "Cliente seleccionado: " + JSON.stringify(this.idClienteSeleccionado)
        ); */
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    },

    // Función para obtener las maquinarias desde la API
    async fetchMaquinarias() {
      try {
        const response = await this.$api.get("/api/MaquinariasConS");
        this.maquinariasOptions = response.data.map((maquina) => maquina.placa);
        this.maquinariasAllOptions = response.data;
      } catch (error) {
        console.error("Error al obtener las maquinarias:", error);
      }
    },

    // Función para obtener los operadores desde la API
    async fetchOperadores() {
      try {
        const response = await this.$api.get("/api/Personal/GetOperadores");
        this.operadoresOptions = response.data.map((personal) => personal.nombre);
        this.operadoresAllOptions = response.data;
      } catch (error) {
        console.error("Error al obtener los operadores:", error);
      }
    },

    // Filtrar clientes para búsqueda en el dropdown
    filterClientes(val, update) {
      if (val === "") {
        update(() => {
          this.clientesOptions = this.clientesOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.clientesOptions = this.clientesOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    // Filtrar maquinarias para búsqueda en el dropdown
    filterMaquinarias(val, update) {
      if (val === "") {
        update(() => {
          this.maquinariasOptions = this.maquinariasOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.maquinariasOptions = this.maquinariasOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    // Filtrar operadores para búsqueda en el dropdown
    filterOperadores(val, update) {
      if (val === "") {
        update(() => {
          this.operadoresOptions = this.operadoresOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.operadoresOptions = this.operadoresOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    // Función para agregar detalles al parte diario
    agregarDetalle() {
      this.parteDiario.detalles.push({
        horas: "",
        trabajoEfectuado: "",
        descripcion: "",
      });
    },

    // Función para eliminar detalles del parte diario
    eliminarDetalle(index) {
      this.parteDiario.detalles.splice(index, 1);
    },

    // Función para guardar el parte diario
    guardarParteDiario() {
      //console.log(this.idOperadorSeleccionado.idPersonal)
      this.parteDiario.cliente = this.idClienteSeleccionado.idCliente
      this.parteDiario.placaMaquina = this.idMaquinariaSeleccionado.idMaquinaria
      this.parteDiario.operador = this.idOperadorSeleccionado.idPersonal
      console.log(this.parteDiario)
      return;
      if (this.parteDiario.cliente && this.parteDiario.fecha) {
        this.partesDiarios.push({
          id: Date.now(),
          ...this.parteDiario,
        });
        this.parteDiario = {
          cliente: "",
          placaMaquina: "",
          fecha: "",
          operador: "",
          horometroInicio: "",
          horometroFinal: "",
          lugarTrabajo: "",
          petroleo: "",
          aceiteHidraulico: "",
          proximoMantenimiento: "",
          firmado: false,
          detalles: [],
        };
      }
      /*
    // Función para guardar el parte diario
    guardarParteDiario() {
      //console.log("entro");
      //console.log(this.idCliente);
      //console.log(this.idMaquinaria);
      //console.log(this.idOperador);
      //console.log("para el post");
      //console.log(this.parteDiario);

      if (this.parteDiario.cliente && this.parteDiario.fecha) {
        // Primero, se realiza la solicitud POST para guardar en la base de datos
        this.$api
          .post("/api/ParteDiario", this.parteDiario) // Suponiendo que el endpoint es /api/ParteDiarios
          .then((response) => {
            console.log("Parte Diario guardado con éxito:", response.data);

            // Si la parte se guarda correctamente, se agrega a la lista local
            this.partesDiarios.push({
              id: response.data.id, // Suponiendo que la respuesta tiene el id asignado
              ...this.parteDiario,
            });

            // Limpiar el formulario después de guardar
            this.parteDiario = {
              cliente: null,
              placaMaquina: null,
              operador: null,
              serie: null,
              fecha: "",
              horometroInicio: "",
              horometroFinal: "",
              lugarTrabajo: "",
              petroleo: "",
              aceiteHidraulico: "",
              proximoMantenimiento: "",
              firmado: false,
              detalles: [],
            };
          })
          .catch((error) => {
            console.error("Error al guardar el parte diario:", error);
          });
      } */
    },
  },

  mounted() {
    // Llamar a las funciones para cargar los datos cuando el componente se monta
    this.fetchClientes();
    this.fetchMaquinarias();
    this.fetchOperadores();
  },
};
</script>

<!--
<script setup>
import { ref, onMounted } from "vue";

// Refs para almacenar los datos de las partes diarias y el detalle del parte diario
const partesDiarios = ref([]);
const parteDiario = ref({
  cliente: "",
  placaMaquina: "",
  fecha: "",
  operador: "",
  horometroInicio: "",
  horometroFinal: "",
  lugarTrabajo: "",
  petroleo: "",
  aceiteHidraulico: "",
  proximoMantenimiento: "",
  firmado: false,
  detalles: [],
});

// Refs para almacenar las opciones de los dropdowns
const clientesOptions = ref([]);
const maquinariasOptions = ref([]);
const operadoresOptions = ref([]);

// Función para obtener los clientes desde la API
const fetchClientes = async () => {
  console.log('Haciendo solicitud para obtener los clientes...')
  try {
    const response = await axios.get("/api/Clientes");
    clientesOptions.value = response.data.map((cliente) => cliente.nombre);
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
  }
};

// Función para obtener las maquinarias desde la API
const fetchMaquinarias = async () => {
  try {
    const response = await axios.get("/api/Maquinaria");
    maquinariasOptions.value = response.data.map((maquina) => maquina.placa);
  } catch (error) {
    console.error("Error al obtener las maquinarias:", error);
  }
};

// Función para obtener los operadores desde la API
const fetchOperadores = async () => {
  try {
    const response = await axios.get("/api/Operadores");
    operadoresOptions.value = response.data.map((operador) => operador.nombre);
  } catch (error) {
    console.error("Error al obtener los operadores:", error);
  }
};

// Filtrar clientes para búsqueda en el dropdown
const filterClientes = (val, update) => {
  if (val === "") {
    update(() => {
      clientesOptions.value = clientesOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    clientesOptions.value = clientesOptions.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

// Filtrar maquinarias para búsqueda en el dropdown
const filterMaquinarias = (val, update) => {
  if (val === "") {
    update(() => {
      maquinariasOptions.value = maquinariasOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    maquinariasOptions.value = maquinariasOptions.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

// Filtrar operadores para búsqueda en el dropdown
const filterOperadores = (val, update) => {
  if (val === "") {
    update(() => {
      operadoresOptions.value = operadoresOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    operadoresOptions.value = operadoresOptions.value.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};

// Función para agregar detalles al parte diario
const agregarDetalle = () => {
  parteDiario.value.detalles.push({
    horas: "",
    trabajoEfectuado: "",
    descripcion: "",
  });
};

// Función para eliminar detalles del parte diario
const eliminarDetalle = (index) => {
  parteDiario.value.detalles.splice(index, 1);
};

// Función para guardar el parte diario
const guardarParteDiario = () => {
  if (parteDiario.value.cliente && parteDiario.value.fecha) {
    partesDiarios.value.push({
      id: Date.now(),
      ...parteDiario.value,
    });
    parteDiario.value = {
      cliente: "",
      placaMaquina: "",
      fecha: "",
      operador: "",
      horometroInicio: "",
      horometroFinal: "",
      lugarTrabajo: "",
      petroleo: "",
      aceiteHidraulico: "",
      proximoMantenimiento: "",
      firmado: false,
      detalles: [],
    };
  }
};

// Llamar a las funciones para cargar los datos al montar el componente
onMounted(() => {
  fetchClientes();
  fetchMaquinarias();
  fetchOperadores();
});
</script>
-->
<style lang="scss">
.parte-diario-page {
  max-width: 1200px;
  margin: 0 auto;

  .form-card,
  .activities-card {
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .form-card {
    background-color: #f8f9fa;
  }

  .activities-card {
    background-color: #ffffff;
  }

  .q-card {
    margin-bottom: 20px;
  }

  .q-input {
    margin-bottom: 10px;
  }

  .q-btn {
    margin-top: 20px;
  }

  .q-expansion-item {
    margin-bottom: 10px;
    border-radius: 4px;
    overflow: hidden;
  }

  strong {
    color: $primary;
  }
}
</style>
