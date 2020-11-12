const constants = require('./constant')
const { web3 } = require("./web3")
const PancakeSwap_liquidity_abi = require("../../build/production/contracts/PancakeSwap_liquidity.json").abi
const PancakeSwap_pool_abi = require("../../build/production/contracts/PancakeSwap_pool.json").abi
const cake_abi = require("../../build/production/contracts/cake.json").abi

module.exports = {
  PancakeSwap_liquidity_contract: new web3.eth.Contract(PancakeSwap_liquidity_abi, constants.PancakeSwap_liquidity_address, { gas: '5000000', gasPrice: '0' }),
  pool_contract: new web3.eth.Contract(PancakeSwap_pool_abi, '0x73feaa1eE314F8c655E354234017bE2193C9E24E', { gas: '5000000', gasPrice: '0' }),
  cake_contract: new web3.eth.Contract(cake_abi, '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', { gas: '5000000', gasPrice: '0' }),
}
