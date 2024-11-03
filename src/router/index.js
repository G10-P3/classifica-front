import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login.vue";
import HomeAdmin from "@/pages/HomeAdmin.vue"; // Importe o componente HomeAdmin
import QueryResults from "@/pages/QueryResults.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home-admin",
    name: "HomeAdmin",
    component: HomeAdmin,
  },
  {
    path: "/query-results",
    name: "QueryResults",
    component: QueryResults,
  }
  // Redireciona para /login por padrão se o usuário acessar uma rota inexistente
  // {
  //   path: "/:catchAll(.*)",
  //   redirect: "/login",
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
