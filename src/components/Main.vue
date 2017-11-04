<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <span>{{ message }}</span><br/>
    <button v-on:click="getData">Get data</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message: 'Hello'
    }
  },
  methods: {
    getData: function () {
      this.message = '取得中'
      // axios.get('http://httpbin.org/get')
      axios.get('/static/data/test.json')
        .then(res => {
          console.log(res.status, res.statusText, res.data)
          this.message = res.data
        }).catch(err => {
          throw err
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
