import React, { PureComponent } from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import { styles,colors } from '..'
import Icon from 'react-native-vector-icons/FontAwesome5';

export class HeaderIcon extends PureComponent {

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={[{alignItems:'center',height:30,width:30,paddingLeft:5,paddingRight:5},this.props.style]}>
        <Icon key={this.props.name} name={this.props.name} size={this.props.size} color={this.props.color} />
      </TouchableOpacity>
    )
  }
}



