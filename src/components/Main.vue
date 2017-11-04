<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <span>{{ message }}</span><br/>
    <!--<button v-on:click="getAllData">Get AllData</button>
      <button v-on:click="getData1">Get data1</button><br>-->
    <input type="text" name="searchText" size="30" maxlength="20" v-model="searchInputText"><br>
    <input type="button" value="検索" v-on:click="searchButtonClick()">

    <div id="recipe_list">
      <table id="recipe_table">
      <template v-for="(recipe, index) in searchResult">
        <tr class="recipe_row" v-bind:key="index">
          <td class="recipe">{{ recipe.name }}</td>
          <td>{{index}}</td>
        </tr>
      </template>
      </table>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Main',
  data: function () {
    return {
      msg: 'レシピ検索',
      message: 'Hello',
      searchInputText: ''
    }
  },
  methods: {
    ...mapActions([
      'load',
      'setSearchText',
      'search'
    ]),
    getAllData: function () {
      this.message = '取得中'
    },
    getData1: function () {
      this.message = this.all[0].recipe_name
    },
    searchButtonClick: function () {
      this.setSearchText(this.searchInputText)
      this.search()
    }
  },
  computed: {
    ...mapGetters([
      'all',
      'searchText',
      'searchResult'
    ])
  },
  created () {
    this.message = '取得中'
    this.load()
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
#recipe_list {
  width: 40%;
  margin: auto;
}
#recipe_table {
  width: 100%;
  border-collapse:collapse;
}
.recipe_row {
  border-bottom:1.5px #aaa solid;
}
.recipe {
  text-align: left;
}
</style>
