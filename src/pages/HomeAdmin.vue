<template>
  <div>
    <HeaderClassifica />
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center mb-8">
        <!-- Substituído o logo por um texto -->
        <h2 class="text-2xl font-semibold text-gray-800">Olá, Professor</h2>
      </div>
      <!-- Container principal -->
      <div class="bg-white p-8 rounded-lg w-full max-w-4xl mb-8">
        <div class="flex flex-row justify-between items-start">
          <!-- Calendário (Centralizado no topo) -->
          <div class="w-60% flex flex-col items-center justify-center border-black border-2 rounded">
            <div class="bg-gray-100 p-4 rounded-lg w-full">
              <h3 class="text-xl font-semibold mb-4 text-center">Outubro</h3>
              <div class="grid grid-cols-7 gap-2">
                <div
                  v-for="day in daysInMonth"
                  :key="day"
                  class="h-10 w-10 flex items-center justify-center rounded hover:bg-gray-200 cursor-pointer"
                  :class="{ 'bg-gray-300': day === today }"
                >
                  {{ day }}
                </div>
              </div>
            </div>
          </div>

          <!-- Botões Cadastrar -->
          <div class="w-38% flex flex-col items-center space-y-4">
            <div class="w-full h-48% border-black border-2 rounded">
              <button
                class="w-full h-full bg-white-500 text-black py-12 px-4 rounded-md hover:bg-gray-600"
              >
                Cadastrar novo<br />Simulado
              </button>
            </div>
            <div class="w-full h-48% border-black border-2 rounded">
              <button
                class="w-full h-full bg-white-500 text-black py-12 px-4 rounded-md hover:bg-gray-600"
              >
                Cadastrar<br />Resultados
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Navegação e botões -->
      <div class="bg-white rounded-lg w-full max-w-4xl flex flex-col items-center justify-center">
        <div class="relative h-4/5 w-full max-w-[832px]">
          <button
            @click="prev"
            class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
          >
            &lt;
          </button>
          <transition-group
            name="fade"
            tag="div"
            class="flex flex-row justify-between overflow-hidden space-x-4 mx-12"
          >
            <div
              v-for="(button, index) in visibleButtons"
              :key="index"
              class="flex flex-col justify-between w-1/5 h-24 border-black border-2 rounded transition-opacity duration-500 m-2"
            >
              <button
                class="bg-white-500 text-black py-8 px-4 rounded-md hover:bg-gray-600 w-full h-full flex items-center justify-center text-center"
              >
                {{ button }}
              </button>
            </div>
          </transition-group>
          <button
            @click="next"
            class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
        <div class="flex justify-center mt-4">
          <span
            v-for="(dot, index) in totalPages"
            :key="index"
            class="mx-1 h-2 w-2 rounded-full"
            :class="{
              'bg-gray-500': currentPage === index,
              'bg-gray-300': currentPage !== index,
            }"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderClassifica from "@/components/organisms/HeaderClassifica.vue";

export default {
  name: "HomeAdmin",
  components: {
    HeaderClassifica,
  },
  data() {
    return {
      buttons: [
        "Consultar Resultados",
        "Consultar Simulados",
        "Consultar Turmas",
        "Consultar Alunos",
        "Métricas",
        "Botão 6",
        "Botão 7",
        "Botão 8",
        "Botão 9",
        "Botão 10",
      ],
      currentPage: 0,
      daysInMonth: Array.from({ length: 31 }, (_, i) => i + 1), // Dias do mês (1 a 31)
      today: new Date().getDate(), // Dia atual
    };
  },
  computed: {
    visibleButtons() {
      const start = this.currentPage * 5;
      return this.buttons.slice(start, start + 5);
    },
    totalPages() {
      return Math.ceil(this.buttons.length / 5);
    },
  },
  methods: {
    next() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    },
    prev() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
