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
          <h2>Consultar Alunos</h2>
  
          <div class="flex justify-end filters">
            <input 
              v-model="searchName" 
              type="text" 
              placeholder="Digite o nome do aluno" 
              class="w-56 p-2 border rounded-lg"
            />
          </div>
        </div>

        <table class="results-table">
          <thead>
          <tr>
            <th>Nome</th>
            <th>Turma</th>
            <th>Idade</th>
            <th>Média do aluno</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(row, index) in paginatedTableData"
              :key="index"
              @click="selectRow(index)"
              :class="{ 'bg-blue-50': selectedRow === index }"
          >
            <td class="flex items-center justify-start gap-2">
              <img
                  :src="require('@/assets/search.png')"
                  alt="search-icon"
                  class="search-icon cursor-pointer"
                  @click="goToDetails(row)"
              />
              <span class="text-center flex-1">{{ row.fullName }}</span>
            </td>
            <td>{{ row.turma }}</td>
            <td>{{ row.idade }}</td>
            <td>{{ row.media }}</td>
          </tr>
          </tbody>
        </table>


        <!-- Paginação -->
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
  import axios from "axios";


  export default {
    name: "QueryStudents",
    components: {
      HeaderClassifica,
    },
    data() {
      return {
        tableData: [], // Dados da tabela
        searchName: "", // Campo de busca
        selectedRow: null,
        currentPage: 1,
        itemsPerPage: 10,
      };
    },
    computed: {
      filteredTableData() {
        // Filtrar os dados com base na busca
        return this.tableData.filter((row) =>
            row.fullName.toLowerCase().includes(this.searchName.toLowerCase())
        );
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
      async fetchStudents() {
        try {
          const response = await axios.get("http://localhost:8080/students/details");
          this.tableData = response.data.map((student) => ({
            fullName: student.fullName, // Nome completo
            turma: student.className, // Nome da turma
            idade: student.age, // Idade
            media: student.average.toFixed(1), // Média com 1 casa decimal
          }));
        } catch (error) {
          console.error("Erro ao buscar alunos:", error);
          alert("Erro ao carregar os dados dos alunos.");
        }
      },
      goHome() {
        this.$router.push("/home-admin");
      },
      selectRow(index) {
        this.selectedRow = this.selectedRow === index ? null : index;
      },
      goToDetails(row) {
        this.$router.push({ path: "/details", query: { ref: row.fullName } });
      },
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
    },
    created() {
      this.fetchStudents(); // Buscar os dados ao carregar o componente
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
  
  </style>
