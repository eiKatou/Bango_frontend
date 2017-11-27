import { config, S3 } from 'aws-sdk'

class UserData {
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

  static getRecipeThumbnail (fileName) {
    return new Promise((resolve, reject) => {
      var params = {
        Bucket: 'eikatou.bango.data',
        Key: 'private/' + config.credentials.identityId + '/' + fileName
      }
      var s3 = new S3()
      s3.getObject(params, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}

export default UserData
