
import React, { Component } from 'react';
import {
  View, TouchableOpacity, PermissionsAndroid, Platform
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { styles, components, nav, colors } from '../'

export class Camera extends Component {
  state = {
    active: true
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Yugam App Camera Permission',
          'message': 'Yugam App needs access to your camera ' +
            'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera")
      } else {
        nav.pop(this.props.componentId)
      }
    } catch (err) {
      nav.pop(this.props.componentId)
    }
  }

  componentDidMount = () => {
    Platform.OS == 'android' ? this.requestCameraPermission() : null
  }

  render() {
    return (
      <components.ImgBack>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          captureAudio={false}
          collapsable={false}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={({ data }) => {
            if (this.state.active) {
              this.setState({ active: false })
              nav.pop(this.props.componentId)
              this.props.callback(data.replace('\n', '').replace(' ', ''))
            }
          }}
          style={{ flex: 1, height: styles.HEIGHT, width: styles.WIDTH }}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera for scanning the ID.'}
        />
        <TouchableOpacity onPress={() => {
          nav.pop(this.props.componentId)
        }} style={{ position: 'absolute', top: 0, left: 0, margin: 10, zIndex: 100000 }}>
          <components.IconButton name={styles.headerIconStyle.name} size={styles.headerIconStyle.size} color={colors.black} />
        </TouchableOpacity>
        <View style={{ position: 'absolute', marginTop: 200, borderRadius: 10, top: 0, bottom: 0, alignSelf: 'center', width: styles.WIDTH * 0.5, height: styles.WIDTH * 0.5, borderWidth: 1, borderColor: colors.textColor }} />
      </components.ImgBack>
    );
  }
}



