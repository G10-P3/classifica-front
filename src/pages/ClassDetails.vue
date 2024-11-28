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
          <h2>Consulta da Turma</h2>
          <h3 class="turma">{{ turma.nome }} ({{ turma.turno }}) EXEMPLO DE TURMAS</h3>
        </div>
  
        <!-- Botão Editar -->
        <div class="botao-editarDiv">
          <button @click="goEdit" class="edit-button">
            <h3>Editar</h3>
          </button>
        </div>
      </div>
  
      <!-- Tabela de Alunos -->
      <table class="results-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Contato</th>
            <th>Média</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="aluno in paginatedAlunos"
            :key="aluno.id"
          >
            <td>{{ aluno.nome }}</td>
            <td>{{ aluno.idade }}</td>
            <td>{{ aluno.contato }}</td>
            <td>{{ aluno.media }}</td>
          </tr>
        </tbody>
      </table>
  
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
    </div>
</template>  

<script>
  import HeaderClassifica from "@/components/organisms/HeaderClassifica.vue";

  export default {
    name: "ClassDetails",
    components: {
      HeaderClassifica,
    },
    data() {
      return {
        turma: {
          id: 1,
          nome: "3º ano A",
          turno: "Manhã",
          qtdAlunos: 15,
          media: 8.7,
          alunos: [
            { id: 1, nome: "Ana", idade: 15, contato: "9999-9999", media: 9.6 },
            { id: 2, nome: "João", idade: 14, contato: "8888-8888", media: 9.2 },
            { id: 3, nome: "Maria", idade: 15, contato: "7777-7777", media: 8.8 },
            { id: 4, nome: "Carlos", idade: 14, contato: "6666-6666", media: 8.5 },
            { id: 5, nome: "Beatriz", idade: 15, contato: "5555-5555", media: 9.1 },
            { id: 6, nome: "Pedro", idade: 15, contato: "4444-4444", media: 7.9 },
            { id: 7, nome: "Rafael", idade: 16, contato: "3333-3333", media: 8.3 },
            { id: 8, nome: "Juliana", idade: 15, contato: "2222-2222", media: 8.6 },
            { id: 9, nome: "Lucas", idade: 14, contato: "1111-1111", media: 7.8 },
            { id: 10, nome: "Mariana", idade: 15, contato: "0000-0000", media: 9.4 },
            { id: 11, nome: "Ricardo", idade: 15, contato: "1234-5678", media: 8.0 },
            { id: 12, nome: "Fernanda", idade: 15, contato: "2345-6789", media: 8.5 },
            { id: 13, nome: "Carolina", idade: 16, contato: "3456-7890", media: 8.7 },
            { id: 14, nome: "Gabriel", idade: 14, contato: "4567-8901", media: 8.2 },
            { id: 15, nome: "Sofia", idade: 15, contato: "5678-9012", media: 9.0 },
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
        this.$router.push("/query-classes");
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
    text-align: left;
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
