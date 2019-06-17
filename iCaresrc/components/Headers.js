import React, { PureComponent } from 'react'
import { View ,SafeAreaView} from 'react-native'
import { styles} from '..'
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../colors';



export class Headers extends PureComponent {
  render() {
    return (
      
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.second,colors.second]} style={styles.headerStyles}>
        {this.props.children}
      </LinearGradient>
    
    )
  }
}
