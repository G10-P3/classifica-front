<template>
  <header>
    <!-- Header principal -->
    <HeaderClassifica />
  </header>

  <div class="page-container">
    <div class="flex items-center justify-between p-4">
      <!-- Botão de voltar -->
      <button @click="goBack" class="flex items-center mr-4 return-button">
        <img
          :src="require('@/assets/returnIcon.png')"
          alt="Ícone de retorno"
          class="return-icon"
        />
      </button>
    </div>

    <!-- Título e Subtítulo em uma mesma div -->
    <div class="header-info">
      <div class="title-container">
        <h2>Registrar Resultado</h2>
        <!-- Dropdown de Simulados -->
        <div class="simulado-selector text-black">
          <select
            v-model="selectedSimulado"
            @change="fetchAlunoData"
            class="dropdown text-black"
          >
            <option value="">Selecione o Simulado</option>
            <option
              v-for="simulado in simulados"
              :key="simulado.id"
              :value="simulado.id"
              class="text-black"
            >
              {{ simulado.nome }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Mensagem quando não há simulado selecionado -->
    <div v-if="isLoading">Carregando os dados...</div>
    <div
      v-else-if="selectedSimulado && turma.alunos && turma.alunos.length > 0"
    >
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
          <tr v-for="aluno in turma.alunos" :key="aluno.student.id">
            <td>{{ aluno.student.name }}</td>
            <td>{{ aluno.mathScore }}</td>
            <td>{{ aluno.portugueseScore }}</td>
            <td>{{ aluno.totalScore }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Tabela e paginação -->
    </div>
    <div v-else>Nenhum dado encontrado.</div>

    <!-- Controles de Navegação -->
    <div v-if="selectedSimulado && turma.alunos.length > 0" class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
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
import Api from "../services/axios";

export default {
  name: "RegisterResults",
  components: {
    HeaderClassifica,
  },
  data() {
    return {
      selectedSimulado: "", // Armazenará o simulado selecionado
      simulados: [],
      turma: {
        nome: "",
        turno: "",
        alunos: [], // Inicialmente vazio, será preenchido após seleção
      },
      currentPage: 1, // Página inicial
      pageSize: 10, // Alunos por página
      isLoading: false,
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
    async fetchSimulados() {
      try {
        // Requisição ao backend para buscar os simulados
        const response = await Api.get("/exam/"); // Supondo que a resposta seja um array de simulados [{ id, nome }]
        this.simulados = response.data.map((simulado) => ({
          id: simulado.id,
          nome: simulado.name,
        }));
      } catch (error) {
        console.error("Erro ao buscar simulados:", error);
      }
    },

    async fetchAlunoData() {
      if (this.selectedSimulado) {
        this.isLoading = true; // Ativa o carregamento
        try {
          const response = await Api.get(
            `results/exams/${this.selectedSimulado}`
          );
          this.turma.alunos = response.data || [];
        } catch (error) {
          console.error("Erro ao buscar dados dos alunos:", error);
          this.turma.alunos = [];
        } finally {
          this.isLoading = false; // Finaliza o carregamento
        }
      }
    },

    async mountPage() {
      // Carregar os simulados ao montar o componente
      await this.fetchSimulados();
    },
  },
  mounted() {
    this.mountPage().catch((error) =>
      console.error("Erro ao carregar página:", error)
    );
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
