import React, { useEffect, useState } from 'react'
import StandardPage from '../StandardPage'
import { Row, Col, Button } from 'antd'
import {useSelector} from "react-redux";
import {setupWeb3} from "../../../util/auth";
import { web3 } from '../../../config/web3'
import contract from '../../../config/contract'
import { weiToDecimal18 } from '../../../util/help'
import 'antd/dist/antd.css'
import './style.scss'

const home = () => {
  const [srmAddress, setSrmAddress] = useState(''),
        [cakeContract, setCakeContract] = useState(contract.cake_contract),
        [xvsFarm, setXVSFarm] = useState(contract.xvs_pool_contract),
        [alphaFarm, setAlphaFarm] = useState(contract.alpha_pool_contract),
        [XVSUnStake, setXVSUnstake] = useState(null),
        [XVSStaked, setXVSStaked] = useState(null),
        [XVSCake, setXVSCake] = useState(null),
        [AlphaUnStake, setAlphaUnstake] = useState(null),
        [AlphaStaked, setAlphaStaked] = useState(null),
        [poolContract, setPoolContracts] = useState(contract.pool_contract),
        [AlphaCake, setAlphaCake] = useState(null),
        [cake, setCake] = useState(''),
        wallet = useSelector(state => state.user.wallet)

  useEffect(() => {
    if (wallet) {
      async function a() {
        // Cake balance
        setCake(await cakeContract.methods.balanceOf(wallet).call({ from: wallet }))
        // XVS-BNB FLP Tokens staked
        setXVSUnstake(await xvsFarm.methods.balanceOf(wallet).call({ from: wallet }))
        // XVS-BNB unstake
        let stakedXVS = await poolContract.methods.userInfo(13, wallet).call({ from: wallet })
        setXVSStaked(stakedXVS.amount)
        // XVS-BNB pending Cake
        setXVSCake(await poolContract.methods.pendingCake(13, wallet).call({ from: wallet }))
        // ALPHA-BNB FLP Tokens staked
        setAlphaUnstake(await alphaFarm.methods.balanceOf(wallet).call({ from: wallet }))
        // ALPHA-BNB unstake
        let stakedALPHA = await poolContract.methods.userInfo(16, wallet).call({ from: wallet })
        setAlphaStaked(stakedALPHA.amount)
        // ALPHA-BNB pending Cake
        setAlphaCake(await poolContract.methods.pendingCake(16, wallet).call({ from: wallet }))
      }
      a()
    }
  })

  const scan = async() => {
    console.log('get wallet address....')
    setupWeb3()
  }

  return (
    <StandardPage>
       <Row>
        <Col span={24} className="center">
          <h1>Farm information</h1>
        </Col>
      </Row>
      <Row className="padding-top-content">
        <Col span={24} className="center padding-top-md">
          <Button type="primary" className="scan-button" onClick={scan}>Scan</Button>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col span={24} className="padding-top-md">
          {cake && <p>Cake balance: {XVSUnStake && weiToDecimal18(cake)}</p>}
        </Col>
      </Row>
      <Row className="padding-top-content">
        <Col span={8} className="padding-top-md">
          <h4>XVS-BNB</h4>
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col span={1}></Col>
        <Col span={8} className="padding-top-md">
          <p>FLP Tokens unstake:</p>
        </Col>
        <Col span={13} className="padding-top-md">
          {XVSUnStake && weiToDecimal18(XVSUnStake) + ' LP'}
        </Col>
      </Row>
      <Row>
        <Col span={1}></Col>
        <Col span={8} className="padding-top-md">
          <p>FLP Tokens staked:</p>
        </Col>
        <Col span={13} className="padding-top-md">
          {weiToDecimal18(XVSStaked)}
        </Col>
      </Row>
      <Row>
        <Col span={1}></Col>
        <Col span={8} className="padding-top-md">
          <p>Cake earned:</p>
        </Col>
        <Col span={13} className="padding-top-md">
          {weiToDecimal18(XVSCake)}
        </Col>
      </Row>
      <Row className="padding-top-content">
        <Col span={8} className="padding-top-md">
          <h4>ALPHA-BNB</h4>
        </Col>
      </Row>
      <Row>
        <Col span={1}></Col>
        <Col span={8} className="padding-top-md">
          <p>FLP Tokens unstake:</p>
        </Col>
        <Col span={13} className="padding-top-md">
          {(AlphaUnStake != null) && weiToDecimal18(AlphaUnStake) + ' LP'}
        </Col>
      </Row>
      <Row>
        <Col span={1}></Col>
        <Col span={8} className="padding-top-md">
          <p>FLP Tokens staked:</p>
        </Col>
        <Col span={13} className="padding-top-md">
          {weiToDecimal18(AlphaStaked)}
        </Col>
      </Row>
      <Row>
        <Col span={1}></Col>
        <Col span={8} className="padding-top-md">
          <p>Cake earned:</p>
        </Col>
        <Col span={13} className="padding-top-md">
          {weiToDecimal18(AlphaCake)}
        </Col>
      </Row>
    </StandardPage>
  )
}

export default home;
