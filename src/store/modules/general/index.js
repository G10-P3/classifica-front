const initialState = {
  bearer: "",
  role: "",
  login: {
    user: "",
    cpf: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    remindMe: false,
    userTerms: false,
    forgotPassword: {
      cpf: "",
      isForeigner: false,
    },
    newPassword: {
      password: "",
      passwordConfirmation: "",
    },
  },
  alert: {
    type: "",
    title: "",
    message: "",
    show: false,
  },
  homeDrawer: 0,
};

export default {
  namespaced: true,
  state: {
    ...initialState,
  },
};
