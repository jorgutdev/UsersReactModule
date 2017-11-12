import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: null,
  userSuccess: ['user'],
  userFailure: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  user: null
}, { deep: true })

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state) => {
  return state.merge({ fetching: true })
}
// successful avatar lookup
export const success = (state, action) => {
  return state.merge({ user: action.user })
}

// failed to get the avatar
export const failure = (state) => {
  return state;
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure
})
