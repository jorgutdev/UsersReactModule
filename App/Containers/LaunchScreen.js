import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import firebase from 'react-native-firebase'
// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {



  _signIn(){
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);

      let googleProvider = new firebase.auth().GoogleAuthProvider;
      const cred = firebase.auth.GoogleAuthProvider.credential(
        user.idToken,
        user.accessToken
      )

      firebase.auth().signInWithCredential(cred).then(
        (fireUser) => {
          console.log('firebase user ->', fireUser)
          this.setState({ user });
        }
      )
    }).catch((err) => {
      console.log('WRONG SIGNIN', err);
    });

  }

  render () {

    let user = !!this.state ? this.state.user : null;
    var avatar
    if(user){
      avatar = <Image source={user.photoURL}></Image>
    }

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            { avatar }

            <GoogleSigninButton
    style={{width: 48, height: 48}}
    size={GoogleSigninButton.Size.Icon}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn.bind(this)}/>

          </View>



        </ScrollView>
      </View>
    )
  }
}
