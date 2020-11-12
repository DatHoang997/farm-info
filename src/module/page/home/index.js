import React, { useEffect, useState } from 'react'
import StandardPage from '../StandardPage'
import { Row, Col, Button } from 'antd'
import {useSelector} from "react-redux";
import {setupWeb3} from "../../../util/auth";
import { web3 } from '../../../config/web3'
import contract from '../../../config/contract'
import { weiToDecimal18 } from '../../../util/help'
import PoolService from '../../../service/contracts/PoolService'
import 'antd/dist/antd.css'
import './style.scss'

const home = () => {
  const poolLength = useSelector(state => state.pool.poolLength),
        cake = useSelector(state => state.pool.cakeBalance),
        poolInfo = useSelector(state => state.pool.info),
        wallet = useSelector(state => state.user.wallet)

  const poolService = new PoolService()

  useEffect(() => {
    setupWeb3()
    if (wallet) {
      poolService.pool(wallet)
    }
  }, [wallet])

  console.log('pool infomration', typeof(poolInfo))
  Object.size = function(poolInfo) {
    var size = 0, key;
    for (key in poolInfo) {
        if (poolInfo.hasOwnProperty(key)) size++;
    }
    return size;
  };

  // Get the size of an object
  let size = Object.size(poolInfo)

  useEffect(() => {

  }, [poolInfo])

  // let info
  // if(poolInfo) {
  let info = Object.values(poolInfo).map((element, key) => {
    return (
      <Row className="padding-top-md" key={key}>
        <Col span={5} className="padding-top-md">
          <p>address:</p>
        </Col>
        <Col span={19} className="padding-top-md">
          <p>{element.address}</p>
        </Col>
        <Col span={5} className="padding-top-md">
          <p>Cake balance:</p>
        </Col>
        <Col span={19} className="padding-top-md">
          <p>{weiToDecimal18(element.balance)}</p>
        </Col>
        <Col span={5} className="padding-top-md">
          <p>Unstaked LP:</p>
        </Col>
        <Col span={19} className="padding-top-md">
          <p>{weiToDecimal18(element.unStakedLP)} LP</p>
        </Col>
        <Col span={5} className="padding-top-md">
          <p>Staked Lp:</p>
        </Col>
        <Col span={19} className="padding-top-md">
          <p>{weiToDecimal18(element.stakedLP)} LP</p>
        </Col>
      </Row>
    )
  })

  const scan = async() => {
    console.log('getting farm info....')
    console.log('aaaaaaaaaaaaaaaaa')
    console.log(info)
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
          {cake && <p>Cake balance: {weiToDecimal18(cake)}</p>}
        </Col>
      </Row>
      <Row className="padding-top-md">
        <Col span={24} className="padding-top-md">
          {info}
          {/* {(size != 0) && <p>{poolInfo[size-1].address}</p>} */}
        </Col>
      </Row>
    </StandardPage>
  )
}

export default home;