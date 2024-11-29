<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
      <!-- Cabeçalho da página -->
      <div class="text-center mb-8">
        <!-- Substituído o logo por um texto -->
        <h1 class="mx-auto text-2xl font-bold text-gray-800 mb-4">
          Nossa Logo
        </h1>
        <h2 class="text-2xl font-semibold text-gray-800">
          Olá, que bom ter você aqui.
        </h2>
        <p class="text-gray-500">Faça seu login:</p>
      </div>

      <!-- Formulário de Login -->
      <form @submit.prevent="handleSubmit">
        <!-- Campo CPF -->
        <div class="mb-6">
          <label for="cpf" class="block text-gray-700">CPF:</label>
          <input
            type="text"
            id="cpf"
            v-model="cpf"
            required
            placeholder="Digite seu CPF"
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Campo Senha -->
        <div class="mb-8">
          <label for="password" class="block text-gray-700">Senha:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Digite sua senha"
            class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Botão Entrar -->
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Entrar
        </button>
      </form>

      <!-- Link para criação de conta e recuperação de senha -->
      <div class="text-center mt-6">
        <p class="text-gray-600">
          Primeiro acesso?
          <router-link
            to="/criar-conta"
            class="text-indigo-600 underline hover:text-indigo-700"
          >
            Acesse aqui </router-link
          >.
        </p>
        <p class="mt-2">
          <router-link
            to="/recuperar-senha"
            class="text-indigo-600 underline hover:text-indigo-700"
          >
            Esqueci minha senha </router-link
          >.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/services/axios";

export default {
  name: "LoginForm",
  data() {
    return {
      cpf: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        //lógica de autenticação
        const response = await Api.post("/users/login", {
          cpf: this.cpf,
          password: this.password,
        });

        // Redirecionar para a página home-admin após autenticação dependendo da resposta
        if (response.data == true) {
          this.$router.push("/home-admin");
        } else {
          alert("CPF ou senha inválidos");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login. Tente novamente.");
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f3f4f6;
}
</style>
