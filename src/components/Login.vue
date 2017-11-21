<template>
  <div>
    <h1>Login</h1>

    <label>Email</label>
    <input type="text" id="inputEmail" v-model="inputEmail" placeholder="Email" required autofocus></input><br>
    <label>Password</label>
    <input type="password" id="inputPassword" v-model="inputPassword" placeholder="Password" required></input><br>
    <input type="button" value="login" @click="loginButtonClick()"></input>
    <br><br><br>
    <router-link :to="{ name:'main'}">top</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data: function () {
    return {
      inputEmail: '',
      inputPassword: ''
    }
  },
  methods: {
    ...mapActions('auth', ['login', 'getSession']),
    loginButtonClick: function () {
      console.log('email : ' + this.inputEmail)
      console.log('pass : ' + this.inputPassword)
      var authenticationData = {
        Username: this.inputEmail,
        Password: this.inputPassword
      }
      var userName = this.inputEmail
      this.login({authenticationData, userName})
        .then((result) => {
          return this.getSession()
        }).then((attributes) => {
          this.$router.push('/')
        }).catch((err) => {
          console.log('login error:' + err)
          alert('login error:' + err)
        })
    }
  },
  computed: {
  },
  created () {
  }
}
</script>

<style scoped>

</style>
