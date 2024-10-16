<template>
  <header class="flex justify-between items-center p-4 bg-gray-800 text-white">
    <div class="flex items-center">
      <img
        :src="require('@/assets/logo.png')"
        alt="Logo"
        class="h-8 w-8 mr-2"
      />
      <span class="text-xl font-bold">Minha Logo</span>
    </div>
    <div class="flex items-center">
      <img
        :src="require('@/assets/logo.png')"
        alt="User Icon"
        class="h-8 w-8 rounded-full"
      />
      <p>Usuário</p>
      <!-- Texto de teste -->
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderClassifica",
};
</script>

<style scoped>
/* Adicione estilos específicos do componente aqui, se necessário */
</style>
