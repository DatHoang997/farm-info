import BaseRedux from '@/model/BaseRedux'

class userRedux extends BaseRedux {
  defineTypes () {
    return ['user']
  }

  defineDefaultState () {
    return {
      wallet: null,
      web3: null,
    }
  }
}

export default new userRedux()
