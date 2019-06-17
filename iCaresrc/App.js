import { Navigation } from 'react-native-navigation';
import React from 'react'
import { Provider } from 'react-redux';
import {store} from './store'
import * as angadi from './screeens'
import  {components} from './components'

const createApp = (Component, key) => {
  return class App extends React.Component {
    renderLoading = () => (
      <components.ImgBack/>
    );
    render() {
      return (
            <Component {...{
              ...this.props
            }} />
      );
    }
  }
}

Object.keys(components).forEach(key => {
  Navigation.registerComponent(key, () => components[key])
})

Object.keys(angadi).forEach(key => { 
  Navigation.registerComponentWithRedux(key, () => createApp(angadi[key],key),Provider,store)
})




export default () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      layout: {
        orientation: ['portrait']
      },
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
        _height: 0
      }

    });
    Navigation.setRoot({
      root: {
        stack: {
          children: [{
            component: {
              name: 'Home',
              passProps: {
                title: 'Home'
              }
            }
          }]
        }
      }
    });
  });

}
