import React, { PureComponent} from 'react'
import {View} from 'react-native'
import {styles} from '../'

export class BlankCard extends PureComponent{
  render() {
    return (
      <View style={[styles.blankCardStyle,this.props.style]}>
        {this.props.children}
      </View >
    )
  }
}