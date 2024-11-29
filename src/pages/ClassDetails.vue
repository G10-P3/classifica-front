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
          <h3 class="turma">{{ turma.nome }} ({{ turma.turno }})</h3>
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
            :key="aluno.fullName"
        >
          <td>{{ aluno.fullName }}</td>
          <td>{{ aluno.age }}</td>
          <td>{{ aluno.contact }}</td>
          <td>{{ aluno.average }}</td>
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
import axios from "axios";
import HeaderClassifica from "@/components/organisms/HeaderClassifica.vue";

export default {
  name: "ClassDetails",
  components: {
    HeaderClassifica,
  },
  data() {
    return {
      turma: {
        nome: "",
        turno: "",
        alunos: [],
      },
      currentPage: 1,
      pageSize: 10,
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
    fetchTurma() {
      const turmaId = this.$route.params.id;
      console.log("ID da turma recebido:", turmaId);

      axios
          .get(`/classes/${turmaId}/students`)
          .then((response) => {
            console.log("Dados recebidos:", response.data);
            this.turma.alunos = response.data;
            this.turma.nome = this.$route.query.name || "Turma";
            this.turma.turno = this.$route.query.shift || "N/A";
          })
          .catch((error) => {
            console.error("Erro ao buscar os dados da turma:", error);
          });
    },

    goBack() {
      this.$router.push("/query-classes");
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    goEdit() {
      this.$router.push("/edit-class");
    },
  },
  mounted() {
    this.fetchTurma();
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
