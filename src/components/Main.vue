<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <span>{{ message }}</span><br/>
    <button v-on:click="getAllData">Get AllData</button>
    <button v-on:click="getData1">Get data1</button><br>
    <input type="text" name="searchText" size="30" maxlength="20"><br>
    <input type="button" value="検索" v-on:click="search()">
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      msg: 'レシピ検索',
      message: 'Hello'
    }
  },
  methods: {
    ...mapActions([
      'load'
    ]),
    getAllData: function () {
      this.message = '取得中'
    },
    getData1: function () {
      this.message = this.all[0].recipe_name
    },
    search: function () {
      this.message = this.searchText
    }
  },
  computed: {
    ...mapGetters([
      'all'
    ])
  },
  created () {
    this.message = '取得中'
    this.load()
  }
}
// function containsFoodstuff (foodstuff, text) {
//   // for (var f of foodstuff) {
//   // }
//   return true
// }
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
