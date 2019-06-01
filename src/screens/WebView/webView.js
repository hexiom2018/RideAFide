import React, { Component } from 'react';
import { Text, View, StyleSheet, WebView } from 'react-native';
import { Constants } from 'expo';

export default class web extends Component {
  onNavigationStateChange = navState => {
    if (navState.url.indexOf('https://www.google.com') === 0) {
      const regex = /#access_token=(.+)/;
      let accessToken = navState.url.match(regex)[1];
      console.log(accessToken);
    }
  };
  render() {
    const url = 'https://rideafide.com/member/brian-test3/';
    return (
      <WebView
        source={{
          uri: url,
        }}
        onNavigationStateChange={this.onNavigationStateChange}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        style={{ flex: 1 }}
      />
    );
  }
}
