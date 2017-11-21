import * as types from '../mutation-types'
import AwsUtil from '../../utils/AwsUtil'
import UserData from '../../utils/UserData'

const recipe = {
  namespaced: true,
  state: {
    all: undefined,
    new: {}
  },
  getters: {
    all: state => state.all,
    new: state => state.new,
    loaded: state => {
      if (state.all === undefined) {
        return false
      } else {
        return true
      }
    },
    find: state => searchText => {
      console.log('search : ' + searchText)
      var result = []
      if (state.all === undefined) {
        return result
      }
      for (var recipe of state.all) {
        if (containsFoodstuff(recipe.foodstuff, searchText)) {
          result.push(recipe)
        }
      }
      console.log(result)
      return result
    },
    byIndex: state => index => {
      return state.all[index]
    }
  },
  actions: {
    load ({commit}, jwtToken) {
      AwsUtil.setAwsConfig(jwtToken)
      UserData.getRecipe()
        .then(function (object) {
          console.log(object)
          commit(types.RECEIVE_SETRECIPES, object.recipe)
        })
        .catch(function (err) {
          console.log('Error:getRecipe')
          console.log(err)
        })
    },
    addNew ({commit}, entity) {
      commit(types.RECEIVE_NEWRECIPE, entity)
    }
  },
  mutations: {
    [types.RECEIVE_SETRECIPES] (state, allEntity) {
      state.all = allEntity
    },
    [types.RECEIVE_NEWRECIPE] (state, newEntity) {
      state.new = newEntity
    }
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

export default recipe
