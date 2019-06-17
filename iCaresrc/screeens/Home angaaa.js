import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { LOGIN, LOG, PRODUCT_LIST, DEIVERY_LIST } from '../endpoints'
import { changeAnswer,isLogged,getRequest ,clearData,postRequest} from '../actions'
import { styles, components, nav, colors } from '..'
import LinearGradient from 'react-native-linear-gradient'
import _ from 'lodash'


// const products = [
//   {
//     "id": 1065,
//     "selling_price": 1,
//     "cost_price": 2,
//     "name": "dummy",
//     "short_code": "dummy",
//     "profit_percentage": null,
//     "mrp": 1,
//     "is_stockable": true,
//     "stock": 6,
//     "description": "sadflkjh",
//     "image": "/media/blog-details.jpg",
//     "is_active": true,
//     "is_approved": false,
//     "is_preorder": false,
//     "created_at": "2018-12-24T12:36:06.389000Z",
//     "updated_at": "2018-12-24T12:37:20.266000Z",
//     "cgst": 0,
//     "sgst": 0,
//     "hsn_number": "234234",
//     "vendor": 11853
//   },
//   {
//     "id": 1064,
//     "selling_price": 1,
//     "cost_price": 80,
//     "name": "Pencil",
//     "short_code": "PENCIL",
//     "profit_percentage": null,
//     "mrp": 1,
//     "is_stockable": true,
//     "stock": 12,
//     "description": "asdfasdf",
//     "image": "/media/51wYN9OnUbL._SY355_.jpg",
//     "is_active": true,
//     "is_approved": false,
//     "is_preorder": false,
//     "created_at": "2018-12-24T09:34:24.042387Z",
//     "updated_at": "2018-12-24T11:17:54.693000Z",
//     "cgst": 0,
//     "sgst": 0,
//     "hsn_number": "2342134234",
//     "vendor": 11853
//   },
//   {
//     "id": 1063,
//     "selling_price": 1,
//     "cost_price": 1,
//     "name": "Dairy Milk",
//     "short_code": "DMLIk",
//     "profit_percentage": null,
//     "mrp": 1,
//     "is_stockable": true,
//     "stock": 5,
//     "description": "asdfljkasdhflkj",
//     "image": "/media/417HK5HKYL.jpg",
//     "is_active": true,
//     "is_approved": false,
//     "is_preorder": false,
//     "created_at": "2018-12-21T06:56:18.718469Z",
//     "updated_at": "2018-12-21T07:02:54.803786Z",
//     "cgst": 0,
//     "sgst": 0,
//     "hsn_number": "23412341234",
//     "vendor": 11853
//   },
//   {
//     "id": 1062,
//     "selling_price": 12,
//     "cost_price": 9.2,
//     "name": "Hero Pen",
//     "short_code": "Hero",
//     "profit_percentage": null,
//     "mrp": 12,
//     "is_stockable": true,
//     "stock": 10,
//     "description": "fdgfgd",
//     "image": "/media/brand-new-original-hero-wing-black-fountain-pen-set-500x500.jpg",
//     "is_active": true,
//     "is_approved": false,
//     "is_preorder": false,
//     "created_at": "2018-12-21T05:58:21.103765Z",
//     "updated_at": "2018-12-24T12:34:14.452000Z",
//     "cgst": 0,
//     "sgst": 0,
//     "hsn_number": "1234",
//     "vendor": 11853
//   },
//   {
//     "id": 1061,
//     "selling_price": 1,
//     "cost_price": 3.77,
//     "name": "Cello Fine Grip - blue",
//     "short_code": "Cello",
//     "profit_percentage": null,
//     "mrp": 1,
//     "is_stockable": true,
//     "stock": 26,
//     "description": "hiiiiii",
//     "image": "/media/1.jpg",
//     "is_active": true,
//     "is_approved": false,
//     "is_preorder": false,
//     "created_at": "2018-12-19T10:31:04.636371Z",
//     "updated_at": "2018-12-24T12:35:32.063000Z",
//     "cgst": 0,
//     "sgst": 0,
//     "hsn_number": "testiong",
//     "vendor": 11853
//   },
//   {
//     "id": 1060,
//     "selling_price": 22,
//     "cost_price": 9.33,
//     "name": "Sharmila Biscut",
//     "short_code": "sharmi",
//     "profit_percentage": null,
//     "mrp": 1,
//     "is_stockable": true,
//     "stock": 27,
//     "description": "dsafljhasdfkjh",
//     "image": "/media/no_image.png",
//     "is_active": true,
//     "is_approved": false,
//     "is_preorder": false,
//     "created_at": "2018-11-28T12:47:42.246606Z",
//     "updated_at": "2018-12-21T06:27:19.024324Z",
//     "cgst": 5,
//     "sgst": 5,
//     "hsn_number": "sdlkjasldfkj",
//     "vendor": 11853
//   },
//   {
//     "id": 1059,
//     "selling_price": 30,
//     "cost_price": 14.65,
//     "name": "test2",
//     "short_code": "tset",
//     "profit_percentage": null,
//     "mrp": 1,
//     "is_stockable": true,
//     "stock": 120,
//     "description": "",
//     "image": "/media/no_image.png",
//     "is_active": true,
//     "is_approved": false,
//     "is_preorder": false,
//     "created_at": "2018-10-30T07:57:12.865438Z",
//     "updated_at": "2018-11-28T12:43:46.949396Z",
//     "cgst": 0,
//     "sgst": 0,
//     "hsn_number": "asdfasdf",
//     "vendor": 11853
//   },
//   {
//     "id": 1058,
//     "selling_price": 10,
//     "cost_price": 29.79,
//     "name": "test",
//     "short_code": "test",
//     "profit_percentage": null,
//     "mrp": 1,
//     "is_stockable": true,
//     "stock": 177,
//     "description": "sagdsdg",
//     "image": "/media/no_image.png",
//     "is_active": true,
//     "is_approved": false,
//     "is_preorder": false,
//     "created_at": "2018-10-30T07:55:44.648181Z",
//     "updated_at": "2018-12-24T11:17:54.770000Z",
//     "cgst": 0,
//     "sgst": 0,
//     "hsn_number": "sadfasdgf",
//     "vendor": 11853
//   }
// ]

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      name: '',
      index: 1,
      value:''
    }
  }

  componentWillMount() {
    this.props.isLogged()
  }

  componentDidMount() {
    this.props.changeAnswer(1, "new", 'increment')
    setTimeout(()=> {
      if (!this.props.logged) {
        nav.overlay('LoginOverlay')
      } else {
        this.props.getRequest(PRODUCT_LIST)
      }
    },500)
  }

  showAlert = (title, subtitle) => {
    nav.overlay('AlertBox', {
      title,
      subtitle
    })
  }

  _keyExtractor = (item, index) => item.name + 'list';

  loading = () => {
    return (
      <View style={{ flex: 1, top: 0, justifyContent: 'center', alignItems: 'center', bottom: 0 }}>
        <components.Animate loop={true} width={100} height={100} anim={require('../../assets/lottie/dna.json')} />
      </View>
    )
  }

  log = () => {
    if(this.props.loading){
      return this.loading()
    }
    let products = this.props.products.length > 0 ? this.props.products: []
    let data = _.filter(products, (item) => {
      let flag = 0
      if (typeof (item) == 'object')
        Object.keys(item).forEach(key => {
          if (_.includes(JSON.stringify(item[key]).replace(' ', '').toLowerCase(), this.state.value.replace(' ', '').toLowerCase())) {
            flag = 1;
          }
        })
      if (flag == 1) {
        return true
      }
      return false
    });
    let total=0
    if (this.props.answers.hasOwnProperty(this.state.index) )
    {
      Object.keys(this.props.answers[this.state.index]).forEach((key) => {
        let p = this.props.products.filter(val => val.id == key)[0]
        total = total + ( p.selling_price + (p.selling_price * ((p.cgst / 100) + (p.sgst / 100)))) * this.props.answers[this.state.index][key]
      })
    }
    return (
      <View style={{flex:1}}>
          <components.BlankCard style={{ height: styles.HEIGHT * 0.09, margin: 0, padding: 0 }}>
            <TouchableOpacity onPress={() => {
              this.props.getRequest(DEIVERY_LIST)
              nav.push(this.props.componentId, 'DeliveryList', {
                title: 'Delivery List', callback: () => {
                  this.props.getRequest(DEIVERY_LIST)
                }
              })
            }}>
              <View style={styles.blankCardContentStyle}>
                <Text style={[styles.blankCardTextStyle, { fontSize: 15 }]}>{'Delivery List'}</Text>
                <components.IconButton name={'angle-right'} color={colors.black} size={14} />
              </View>
            </TouchableOpacity>
          </components.BlankCard>
          <components.BlankCard style={{ height: styles.HEIGHT * 0.6 }}>
            <View>
              <TextInput style={{ color: colors.textColor, fontFamily: styles.fonts.MontserratMedium, width: styles.WIDTH * 0.8, padding: 5, fontSize: 17, paddingLeft: 10, margin: 5 }}
                placeholderTextColor={colors.subTextColor} autoCapitalize={'none'}
                placeholder={'Search here...'}
                returnKeyType={'search'}
                onChangeText={(value) => {
                  this.setState({ value })
                }}
                value={this.state.value} />
            </View>
            <FlatList
              indicatorStyle={'white'}
            data={_.orderBy(data, ['name'], ['asc'])}
              contentContainerStyle={{ alignItems: 'center' }}
              ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
              keyExtractor={this._keyExtractor}
              removeClippedSubviews={true}
              numColumns={2}
              renderItem={
                ({ item }) => {
                  let t = item.name + '\n' + 'Count'
                  let c = this.props.answers.hasOwnProperty(this.state.index) ? typeof (this.props.answers[this.state.index]) == 'object' && this.props.answers[this.state.index].hasOwnProperty(item.id) ? this.props.answers[this.state.index][item.id] : 0 : 0
                  return (
                    <TouchableOpacity onPress={() => {
                      if (!item.is_stockable) {
                        this.props.changeAnswer(this.state.index, item.id, 'increment')
                        return
                      }
                      let s = item.stock
                      if (!(s > 0)) {
                        this.showAlert('Error', 'Product stocked out!')
                        return
                      }
                      if (this.props.answers.hasOwnProperty(this.state.index) && typeof (this.props.answers[this.state.index]) == 'object' && this.props.answers[this.state.index].hasOwnProperty(item.id)) {
                        if (!(this.props.answers[this.state.index][item.id] < s)) {
                          this.showAlert('Error', 'Stock limit exceeded!')
                          return
                        }
                      }
                      this.props.changeAnswer(this.state.index, item.id, 'increment')
                    }}>
                      <components.Cards style={{ width: styles.WIDTH * 0.45, height: 120 }} title={t + ' : ' + c.toString()} uri={item.image} />
                    </TouchableOpacity>
                  )
                }
              }
            />
          </components.BlankCard>
          <ScrollView horizontal contentContainerStyle={{ height: 40, backgroundColor: '#44444400', bottom: 0, alignItems: 'center', marginTop: -2,left:0,right:0 }}>
            {
              Object.keys(this.props.answers).length > 0 ? Object.keys(this.props.answers).map((key) => (
                <TouchableOpacity key={key + 'cool'} onLongPress={() => {
                  if(key!=1)
                  {
                    this.props.changeAnswer(Number(key), "delete", 'increment')
                    this.setState({ index: 1 })
                  }
                  else {
                    this.props.changeAnswer(Number(key), "clear", 'increment')
                  }
                }}  onPress={() => {
                  this.setState({ index: Number(key) })
                }} >
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={this.state.index == key ? [colors.first, colors.first] : [colors.third, colors.third]} style={[styles.iconButtonStyle, { height: 30 }]}>
                    <Text numberOfLines={20} style={{ ...styles.headerTextStyle, fontSize: 15, paddingLeft: 0 }}>{key}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )) : (
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.first, colors.first]} style={[styles.iconButtonStyle, { height: 30 }]}>
                    <Text numberOfLines={20} style={{ ...styles.headerTextStyle, fontSize: 15, paddingLeft: 0 }}>{1}</Text>
                  </LinearGradient>
                )
            }
            <TouchableOpacity onPress={() => {
            let c = Object.keys(this.props.answers).length > 0 ? Object.keys(this.props.answers).map(key => Number(key)).sort()[Object.keys(this.props.answers).length - 1] + 1 : 2
              //let i = Object.keys(this.props.answers).length > 0 ? Object.keys(this.props.answers).length + 1 : 2
              if (!Object.keys(this.props.answers).length > 0) {
                this.props.changeAnswer(1, "new", 'increment')
              }
              this.props.changeAnswer(c, "new", 'increment')
              setTimeout(() => {
                this.setState({ index: c })
              })
            }} >
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.third, colors.third]} style={[styles.iconButtonStyle, { height: 30 }]}>
                <Text numberOfLines={20} style={{ ...styles.headerTextStyle, fontSize: 20, paddingLeft: 0, fontWeight: 'bold', color: colors.textColor }}>+</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>

     
       <components.BlankCard style={{ height: styles.HEIGHT * 0.09,margin:0,padding:0,marginBottom:-5}}>
          <TouchableOpacity onPress={() => {
            if (!(this.props.answers.hasOwnProperty(this.state.index) && Object.keys(this.props.answers[this.state.index]).length>0)){
              this.showAlert('Error','Nothing to bill!')
              return
            }
            nav.push(this.props.componentId, 'Bill', {
              title: 'Bill', products, index: this.state.index, cb: () => this.props.getRequest(PRODUCT_LIST)
          })
          }}>
            <View style={styles.blankCardContentStyle}>
              <Text style={[styles.blankCardTextStyle, { fontSize: 17 }]}>{'Total (Rs.) : ' + (Math.round(total * 100) / 100).toString() }</Text>
              <components.IconButton name={'angle-right'} color={colors.black} size={15} />
            </View>
          </TouchableOpacity>
        </components.BlankCard>
     
      </View>
    )
  }

  render = () => {
    return (
      <components.ImgBack>
        <components.Headers>
          <components.HeaderIcon onPress={() => nav.push(this.props.componentId, 'Profile', {
            title: 'Profile', callback: () => {
              this.props.isLogged()
            }
          }, 'Profile')} key={styles.headerIconStyle.userIcon} name={styles.headerIconStyle.userIcon} size={styles.headerIconStyle.userSize} color={colors.black} />
              <Text numberOfLines={3} key={this.props.title} style={[styles.headerTextStyle]}>{'Angadi'}</Text>
          <components.HeaderIcon onPress={() => {
            this.props.getRequest(PRODUCT_LIST)
          }} key={styles.headerIconStyle.refIcon} name={styles.headerIconStyle.refIcon} size={styles.headerIconStyle.userSize} color={colors.black} />

        </components.Headers>
        <components.MainLayer style={{ maxHeight: styles.HEIGHT }}>
          {this.log()}
        </components.MainLayer>
      </components.ImgBack>
    )
  }
}

const mapStateToProps = ({ answers, logged, products, userData}) => {
  return {
    logged: logged.loggedIn,
    answers,
    products: products.response,
    loading: products.loading || userData.loading
  }
}

export const Home = connect(mapStateToProps, { changeAnswer, isLogged, getRequest, clearData, postRequest })(App)

