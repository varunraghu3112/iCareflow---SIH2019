import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Platform, StyleSheet, TextInput,Text, View,Slider,TouchableOpacity,ScrollView,FlatList} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { styles, components, nav, colors } from '../iCaresrc'
import {count} from '../action'
import Icon from 'react-native-vector-icons/FontAwesome5';

let Id = Math.floor(Math.random() * 9000) + 1000;
 export default class App extends Component {
    goBack = (comp) => {
        return (
          <TouchableOpacity style={styles.headerButtonStyle} onPress={() => nav.pop(this.props.componentId)}>
            {comp}
          </TouchableOpacity>
        )
      }
  
  constructor(props){
    super(props)
  this.state = {
    name:'',
    pwd:''
  }
}                                                                                                                                                   
onNameChange(name) {
    this.setState({ name });
  }
onDripChange(Drip)
{
    this.setState({Drip});
}  
  goToScreen = (screenName)=>{
      Navigation.push(this.props.componentId,{
          component:{
              name:screenName
          }
      })
  }
  render() {
      

    return (
        <components.ImgBack>
      <components.Headers>
      {this.goBack(
        [
          <Icon key={styles.headerIconStyle.name} name={styles.headerIconStyle.name} size={styles.headerIconStyle.size} color={colors.black} />,
          <Text numberOfLines={3} key={'Login'} style={[styles.headerTextStyle,]}>{'Login'}</Text>
        ]
      )}
      </components.Headers>
      <components.MainLayer style={{ maxHeight: styles.HEIGHT }}>
      <components.BlankCard style={{height: styles.HEIGHT * 0.64, margin: 0, padding: 0 }}>
      <View style={styles.blankCardContentStyle}>
                <ScrollView>
                <Text style={{fontSize:20,color:'white',padding:4,color:colors.second}}>Username:{}</Text>
                <View rounded style={{marginTop: 4,
                    marginRight: 10,
                    padding: 4,
                    height:45,
                    flexDirection:'row',
                    alignItems:'center',
                    borderColor: 'grey',
                    borderRadius:5,
                    borderWidth:0.5}}>
                        <TextInput style={{ color:'white', alignSelf: 'stretch', width: '100%', padding: 7 }}
                        placeholderTextColor='#a6a6a6'
                        placeholder={'Enter Usernane'} onChangeText={this.onNameChange.bind(this)}
                        value={this.state.name} />
                </View>
                <Text style={{fontSize:20,color:'white',marginTop:5,padding:4,color:colors.second}}>Password:</Text>

                <View rounded style={{marginTop: 4,
                    marginRight: 10,
                    padding: 4,
                    height:45,
                    flexDirection:'row',
                    alignItems:'center',
                    borderColor: 'grey',
                    borderRadius:5,
                    borderWidth:0.5}}>
                        <TextInput  style={{ color:'white', alignSelf: 'stretch', width: '100%', padding: 5 }}
                        placeholderTextColor='#a6a6a6'
                        placeholder={'Enter password'} 
                        value={this.state.pwd} />
                </View>       
              </ScrollView>  
             
            </View>
      
        </components.BlankCard>
        <components.BlankCard style={{ height: styles.HEIGHT * 0.09, margin: 0,marginTop:30 }}>
        <TouchableOpacity
        onPress={()=>{}}>
        <Text style={[styles.blankCardTextStyle, { fontSize: 20 ,color:colors.second,marginLeft:130,marginTop:7}]}>{'Log in'}</Text>
        </TouchableOpacity>
        </components.BlankCard> 
        </components.MainLayer>
        </components.ImgBack>
    );
  }
}
