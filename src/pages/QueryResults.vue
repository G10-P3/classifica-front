<template>
  <header>
    <!-- Header principal -->
    <HeaderClassifica />
  </header>
  <div class="page-container">
    <div class="flex items-center justify-between p-4">
      <!-- Botão de voltar -->
      <button @click="goHome" class="flex items-center mr-4 return-button">
        <span class="material-icons">
          <img
            :src="require('@/assets/returnIcon.png')"
            alt="returnIcon"
            class="return-icon"
          />
        </span>
      </button>
    </div>

    <!-- Conteúdo da página -->
    <div class="results-container">
      <div class="header-container">
        <h2>Consultar resultados</h2>

        <!-- Botões de filtro -->
        <div class="flex justify-end filters">
          <span>Filtros</span>
          <select v-model="selectedTurma" @change="filterByTurma" class="w-auto p-2 border rounded-lg ">
            <option class="turmaPlacehoder" value=""> Turma</option>
            <option v-for="turma in uniqueTurmas" :key="turma" :value="turma">
              {{ turma }}
            </option>
          </select>

          <!-- Datepicker para intervalo de datas -->
          <Datepicker
            v-model="selectedDateRange"
            range
            :format="formatDate"
            placeholder="Data"
            class="w-1/3 p-2 border rounded-lg datepicker-class"
          />
        </div>
      </div>

      <!-- Tabela de resultados -->
      <table class="results-table">
        <thead>
          <tr>
            <th>Simulado</th>
            <th>Turma</th>
            <th>Criado</th>
            <th>Aplicação</th>
            <th>Média da turma</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in paginatedTableData"
            :key="index"
            @click="selectRow(index)"
            :class="{ 'bg-blue-50': selectedRow === index }"
          >
            <td>{{ row.simulado }}</td>
            <td>{{ row.turma }}</td>
            <td>{{ row.criado }}</td>
            <td>{{ row.aplicacao }}</td>
            <td>{{ row.media }}</td>
          </tr>
        </tbody>
      </table>

        <!-- Paginação (exibida apenas se houver mais de 10 registros) -->
        <div v-if="tableData.length > 10" class="pagination-controls flex justify-end mt-4">
      <button
        v-if="currentPage > 1"
        @click="goToPreviousPage"
        class="pagination-button"
      >
        Anterior
      </button>
      <span class="pagination-info">Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        v-if="currentPage < totalPages"
        @click="goToNextPage"
        class="pagination-button"
      >
        Próxima
      </button>
    </div>
    </div>
  </div>
</template>

<script>
import HeaderClassifica from "@/components/organisms/HeaderClassifica.vue";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: "QueryResults",
  components: {
    HeaderClassifica,
    Datepicker,
  },
  data() {
    return {
      tableData: [
        { simulado: "Nome do Simulado 1", turma: "4º ano", criado: "10.10.2024", aplicacao: "17.10.2024", media: "9,4" },
        { simulado: "Nome do Simulado 2", turma: "3º ano", criado: "14.09.2024", aplicacao: "15.09.2024", media: "8,4" },
        { simulado: "Nome do Simulado 3", turma: "5º ano", criado: "12.09.2024", aplicacao: "20.09.2024", media: "9,8" },
        { simulado: "Nome do Simulado 4", turma: "4º ano", criado: "28.08.2024", aplicacao: "05.09.2024", media: "9,5" },
        { simulado: "Nome do Simulado 4", turma: "4º ano", criado: "28.08.2024", aplicacao: "05.09.2024", media: "9,5" },
        { simulado: "Nome do Simulado 4", turma: "4º ano", criado: "28.08.2024", aplicacao: "05.09.2024", media: "9,5" },
        { simulado: "Nome do Simulado 4", turma: "4º ano", criado: "28.08.2024", aplicacao: "05.09.2024", media: "9,5" },
        { simulado: "Nome do Simulado 4", turma: "4º ano", criado: "28.08.2024", aplicacao: "05.09.2024", media: "9,5" },
        { simulado: "Nome do Simulado 4", turma: "4º ano", criado: "28.08.2024", aplicacao: "05.09.2024", media: "9,5" },
        { simulado: "Nome do Simulado 4", turma: "4º ano", criado: "28.08.2024", aplicacao: "05.09.2024", media: "9,5" },
        { simulado: "Nome do Simulado 4", turma: "4º ano", criado: "28.08.2024", aplicacao: "05.09.2024", media: "9,5" },
        { simulado: "Nome do Simulado 4", turma: "4º ano", criado: "28.08.2024", aplicacao: "05.09.2024", media: "9,5" },
        { simulado: "Nome do Simulado 4", turma: "4º ano", criado: "28.08.2024", aplicacao: "05.09.2024", media: "9,5" }
        // Adicione mais dados para testar a paginação
      ],
      selectedRow: null,
      selectedTurma: '',
      selectedDateRange: null,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    uniqueTurmas() {
      const turmas = this.tableData.map(row => row.turma);
      return [...new Set(turmas)];
    },
    filteredTableData() {
      return this.tableData.filter(row => {
        const turmaMatch = !this.selectedTurma || row.turma === this.selectedTurma;
        const dateMatch = this.filterByDate(row.criado);
        return turmaMatch && dateMatch;
      });
    },
    paginatedTableData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = this.currentPage * this.itemsPerPage;
      return this.filteredTableData.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredTableData.length / this.itemsPerPage);
    }
  },
  methods: {
    goHome() {
      this.$router.push("/home-admin");
    },
    selectRow(index) {
      this.selectedRow = (this.selectedRow === index) ? null : index; 
    },
    formatDate(date) {
      if (typeof date === 'string') {
        date = new Date(date.split('.').reverse().join('-')); 
      }
      return date instanceof Date ? date.getDate() : null; 
    },
    filterByDate(date) {
      if (!this.selectedDateRange || this.selectedDateRange.length !== 2) return true;

      const [startDate, endDate] = this.selectedDateRange;
      const [day, month, year] = date.split(".");
      const currentDate = new Date(`${year}-${month}-${day}`);

      return currentDate >= startDate && currentDate <= endDate;
    },
    filterByTurma() {},
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  }
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
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

select option {
  color: black; 
}

select {
  padding: 0.4rem 0.8rem;
  color: rgb(168, 159, 159);
  border: 1px solid #cccccca6;
  border-radius: 4px;
  background-color: #fff; 
  font-size: 1rem; 
  transition: border-color 0.3s;
}

select:hover {
  border-color: #aaa;
}

.datepicker-class {
  border: none; 
  box-shadow: none;
}


select:focus {
  outline: none; 
  border-color: #26303a88; 
  box-shadow: 0 0 3px rgba(5, 6, 7, 0.5);
}

.results-table {
  border-collapse: separate;
  width: 100%;
  border: 1px solid #dddddd85;
  text-align: center;
  border-spacing: 0; 
  border-radius: 20px; 
  overflow: hidden; 
}

.results-table th {
  border-bottom: 1px solid #dddddd85;
  padding: 0.8rem;
}

.results-table td {
  border: 1px solid #dddddd85;
  padding: 0.8rem;
}

.results-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.results-table tbody tr:hover {
  cursor: pointer; 
}

.pagination-controls {
  gap: 1rem;
}

.pagination-button {
  background-color: #3490dc;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-button:disabled {
  background-color: #cbd5e0;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 1rem;
}

</style>
