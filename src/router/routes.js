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
