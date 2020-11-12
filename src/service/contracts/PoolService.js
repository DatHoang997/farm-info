import BaseService from '../../model/BaseService'
import { thousands, weiToPOC, hideAddress } from '@/util/help.js'
import _ from 'lodash'
import { web3 } from "../../config/web3"
import contract from '../../config/contract'
import token_abi from '../../../build/production/contracts/Token.json'

export default class extends BaseService {
  async pool(wallet) {
    const poolContract = contract.pool_contract
    const poolRedux = this.store.getRedux('pool')
    let poolLength = await poolContract.methods.poolLength().call()
    let arr = []
    for (let i = 0; i < poolLength; i++) {
      let pendingCake = await poolContract.methods.pendingCake(i, wallet).call()
      let poolInfo = await poolContract.methods.poolInfo(i).call()
      let unStaked = await poolContract.methods.userInfo(i, wallet).call({ from: wallet })
      let token_contract = new web3.eth.Contract(token_abi.abi, poolInfo.lpToken, { gas: '5000000', gasPrice: '0' })
      let staked = await token_contract.methods.balanceOf(wallet).call()
      console.log(unStaked.amount, unStaked == '0' , staked, staked == '0')
      if (i == 0) {
        this.dispatch(poolRedux.actions.cakeBalance_update(staked))
      }
      if (unStaked.amount != '0' && staked != '0') {
        let data = {
          address: poolInfo.lpToken,
          balance: pendingCake,
          unStakedLP: unStaked.amount,
          stakedLP: staked
        }
        arr.push(data)
        this.dispatch(poolRedux.actions.info_update(arr))
      }
    }
    console.log('arr', arr)
    this.dispatch(poolRedux.actions.poolLength_update(poolLength))
  }
}
