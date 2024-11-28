<template>
  <div class="edit-turma-page">
    <!-- Header principal -->
    <header>
      <HeaderClassifica />
    </header>

    <div class="page-container">
      <!-- Botão de voltar -->
      <div class="flex items-center justify-between p-4">
        <button @click="goBack" class="flex items-center return-button">
          <img
            :src="require('@/assets/returnIcon.png')"
            alt="Ícone de retorno"
            class="return-icon"
          />
        </button>
      </div>

      <!-- Formulário de edição -->
      <div class="edit-turma-container">
        <h2 class="form-title">Editar Turma</h2>
        <form @submit.prevent="saveChanges">
          <!-- Nome da Turma e Turno na mesma linha -->
          <div class="form-row">
            <div class="form-group">
              <label for="nome">Nome da Turma:</label>
              <input
                type="text"
                id="nome"
                v-model="turma.nome"
                placeholder="Digite o nome da turma"
                required
              />
            </div>
            <div class="form-group">
              <label for="turno">Turno:</label>
              <select id="turno" v-model="turma.turno" required>
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
              </select>
            </div>
          </div>

          <!-- Tabela de Alunos -->
          <div class="alunos-section">
            <h3>Alunos</h3>
            <table class="alunos-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Contato</th>
                  <th>Média</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(aluno, index) in paginatedAlunos"
                  :key="aluno.id"
                >
                  <td>{{ aluno.nome }}</td>
                  <td>{{ aluno.idade }}</td>
                  <td>{{ aluno.contato }}</td>
                  <td>{{ aluno.media }}</td>
                  <td>
                    <button
                      @click.prevent="removeAluno(index + currentPage * itemsPerPage)"
                      class="remove-button"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Paginação -->
            <div class="pagination">
              <button
                :disabled="currentPage === 0"
                @click="currentPage--"
                class="page-button"
              >
                Anterior
              </button>
              <span>Página {{ currentPage + 1 }} de {{ totalPages }}</span>
              <button
                :disabled="currentPage >= totalPages - 1"
                @click="currentPage++"
                class="page-button"
              >
                Próxima
              </button>
            </div>
          </div>

          <!-- Botões de ação -->
          <div class="action-buttons">
            <button type="submit" class="save-button">Salvar Alterações</button>
            <button @click.prevent="goBack" class="cancel-button">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderClassifica from "@/components/organisms/HeaderClassifica.vue";

export default {
  name: "EditTurma",
  components: {
    HeaderClassifica,
  },
  data() {
    return {
      turma: {
        id: null,
        nome: "",
        turno: "Manhã",
        alunos: [], // Inicializado como array vazio
      },
      currentPage: 0, // Página atual
      itemsPerPage: 10, // Itens por página
    };
  },
  computed: {
    paginatedAlunos() {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.turma.alunos.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.turma.alunos.length / this.itemsPerPage);
    },
  },
  created() {
    const turmaId = this.$route.params.id;
    this.loadTurmaData(turmaId); // Corrigido para carregar alunos
  },
  methods: {
    loadTurmaData(id) {
      // Simulação de dados carregados
      const turmaMock = {
        id: id,
        nome: "3º ano A",
        turno: "Manhã",
        alunos: [
          { id: 1, nome: "Ana Clara", idade: 15, contato: "9999-1111", media: 8.5 },
          { id: 2, nome: "João Pedro", idade: 14, contato: "9999-2222", media: 7.8 },
          { id: 3, nome: "Maria Fernanda", idade: 16, contato: "9999-3333", media: 9.2 },
          { id: 4, nome: "Lucas Gabriel", idade: 14, contato: "9999-4444", media: 6.9 },
          { id: 5, nome: "Isabela Souza", idade: 15, contato: "9999-5555", media: 8.0 },
          { id: 6, nome: "Matheus Lima", idade: 16, contato: "9999-6666", media: 7.5 },
          { id: 7, nome: "Camila Ramos", idade: 15, contato: "9999-7777", media: 8.8 },
          { id: 8, nome: "Gabriel Costa", idade: 14, contato: "9999-8888", media: 7.0 },
          { id: 9, nome: "Eduarda Silva", idade: 15, contato: "9999-9999", media: 9.0 },
          { id: 10, nome: "Vinícius Almeida", idade: 16, contato: "8888-1111", media: 7.3 },
          { id: 11, nome: "Laura Oliveira", idade: 14, contato: "8888-2222", media: 8.7 },
          { id: 12, nome: "Thiago Pereira", idade: 15, contato: "8888-3333", media: 6.8 },
          { id: 13, nome: "Sofia Martins", idade: 16, contato: "8888-4444", media: 9.4 },
          { id: 14, nome: "Pedro Henrique", idade: 15, contato: "8888-5555", media: 7.1 },
          { id: 15, nome: "Mariana Duarte", idade: 14, contato: "8888-6666", media: 8.9 },
        ],
      };
      // Atribuindo os dados da turma mockada
      this.turma = { ...turmaMock };
    },
    saveChanges() {
      console.log("Alterações salvas:", this.turma);
      this.$router.push(`/class-detail/${this.turma.id}`);
    },
    goBack() {
      this.$router.push("/class-detail");
    },
    removeAluno(index) {
      this.turma.alunos.splice(index, 1);
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages - 1;
      }
    },
  },
};
</script>
  
<style scoped>
.page-container {
  margin: 2rem auto;
  max-width: 800px;
}

.return-icon {
  height: 1.8rem;
  width: 1.8rem;
  transition: transform 0.2s ease;
}

.return-icon:hover {
  transform: scale(1.1);
}

.edit-turma-container {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333333;
}

.form-group {
  margin-bottom: 1.5rem;
}

/* Alinhar os campos na mesma linha */
.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-row .form-group {
  flex: 1; /* Cada campo ocupa a mesma largura */
}

input,
select {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 1rem;
}

/* Estilos da tabela de alunos */
.alunos-section {
  margin-top: 1.5rem;
}

.alunos-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.alunos-table th,
.alunos-table td {
  padding: 1rem;
  border: 1px solid #cccccc;
  text-align: left;
}

.alunos-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.add-button,
.remove-button {
  display: block;
  margin-top: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #0056b3;
}

.remove-button:hover {
  background-color: #dc3545;
}

.save-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.page-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.page-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.page-button:hover:not(:disabled) {
  background-color: #0056b3;
}

</style>

