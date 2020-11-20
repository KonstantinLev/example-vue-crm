import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const info = await firebase.database().ref(`/users/${uid}/info`).once('value')
        commit('setInfo', info.val())
      } catch (e) {
        console.log(e)
        commit('setError', e)
      }
    }
  },
  getters: {
    info: s => s.info
  }
}