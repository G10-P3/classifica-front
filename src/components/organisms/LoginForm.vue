<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="cpf" class="block text-gray-700">CPF:</label>
          <input
            type="text"
            id="cpf"
            v-model="cpf"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700">Senha:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>
      <div class="w-full flex justify-center mt-4">
        <p class="mr-4 text-brown-550">Primeiro acesso?</p>
        <nuxt-link to="/criar-conta">
          <p class="text-brown-550 underline">Acesse aqui.</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      cpf: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      // Aqui você pode adicionar a lógica de autenticação
      // Se a autenticação for bem-sucedida, redirecione para home-admin
      // usar router.push("/home-admin")
      window.location.href = "/home-admin";
    },
  },
};
</script>
