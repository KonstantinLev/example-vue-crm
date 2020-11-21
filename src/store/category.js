import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory({dispatch, commit}, {title, limit}) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit})
        return {id: category.key, title, limit}
      } catch (e) {
        console.log(e)
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({dispatch, commit}, {id, title, limit}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
      } catch (e) {
        console.log(e)
        commit('setError', e)
        throw e
      }
    },
    async fetchCategories({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}

        //const newCategories = []
        // Object.keys(categories).forEach(key => {
        //   newCategories.push({
        //     id: key,
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //   })
        // })
        //console.log(newCategories)

        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        console.log(e)
        commit('setError', e)
        throw e
      }
    },
  }
}