import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './redux/user'
import pool from './redux/pool'

const default_state = {
  init: false
}

const appReducer = (state = default_state, action) => {
  switch (action.type) {

  }
  return state
}

export default combineReducers({
  app: appReducer,
  router: routerReducer,
  user: user.getReducer(),
  pool: pool.getReducer()
})
