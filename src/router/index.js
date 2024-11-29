import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login.vue";
import HomeAdmin from "@/pages/HomeAdmin.vue"; // Importe o componente HomeAdmin
import QueryResults from "@/pages/QueryResults.vue";
import QueryExams from "@/pages/QueryExams.vue";
import QueryClass from "@/pages/QueryClass.vue";
import QueryStudents from "@/pages/QueryStudents.vue";
import ClassDetails from "@/pages/ClassDetails.vue";
import EditClass from "@/pages/EditClass.vue";
import RegisterExam from "@/pages/RegisterExam.vue";
import RegisterResults from "@/pages/RegisterResults.vue";
import ViewStudent from "@/pages/ViewStudent.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    meta: {
      title: "Login"
    },
    component: Login,
  },
  {
    path: "/home-admin",
    name: "HomeAdmin",
    meta: {
      title: "Início - Coordenação"
    },
    component: HomeAdmin,
  },
  {
    path: "/query-results",
    name: "QueryResults",
    meta: {
      title: "Resultado: consultar"
    },
    component: QueryResults,
  },
  {
    path: "/query-students",
    name: "QueryStudents",
    meta: {
      title: "Aluno: consultar"
    },
    component: QueryStudents,
  },
  {
    path: "/query-exams",
    name: "QueryExams",
    meta: {
      title: "Simulado: consultar"
    },
    component: QueryExams,
  },
  {
    path: "/query-classes",
    name: "QueryClass",
    meta: {
      title: "Turma: connsultar"
    },
    component: QueryClass,
  },
  {
    path: "/class-detail/:id",
    name: "class-detail",
    meta: {
      title: "Turma: detalhes"
    },
    component: ClassDetails,
  },
  {
    path: "/edit-class",
    name: "EditClass",
    meta: {
      title: "Turma: editar"
    },
    component: EditClass,
  },
  {
    path: "/register-exam",
    name: "RegisterExam",
    meta: {
      title: "Simulado: cadastrar"
    },
    component: RegisterExam,
  },
  {
    path: "/register-result",
    name: "RegisterResults",
    meta: {
      title: "Resultado: cadastrar"
    },
    component: RegisterResults,
  },
  {
    path: "/view-student",
    name: "ViewStudent",
    meta: {
      title: "Aluno: detalhes"
    },
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

router.beforeEach((to) => {
  document.title = to.meta?.title ?? "Classifica"
})
export default router;
