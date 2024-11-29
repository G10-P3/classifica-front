<template>
    <header>
      <!-- Header principal -->
      <HeaderClassifica />
    </header>
    
    <div class="page-container">
      <div class="flex items-center justify-between p-4">
        <!-- Botão de voltar -->
        <button @click="goHome" class="flex items-center mr-4 return-button">
          <img :src="require('@/assets/returnIcon.png')" alt="Ícone de retorno" class="return-icon" />
        </button>
      </div>
  
      <!-- Conteúdo da página -->
      <div class="results-container">
        <div class="header-container">
          <h2>Consultar Turmas EXEMPLO DE TURMAS</h2>
  
          <!-- Filtro de busca -->
          <div class="search-container">
            <input
              type="text"
              placeholder="Buscar turma"
              v-model="searchQuery"
              class="search-box"
            />
          </div>
        </div>
  
        <!-- Tabela de turmas -->
        <table class="results-table">
          <thead>
          <tr>
            <th>Turma</th>
            <th>Turno</th>
            <th>Quant. de Alunos</th>
            <th>Média da Turma</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="turma in paginatedTurmas"
              :key="turma.id"
              @click="selectTurma(turma)"
              class="cursor-pointer"
          >
            <td>{{ turma.className }}</td>
            <td>{{ turma.shift || 'N/A' }}</td>
            <td>{{ turma.studentCount }}</td>
            <td>{{ turma.average.toFixed(2) }}</td>
          </tr>
          </tbody>

        </table>



        <!-- Paginação -->
        <div v-if="totalPages > 1" class="pagination">
          <button
            @click="currentPage > 1 && goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
          >
            Anterior
          </button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            @click="currentPage < totalPages && goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  </template>

<script>
import axios from "axios";
import HeaderClassifica from "@/components/organisms/HeaderClassifica.vue";

export default {
  name: "QueryResults",
  components: {
    HeaderClassifica,
  },
  data() {
    return {
      searchQuery: "",
      turmas: [],
      selectedTurma: null,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    filteredTurmas() {
      const filtered = this.turmas.filter((turma) =>
          turma.className.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      console.log("Filtrando turmas:", filtered);
      return filtered;
    },
    totalPages() {
      const totalItems = this.filteredTurmas.length;
      return Math.ceil(totalItems / this.itemsPerPage);
    },
    paginatedTurmas() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      const paginated = this.filteredTurmas.slice(startIndex, endIndex);
      console.log("Turmas paginadas:", paginated);
      return paginated;
    },
  },
  methods: {
    // Método para buscar as turmas do back-end
    fetchTurmas() {
      axios
          .get("/classes/with-average")
          .then((response) => {
            console.log("Dados recebidos:", response.data);
            this.turmas = response.data;
          })
          .catch((error) => {
            console.error("Erro ao buscar turmas:", error);
          });
    },

    selectTurma(turma) {
      this.$router.push({
        name: "class-detail",
        params: { id: turma.id },
        query: { name: turma.className, shift: turma.shift },
      });
    }
    ,
    goHome() {
      this.$router.push("/home-admin");
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    this.fetchTurmas();
  },
};
</script>



<style scoped>
.page-container {
  margin-left: 5rem;
  margin-right: 8rem;
}

.return-icon {
  margin-top: 1rem;
  height: 1.5rem;
  width: 1.5rem;
}

.results-container {
  margin-top: 2rem;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 0;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-box {
  padding: 0.4rem 0.8rem;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-left: 10px;
  width: 300px;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.results-table th,
.results-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.results-table th {
  background-color: #f4f4f4;
}

.cursor-pointer {
  cursor: pointer;
}

.results-table tr:hover {
  background-color: #f1f1f1;
}

.pagination {
  margin-top: 1rem;
  text-align: center;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 1rem;
}
</style>    
