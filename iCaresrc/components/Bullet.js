import React, { PureComponent } from 'react'
import { Text, View, UIManager } from 'react-native'
import { styles } from '../';


export class Bullet extends PureComponent {
  componentWillMount() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  render() {
    return (
      <Text delay={50} duration={300} animation={'fadeInUp'} numberOfLines={4} style={styles.bulletStyle}>
        <Text style={{color:'white'}}>{' \u2022  '}</Text>
        <Text numberOfLines={4} style={[styles.lightboxTextStyle,{fontSize:15}]}>{this.props.title+" "}</Text>
        <Text numberOfLines={4} style={[styles.lightboxSubTextStyle, { fontSize: 16 }]}>{this.props.data}</Text>
      </Text>
    )
  }
}
