import React, { PureComponent } from 'react'
import { TouchableOpacity } from 'react-native'
import {styles,colors} from '../'
import LinearGradient from 'react-native-linear-gradient';


export class Button extends PureComponent {
  render() {
   
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.first, colors.first]} style={[styles.buttonStyle,this.props.style,{zIndex:1000000}]}>
      
        {this.props.children}
      </LinearGradient>
      </TouchableOpacity>

    )
  }
}
