import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Platform, StyleSheet, TextInput,Text, View,Slider,TouchableOpacity,ScrollView,FlatList} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { styles, components, nav, colors } from '../iCaresrc'
import {changeAnswer} from '../action'
import { Client, Message } from "react-native-paho-mqtt";

import Icon from 'react-native-vector-icons/FontAwesome5';

let Id = Math.floor(Math.random() * 9000) + 1000;
 class App extends Component {
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
    pid:""+ Math.floor(Math.random() * 9000) + 1000,
    did:null,
    flow:0,
    bed:0,
    Evaluatedtime:'',
    dose:'',
    hours:0,
    minutes:0,
    seconds:0,
    split:{},
    quantity:''
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
          <Text numberOfLines={3} key={'Details'} style={[styles.headerTextStyle,]}>{'Details'}</Text>
        ]
      )}
      </components.Headers>
      <components.MainLayer style={{ maxHeight: styles.HEIGHT }}>
      <components.BlankCard style={{height: styles.HEIGHT * 0.8, margin: 0, padding: 0,bottom:0 }}>
      <View style={styles.blankCardContentStyle}>
                <ScrollView>
                <Text style={{fontSize:20,color:'white',padding:4,color:colors.second}}>Patient Name:</Text>
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
                        placeholder={'Enter Patients Name'} onChangeText={(name) => {this.setState({name})}}
                        value={this.state.name} />
                </View>
                <Text style={{fontSize:20,color:'white',marginTop:5,padding:4,color:colors.second}}>Patient ID:</Text>

                <View rounded style={{marginTop: 4,
                    marginRight: 10,
                    padding: 4,
                    height:45,
                    flexDirection:'row',
                    alignItems:'center',
                    borderColor: 'grey',
                    borderRadius:5,
                    borderWidth:0.5}}>
                        <TextInput editable={false } style={{ color:'white', alignSelf: 'stretch', width: '100%', padding: 5 }}
                        placeholderTextColor='#a6a6a6'
                        placeholder={'Set Id'} 
                        value={this.state.pid} />
                </View>
                <Text style={{ fontSize: 20, color: 'white', marginTop: 5, padding: 4, color: colors.second }}>Device ID:</Text>

                <View rounded style={{
                  marginTop: 4,
                  marginRight: 10,
                  padding: 4,
                  height: 45,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: 'grey',
                  borderRadius: 5,
                  borderWidth: 0.5
                }}>
                  <TextInput style={{ color: 'white', alignSelf: 'stretch', width: '100%', padding: 5 }}
                    placeholderTextColor='#a6a6a6'
                    placeholder={'Device ID'}
                    keyboardType={'number-pad'}
                    onChangeText={(did)=> {this.setState({did})}}
                    value={this.state.did} />
                </View>

                <Text style={{ fontSize: 20, color: 'white', marginTop: 5, padding: 4, color: colors.second }}>Bed No.:</Text>

                <View rounded style={{
                  marginTop: 4,
                  marginRight: 10,
                  padding: 4,
                  height: 45,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: 'grey',
                  borderRadius: 5,
                  borderWidth: 0.5
                }}>
                  <TextInput style={{ color: 'white', alignSelf: 'stretch', width: '100%', padding: 5 }}
                    placeholderTextColor='#a6a6a6'
                    placeholder={'Bed No.'}
                    keyboardType={'number-pad'}
                    onChangeText={(bed) => { this.setState({ bed }) }}
                    value={this.state.bed} />
                </View>
                <Text style={{fontSize:20,color:'white',marginTop:5,padding:4,color:colors.second}}>Dose:</Text>
                <View rounded style={{marginTop: 4,
                    marginRight: 10,
                    padding: 4,
                    height:45,
                    flexDirection:'row',
                    alignItems:'center',
                    borderColor: 'grey',
                    borderRadius:5,
                    borderWidth:0.5}}>
                        <TextInput style={{ color:'white', alignSelf: 'stretch', width: '100%', padding: 5 }}
                        placeholderTextColor='#a6a6a6'
                        placeholder={'Enter the liquid info'} 
                        onChangeText={(dose) => {this.setState({dose})}}
                        value={this.state.dose} />
                </View>
                <Text style={{fontSize:20,color:'white',marginTop:5,padding:4,color:colors.second}}>Flow(ml/hr):</Text>
                <View rounded style={{marginTop: 4,
                    marginRight: 10,
                    padding: 4,
                    height:45,
                    flexDirection:'row',
                    alignItems:'center',
                    borderColor: 'grey',
                    borderRadius:5,
                    borderWidth:0.5}}>
                        <TextInput style={{ color:'white', alignSelf: 'stretch', width: '100%', padding: 5 }}
                        placeholderTextColor='#a6a6a6'
                        placeholder={'Enter the quantity'} 
                    onChangeText={(flow) => { this.setState({ flow }) }}
                        value={this.state.flow} />
                </View>
                <Text style={{fontSize:20,color:'white',marginTop:5,padding:4,color:colors.second}}>Evaluated Time:</Text>
                <View style={{flexDirection:'row'}}>
                <View>
                <Text style={{color:'white',margin:6,marginLeft:27,marginTop:3}}>hrs</Text>
                    <TouchableOpacity onPress={()=>{
                        this.setState({hours:this.state.hours+1})}}>
                        <View style={{height:23,width:42,borderWidth:0.5,borderColor:'gray',borderRadius:2,backgroundColor:'#a6a6a6',margin:9}}><Text style={{alignContent:'center',alignContent:'center',alignSelf:'center',fontSize:17}}>+</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.state.hours>1?this.setState({hours:this.state.hours-1}):null}}>
                        <View style={{height:23,width:42,borderWidth:0.5,borderColor:'gray',borderRadius:2,backgroundColor:'#a6a6a6',margin:9}}><Text style={{alignContent:'center',alignContent:'center',alignSelf:'center',fontSize:17}}>-</Text></View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{color:'white',margin:6,marginLeft:27}}>{this.state.hours}</Text>

                    </View>
                </View>
                <View>
                <Text style={{color:'white',margin:6,marginLeft:27,margintop:3}}>mins</Text>
                    <TouchableOpacity onPress={()=>{this.setState({minutes:this.state.minutes+1})}}>
                        <View style={{height:23,width:42,borderWidth:0.5,borderColor:'gray',borderRadius:2,backgroundColor:'#a6a6a6',margin:9}}><Text style={{alignContent:'center',alignContent:'center',alignSelf:'center',fontSize:17}}>+</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.state.minutes>1?this.setState({minutes:this.state.minutes-1}):null}}>
                        <View style={{height:23,width:42,borderWidth:0.5,borderColor:'gray',borderRadius:2,backgroundColor:'#a6a6a6',margin:9}}><Text style={{alignContent:'center',alignContent:'center',alignSelf:'center',fontSize:17}}>-</Text></View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{color:'white',margin:6,marginLeft:27}}>{this.state.minutes}</Text>

                        </View>
                </View>
                
                </View>
              
              </ScrollView>  
            </View>
        </components.BlankCard>
        <components.BlankCard style={{ height: styles.HEIGHT * 0.07, marginTop:10,bottom:0,margin:5 }}>
        <TouchableOpacity
        onPress={()=>{ 
          let c= {
            dose:this.state.dose,
            flow:Number(this.state.flow),
            pid:this.state.pid,
            did:this.state.did,
            hrs:this.state.hours,
            min:this.state.minutes,
            name:this.state.name,
            bed:this.state.bed
          }
          const message = new Message(""+c.flow);
          message.destinationName = "servo";
          this.props.client.send(message);
          this.props.changeAnswer('ADD',{...c})
                Navigation.push(this.props.componentId, {
                  component: {
                    name: 'Patient',
                    passProps: {
                      patient: {...c},
                      client:this.props.client
                    }
                  }
                })
        }}>
        <Text style={[styles.blankCardTextStyle, { fontSize: 17 ,color:colors.second,marginTop:7,alignSelf:'center'}]}>{'Save'}</Text>
        </TouchableOpacity>
        </components.BlankCard> 
        </components.MainLayer>
        </components.ImgBack>
    );
  }
}

export default connect(null,{changeAnswer})(App)