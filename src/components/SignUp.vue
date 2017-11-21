<template>
  <div>
    <h1>SignUp</h1>

    <div id="signup" style="">
      <label>Email</label>
      <input type="text" id="inputEmail" v-model="inputEmail" placeholder="Email" required autofocus></input><br>
      <label>Password</label>
      <input type="password" id="inputPassword" v-model="inputPassword" placeholder="Password" required></input><br>
      <input type="button" value="Sign Up" @click="signupButtonClick()"></input>
      <br><br><br>
    </div>
    <div id="activation" style="display:none;">
      <label>Activation</label>
      <input type="key" id="inputkey" v-model="inputkey" placeholder="Activation Key" required></input><br>
      <input type="button" value="Activate" @click="activateButtonClick()"></input>
      <br><br><br>
    </div>
    <router-link :to="{ name:'main'}">top</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'signup',
  data: function () {
    return {
      inputEmail: '',
      inputPassword: '',
      inputkey: ''
    }
  },
  methods: {
    ...mapActions('auth', ['getSession', 'signup', 'activate']),
    signupButtonClick: function () {
      console.log(this.inputEmail + ':' + this.inputPassword)

      var email = this.inputEmail
      var password = this.inputPassword

      this.signup({email, password}).then(
        (result) => {
          var cognitoUser = result.user
          console.log('user name is ' + cognitoUser.getUsername())
          document.getElementById('activation').style.display = 'block'
        },
        (err) => {
          alert(err)
        }
      )
    },
    activateButtonClick: function () {
      var email = this.inputEmail
      var key = this.inputkey

      this.activate({email, key}).then(
        (result) => {
          this.$router.push('/login')
        },
        (err) => {
          alert(err)
        }
      )
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
