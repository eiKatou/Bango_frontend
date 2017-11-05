<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="searchBox">
    <input type="text" name="searchText" size="30" maxlength="20" v-model="searchInputText">
    <input type="button" value="検索" v-on:click="searchButtonClick()">
    </div>
    <span>{{ message }}</span><br>

    <!-- レシピ検索結果 -->
    <template v-for="(recipe, index) in searchResult">
      <div id="recipe" v-bind:key="index">
        <h3>{{ recipe.name }}</h3>
        <p><a v-bind:href="recipe.url" target="_blank">リンク</a></p>
        <div id="foodstuff">
          <ul>
            <li v-for="f in recipe.foodstuff" v-bind:key="f">{{ f }}</li>
          </ul>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Main',
  data: function () {
    return {
      msg: 'レシピ検索',
      message: '',
      searchInputText: ''
    }
  },
  methods: {
    ...mapActions([
      'load',
      'setSearchText',
      'search'
    ]),
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
  list-style-type: disc;
}

li {
}

a {
  color: #42b983;
}

#searchBox {
  text-align: center;
  margin: auto;
  width: 100%;
}

#recipe {
  text-align: left;
  margin: auto;
  width: 60%;
}

#foodstuff {
  text-align: left;
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
