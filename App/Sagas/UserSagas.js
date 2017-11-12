import { put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import {GoogleSignin} from 'react-native-google-signin';
import firebase from 'react-native-firebase'

export function * googleLogin () {
  
  //const gLogged = yield GoogleSignin.currentUser();  
  const fLogged = yield firebase.auth().currentUser;
  
  if(!!fLogged ) {
    console.log('Firebase User already logged ->', fLogged)
  }
  let googleUser = yield GoogleSignin.signIn();    

  
  let cred = yield firebase.auth.GoogleAuthProvider.credential(
    null,
    googleUser.accessToken
  )

  let fireUser = yield firebase.auth().signInWithCredential(cred);
  let { displayName, email, photoURL, uid } = fireUser;
  let user = {
    displayName,
    email,
    photoURL,
    uid
  }

  yield put(UserActions.userSuccess(user))

}
