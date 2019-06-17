import React, { PureComponent } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { styles,colors } from '../';

export class ZeroCard extends PureComponent {
  render() {
    return (
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.third, colors.second, colors.first]} style={[styles.zeroCardStyle,this.props.style]}>
        {this.props.children}
      </LinearGradient>
    )
  }
}
