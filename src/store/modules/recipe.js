import * as types from '../mutation-types'
import axios from 'axios'

// initial state
const state = {
  all: {},
  searchText: '',
  searchResult: {},
  new: {}
}

// getters
const getters = {
  all: state => state.all,
  searchText: state => state.searchText,
  searchResult: state => state.searchResult,
  new: state => state.new,
  byIndex: state => index => {
    return state.all[index]
  }
}

// actions
const actions = {
  load ({commit}) {
    // axios.get('http://httpbin.org/get')
    axios.get('/static/data/test.json')
    .then(res => {
      console.log(res.status, res.statusText, res.data)
      commit(types.RECEIVE_SETRECIPES, res.data.recipe)
    }).catch(err => {
      throw err
    })
  },
  setSearchText ({commit}, text) {
    commit(types.RECEIVE_SETSEARCHTEXT, text)
  },
  search ({commit}) {
    console.log('search : ' + state.searchText)
    var result = []
    for (var recipe of state.all) {
      if (containsFoodstuff(recipe.foodstuff, state.searchText)) {
        result.push(recipe)
      }
    }
    commit(types.RECEIVE_SETSEARCHRESULT, result)
  },
  addNew ({commit}, entity) {
    commit(types.RECEIVE_NEWRECIPE, entity)
  }
}

function containsFoodstuff (foodstuff, text) {
  for (var f of foodstuff) {
    if (f.indexOf(text) !== -1) {
      return true
    }
  }
  return false
}

// mutations
const mutations = {
  [types.RECEIVE_SETRECIPES] (state, allEntity) {
    state.all = allEntity
  },
  [types.RECEIVE_SETSEARCHTEXT] (state, text) {
    state.searchText = text
  },
  [types.RECEIVE_SETSEARCHRESULT] (state, results) {
    console.log(results)
    state.searchResult = results
  },
  [types.RECEIVE_NEWRECIPE] (state, newEntity) {
    state.new = newEntity
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
