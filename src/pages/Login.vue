<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/organisms/LoginForm.vue";

export default {
  name: "Login",
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
/* Estilos adicionais para a página de login, se necessário */
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}
</style>
