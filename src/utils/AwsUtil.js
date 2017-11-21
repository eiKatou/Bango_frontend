import { config, CognitoIdentityCredentials } from 'aws-sdk'

class AwsUtil {
  static setAwsConfig (jwtToken) {
    config.region = 'ap-northeast-1'
    config.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-1:54af0d6d-d02a-4697-83f1-742a17c6055e', // your identity pool id here
      Logins: {
        'cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_0pNzQNaM0': jwtToken
      }
    })
    return config
  }
}

export default AwsUtil
