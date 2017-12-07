import axios from 'axios'
import { config, S3 } from 'aws-sdk'

class UserData {
  static getObjectKey () {
    // return 'private/' + config.credentials.identityId + '/recipe.json'
    return 'private/' + 'ap-northeast-1:d201d715-23bb-42f3-8051-6c00b76f8d04' + '/recipe.json'
  }

  static getRecipe () {
    return new Promise((resolve, reject) => {
      var params = {
        Bucket: 'eikatou.bango.data',
        Key: 'private/' + config.credentials.identityId + '/recipe.json'
      }
      var s3 = new S3()
      s3.getObject(params, function (err, data) {
        if (err) {
          reject(err)
        } else {
          var object = JSON.parse(data.Body.toString())
          resolve(object)
        }
      })
    })
  }

  static getRecipeThumbnail (fileName, jwtToken) {
    return new Promise((resolve, reject) => {
      // レシピのイメージを取得
      let API_IMG_URL = 'https://3nqaj8sj17.execute-api.ap-northeast-1.amazonaws.com/test/recipe/1/image'
      axios.defaults.headers.common['Authorization'] = jwtToken
      axios.get(API_IMG_URL)
      .then(res => {
        console.log(res.status, res.statusText)
        resolve(res.data)
      }).catch(err => {
        console.error(err)
        reject(err)
      })

      // var params = {
      //   Bucket: 'eikatou.bango.data',
      //   Key: 'private/' + config.credentials.identityId + '/' + fileName
      // }
      // var s3 = new S3()
      // s3.getObject(params, function (err, data) {
      //   if (err) {
      //     reject(err)
      //   } else {
      //     resolve(data)
      //   }
      // })
    })
  }
}

export default UserData
