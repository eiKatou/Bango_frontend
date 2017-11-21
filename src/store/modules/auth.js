import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { config } from 'aws-sdk'
import * as types from '../mutation-types'
import AwsUtil from '../../utils/AwsUtil'

const auth = {
  namespaced: true,
  state: {
    user: undefined,
    jwtToken: undefined
  },
  getters: {
    user: (state) => state.user,
    jwtToken: (state) => state.jwtToken,
    isLogined: (state) => {
      if (state.user === undefined) {
        return false
      } else {
        return true
      }
    },
    userName: (state) => {
      if (state.user === undefined) {
        return 'no user'
      } else {
        return getEmail(state.user)
      }
    }
  },
  mutations: {
    [types.RECEIVE_SETUSER] (state, user) {
      state.user = user
    },
    [types.RECEIVE_SETJWTTOKEN] (state, jwtToken) {
      state.jwtToken = jwtToken
    }
  },
  actions: {
    getSession ({commit}) {
      return new Promise((resolve, reject) => {
        var userPool = createUserPool()
        var cognitoUser = userPool.getCurrentUser()
        if (cognitoUser == null) {
          commit(types.RECEIVE_SETUSER, undefined)
          reject(new Error('cognitoUser is null.'))
          return
        }
        cognitoUser.getSession(function (err, session) {
          if (err) {
            commit(types.RECEIVE_SETUSER, undefined)
            reject(err)
            return
          }
          commit(types.RECEIVE_SETJWTTOKEN, session.getIdToken().getJwtToken())
          cognitoUser.getUserAttributes(function (err, attributes) {
            if (err) {
              commit(types.RECEIVE_SETUSER, undefined)
              reject(err)
              return
            }
            commit(types.RECEIVE_SETUSER, attributes)
            resolve(attributes)
          })
        })
      })
    },
    login ({commit}, {authenticationData, userName}) {
      return new Promise((resolve, reject) => {
        var userPool = createUserPool()
        var userData = {
          Username: userName,
          Pool: userPool
        }
        var authenticationDetails = new AuthenticationDetails(authenticationData)
        var cognitoUser = new CognitoUser(userData)
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            commit(types.RECEIVE_SETJWTTOKEN, result.getIdToken().getJwtToken())
            // console.log('access token + ' + result.getAccessToken().getJwtToken())
            cognitoUser.getUserAttributes(function (err, attributes) {
              if (err) {
                console.log('erro getUserAttributes')
              } else {
                console.log(attributes)
              }
            })
            console.log(result)
            AwsUtil.setAwsConfig(result.getIdToken().getJwtToken())
            config.credentials.refresh((error) => {
              if (error) {
                console.log('error:Config.credentials')
                console.error(error)
              } else {
                console.log('Successfully logged!')
                resolve(result)
              }
            })
          },
          onFailure: function (err) {
            reject(err)
          }
        })
      })
    },
    logout ({commit}) {
      console.log('logout')
      var userPool = createUserPool()
      var cognitoUser = userPool.getCurrentUser()
      if (cognitoUser != null) {
        cognitoUser.signOut()
        console.log('cognitoUser.signOut')
        commit(types.RECEIVE_SETUSER, undefined)
      }
    },
    signup ({commit}, {email, password}) {
      return new Promise((resolve, reject) => {
        console.log(email + ':' + password)
        var userPool = createUserPool()
        var attributeList = []
        var dataEmail = {
          Name: 'email',
          Value: email
        }
        var attributeEmail = new CognitoUserAttribute(dataEmail)
        attributeList.push(attributeEmail)

        userPool.signUp(email, password, attributeList, null,
          function (err, result) {
            if (err) {
              reject(err)
              return
            }
            resolve(result)
          })
      })
    },
    activate ({commit}, {email, key}) {
      return new Promise((resolve, reject) => {
        var userPool = createUserPool()
        var userData = {
          Username: email,
          Pool: userPool
        }

        var cognitoUser = new CognitoUser(userData)
        cognitoUser.confirmRegistration(key, true, function (err, result) {
          if (err) {
            reject(err)
            return
          }
          resolve(result)
        })
      })
    }
  }
}

function createUserPool () {
  var poolData = {
    UserPoolId: process.env.COGNITO_USERPOOLID_ENV,
    ClientId: process.env.COGNITO_CLIENTID_ENV
  }
  var userPool = new CognitoUserPool(poolData)
  return userPool
}

function getEmail (user) {
  var email
  user.forEach(function (attr) {
    if (attr.Name === 'email') {
      email = attr.Value
    }
  })
  return email
}

export default auth
