import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login.vue";
import HomeAdmin from "@/pages/HomeAdmin.vue"; // Importe o componente HomeAdmin
import QueryResults from "@/pages/QueryResults.vue";
import QueryExams from "@/pages/QueryExams.vue";
import QueryClass from "@/pages/QueryClass.vue";
import ClassDetails from "@/pages/ClassDetails.vue";
import EditClass from "@/pages/EditClass.vue";
import RegisterResults from "@/pages/RegisterResults.vue";
import ViewStudent from "@/pages/ViewStudent.vue";

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
  },
  {
    path: "/query-exams",
    name: "QueryExams",
    component: QueryExams,
  },
  {
    path: "/query-classes",
    name: "QueryClass",
    component: QueryClass,
  },
  {
    path: "/class-detail",
    name: "class-detail",
    component: ClassDetails,
  },
  {
    path: "/edit-class",
    name: "EditClass",
    component: EditClass,
  },
  {
    path: "/register-result",
    name: "RegisterResults",
    component: RegisterResults,
  },
  {
    path: "/view-student",
    name: "ViewStudent",
    component: ViewStudent,
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
