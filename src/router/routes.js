const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "Mantenimiento_Maquinaria",
        component: () => import("src/pages/Mantenimiento_Maquinaria.vue"),
      },
      {
        path: "cliente",
        component: () => import("src/components/Cliente/clienteForm.vue"),
      },
      {
        path: "parteDiario",
        component: () => import("src/components/ParteDiario/ParteDiarioForm.vue"),
      },
      {
        path: "personal",
        component: () => import("src/components/Personal/PersonalForm.vue"),
      },
      {
        path: "reporteParteDiario",
        component: () =>
          import("src/components/Reporte/ReporteParteDiario.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("components/Login/LoginForm.vue"),
  },
  {
    path: "/loginRegistro",
    component: () => import("components/Login/RegistroLogin.vue"),
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
