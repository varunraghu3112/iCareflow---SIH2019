import React, { PureComponent } from 'react'
import { ScrollView } from 'react-native'

export class MainScroll extends PureComponent {
  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingVertical: 10, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.props.children}
      </ScrollView>
    )
  }
}
