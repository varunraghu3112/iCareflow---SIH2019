import React, { PureComponent } from 'react'
import { View } from 'react-native'
import {styles} from '..'

export class MainLayer extends PureComponent {
  render() {
    return (
      <View style={[styles.mainLayerStyle,this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}
