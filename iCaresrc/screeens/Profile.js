import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { styles, components, nav } from '../'
import { isLogged, logOut, getRequest} from '../actions'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../colors';
import { LOG } from '../endpoints';

class Home extends PureComponent {
  componentDidMount() {
    this.props.isLogged()
  }


  goBack = (comp) => {
    return (
      <TouchableOpacity style={styles.headerButtonStyle} onPress={() => nav.pop(this.props.componentId)}>
        {comp}
      </TouchableOpacity>
    )
  }

  loading = () => {
    return (
      <View style={{ flex: 1, top: 0, justifyContent: 'center', alignItems: 'center', bottom: 0 }}>
        <components.Animate loop={true} width={100} height={100} anim={require('../../assets/lottie/dna.json')} />
      </View>
    )
  }

  
  log = () => {
    if (this.props.loading) {
      return (this.loading())
    }
    if (this.props.logged) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView indicatorStyle={'white'}>
            <components.BlankCard style={{ alignSelf: 'stretch' }}>
              {this.props.user.hasOwnProperty('first_name') ? <components.Bullet title={'Firstname : '} data={this.props.user.first_name} /> : null}
              {this.props.user.hasOwnProperty('email') ? <components.Bullet title={'Email : '} data={this.props.user.email} /> : null}
              {this.props.user.hasOwnProperty('wallet_address') ? <components.Bullet title={'Wallet Address : '} data={this.props.user.wallet_address} /> : null}
              
            </components.BlankCard>
            
            <View style={{ bottom: 0, alignItems: 'center', margin: 5, justifyContent: 'center', alignSelf: 'center' }}>
              <components.Button primary onPress={() => {
                this.props.logOut()
                nav.pop(this.props.componentId)
                nav.overlay('LoginOverlay')
              }}>
                <Text style={styles.buttonTextStyle}>Logout</Text>
              </components.Button>
            </View>
          </ScrollView>

        </View>
      )
    }
  }

  render() {
    return (
      <components.ImgBack >
        <components.Headers>
          {this.goBack(
            [
              <Icon key={styles.headerIconStyle.name} name={styles.headerIconStyle.name} size={styles.headerIconStyle.size} color={colors.black} />,
              <Text numberOfLines={3} key={this.props.title} style={styles.headerTextStyle}>{this.props.title}</Text>
            ]
          )}
        </components.Headers>
        <components.MainLayer style={{ maxHeight: styles.HEIGHT }}>
          {this.log()}
        </components.MainLayer>
      </components.ImgBack>
    )
  }
}

const mapStateToProps = ({ logged, userData, logout }) => {
  LOG(['user',userData])
  return {
    logged: logged.loggedIn,
    user: userData.response,
    loading:userData.loading || logout.loading
    }
}

export const Profile = connect(mapStateToProps, { isLogged, logOut, getRequest})(Home)
