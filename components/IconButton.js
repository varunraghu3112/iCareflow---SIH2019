import React, { PureComponent } from 'react'
import { styles } from '..'
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

export class IconButton extends PureComponent {
  render() {
    return (
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={this.props.bcolor ? [this.props.bcolor, this.props.bcolor]: [colors.first, colors.first]} style={styles.iconButtonStyle}>
        <Icon key={'icon'} name={this.props.name} size={this.props.size} color={this.props.color} />
      </LinearGradient>
    )
  }
}
