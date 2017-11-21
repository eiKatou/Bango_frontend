<template>
  <div>
    <img src="../assets/logo.jpg" style="zoom:0.3;">

    <h1>{{ msg }}</h1>
    <!-- 検索ボックス -->
    <div id="searchBox">
      <input type="text" name="searchText" size="20" maxlength="10" v-model="searchInputText">
      <input type="button" value="検索" v-bind:disabled="!loaded" v-on:click="searchButtonClick()">
    </div>
    <span v-show="!isLogined">{{ message }}</span><br>

    <!-- レシピ検索結果 -->
    <template v-for="(recipe, index) in this.searchResult">
      <div id="recipe" v-bind:key="index">
        <h3>{{ recipe.name }}</h3>
        <p>
          <a v-bind:href="recipe.url" target="_blank"><img v-bind:src="recipe.thumnailImage"></img></a></p>
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
import UserData from '../utils/UserData'

export default {
  name: 'main',
  data: function () {
    return {
      msg: 'レシピ検索',
      message: 'ログインしてね！',
      searchResult: [],
      searchInputText: ''
    }
  },
  methods: {
    ...mapActions('recipe', ['load']),
    ...mapActions('auth', ['getSession']),
    searchButtonClick: function () {
      console.log('searchButtonClick:' + this.searchInputText)
      this.searchResult = this.find(this.searchInputText)
      var that = this

      for (let i = 0; i < this.searchResult.length; i++) {
        let recipe = this.searchResult[i]
        that.searchResult[i].thumnailImage = undefined
        UserData.getRecipeThumbnail(recipe.thumnail)
          .then(function (data) {
            that.searchResult[i].thumnailImage = 'data:image/jpeg;base64,' + encode(data.Body)
            that.$set(that.searchResult, i, that.searchResult[i])
          }).catch(function (err) {
            console.log(err)
          })
      }
    }
  },
  computed: {
    ...mapGetters('recipe', ['all', 'find', 'loaded']),
    ...mapGetters('auth', ['user', 'jwtToken', 'isLogined']),
    loginMsg: {
      get () {
        if (this.isLogined) {
          return 'ログイン済'
        } else {
          return '未ログイン'
        }
      }
    }
  },
  mounted () {
    this.getSession()
      .then((attributes) => {
        this.load(this.jwtToken) // ログイン済みの時のみデータを取得する
      }).catch((err) => {
        console.log('no session, ' + err)
      })
  },
  created () {
  }
}
function encode (data) {
  var str = data.reduce(
    function (a, b) {
      return a + String.fromCharCode(b)
    }, '')
  return btoa(str).replace(/.{76}(?=.)/g, '$&\n')
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

h3 {
  border-bottom: solid 2px black;
}

img {
  max-width: 90%;
  height: auto;
  margin-left: 10px;
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
  width: 80%;
}

#recipe {
  text-align: left;
  margin: auto;
  width: 80%;
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
