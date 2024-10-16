<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
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
