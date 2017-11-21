<template>
  <div>
    <header id="header">
      <nav id="header-nav">
        <ul>
          <router-link v-show="!isLogined && showLogin" tag="li" :to="{ name:'login'}"><a>login</a></router-link>
          <router-link v-show="!isLogined && showSignup" tag="li" :to="{ name:'signup'}"><a>signup</a></router-link>
          <span v-show="isLogined">{{ userName }}</span>
          <a v-show="isLogined" v-on:click="logout()" href="">logout</a>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'main',
  data: function () {
    return {
    }
  },
  methods: {
    ...mapActions('auth', ['getSession', 'logout'])
  },
  computed: {
    ...mapGetters('auth', ['user', 'userName', 'isLogined']),
    showLogin: {
      get () {
        return this.$route.name !== 'login'
      }
    },
    showLogout: {
      get () {
        return this.$route.name !== 'signup'
      }
    },
    showSignup: {
      get () {
        return this.$route.name !== 'signup'
      }
    }
  },
  mounted () {
    this.getSession()
      .then((attributes) => {
        console.log('logined')
      }).catch((err) => {
        console.log('no session, ' + err)
      })
  }
}
</script>

<style scoped>
header {
    text-align: center;
    width: 100%;
}

p a {
    position: absolute;
    left: 20px;
    top: 20px;
}
 
nav ul li {
    display: inline-block;
    margin-right: 5px;
}
</style>