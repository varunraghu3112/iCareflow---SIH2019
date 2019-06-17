import React from 'react'
import { View ,SafeAreaView} from 'react-native'
import  {styles} from '../styles'
import { colors } from '../colors';
import LinearGradient from 'react-native-linear-gradient';

export class ImgBack extends React.PureComponent {
  render(){
    return (
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.second, colors.second]} style={{flex:1}}>

      <SafeAreaView style={{ flex: 1}}>
        <View style={{ ...styles.imgBackStyle, backgroundColor: colors.backgroundColor}}>
        {this.props.children}
        </View>
      </SafeAreaView>
       </LinearGradient>
    )
  }
}
