import { takeLatest, all } from 'redux-saga/effects'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { UserTypes } from '../Redux/UserRedux'
import { StartupTypes } from '../Redux/StartupRedux'

/* ------------- Sagas ------------- */

import { googleLogin } from './UserSagas'
import { startup } from './StartupSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
//const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(UserTypes.USER_REQUEST, googleLogin),
    takeLatest(StartupTypes.STARTUP, startup)
  ])
}
