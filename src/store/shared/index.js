import * as firebase from 'firebase'

export default {
  state: {
    loadedImages: [],
    loading: false,
    error: null
  },
  mutations: {
    uploadImage(state, payload) {
      state.loadedImages.push(payload)
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    uploadImage({commit}, payload) {
      // console.log('uploadImage', payload)
      commit('setLoading', true)
      const name = payload.image.name
      const ext = name.slice(name.lastIndexOf('.'))
      const imageData = {name, ext}
      let imageUrl
      let key
      firebase.database().ref('images').push(imageData)
        .then(data => {
          key = data.key
          return key
        })
        .then(key => firebase.storage()
          .ref('images/' + key + '.' + ext)
          .put(payload.image))
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('images').child(key).update({imageUrl})
        })
        .then(() => {
          commit('uploadImage', {
            ...imageData,
            imageUrl,
            id: key
          })
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    clearError({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
}
