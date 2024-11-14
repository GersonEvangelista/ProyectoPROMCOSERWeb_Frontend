<template>
  <div class="register-container">
    <div class="register-form">
      <img
        class="logo"
        src="https://promcoser.com/wp-content/uploads/2015/10/logo.png"
        alt="PROMCOSER logo"
      />
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <input
            v-model="formData.nombre"
            type="text"
            id="nombre"
            required
            placeholder="Nombre"
          />
          <input
            v-model="formData.apellido"
            type="text"
            id="apellido"
            required
            placeholder="Apellido"
          />
        </div>
        <div class="form-group">
          <select v-model.number="formData.idRol" id="rol" required>
            <option :value="null" disabled selected>Seleccione rol</option>
            <option :value="1">Administrador</option>
            <option :value="2">Operador</option>
          </select>
          <input
            v-model="formData.fechNacimiento"
            type="date"
            id="fech_nacimiento"
            required
          />
        </div>
        <div class="form-group">
          <input
            v-model="formData.telefono"
            type="tel"
            id="telefono"
            required
            placeholder="Teléfono"
          />
          <input
            v-model="formData.correo"
            type="email"
            id="correo"
            required
            placeholder="Correo electrónico"
          />
        </div>
        <div class="form-group">
          <input
            v-model="formData.dni"
            type="text"
            id="dni"
            required
            placeholder="DNI"
          />
        </div>
        <div class="form-group">
          <input
            v-model="formData.username"
            type="text"
            id="username"
            required
            placeholder="Nombre de usuario"
          />
          <input
            v-model="formData.password"
            type="password"
            id="password"
            required
            placeholder="Contraseña"
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nombre: "",
        apellido: "",
        idRol: null,
        telefono: "",
        correo: "",
        dni: "",
        estado: true,
        fechNacimiento: '',
        idUbigeo: 1,
        username: "",
        password: "",
      },
    };
  },
  methods: {
  handleSubmit() {
    let endpointURL = "/api/Personal/SignUp";
    this.formData.idRol = Number(this.formData.idRol);

    if (this.formData.fechNacimiento) {
      this.formData.fechNacimiento = new Date(this.formData.fechNacimiento).toISOString();
    }

    this.$api
      .post(endpointURL, this.formData)
      .then((response) => {
        this.$q.notify({
          message: "Registro exitoso",
          color: "positive",
          timeout: 3000,
          position: "top",
        });
        this.$router.push("/login");
      })
      .catch((error) => {
        this.$q.notify({
          message: "Registro fallido, usuario no válido",
          color: "negative",
          timeout: 3000,
          position: "bottom",
        });
      });
  },
},
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(https://www.promcoser.com/wp-content/uploads/2015/08/011.jpg);
  padding: 20px;

  background-size: cover; /* Hace que el fondo cubra toda la pantalla */
  background-position: center center; /* Centra el fondo en la pantalla */
  background-attachment: fixed; /* Mantiene el fondo fijo al hacer scroll */
  height: 100vh; /* Asegura que el fondo cubra toda la altura de la ventana */
  width: 100%; /* Asegura que el fondo cubra todo el ancho de la pantalla */
  position: fixed; /* Fija el fondo para que no se mueva con el contenido */
  top: 0;
  left: 0;
}

.register-form {
  background: linear-gradient(135deg, #1d4e98, #1abc9c);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.logo {
  display: block;
  margin: 0 auto 20px;
  width: 80%;
  height: 40%;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
}

p {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: #3498db;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}
</style>
