import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import { styles,colors } from '../';
import LinearGradient from 'react-native-linear-gradient';

export class Dash extends PureComponent {
  render() {
    return (
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.second, colors.third, colors.first]} style={[styles.dashStyle, { ...this.props }]}/>

    )
  }
}
