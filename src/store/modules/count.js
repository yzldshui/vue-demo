
const count = {
  state: {
    count: 0
  },

  mutations: {
    RESET: (state) => {
      state.count = 0
    },
    ADD: (state) => {
      state.count += 1
    },
    MINUS: (state, avatar) => {
      state.count -= 1
    }
  },

  actions: {
  }
}

export default count
