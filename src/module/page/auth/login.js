import React, {useEffect, useState} from 'react';
import {Link, useParams, useHistory} from "react-router-dom";
import {Row, Col} from 'antd';
import AuthService from '../../../service/AuthService'
import {setupWeb3} from "../../../util/auth";
import {useSelector} from "react-redux";
import {LoadingOutlined} from '@ant-design/icons'
import "antd/dist/antd.css";
import './style.scss'

export default () => {
  const history = useHistory(),
        wallet = useSelector(state => state.user.wallet),
        web3 = useSelector(state => state.user.web3),
        [errorMsg, setErrorMsg] = useState(''),
        [requesting, setRequesting] = useState(false)

  const authService = new AuthService()

  const login = async () => {
    setRequesting(true)
    let response = await authService.login()
    setErrorMsg('')
    console.log('response', response, wallet)
  }
  console.log(wallet)
  console.log(web3)

  // useEffect(() => {
  //   if (window.ethereum) {
  //     setupWeb3()
  //   }
  // }, [wallet])

  return (
    <div className="login-background">
      <div className="login-logo-box">
        <img className='logo-img' src="../../../assets/images/logo.png" alt=""/>
      </div>
      <div className="login-box">
        <div className="login-box--header">
          <h3 className="center hide-on-desktop">Login</h3>
        </div>
        <div className="login-box--body">
          <button className="login-button" onClick={login}>
            {requesting && <span className="margin-right-sm"> <LoadingOutlined/></span>}
            login
          </button>
          {errorMsg && <p className="center text-red">{errorMsg}</p>}
          <p className="login__dont-have-acc">Don't have account?</p>
          <Link to="/register" className="link-register">Go register</Link>
        </div>
      </div>
    </div>
  );
}
