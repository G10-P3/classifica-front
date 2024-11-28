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
              <th>Quantidade de Alunos</th>
              <th>Média da Turma</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="turma in paginatedTurmas"
              :key="turma.id"
              @click="selectTurma"
              :class="{
                'bg-blue-50': selectedTurma === turma,
                'cursor-pointer': true,
                'hover:bg-gray-100': true
              }"
            >
              <td>{{ turma.nome }}</td>
              <td>{{ turma.turno }}</td>
              <td>{{ turma.qtdAlunos }}</td>
              <td>{{ turma.media }}</td>
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
  import HeaderClassifica from "@/components/organisms/HeaderClassifica.vue";
  
  export default {
    name: "QueryResults",
    components: {
      HeaderClassifica,
    },
    data() {
      return {
        searchQuery: "",
        turmas: [
          {
            id: 1,
            nome: "3º ano A",
            turno: "Manhã",
            qtdAlunos: 10,
            media: 9.4,
            alunos: [
              { id: 1, nome: "Ana", idade: 15, contato: "9999-9999", media: 9.6 },
              { id: 2, nome: "João", idade: 14, contato: "8888-8888", media: 9.2 },
            ],
          },
          {
            id: 2,
            nome: "3º ano B",
            turno: "Manhã",
            qtdAlunos: 12,
            media: 8.9,
            alunos: [
              { id: 1, nome: "Maria", idade: 15, contato: "9999-9999", media: 8.8 },
              { id: 2, nome: "Pedro", idade: 14, contato: "8888-8888", media: 9.0 },
            ],
          },
          {
            id: 3,
            nome: "4º ano B",
            turno: "Tarde",
            qtdAlunos: 10,
            media: 8.9,
            alunos: [
              { id: 1, nome: "Maria", idade: 15, contato: "9999-9999", media: 8.8 },
              { id: 2, nome: "Pedro", idade: 14, contato: "8888-8888", media: 9.0 },
              { id: 3, nome: "Gabriel", idade: 14, contato: "7777-7777", media: 7.5 },
            ],
          },
          {
            id: 4,
            nome: "5º ano A",
            turno: "Manhã",
            qtdAlunos: 15,
            media: 9.2,
            alunos: [
                { id: 1, nome: "Carlos", idade: 11, contato: "5555-5555", media: 9.3 },
                { id: 2, nome: "Mariana", idade: 10, contato: "4444-4444", media: 9.0 },
                { id: 3, nome: "Lucas", idade: 12, contato: "3333-3333", media: 9.5 },
            ],
            },
            {
            id: 5,
            nome: "6º ano B",
            turno: "Tarde",
            qtdAlunos: 18,
            media: 8.7,
            alunos: [
                { id: 1, nome: "Renata", idade: 12, contato: "2222-2222", media: 8.6 },
                { id: 2, nome: "Roberto", idade: 11, contato: "1111-1111", media: 8.8 },
                { id: 3, nome: "Fernanda", idade: 12, contato: "6666-6666", media: 8.9 },
            ],
            },
            {
            id: 6,
            nome: "7º ano A",
            turno: "Manhã",
            qtdAlunos: 20,
            media: 8.5,
            alunos: [
                { id: 1, nome: "Isabela", idade: 13, contato: "7777-7777", media: 8.4 },
                { id: 2, nome: "Gabriel", idade: 13, contato: "8888-8888", media: 8.6 },
                { id: 3, nome: "Ana", idade: 13, contato: "9999-9999", media: 8.5 },
            ],
            },
            {
            id: 7,
            nome: "8º ano B",
            turno: "Tarde",
            qtdAlunos: 22,
            media: 9.0,
            alunos: [
                { id: 1, nome: "Tiago", idade: 14, contato: "5555-5555", media: 9.2 },
                { id: 2, nome: "Bruna", idade: 14, contato: "4444-4444", media: 8.9 },
                { id: 3, nome: "Lúcia", idade: 14, contato: "3333-3333", media: 9.0 },
            ],
            },
            {
            id: 8,
            nome: "9º ano A",
            turno: "Manhã",
            qtdAlunos: 17,
            media: 9.3,
            alunos: [
                { id: 1, nome: "Felipe", idade: 15, contato: "2222-2222", media: 9.5 },
                { id: 2, nome: "Larissa", idade: 15, contato: "1111-1111", media: 9.0 },
                { id: 3, nome: "Paula", idade: 15, contato: "6666-6666", media: 9.4 },
            ],
            },
            {
            id: 9,
            nome: "3º ano C",
            turno: "Noite",
            qtdAlunos: 12,
            media: 8.8,
            alunos: [
                { id: 1, nome: "Pedro", idade: 16, contato: "7777-7777", media: 8.7 },
                { id: 2, nome: "Júlia", idade: 16, contato: "8888-8888", media: 9.0 },
                { id: 3, nome: "Rafael", idade: 16, contato: "9999-9999", media: 8.5 },
            ],
            },
            {
            id: 10,
            nome: "5º ano B",
            turno: "Manhã",
            qtdAlunos: 14,
            media: 8.3,
            alunos: [
                { id: 1, nome: "Carlos", idade: 11, contato: "4444-4444", media: 8.0 },
                { id: 2, nome: "Marcela", idade: 11, contato: "5555-5555", media: 8.5 },
                { id: 3, nome: "Luiz", idade: 11, contato: "6666-6666", media: 8.4 },
            ],
            },
            {
            id: 11,
            nome: "4º ano A",
            turno: "Manhã",
            qtdAlunos: 16,
            media: 8.4,
            alunos: [
                { id: 1, nome: "Miguel", idade: 10, contato: "7777-7777", media: 8.5 },
                { id: 2, nome: "Beatriz", idade: 10, contato: "8888-8888", media: 8.3 },
                { id: 3, nome: "Gabriela", idade: 10, contato: "9999-9999", media: 8.2 },
            ],
            },
            {
            id: 12,
            nome: "6º ano C",
            turno: "Tarde",
            qtdAlunos: 14,
            media: 8.9,
            alunos: [
                { id: 1, nome: "Vinícius", idade: 11, contato: "6666-6666", media: 9.0 },
                { id: 2, nome: "Sofia", idade: 11, contato: "5555-5555", media: 8.8 },
                { id: 3, nome: "Amanda", idade: 11, contato: "4444-4444", media: 9.1 },
            ],
            },
            {
            id: 13,
            nome: "7º ano B",
            turno: "Manhã",
            qtdAlunos: 19,
            media: 8.6,
            alunos: [
                { id: 1, nome: "Eduardo", idade: 12, contato: "3333-3333", media: 8.7 },
                { id: 2, nome: "Larissa", idade: 12, contato: "4444-4444", media: 8.4 },
                { id: 3, nome: "Carlos", idade: 12, contato: "5555-5555", media: 8.8 },
            ],
            },
            {
            id: 14,
            nome: "8º ano A",
            turno: "Tarde",
            qtdAlunos: 23,
            media: 9.1,
            alunos: [
                { id: 1, nome: "Pedro", idade: 13, contato: "2222-2222", media: 9.2 },
                { id: 2, nome: "Mariana", idade: 13, contato: "3333-3333", media: 9.1 },
                { id: 3, nome: "Thiago", idade: 13, contato: "4444-4444", media: 9.0 },
            ],
            },
            {
            id: 15,
            nome: "9º ano B",
            turno: "Noite",
            qtdAlunos: 20,
            media: 8.7,
            alunos: [
                { id: 1, nome: "Gustavo", idade: 14, contato: "5555-5555", media: 8.6 },
                { id: 2, nome: "Clara", idade: 14, contato: "4444-4444", media: 8.8 },
                { id: 3, nome: "Raul", idade: 14, contato: "3333-3333", media: 8.9 },
            ],
            }

            ],
      selectedTurma: null,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    filteredTurmas() {
      return this.turmas.filter((turma) =>
        turma.nome.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    totalPages() {
      const totalItems = this.filteredTurmas.length;
      return Math.ceil(totalItems / this.itemsPerPage);
    },
    paginatedTurmas() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredTurmas.slice(startIndex, endIndex);
    },
  },
  methods: {
    selectTurma() {
      this.$router.push("/class-detail");
    },
    goHome() {
      this.$router.push("/home-admin");
    },
    goToPage(page) {
      this.currentPage = page;
    },
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