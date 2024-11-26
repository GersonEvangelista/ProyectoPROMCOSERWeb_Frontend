const routes = [
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        // No tiene `meta.requiresAuth` porque debe ser accesible sin restricciones
      },
      {
        path: "Mantenimiento_Maquinaria",
        component: () => import("src/pages/Mantenimiento_Maquinaria.vue"),
        meta: { requiresAuth: true }, // Ruta protegida
      },
      {
        path: "cliente",
        component: () => import("src/components/Cliente/clienteForm.vue"),
        meta: { requiresAuth: true }, // Ruta protegida
      },
      {
        path: "parteDiario",
        component: () =>
          import("src/components/ParteDiario/ParteDiarioForm.vue"),
        meta: { requiresAuth: true }, // Ruta protegida
      },
      {
        path: "personal",
        component: () => import("src/components/Personal/PersonalForm.vue"),
        meta: { requiresAuth: true }, // Ruta protegida
      },
      {
        path: "reporteParteDiario",
        component: () =>
          import("src/components/Reporte/ReporteParteDiario.vue"),
        meta: { requiresAuth: true }, // Ruta protegida
      },
    ],
  },
  {
    path: "/mainOperador",
    component: () => import("layouts/MainLayoutOperador.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        // No tiene `meta.requiresAuth` porque es público
      },
      {
        path: "Mantenimiento_Maquinaria",
        component: () => import("src/pages/Mantenimiento_Maquinaria.vue"),
        meta: { requiresAuth: true }, // Ruta protegida
      },
      {
        path: "cliente",
        component: () => import("src/components/Cliente/clienteForm.vue"),
        meta: { requiresAuth: true }, // Ruta protegida
      },
      {
        path: "parteDiario",
        component: () =>
          import("src/components/ParteDiario/ParteDiarioForm.vue"),
        meta: { requiresAuth: true }, // Ruta protegida
      },
      {
        path: "reporteParteDiario",
        component: () =>
          import("src/components/Reporte/ReporteParteDiario.vue"),
        meta: { requiresAuth: true }, // Ruta protegida
      },
    ],
  },
  {
    path: "/",
    component: () => import("components/Login/LoginForm.vue"),
    // No tiene `meta.requiresAuth` porque es público
  },
  {
    path: "/loginRegistro",
    component: () => import("components/Login/RegistroLogin.vue"),
    // No tiene `meta.requiresAuth` porque es público
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
