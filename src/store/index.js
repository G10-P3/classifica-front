import Vuex from 'vuex'
import general from './modules/general'
import { api } from '../services/axios'
import axios from 'axios'
import jwt from 'jsonwebtoken'
const createStore = () => {
  return new Vuex.Store({
    modules: {
      general,
    },
    getters: {
      GET_HOME_DRAWER() {
        return general.state.homeDrawer
      },
      GET_BEARER() {
        return general.state.bearer
      },
      GET_ROLE() {
        return general.state.role
      },
      getExternalGiftList() {
        return general.state.giftList.externalGiftList
      },
      GET_SEMI_MODELS() {
        return new Object({
          country: general.state.semiModels.country,
          countryName: general.state.semiModels.countryName,
        })
      },
      // LOGIN:=============================================================================================
      GET_LOGIN_PASSWORD_CHECK() {
        if (
          general.state.login.password ==
          general.state.login.passwordConfirmation
        ) {
          return true
        } else {
          return false
        }
      },
      GET_LOGIN_DOCUMENT_VALIDATION() {
        if (general.state.login.isForeigner) {
          return general.state.login.passport !== ''
        } else {
          return general.state.login.cpf !== ''
        }
      },
      GET_LOGIN_FORM_NOT_NULL_VALIDATION(state, getters) {
        const login = general.state.login
        return (
          getters.GET_LOGIN_DOCUMENT_VALIDATION &&
          login.password !== '' &&
          login.passwordConfirmation !== '' &&
          login.email !== ''
        )
      },
      GET_LOGIN_FORGOT_PASSWORD_VALIDATION(state, payload) {
        if (general.state.login.forgotPassword.isForeigner) {
          if (general.state.login.forgotPassword.passport) {
            return true
          } else {
            return false
          }
        } else {
          if (general.state.login.forgotPassword.cpf) {
            return true
          } else {
            return false
          }
        }
      },
      GET_LOGIN_RESET_PASSWORD_SAME_PASSWORDS_VALIDATION(state, payload) {
        if (
          general.state.login.newPassword.password ===
          general.state.login.newPassword.newPassword
        ) {
          return true
        } else {
          return false
        }
      },
      GET_LOGIN_RESET_PASSWORD_HAS_EMPTY_FIELDS(state, payload) {
        if (
          general.state.login.newPassword.password !== '' &&
          general.state.login.newPassword.passwordConfirmation !== ''
        ) {
          return true
        } else {
          return false
        }
      },
    },
    mutations: {
      SET_ROLE(state, payload) {
        state.general.role = payload
      },
      SET_BEARER(state, payload) {
        state.general.bearer = payload
      },
      HANDLE_ALERT(state, payload = {}) {
        if (Object.keys(payload).length === 0) {
          state.general.alert.type = ''
          state.general.alert.title = ''
          state.general.alert.message = ''
          state.general.alert.show = false
          return
        }
        state.general.alert.type = payload.type
        state.general.alert.title = payload.title
        state.general.alert.message = payload.message
        state.general.alert.show = true
        setTimeout(() => {
          state.general.alert.type = ''
          state.general.alert.title = ''
          state.general.alert.message = ''
          state.general.alert.show = false
        }, 4000)
      },
      HANDLE_LOGIN(state, payload) {
        if (payload.name == 'login') {
          state.general.login.user = payload.value
        } else if (payload.name == 'password') {
          state.general.login.password = payload.value
        } else if (payload.name == 'passwordConfirmation') {
          state.general.login.passwordConfirmation = payload.value
        } else if (payload.name == 'remindMe') {
          state.general.login.remindMe = payload.value
        } else if (payload.name == 'userTerms') {
          state.general.login.userTerms = payload.value
        }
      },
      HANDLE_DOMAIN(state, payload) {
        state.general.domain.custom = payload
      },
      HANDLE_ADDRESS(state, payload) {
        switch (payload.name) {
          case 'zipCode': {
            state.general.address.zipCode = payload.value
            break
          }
          case 'street': {
            state.general.address.street = payload.value
            break
          }
          case 'number': {
            state.general.address.number = payload.value
            break
          }
          case 'complement': {
            state.general.address.complement = payload.value
            break
          }
          case 'district': {
            state.general.address.district = payload.value
            break
          }
          case 'city': {
            state.general.address.city = payload.value
            break
          }
          case 'state': {
            state.general.address.state = payload.value
            break
          }
          default: {
            break
          }
        }
      },
      HANDLE_CREDIT_CARD(state, payload) {
        switch (payload.name) {
          case 'owner': {
            state.general.card.owner = payload.value
            break
          }
          case 'cardNumber': {
            state.general.card.number = payload.value
            break
          }
          case 'expiration': {
            state.general.card.expiration = payload.value
            break
          }
          case 'cvv': {
            state.general.card.cvv = payload.value
            break
          }
          default: {
            break
          }
        }
      },
      HANDLE_HOME_DRAWER(state, payload) {
        state.general.homeDrawer = payload
      },
      HANDLE_RESET_MODAL(state, payload) {
        state.general.resetModal = payload
      },
      HANDLE_FIRST_ACCESS(state, payload) {
        state.general.firstAccess = payload
      },
      HANDLE_SITE_PERCENTAGE(state, payload) {
        state.general.percentage = payload
      },
      HANDLE_IS_FIRST_GIFT_LIST(state, payload) {
        state.general.giftList.isFirstGiftList = payload
      },
      HANDLE_HAS_STAGED_GIFT_LISTS(state, payload) {
        state.general.giftList.hasStagedGiftLists = payload
      },
      HANDLE_QUANTITY_OF_PREREGISTERED_GIFT_LISTS(state, payload) {
        state.general.giftList.preRegisteredQuantity = payload
      },
      HANDLE_EXTERNAL_GIFTS_LIST_DATA(state, payload) {
        const externalGiftList = new Object({
          index: payload.index,
          url: payload.url,
          name: payload.name,
        })
        state.general.giftList.externalGiftList.push(externalGiftList)
      },
      HANDLE_COUPLE_INFO(state, payload) {
        state.general.coupleInfo = payload
      },
      HANDLE_CERIMONY_INFO(state, payload) {
        state.general.cerimonyInfo = payload
      },
      HANDLE_CITIES_INIT_OBJECTS(state, payload) {
        state.general.initCities.push(payload)
      },
      HANDLE_HOTELS_INIT_OBJECTS(state, payload) {
        state.general.initHotels.push(payload)
      },
      HANDLE_DELETION_EXTERNAL_GIFT_LIST(state, payload) {
        state.general.giftList.externalGiftList.splice(payload, 1)
      },
      HANDLE_CLEANING_EXTERNAL_GIFT_LISTS(state, payload) {
        state.general.giftList.externalGiftList = []
      },
      HANDLE_HOTELS_FROM_DATABASE(state, payload) {
        state.general.hotels.push(payload)
      },
      HANDLE_CITIES_FROM_DATABASE(state, payload) {
        state.general.cities.push(payload)
      },
      HANDLE_SEMI_MODELS(state, payload) {
        state.general.semiModels.country = payload.country
        state.general.semiModels.countryName = payload.countryName
      },
      HANDLE_CHECKIN(state, payload) {
        state.general.checkin = payload
      },
      HANDLE_CHECKOUT(state, payload) {
        state.general.checkout = payload
      },
      // LOGIN:==================================================================
      HANDLE_LOGIN_CPF(state, payload) {
        state.general.login.cpf = payload
      },
      HANDLE_LOGIN_EMAIL(state, payload) {
        state.general.login.email = payload
      },
      HANDLE_LOGIN_PASSPORT(state, payload) {
        state.general.login.passport = payload
      },
      HANDLE_LOGIN_PASSWORD(state, payload) {
        state.general.login.password = payload
      },
      HANDLE_LOGIN_PASSWORD_CONFIRMATION(state, payload) {
        state.general.login.passwordConfirmation = payload
      },
      HANDLE_LOGIN_IS_FOREIGNER(state, payload) {
        state.general.login.isForeigner = payload
      },
      HANDLE_LOGIN_IS_FOREIGNER_FORGOT_PASSWORD(state, payload) {
        state.general.login.forgotPassword.isForeigner = payload
      },
      HANDLE_LOGIN_CPF_FORGOT_PASSWORD(state, payload) {
        state.general.login.forgotPassword.cpf = payload
      },
      HANDLE_LOGIN_PASSPORT_FORGOT_PASSWORD(state, payload) {
        state.general.login.forgotPassword.passport = payload
      },
      HANDLE_LOGIN_NEW_PASSWORD(state, payload) {
        state.general.login.newPassword.password = payload
      },
      HANDLE_LOGIN_NEW_PASSWORD_CONFIRMATION(state, payload) {
        state.general.login.newPassword.passwordConfirmation = payload
      },
    },
    actions: {
      UPDATE_EXTERNAL_GIFT_LISTS(ctx, payload) {
        ctx.commit('HANDLE_EXTERNAL_GIFTS_LIST_DATA', payload)
      },
      DELETE_EXTERNAL_GIFT_LIST(ctx, payload) {
        ctx.commit('HANDLE_DELETION_EXTERNAL_GIFT_LIST', payload)
      },
      async FETCH_COUPLE_AND_CERIMONY(ctx, payload) {
        const auth = JSON.parse(localStorage.getItem('wedme.auth'))
        await axios
          .all([
            api.get('api/getCasal', { params: { id_couple: auth.id_couple } }),
            api.get('api/cerimonias/info', {
              params: { id_cerimony: auth.id_ceremony },
            }),
          ])
          .then(
            axios.spread(async (couple, cerimony) => {
              ctx.commit('HANDLE_COUPLE_INFO', couple.data)
              ctx.commit('HANDLE_CERIMONY_INFO', cerimony.data)
              // LAÇO PARA REQUERER OS DADOS DAS CIDADES E DOS HOTEIS E INICIAR OS VALORES NOS MULTISELECTS:
              if (cerimony.data.ceremonyInfo.destination_ids != null) {
                for (
                  let i = 0;
                  i < cerimony.data.ceremonyInfo.destination_ids.length;
                  i++
                ) {
                  const city = await api.get(
                    `/api/getCityOrHotelCustom/${cerimony.data.ceremonyInfo.destination_ids[i]}?type=city`,
                  )
                  ctx.commit('HANDLE_CITIES_INIT_OBJECTS', city.data)
                }
                for (
                  let j = 0;
                  j < cerimony.data.ceremonyInfo.hotel_list.hotels.length;
                  j++
                ) {
                  const hotel = await api.get(
                    `/api/getCityOrHotelCustom/${cerimony.data.ceremonyInfo.hotel_list.hotels[j]}?type=hotel`,
                  )
                  ctx.commit('HANDLE_HOTELS_INIT_OBJECTS', hotel.data)
                }
              }
            }),
          )
          .catch((err) => {
            console.log(err)
          })
      },
      CLEAN_EXTERNAL_GIFT_LISTS(ctx, payload) {
        ctx.commit('HANDLE_CLEANING_EXTERNAL_GIFT_LISTS')
      },
      async LOGIN(ctx) {
        try {
          const loginData = ctx.state.general.login
          if (ctx.state.general.login.remindMe)
            localStorage.setItem(
              'remind-me',
              JSON.stringify({
                email: ctx.state.general.login.user,
                password: ctx.state.general.login.password,
              }),
            )

          const data = new Object({
            ...(loginData.isForeigner
              ? { passport: loginData.passport }
              : { cpf: loginData.cpf }),
            password: ctx.state.general.login.password,
          })
          const info = jwt.sign(data, process.env.CLIENT_ENCRYPTO_KEY)
          const response = await api.post('/api/login', { info: info })
          const auth = response.data
          const payload = jwt.verify(auth.token, process.env.ACCESS_SECRET)
          localStorage.setItem('wedme.auth', JSON.stringify(auth))
          if (payload.role === 'couple') {
            this.$router.push('/home/dashboard')
          } else if (payload.role === 'admin' || payload.role === 'master') {
            this.$router.push('/home/dashboard-admin')
          } else {
            return false
            //this.$router.push('/acesso-proibido')
          }
        } catch (err) {
          ctx.commit('HANDLE_ALERT', {
            type: 'error',
            title: 'Algo deu errado!',
            message: err.response.data.message,
          })
        }
      },
    },
  })
}
export default createStore
