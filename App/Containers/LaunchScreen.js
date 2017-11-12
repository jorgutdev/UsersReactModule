import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
// Styles
import styles from './Styles/LaunchScreenStyles'
import { connect } from "react-redux";
import UserActions from "../Redux/UserRedux";
import { GoogleSigninButton } from "react-native-google-signin";
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;
export class LaunchScreen extends Component {



  _signIn(){
    this.props.request();

  }

  render () {
    let avatar = this.props.user ? (<Image source={{ uri: this.props.user.photoURL}}  style={styles.logo} />) : null;

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
          { avatar }
          </View>

          <View style={styles.section} >

            <GoogleSigninButton
    style={{width: 48, height: 48}}
    size={GoogleSigninButton.Size.Icon}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn.bind(this)}/>
  <Text>{ JSON.stringify(this.props.user )}</Text>

  <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>







          </View>



        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user : state.user.user
})
 // wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  request: () => dispatch(UserActions.userRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
