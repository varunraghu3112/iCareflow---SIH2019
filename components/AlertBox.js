import React, { PureComponent } from 'react'
import { View, UIManager, Text } from 'react-native'

import { nav, styles } from '../'
import { Button } from './Button'
import { BlankCard } from './BlankCard';
const { lightboxStyle, lightboxContainer, lightboxTextStyle, lightboxSubTextStyle, lightboxButtonStyle } = styles

export class AlertBox extends PureComponent {
  
  componentDidMount = () => {
 
    nav.mergeOptions(this.props.componentId, {
      bottomTabs: {
        visible: false,
        drawBehind: true,
        animate: false,
        _height: 0
      }
    });
  }
  render() {
    return (
      <View style={[lightboxContainer, this.props.containerStyle]}>
        <View style={lightboxStyle}>
          <BlankCard>
            <Text numberOfLines={2} style={lightboxTextStyle}>{this.props.title}</Text>
            <Text numberOfLines={3} style={lightboxSubTextStyle}>{this.props.subtitle}</Text>
            <Button onPress={() => {
              nav.dismissOverlay(this.props.componentId)
              this.props.callback ? this.props.callback() : null;
            }}><Text style={styles.buttonTextStyle}> {this.props.btnText || 'OK'} </Text></Button>
            {
              this.props.cancel ? (
                <Button onPress={() => {
                  nav.dismissOverlay(this.props.componentId)
                   this.props.cancelCallback ? this.props.cancelCallback() : null;
                }}><Text style={styles.buttonTextStyle}> {'Cancel'} </Text></Button>
              ) : (null)
            }
          </BlankCard>
        </View>
      </View>
    )
  }
}
