import BaseRedux from '@/model/BaseRedux'

class poolRedux extends BaseRedux {
  defineTypes () {
    return ['pool']
  }

  defineDefaultState () {
    return {
      poolLength: null,
      info: {},
      cakeBalance: null,
    }
  }
}

export default new poolRedux()
