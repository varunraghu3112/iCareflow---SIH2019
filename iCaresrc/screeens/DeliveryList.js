import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { LOGIN, LOG, PRODUCT_LIST,PDT_DELIVERY } from '../endpoints'
import { changeAnswer,isLogged,getRequest ,clearData,postRequest} from '../actions'
import { styles, components, nav, colors } from '../'
import Icon from 'react-native-vector-icons/FontAwesome5'
import _ from 'lodash'


class App extends React.Component {
  state = {
    active: false,
    index:0
  }
  _keyExtractor = (item, index) => item.user+ 'got';

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

  showAlert = (title, subtitle) => {
    nav.overlay('AlertBox', {
      title,
      subtitle
    })
  }

  log = () => {
    if(this.props.loading){
      return this.loading()
    }
    return (
        <components.BlankCard style={{ flex:1 }}>
        <View style={[styles.blankCardContentStyle, { width: styles.WIDTH * 0.8, justifyContent: 'flex-start' }]}>
          <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 15, paddingLeft: 0, width: 90, color: colors.first }}>{'Invoice'}</Text>
          <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 15, paddingLeft: 0, width: 90, color: colors.first }}>{'User'}</Text>
          <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 17, paddingLeft: 0, width: 90, color: colors.first }}>{'Total'}</Text>
        </View>
        <FlatList
          indicatorStyle={'white'}
          data={this.props.list}
          contentContainerStyle={{ alignItems: 'center' }}
          ItemSeparatorComponent={() => <View style={{ margin: 3 }} />}
          keyExtractor={this._keyExtractor}
          removeClippedSubviews={true}
          renderItem={
            ({ item,index }) => {
              return (
                <View style={[{  width: styles.WIDTH * 0.8}]} >
                  <TouchableOpacity 
                    style={[styles.blankCardContentStyle, { width: styles.WIDTH * 0.8 }]}
                    onPress={() => {
                    if(this.state.index!=index){
                      this.setState({ active: true, index })
                      return
                    }
                    this.setState({ active: !this.state.active, index })
                  }}>
                    <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 15, paddingLeft: 0, width: 70 }}>{item.id}</Text>
                    <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 15, paddingLeft: 0, width: 90 }}>{item.user}</Text>
                    <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 15, paddingLeft: 0, width: 90 }}>{item.total}</Text>
                  </TouchableOpacity>
                  <View>
                    {
                      this.state.active && this.state.index == index && item.line_items.length>0 ? (
                        <View key={item.user+'sdjfsjhdgfjhsd'}>
                        <View style={[styles.blankCardContentStyle, { width: styles.WIDTH * 0.8 }]}>
                            <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 15, paddingLeft: 0, width: 90, color: colors.first }}>{'S.No'}</Text>
                            <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 15, paddingLeft: 0, width: 90, color: colors.first }}>{'Product'}</Text>
                            <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 15, paddingLeft: 0, width: 90, color: colors.first }}>{'Quantity'}</Text>
                        </View>
                        {
                          item.line_items.map((val,i) => (
                              <View key={val.name+i} style={[styles.blankCardContentStyle, { width: styles.WIDTH * 0.8, justifyContent: 'flex-start' }]}>
                                <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 15, paddingLeft: 0, width: 90, color:colors.third }}>{i}</Text>
                                <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 15, paddingLeft: 0, width: 90, color:colors.third }}>{val.name}</Text>
                                <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 15, paddingLeft: 0, width: 90, color:colors.third }}>{val.qty}</Text>
                              </View>
                          ))
                        }
                          <components.Button primary onPress={() => { 
                            this.props.postRequest(PDT_DELIVERY,{
                              invoice_id:item.id
                            })
                            this.setState({active:false})
                          }}>
                            <Text style={[styles.buttonTextStyle, { color: colors.black}]}>Deliver</Text>
                          </components.Button>
                        </View>
                      ) : (null)
                    }
                  </View>
                </View>
              )
            }
          }
        />
        </components.BlankCard>
    )
  }


  render = () => {
    if (this.props.deliveryStatus.hasOwnProperty('status') && this.props.deliveryStatus.hasOwnProperty('message')) {
      this.props.clearData(PDT_DELIVERY)
      if (this.props.deliveryStatus.status == 'success') {
        this.showAlert('Success', this.props.deliveryStatus.message)
        this.props.clearData(PDT_DELIVERY)
        this.props.callback()      
      }
      else if (this.props.deliveryStatus.status == 'failed') {
        this.showAlert('Failed', this.props.deliveryStatus.message)
        this.props.clearData(PDT_DELIVERY)
      }
    }
    return (
      <components.ImgBack>
        <components.Headers>
          {this.goBack(
            [
              <Icon key={styles.headerIconStyle.name} name={styles.headerIconStyle.name} size={styles.headerIconStyle.size} color={colors.black} />,
              <Text numberOfLines={3} key={this.props.title} style={styles.headerTextStyle}>{this.props.title}</Text>
            ]
          )}
          <components.HeaderIcon onPress={() => {
            this.props.callback()
          }} key={styles.headerIconStyle.refIcon} name={styles.headerIconStyle.refIcon} size={styles.headerIconStyle.userSize} color={colors.black} />
        </components.Headers>
        <components.MainLayer style={{ maxHeight: styles.HEIGHT }}>
          {this.log()}
        </components.MainLayer>
      </components.ImgBack>
    )
  }
}

const mapStateToProps = ({ deliveryList, productDelivery}) => {
  return {
    list: deliveryList.response,
    deliveryStatus: productDelivery.response,
    loading: deliveryList.loading || productDelivery.loading
  }
}

export const DeliveryList = connect(mapStateToProps, { changeAnswer, isLogged, getRequest, clearData,postRequest })(App)
