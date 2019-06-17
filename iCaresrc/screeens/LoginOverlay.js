import React, { PureComponent } from 'react'
import { View, UIManager, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { nav, styles,colors,components } from '../'
import { connect } from 'react-redux'
import { LOGIN, LOG, PRODUCT_LIST } from '../endpoints'
import { loginRequest, clearData, isLogged,getRequest } from '../actions'
const { lightboxStyle, lightboxContainer } = styles
import Icon from 'react-native-vector-icons/FontAwesome5';

class Home extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      user: {},
      load: false,
      secure: true
    }
  }

  showAlert = (title, subtitle) => {
    nav.overlay('AlertBox', {
      title,
      subtitle
    })
  }

  componentDidMount = () => {
    nav.mergeOptions(this.props.componentId, {
      bottomTabs: {
        visible: false,
        drawBehind: true,
        animate: false,
        _height: 0
      }
    });
    this.setState({
      email: '',
      password: ''
    })
  }

  change2 = (email) => {
    this.setState({ email })
  }
  change3 = (password) => {
    this.setState({ password })
  }

  loading = () => {
    return (
      <View style={{ flex: 1, top: 0, justifyContent: 'center', alignItems: 'center', bottom: 0 }}>
        <components.Animate loop={true} width={100} height={100} anim={require('../../assets/lottie/dna.json')} />
      </View>
    )
  }

  renderButton = () => {
    if (this.props.loading) {
      return (
        this.loading()
      )
    }

    return (
      <View style={{ alignSelf: 'center', marginBottom: 5 }}>
        <components.Button
          primary
          onPress={() => {
            if (this.state.email != null) {
              if (this.state.password.length > 0) {
                this.props.loginRequest(LOGIN, {
                  username: this.state.email,
                  password: this.state.password
                })
              }
            }
          }}><Text style={styles.buttonTextStyle}>Login</Text></components.Button>
      </View>
    )
  }

  render() {
    if (typeof (this.props.res) == 'object') {
      if (this.props.res.hasOwnProperty('status'))
      {
        if (this.props.res.status == 'success') {
          this.props.getRequest(PRODUCT_LIST)
          this.props.clearData(LOGIN)
          nav.dismissOverlay(this.props.componentId)
        }
        else if (this.props.res.status == 'error') {
          this.props.clearData(LOGIN)
          this.showAlert("Error", this.props.res.message)
        }
      }
      else if (this.props.res.hasOwnProperty('detail')){
        this.props.clearData(LOGIN)
        this.showAlert("Error", this.props.res.detail)
      }
    }
    return (
      <View style={[lightboxContainer, this.props.containerStyle]}>
        <View style={[lightboxStyle, { width: styles.WIDTH * 0.9}]}>
          <components.BlankCard style={{ paddingTop: 20, paddingBottom: 20 }}>
            <ScrollView style={{ alignSelf: 'stretch', bottom: 0 }}>
              <Text numberOfLines={3} key={'cool'} style={[styles.headerTextStyle, { color:colors.first, fontSize:20 }]}>{'Login'}</Text>
              <View rounded style={styles.inputContainerStyle}>
                <TextInput keyboardType={'email-address'} textContentType={'emailAddress'} style={{ color: colors.textColor, fontFamily: styles.fonts.MontserratMedium, alignSelf: 'stretch', width: styles.WIDTH * 0.8, padding: 5 }}
                  placeholderTextColor={colors.subTextColor} autoCapitalize={'none'}
                  placeholder={'Email'} onChangeText={this.change2} />
              </View>
              <View>
                <View style={[styles.inputContainerStyle, { justifyContent: 'space-around', flexDirection: 'row', padding: 10 }]}>
                  <TextInput textContentType={'password'} style={{ color: colors.textColor, fontFamily: styles.fonts.MontserratMedium, alignSelf: 'stretch', width: styles.WIDTH * 0.8, padding: 5 }}
                    placeholderTextColor={colors.subTextColor} autoCapitalize={'none'}
                    placeholder={'It\'s secure here!!'} secureTextEntry={this.state.secure} onChangeText={this.change3} />
                  <TouchableOpacity onPress={() => { this.setState({ secure: !this.state.secure }) }}>
                    <Icon key={this.state.secure ? styles.icons.eye : styles.icons.eyeopen} name={this.state.secure ? styles.icons.eye : styles.icons.eyeopen} size={styles.headerIconStyle.size} color={colors.subTextColor} />
                  </TouchableOpacity>
                </View>
              </View>
              {this.renderButton()}
            </ScrollView>
          </components.BlankCard>
        </View>
      </View>
    )
  }
}


const mapStateToProps = ({ login, userData }) => {
  LOG(login.response)
  return {
    loading: login.loading,
    res: login.response,
    reloading: userData.loading
  }
}


export const LoginOverlay = connect(mapStateToProps, { loginRequest, clearData, isLogged, getRequest})(Home)

