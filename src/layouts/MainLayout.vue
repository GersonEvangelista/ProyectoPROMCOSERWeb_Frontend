<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>PROMCOSER</q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Secciones</q-item-label>

        <q-item
          v-for="link in linksList"
          :key="link.title"
          clickable
          @click="goToPage(link.route)"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

const linksList = [
  {
    title: "Maquinaria",
    caption: "Gestión de maquinaria",
    icon: "build",
    route: "/Mantenimiento_Maquinaria",
  },
  {
    title: "Personal",
    caption: "Gestión de personal",
    icon: "people",
    route: "/personal",
  },
  {
    title: "Cliente",
    caption: "Gestión de clientes",
    icon: "person",
    route: "/cliente",
  },
  {
    title: "Parte Diario",
    caption: "Registro de parte diario",
    icon: "book",
    route: "/parteDiario",
  },
];

export default defineComponent({
  name: "MainLayout",

  data() {
    return {
      linksList,
      leftDrawerOpen: false,
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    goToPage(route) {
      this.$router.push(route);
      this.leftDrawerOpen = false; // Cierra el menú después de navegar
    },
  },
});
</script>

<style scoped>


</style>
