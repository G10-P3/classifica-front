<template>
  <header>
    <!-- Header principal -->
    <HeaderClassifica />
  </header>

  <div class="page-container">
    <div class="flex items-center justify-between p-4">
      <!-- Botão de voltar -->
      <button @click="goBack" class="flex items-center mr-4 return-button">
        <img :src="require('@/assets/returnIcon.png')" alt="Ícone de retorno" class="return-icon" />
      </button>
    </div>

    <!-- Título e Subtítulo em uma mesma div -->
    <div class="header-info">
      <div class="title-container">
        <h2>Registrar Resultado</h2>
        <h3 class="turma">3º Simulado - {{ turma.nome }} ({{ turma.turno }})</h3>
      </div>
    </div>

    <!-- Tabela de Alunos -->
    <table class="results-table">
      <thead>
        <tr>
          <th>Aluno</th>
          <th>Acertos Matemática</th>
          <th>Acertos Português</th>
          <th>Acertos Totais</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="aluno in paginatedAlunos"
          :key="aluno.id"
        >
          <td>{{ aluno.aluno }}</td>
          <td>{{ aluno.acertosMatematica }}</td>
          <td>{{ aluno.acertosPortugues }}</td>
          <td>{{ aluno.acertosToais }}</td>
        </tr>
      </tbody>
    </table>
  </div>

   <!-- Controles de Navegação -->
   <div class="pagination">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          Anterior
        </button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          Próxima
        </button>
      </div>
</template>  

<script>
import HeaderClassifica from "@/components/organisms/HeaderClassifica.vue";

export default {
  name: "RegisterResults",
  components: {
    HeaderClassifica,
  },
  data() {
      return {
        turma: {
          id: 1,
          classe: "3º ano B",
          turno: "Manhã",
          qtdAlunos: 15,
          alunos: [
            { id: 1, aluno: "Ana", acertosMatematica: 15, acertosPortugues: 15, acertosToais: 30 },
            { id: 2, aluno: "João", acertosMatematica: 14, acertosPortugues: 14, acertosToais: 28 },
            { id: 3, aluno: "Maria", acertosMatematica: 15, acertosPortugues: 16, acertosToais: 31 },
            { id: 4, aluno: "Carlos", acertosMatematica: 14, acertosPortugues: 15, acertosToais: 29 },
            { id: 5, aluno: "Beatriz", acertosMatematica: 15, acertosPortugues: 15, acertosToais: 30 },
            { id: 6, aluno: "Pedro", acertosMatematica: 15, acertosPortugues: 15, acertosToais: 30 },
            { id: 7, aluno: "Rafael", acertosMatematica: 16, acertosPortugues: 14, acertosToais: 30 },
            { id: 8, aluno: "Juliana", acertosMatematica: 15, acertosPortugues: 15, acertosToais: 30 },
            { id: 9, aluno: "Lucas", acertosMatematica: 14, acertosPortugues: 16, acertosToais: 30 },
            { id: 10, aluno: "Mariana", acertosMatematica: 15, acertosPortugues: 15, acertosToais: 30 },
            { id: 11, aluno: "Ricardo", acertosMatematica: 15, acertosPortugues: 15, acertosToais: 30 },
            { id: 12, aluno: "Fernanda", acertosMatematica: 15, acertosPortugues: 14, acertosToais: 29 },
            { id: 13, aluno: "Carolina", acertosMatematica: 16, acertosPortugues: 15, acertosToais: 31 },
            { id: 14, aluno: "Gabriel", acertosMatematica: 14, acertosPortugues: 14, acertosToais: 28 },
            { id: 15, aluno: "Sofia", acertosMatematica: 15, acertosPortugues: 15, acertosToais: 30 },
          ],
        },
        currentPage: 1, // Página inicial
        pageSize: 10, // Alunos por página
      };
  },
  computed: {
      paginatedAlunos() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.turma.alunos.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.turma.alunos.length / this.pageSize);
      },
    },
  methods: {
      goBack() {
        this.$router.push("/home-admin");
      },
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
      goEdit(){
        this.$router.push("/edit-class");
      }
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

.results-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.results-table th,
.results-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.results-table th {
  background-color: #f4f4f4;
}

.results-table tr:hover {
  background-color: #f1f1f1;
}

h2 {
  font-size: 2rem;
  margin-bottom: 0;
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

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.edit-button {
  padding: 0.5rem 1rem;
  color: black;
  border: 2px solid black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  width: 200px;
  font-size: 15px;
}

.edit-button:hover {
  background-color: lightgray;
}

.edit-button:focus {
  outline: none;
}
.header-info {
display: flex;
justify-content: space-between;
align-items: center;
}

.title-container {
width: 300px;
}

.botao-editarDiv {
margin-left: 20px;
width: 200px;
}

.turma {
color: grey;
font-size: 20px;
width: 200px;
}
</style>
