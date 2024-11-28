<template>
  <header>
    <HeaderClassifica />
  </header>
  
  <div class="page-container">
    <div class="flex items-center justify-between p-4">
      <button @click="goBack" class="return-button">
        <img :src="require('@/assets/returnIcon.png')" alt="Voltar" class="return-icon" />
      </button>
    </div>

    <div class="header-container">
      <h2>Cadastrar simulado</h2>
    </div>
    <form class="form-container">
      <div class="form-row">
        <div class="form-group">
          <label for="exam-name">Nome do Simulado</label>
          <input
            v-model="examName"
            type="text"
            id="exam-name"
            placeholder="Digite o nome do simulado"
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label for="simulated-date">Data</label>
          <input v-model="simulatedDate" type="date" id="simulated-date" class="input-field" />
        </div>

        <div class="form-group">
          <label for="simulated-class">Turma</label>
          <select v-model="selectedClass" id="simulated-class" class="input-field">
            <option disabled value="">Selecione a turma</option>
            <option v-for="classOption in classOptions" :key="classOption" :value="classOption">
              {{ classOption }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="total-questions">Nº de questões</label>
          <input
            v-model.number="totalQuestions"
            type="number"
            id="total-questions"
            min="1"
            class="input-field"
          />
        </div>
    </div>

      <div class="form-group">
        <label>Matérias</label>
        <div class="checkbox-group pt-1 pb-2">
          <div>
            <input v-model="subjects.math" type="checkbox" id="math-questions" />
            <label for="math-questions">Questões de Matemática</label>
          </div>
          <input
            v-if="subjects.math"
            v-model.number="mathQuestions"
            type="number"
            min="1"
            class="input-field-small"
            placeholder="Nº questões"
          />
        </div>

        <div class="checkbox-group">
          <div>
            <input v-model="subjects.portuguese" type="checkbox" id="portuguese-questions" />
            <label for="portuguese-questions">Questões de Português</label>
          </div>
          <input
            v-if="subjects.portuguese"
            v-model.number="portugueseQuestions"
            type="number"
            min="1"
            class="input-field-small"
            placeholder="Nº questões"
          />
        </div>
      </div>

      <div class="pt-2">
        <label for="observations">Observações</label>
      </div>
      <div class="form-group border border-black border-2 rounded">
        <textarea
          v-model="observations"
          id="observations"
          placeholder="Digite suas observações"
          class="input-textarea"
        ></textarea>
      </div>

      <button @click.prevent="registerSimulated" class="submit-button">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import HeaderClassifica from "@/components/organisms/HeaderClassifica.vue";

export default {
  name: "RegisterExam",
  components: {
    HeaderClassifica,
  },
  data() {
    return {
      simulatedName: "",
      simulatedDate: "",
      selectedClass: "",
      totalQuestions: 0,
      subjects: {
        math: false,
        portuguese: false,
      },
      mathQuestions: 0,
      portugueseQuestions: 0,
      observations: "",
      classOptions: ["Turma A", "Turma B", "Turma C"],
    };
  },
  methods: {
    goBack() {
      this.$router.push("/home-admin");
    },
    registerSimulated() {
      if (!this.simulatedName || !this.simulatedDate || !this.selectedClass) {
        alert("Por favor, preencha os campos obrigatórios!");
        return;
      }

      const simulatedData = {
        name: this.simulatedName,
        date: this.simulatedDate,
        class: this.selectedClass,
        totalQuestions: this.totalQuestions,
        subjects: {
          math: this.subjects.math ? this.mathQuestions : 0,
          portuguese: this.subjects.portuguese ? this.portugueseQuestions : 0,
        },
        observations: this.observations,
      };

      console.log("Simulado cadastrado:", simulatedData);
      alert("Simulado cadastrado com sucesso!");
    },
  },
};
</script>

<style scoped>
.page-container {
  margin-left: 5rem;
  margin-right: 8rem;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
  }

  .return-icon {
  margin-top: 1rem;
  height: 1.5rem;
  width: 1.5rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}


.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* margin-top: 2rem; */
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.input-field,
.input-field-small {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-field-small {
  width: 10rem;
  margin-top: 0.5rem;
}

.input-textarea {
  height: 5rem;
  resize: none;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-button {
  padding: 0.75rem;
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #2779bd;
}
.form-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
</style>
