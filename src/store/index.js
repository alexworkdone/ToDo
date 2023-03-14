import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      todos: [],
      mark: 'all'
    }
  },

  getters: {
    todos(state) {
      return state.todos.filter((todo) => {
        if (state.mark === 'all') {
          return todo
        } else if (state.mark === 'deadline') {
          const getDate = (date) => {
            const formatDate = new Date(date)
            return formatDate.toLocaleDateString('uk-UA', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            })
          }
          return getDate(todo.date) === getDate(new Date().getTime()) && !todo.completed
        } else if (state.mark === 'completed') {
          return todo.completed
        }
      })
    }
  },

  mutations: {
    setMark(state, mark) {
      state.mark = mark;
    },

    addTodo(state, todo) {
      if (!todo.id) {
        const id = new Date().getTime()
        state.todos.push({ ...todo, id })
      } else {
        state.todos.forEach((item) => {
          if (item.id === todo.id) {
            item.text = todo.text
            item.date = todo.date
            item.completed = todo.completed
          }
        })
      }
    },

    setTodos(state, todos) {
      state.todos = todos
    },

    removeTodo(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id)
    }
  },

  actions: {
    addTodo({ commit, dispatch }, todo) {
      commit('addTodo', todo)
      dispatch('setLocalstorage')
    },

    removeTodo({ commit, dispatch }, id) {
      commit('removeTodo', id)
      dispatch('setLocalstorage')
    },

    getLocalstorage({ commit }) {
      const todos = JSON.parse(localStorage.getItem('todos'))
      commit('setTodos', todos || [])
    },

    setLocalstorage({ state }) {
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
  }
})

export default store
