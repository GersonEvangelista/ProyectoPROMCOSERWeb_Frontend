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
                label="Placa de la maquina"
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
                option-value="idPersonal"
                option-label="nombre"
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
                v-model="parteDiario.aceite"
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
            v-model="parteDiario.firmas"
            label="Firmado por el operador y el cliente"
          />

          <q-separator class="q-my-md" />

          <q-btn
            label="Guardar Parte Diario"
            type="submit"
            color="primary"
            class="full-width q-mt-md"
          />
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Lista de Partes Diarios Registrados -->
    <div class="text-h6 text-secondary q-mb-md">Detalles del Parte Diario</div>

    <q-list bordered separator>
      <q-item-section>
        <q-input
          filled
          v-model="detalleParteDiario.horas"
          type="number"
          label="Horas"
          :rules="[(val) => !!val || 'Campo requerido']"
        />
      </q-item-section>
      <q-item-section>
        <q-input
          filled
          v-model="detalleParteDiario.trabajoEfectuado"
          label="Trabajo Efectuado"
          :rules="[(val) => !!val || 'Campo requerido']"
        />
      </q-item-section>
      <q-item-section>
        <q-input
          filled
          v-model="detalleParteDiario.descripcion"
          type="textarea"
          label="Descripción"
          :rules="[(val) => !!val || 'Campo requerido']"
        />
      </q-item-section>
    </q-list>

    <q-btn
      label="Agregar Detalle"
      icon="add"
      color="secondary"
      @click="agregarDetalle"
      class="q-mt-sm"
    />

    <q-btn
      label="Terminar registro parte diario"
      icon="done_all"
      color="green-8"
      text-color="white"
      unelevated
      class="full-width q-mt-md"
      @click="finDeRegistro"
    />

  </q-page>
</template>

<script>
export default {
  data() {
    return {
      parteDiario: {
        serie: null,
        fecha: "",
        firmas: false,
        horometroInicio: "",
        horometroFinal: "",
        idCliente: null,
        idPersonal: null,
        idMaquinaria: null,
        lugarTrabajo: "",
        petroleo: "",
        aceite: "",
        proximoMantenimiento: "",
      },
      detalleParteDiario: {
        idParteDiario: null,
        horas: null,
        trabajoEfectuado: "",
        descripcion: "",
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
        let token = JSON.parse(localStorage.getItem("userData")).token;
      //console.log(token)

      let headers = {
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      }

        const response = await this.$api.get("/api/Clientes",headers);
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
    async partesDiariosGet() {
      try {
        const response = await this.$api.get("/api/ParteDiarios");
        this.partesDiarios = response.data;
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
        this.operadoresOptions = response.data.map(
          (personal) => personal.nombre
        );
        this.operadoresAllOptions = response.data;
      } catch (error) {
        console.error("Error al obtener los operadores:", error);
      }
    },
/*
    // Filtrar clientes para búsqueda en el dropdown
    filterClientes(val, update) {
      if (val === "") {
        update(() => {
          this.clientesAllOptions = this.clientesAllOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.clientesAllOptions = this.clientesAllOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
*/


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
    async agregarDetalle() {
      try {

        //console.log("ID PARTE DIARIO: "+this.detalleParteDiario.idParteDiario)

        const endpointURL = "/api/DetalleParteDiario";
        this.$api
          .post(endpointURL, this.detalleParteDiario)
          .then((response) => {
            this.$q.notify({
              message: "Registro exitoso",
              color: "positive",
              timeout: 3000,
              position: "top",
            });
            this.partesDiarios.push(response.data);
            this.detalleParteDiario.horas = 1;
            this.detalleParteDiario.trabajoEfectuado = " ";
            this.detalleParteDiario.descripcion = " ";
          })
          .catch((error) => {
            //console.log("Esto es error");
            this.$q.notify({
              message: "Registro no válido",
              color: "negative",
              timeout: 3000,
              position: "bottom",
            });
          });

        return;
      } catch (error) {
        console.error("Error al agregar el detalle:", error);
      }
    },

    finDeRegistro() {
      window.location.reload();
      this.$q.notify({
            message: "Registro parte diario terminado",
            color: "positive",
            timeout: 3000,
            position: "top",
          });
    },

    // Función para guardar el parte diario
    guardarParteDiario() {
      //console.log(this.idOperadorSeleccionado.idPersonal)
      this.parteDiario.idCliente = this.idClienteSeleccionado.idCliente;
      this.parteDiario.idMaquinaria =
        this.idMaquinariaSeleccionado.idMaquinaria;
      this.parteDiario.idPersonal = this.idOperadorSeleccionado.idPersonal;

      const endpointURL = "/api/ParteDiario/getIdparaPostDetalles";
      this.$api
        .post(endpointURL, this.parteDiario)
        .then((response) => {
          this.$q.notify({
            message: "Registro exitoso",
            color: "positive",
            timeout: 3000,
            position: "top",
          });
          this.detalleParteDiario.idParteDiario = response.data
          //console.log(this.detalleParteDiario.idParteDiario)
          this.partesDiarios.push(response.data);
          this.$router.push("/mainOperador/parteDiario");
        })
        .catch((error) => {
          //console.log("Esto es error");
          this.$q.notify({
            message: "Registro no válido",
            color: "negative",
            timeout: 3000,
            position: "bottom",
          });
        });

      return;
    },

  },

  mounted() {
    // Llamar a las funciones para cargar los datos cuando el componente se monta
    this.fetchClientes();
    this.fetchMaquinarias();
    this.fetchOperadores();
    this.partesDiariosGet();
  },
};
</script>

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
