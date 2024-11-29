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
        <!-- Dropdown de Simulados -->
        <div class="simulado-selector">
          <select v-model="selectedSimulado" @change="fetchAlunoData" class="dropdown">
            <option value="">Selecione o Simulado</option>
            <option v-for="simulado in simulados" :key="simulado.id" :value="simulado.id">
              {{ simulado.nome }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Mensagem quando não há simulado selecionado -->
    <div v-if="!selectedSimulado" class="empty-message">
      Selecione um simulado para visualizar
    </div>

    <!-- Tabela de Alunos -->
    <div v-if="selectedSimulado && turma.alunos.length > 0">
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
          <tr v-for="aluno in paginatedAlunos" :key="aluno.id">
            <td>{{ aluno.aluno }}</td>
            <td>{{ aluno.acertosMatematica }}</td>
            <td>{{ aluno.acertosPortugues }}</td>
            <td>{{ aluno.acertosTotais }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Controles de Navegação -->
    <div v-if="selectedSimulado && turma.alunos.length > 0" class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
        Próxima
      </button>
    </div>
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
      selectedSimulado: "", // Armazenará o simulado selecionado
      simulados: [
      ],
      turma: {
        nome: "",
        turno: "",
        alunos: [], // Inicialmente vazio, será preenchido após seleção
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
    fetchSimulados() {
    // Requisição ao backend para buscar os simulados
    this.$axios
      .get("/exam/") 
      .then((response) => {
        // Supondo que a resposta seja um array de simulados [{ id, nome }]
        this.simulados = response.data.map(simulado => ({
        id: simulado.id,
        nome: simulado.nome,
        }));
      })
      .catch((error) => {
        console.error("Erro ao buscar simulados:", error);
      });
  },
    fetchAlunoData() {
    if (this.selectedSimulado) {
      // Exemplo de requisição ao backend com o ID do simulado
      // Aqui você pode fazer uma chamada real para o backend usando, por exemplo, axios ou fetch
      this.$axios
        .get(`results/exams/${this.selectedSimulado}`)  // URL fictícia do backend
        .then((response) => {
          // Supondo que a resposta tenha uma estrutura como { alunos: [...] }
          this.turma.alunos = response.data.alunos;
        })
        .catch((error) => {
          console.error("Erro ao buscar dados dos alunos:", error);
        });
    }
  },
  mounted() {
  // Carregar os simulados ao montar o componente
  this.fetchSimulados();
},
  }
}
;
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
  padding: 12px;
  text-align: center;
  font-size: 1rem;
}

.results-table th {
  background-color: #f4f4f4;
}

.results-table tr:hover {
  background-color: #f1f1f1;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.25rem;
  color: #666;
}

.simulado-selector {
  margin-top: 1rem;
}

.dropdown {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 20rem;
  margin-top: 1rem;
}

.empty-message {
  text-align: center;
  font-size: 1.2rem;
  color: #999;
  margin-top: 2rem;
}

.pagination {
  margin-top: 1rem;
  text-align: center;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: #3490dc;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 10px;
}

.pagination button:disabled {
  background-color: #cbd5e0;
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
</style>
