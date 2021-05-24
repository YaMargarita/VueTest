import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    persons: JSON.parse(localStorage.getItem('persons') || '[]'),
    allBoss: []
  },
  mutations: {
    createPerson (state, person) {
      state.persons.push(person)
      localStorage.setItem('persons', JSON.stringify(state.persons))
    },
    updatePersons (state, arr) {
      state.persons = []
      state.persons = arr
      localStorage.setItem('persons', JSON.stringify(state.persons))
    },
    setBoss (state, arr) {
      state.allBoss = arr
    }
  },
  getters: {
    getPersons (state) {
      return state.persons
    }
  },
  actions: {
    getAllBoss ({state, commit}) {
      let arr = []
      findBoss(state.persons)
      function findBoss (persons) {
        for (let item of persons) {
          arr.push(item)
          if (item.children) {
            findBoss(item.children)
          }
        }
      }
      commit('setBoss', arr)
      return arr
    },
    createPerson ({commit, dispatch}, person) {
      if (person.select) {
        dispatch('findParent', person)
      } else {
        commit('createPerson', person)
      }
    },
    findParent ({state, commit}, person) {
      let arr = state.persons

      findPerson(arr)
      commit('updatePersons', arr)

      function findPerson (arr) {
        for (let item of arr) {
          if (item.id === person.select) {
            if (!item.children) item.children = []
            item.children.push(person)
          }
          if (item.children) {
            findPerson(item.children)
          }
        }
      }
    }
  }
})
