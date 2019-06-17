import React, { PureComponent } from 'react'
import { View, Text, ScrollView, TouchableOpacity, FlatList,AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { styles, components, nav,colors } from '../'
import { changeAnswer,postRequest,clearData } from '../actions'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { EXTERNAL_BILLING, AUTH, BASE, USER_INFO,LOG } from '../endpoints';
import axios from 'axios'

class Home extends PureComponent {
 
  state = {
    loading:false
  }

  _keyExtractor = (item, index) => item + 'cool';

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
    if(this.props.loading||this.state.loading){
      return this.loading()
    }
    let total = 0
    if (this.props.answers.hasOwnProperty(this.props.index)) {
      Object.keys(this.props.answers[this.props.index]).forEach((key) => {
        let p = this.props.products.filter(val => val.id == key)[0]
        total = total + ( p.selling_price + (p.selling_price * ((p.cgst / 100) + (p.sgst / 100)))) * this.props.answers[this.props.index][key]
      })
    }

      return (
        <View style={{ flex: 1 }}>
            <components.BlankCard style={{ alignSelf: 'stretch',height:styles.HEIGHT*0.75 }}>
            <View style={[styles.blankCardContentStyle, { width: styles.WIDTH * 0.8, justifyContent:'flex-start' }]}>
              <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 17, paddingLeft: 0, width: 70,color:colors.first }}>{'Name'}</Text>
              <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 17, paddingLeft: 0, width: 70, color: colors.first}}>{'Count'}</Text>
              <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 17, paddingLeft: 0, width: 100, color: colors.first}}>{'Price(Rs.)'}</Text>
              <View/>
              <View/>
            </View>
            <FlatList
              indicatorStyle={'white'}
              data={this.props.answers.hasOwnProperty(this.props.index) ? Object.keys(this.props.answers[this.props.index]):[]}
              ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
              keyExtractor={this._keyExtractor}
              removeClippedSubviews={true}
              renderItem={
                ({ item }) => {
                  let p = this.props.products.filter(val => val.id == item)[0]
                  return (
                      <View style={[styles.blankCardContentStyle,{width:styles.WIDTH*0.8,justifyContent:'flex-start'}]}>
                        <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle,fontSize: 17,paddingLeft:0,width:60 }}>{p.name}</Text>
                        <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle,fontSize: 17,paddingLeft:0, width:60 }}>{'x'+this.props.answers[this.props.index][item].toString()}</Text>
                      <Text numberOfLines={20} style={{ ...styles.blankCardTextStyle, fontSize: 17, paddingLeft: 0, width: 60 }}>{(Math.round(this.props.answers[this.props.index][item] * (p.selling_price + p.selling_price * ((p.cgst / 100) + (p.sgst / 100))) * 100) / 100).toString()}</Text>
                      <TouchableOpacity onPress={() => {
                        let s = p.stock
                        if (!p.is_stockable){
                          this.props.changeAnswer(this.props.index, item, 'increment')
                          return
                        }
                        if (!(s > 0)) {
                          this.showAlert('Error', 'Product stocked out!')
                          return
                        }
                        if (this.props.answers.hasOwnProperty(this.props.index) && typeof (this.props.answers[this.props.index]) == 'object' && this.props.answers[this.props.index].hasOwnProperty(item)) {
                          if (!(this.props.answers[this.props.index][item] < s)) {
                            this.showAlert('Error', 'Stock limit exceeded!')
                            return
                          }
                        }
                        this.props.changeAnswer(this.props.index, item, 'increment')
                      }} >
                        <components.IconButton name={'plus'} color={colors.textColor} size={15} />
                      </TouchableOpacity>                       
                       <TouchableOpacity onPress={() => {
                          this.props.changeAnswer(this.props.index, item, 'decrement')
                        }} >
                        <components.IconButton bcolor={colors.third} name={'minus'} color={colors.textColor} size={15} />
                        </TouchableOpacity>
                      </View>
                  )
                }
              }
            />
            <View style={{margin:10}}/>
            <View style={styles.blankCardContentStyle}>
              <Text style={[styles.blankCardTextStyle, { fontSize: 17 }]}>{'Total (Rs.) : ' + (Math.round(total * 100) / 100).toString()}</Text>
            </View>
            </components.BlankCard>
            <View style={{ bottom: 0, alignItems: 'center', margin: 5, justifyContent: 'center', alignSelf: 'center',flexDirection:'row' }}>
            <components.Button primary onPress={() => {
              if (!(this.props.answers.hasOwnProperty(this.props.index) && Object.keys(this.props.answers[this.props.index]).length > 0)) {
                this.showAlert('Error', 'Nothing to bill!')
                return
              }
              this.setState({loading:true})
              nav.overlay('AlertBox', {
                title: 'Confirmation',
                subtitle: 'Bill as Guest?',
                btnText: 'Yes',
                cancel: true,
                cancelCallback: () => {
                  this.setState({ loading: false })
                },
                callback: () => {
                  let vendor_id = 0
                  this.props.postRequest(EXTERNAL_BILLING, {
                    datas: Object.keys(this.props.answers[this.props.index]).map(key => {
                      let p = this.props.products.filter(val => val.id == key)[0]
                      vendor_id = p.vendor
                      return {
                        product_id: p.id,
                        qty: this.props.answers[this.props.index][key]
                      }
                    }),
                    rfidvalue: 'guest',
                    vendor_id
                  })
                  this.setState({ loading: false })
                  this.props.cb()
                }
              })
            }}>
              <Text style={[styles.buttonTextStyle, { color: colors.black}]}>Bill as Guest</Text>
            </components.Button>
              <components.Button primary onPress={() => {
              if (!(this.props.answers.hasOwnProperty(this.props.index) && Object.keys(this.props.answers[this.props.index]).length > 0)) {
                this.showAlert('Error', 'Nothing to bill!')
                return
              }
                nav.push(this.props.componentId,'Camera',{
                  title:'Camera', callback: async (data) => {
                    this.setState({loading:true})
                    let auth = await AsyncStorage.getItem(AUTH)
                    if (!auth)
                      auth = ''
                    await axios({
                      url: BASE + 'v1/post_data/',
                      method: 'post',
                      headers: {
                        'Authorization': auth
                      },
                      data: { 
                        hash:data
                       }
                    }).then(response => {
                      if(response.data.hasOwnProperty('status')){
                        if (response.data.status=='Success'){
                          nav.overlay('AlertBox',{
                            title:'Confirmation',
                            subtitle: 'User Name: '+response.data.username+'\n User ID: '+response.data.user_id,
                            btnText:'Yes',
                            cancel:true,
                            cancelCallback:() => {
                              this.setState({ loading: false })
                            },
                            callback : () => {
                              let vendor_id = 0
                              this.props.postRequest(EXTERNAL_BILLING, {
                                datas: Object.keys(this.props.answers[this.props.index]).map(key => {
                                  let p = this.props.products.filter(val => val.id == key)[0]
                                  vendor_id = p.vendor
                                  return {
                                    product_id: p.id,
                                    qty: this.props.answers[this.props.index][key]
                                  }
                                }),
                                rfidvalue: response.data.user_id,
                                vendor_id
                              })
                              this.setState({ loading: false })
                              this.props.cb()
                            }
                          })
                        }
                        else if (response.data.status == 'error'){
                          this.showAlert('Error!',response.data.message)
                          this.setState({ loading: false })
                        }
                      }
                    }
                    ).catch((e) => {
                      this.showAlert('Error', "Unknown error occured!")
                      this.setState({loading:false})
                    });
                  }
                })
              }}>
                <Text style={[styles.buttonTextStyle,{color:colors.black}]}>Bill User</Text>
              </components.Button>
            </View>
        </View>
      )
  }

  render() {
    if (this.props.billing.hasOwnProperty('Status') && this.props.billing.hasOwnProperty('Message')){
      this.props.clearData(EXTERNAL_BILLING)
      if(this.props.billing.Status=='SUCCESS'){
        this.showAlert('Success',this.props.billing.Message)
        this.props.clearData(EXTERNAL_BILLING)
        nav.pop(this.props.componentId)
        this.props.cb()
        this.props.changeAnswer(this.props.index,'clear',0)
      }
      else if (this.props.billing.Status == 'FAILED'){
        this.showAlert('Error!', this.props.billing.Message)
        this.props.clearData(EXTERNAL_BILLING)
        this.props.cb()
      }
    }
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

const mapStateToProps = ({ answers, externalBilling }) => {
  LOG(["external billing",externalBilling])
  return {
    answers,
    loading: externalBilling.loading,
    billing: externalBilling.response
  }
}

export const Bill = connect(mapStateToProps, { changeAnswer, postRequest, clearData })(Home)
