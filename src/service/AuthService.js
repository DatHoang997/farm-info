import BaseService from '../model/BaseService'
import axios from 'axios'
import BigNumber from 'big-number'
import {thousands} from '@/util/help.js'
import { setupWeb3 } from '../util/auth'

let API_URL = process.env.SERVER_URL
const API = {
  PUT_POC_STATS   : API_URL + '/pocstats/',
  GET_HISTORY     : API_URL + '/pocstats/history/',
  DELETE_STATS    : API_URL + '/pocstats/delete/',
  VND_POC_PRICE   : API_URL + '/getprice/poc/vnd/',
  USD_POC_PRICE   : API_URL + '/getprice/poc/usd/',
  SET_ROLE        : API_URL + '/auth/set-role/'
}

let foundation
export default class extends BaseService {
  async login() {
    if (window.ethereum) {
      setupWeb3()
      return true
    }
  }

  async history () {
    const that = this
    const pocStatsRedux = this.store.getRedux('pocStats')
    that.dispatch(pocStatsRedux.actions.history_update(''))
    axios.get(API.GET_HISTORY)
      .then(function (response) {
        var data = response.data.data
        that.dispatch(pocStatsRedux.actions.history_update(data))
      })
  }

  async deleteStats (statsId, pocBalance, dead) {
    let that = this
    if (statsId) {
      await axios.delete(API.DELETE_STATS + statsId)
      .then(function (response) {
        that.pocStats(pocBalance, dead)
        that.history()
        that.PocPriceVND()
        that.PocPriceUSD()
        return false;
      })
    } else {
      return "Error"
    }
  }

  async PocPriceVND () {
    let that = this
    const pocStatsRedux = this.store.getRedux('pocStats')
    axios.get(API.VND_POC_PRICE)
      .then(function (response) {
        var data = response.data.data.price
        if (data != 0) {
          let dot = data.indexOf('.')
          let dataLength = data.slice(0, dot).length
          let float = parseFloat(data).toPrecision(dataLength+2).toString()
          that.dispatch(pocStatsRedux.actions.pocPriceVND_update(thousands(float, 2)))
        } else {
          that.dispatch(pocStatsRedux.actions.pocPriceVND_update('0'))
        }
      })
  }

  async PocPriceUSD () {
    let that = this
    const pocStatsRedux = this.store.getRedux('pocStats')
    axios.get(API.USD_POC_PRICE)
      .then(function (response) {
        var data = response.data.data.price
        if (data != 0) {
          let dot = data.indexOf('.')
          let dataLength = data.slice(0, dot).length
          let float = parseFloat(data).toPrecision(dataLength+2).toString()
          that.dispatch(pocStatsRedux.actions.pocPriceUSD_update(thousands(float, 2)))
        } else {
          that.dispatch(pocStatsRedux.actions.pocPriceUSD_update('0'))
        }
      })
  }
}