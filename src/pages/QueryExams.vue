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
        <h2>Consultar Simulados</h2>

        <!-- Botões de filtro -->
        <div class="flex justify-end filters">
          <span>Filtros</span>
          <select
            v-model="selectedTurma"
            @change="filterByTurma"
            class="w-auto p-2 border rounded-lg"
          >
            <option class="turmaPlacehoder" value="">Turma</option>
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
            <th>Status</th>
            <th></th>
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
            <td>
              <span :class="getStatusClass(row.status)">{{ row.status }}</span>
            </td>
            <td>
              <div v-if="row.status === 'Não aplicado'">
                <router-link :to="{ name: 'HomeAdmin', params: { id: index } }"
                  >editar</router-link
                >
              </div>
              <div v-else>
                <router-link
                  :to="{ name: 'QueryResults', params: { id: index } }"
                  >resultado</router-link
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginação -->
      <div
        v-if="tableData.length > 10"
        class="pagination-controls flex justify-end mt-4"
      >
        <button
          v-if="currentPage > 1"
          @click="goToPreviousPage"
          class="pagination-button"
        >
          Anterior
        </button>
        <span class="pagination-info"
          >Página {{ currentPage }} de {{ totalPages }}</span
        >
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
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Api from "../services/axios";

export default {
  name: "QueryResults",
  components: {
    HeaderClassifica,
    Datepicker,
  },
  data() {
    return {
      //     tableData: [
      //   { "simulado": "Matemática Básica", "turma": "3º ano", "criado": "20.09.2024", "status": "Aplicado" },
      //   { "simulado": "Matemática Avançada", "turma": "5º ano", "criado": "05.09.2024", "status": "Não aplicado" },
      //   { "simulado": "Matemática Básica", "turma": "3º ano", "criado": "20.09.2024", "status": "Aplicado" },
      //   { "simulado": "Matemática Avançada", "turma": "5º ano", "criado": "05.09.2024", "status": "Não aplicado" },
      //   { "simulado": "Matemática Básica", "turma": "3º ano", "criado": "20.09.2024", "status": "Aplicado" },
      //   { "simulado": "Matemática Avançada", "turma": "5º ano", "criado": "05.09.2024", "status": "Não aplicado" },
      //   { "simulado": "Matemática Básica", "turma": "3º ano", "criado": "20.09.2024", "status": "Aplicado" },
      //   { "simulado": "Matemática Avançada", "turma": "5º ano", "criado": "05.09.2024", "status": "Não aplicado" },
      //   { "simulado": "Matemática Básica", "turma": "3º ano", "criado": "20.09.2024", "status": "Aplicado" },
      //   { "simulado": "Matemática Avançada", "turma": "5º ano", "criado": "05.09.2024", "status": "Não aplicado" },
      //   { "simulado": "Matemática Básica", "turma": "3º ano", "criado": "20.09.2024", "status": "Aplicado" },
      //   { "simulado": "Matemática Avançada", "turma": "5º ano", "criado": "05.09.2024", "status": "Não aplicado" },
      // ],
      tableData: [],
      selectedRow: null,
      selectedTurma: "",
      selectedDateRange: null,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    uniqueTurmas() {
      const turmas = this.tableData.map((row) => row.turma);
      return [...new Set(turmas)];
    },
    filteredTableData() {
      return this.tableData.filter((row) => {
        const turmaMatch =
          !this.selectedTurma || row.turma === this.selectedTurma;
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
    },
  },
  methods: {
    getStatusClass(status) {
      return status === "Aplicado" ? "status-aplicado" : "status-nao-aplicado";
    },
    async fetchTableData() {
      try {
        const response = await Api.get("/exam/");

        const data = response.data;

        data.forEach((row) => {
          row.simulado = row.name;
          row.turma = row.classes[0].className;
          row.criado = row.createdAt;
          // Se o row.date for uma data que já passou ou for hoje, status = "Aplicado"

          const now_date = new Date().toISOString().split("T")[0];

          row.status = row.date <= now_date ? "Aplicado" : "Não aplicado";

          // Formata a data para o formato dd/mm/yyyy
          row.criado = row.criado.split("T")[0].split("-").reverse().join("/");
        });

        this.tableData = data;
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    },

    goHome() {
      this.$router.push("/home-admin");
    },
    selectRow(index) {
      this.selectedRow = this.selectedRow === index ? null : index;
    },
    formatDate(date) {
      if (typeof date === "string") {
        date = new Date(date.split(".").reverse().join("-"));
      }
      return date instanceof Date ? date.getDate() : null;
    },
    filterByDate(date) {
      if (!this.selectedDateRange || this.selectedDateRange.length !== 2)
        return true;

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
    },

    async mountTable() {
      await this.fetchTableData();
    },
  },
  mounted() {
    this.mountTable();
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
  background-color: #f4f4f4;
}

.pagination-controls {
  gap: 1rem;
}

.pagination-button {
  background-color: #3490dc;
  color: white;
  padding: 0.2rem 0.9rem;
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

.status-aplicado {
  color: rgb(0, 0, 0);
  background-color: #4caf4f65;
  padding: 0.4rem 2rem;
  border: 2px solid #3a813c;
  border-radius: 15px;
  display: inline-block;
}

.status-nao-aplicado {
  color: rgb(0, 0, 0);
  background-color: #ff5a5a62;
  padding: 0.4rem 1rem;
  border: 2px solid #ac3d3d;
  border-radius: 15px;
  display: inline-block;
}

.results-table td:last-child a {
  color: inherit;
  text-decoration: none;
  padding: 0.4rem 1rem;
  display: inline-block;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 8px;
}

.results-table td:last-child a:hover {
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.37); /* Sombra sutil */
  background-color: #ffffff;
  transform: scale(1.08); /* Leve aumento */
}
</style>
