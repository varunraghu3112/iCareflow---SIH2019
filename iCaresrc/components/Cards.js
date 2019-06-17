import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import { styles } from '../styles';
import { colors } from '../colors';
import { CachedImage } from "react-native-img-cache";
import LinearGradient from 'react-native-linear-gradient';

export class Cards extends PureComponent {

  render() {
    return (
      <View style={[styles.cardStyle, { backgroundColor: "#00000055" }, this.props.style]}>

        <CachedImage source={{ uri: "https://kctyugam.com" + this.props.uri }} style={{
          borderRadius: 5,
          width: null, top: 0, bottom: 0, left: 0, right: 0, flex: 1, alignSelf: 'stretch',

        }} />

        {this.props.title ? (
          <LinearGradient colors={['#000000aa', '#000000dd', '#000000aa']} style={{
            height: styles.cardStyle.height, alignItems: 'center',
            justifyContent: 'center', borderRadius: 5, position: 'absolute', bottom: 0, alignSelf: 'center', right: 0, left: 0, top: 0
          }}>
            <Text numberOfLines={2} style={[styles.cardTitle, { alignSelf: 'center', color: colors.textColor, alignItems: 'center', justifyContent: 'center', bottom: 0 }]}>{this.props.title}</Text>
          </LinearGradient>
        ) : null}
      </View>
    )
  }
}
