import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Slider,TouchableOpacity,ScrollView,FlatList,AsyncStorage} from 'react-native';
import { connect } from 'react-redux'
import { Client, Message } from 'react-native-paho-mqtt';
import { Navigation } from 'react-native-navigation';
import { styles, components, nav, colors } from '../iCaresrc'
import {count} from '../action'
const Inc = 'INCREMENT'
const Dec = 'DECREMENT'

let clientId = "nursejoy";
const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};
const client = new Client({
  uri: "ws://10.1.75.43:6000/ws",
  clientId,
  storage: myStorage
});
 mqtt = () => {
     client.connect()
    .then(() => {
      alert("connected");
      client.subscribe('servo');
      
    })
    

    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        alert(responseObject.errorMessage);
      }
    });
   client.on('messageReceived', (message) => {
      if (message.destinationName === 'servo') 
      {
        
      }
    });
  
};
 class App extends Component {
  constructor(props){
    super(props)
  this.state = {
    name: '',
    id: 1,
    nurses:[{name:'xyz',nid:'12',sex:'female'}],
    patients: [{ name: 'Varun', pid: '73', Drip: 'Glucose', Evaluatedtime: '5 hours', Value: 5, rid: 0 }, { name: 'Varun', pid: '73', Drip: 'Glucose', Evaluatedtime: '5 hours', Value: 5, rid: 0 },{name:'Vaarun',pid:'173',Drip:'Gluuucose',Evaluatedtime:'6 hours',Value:2,rid:1}]
  }
}  

  componentWillMount= () => {
    mqtt()}
 
 
  goToScreen = (screenName)=>{
      Navigation.push(this.props.componentId,{
          component:{
              name:screenName
          }
      })
  }
  render() {
    const value = this.state.value;
    return (
    <components.ImgBack>
    <components.Headers>
          <Text numberOfLines={3} key={this.props.title} style={[styles.headerTextStyle,{marginLeft:110}]}>{'iCareFlow'}</Text>

    </components.Headers>
    <components.MainLayer style={{ maxHeight: styles.HEIGHT }}>
     <components.BlankCard style={{height: styles.HEIGHT * 0.17, margin: 0, padding: 0 }}>
                <View style={styles.blankCardContentStyle}>
                <Text style={[styles.blankCardTextStyle, { fontSize: 20 ,color:colors.second}]}>{'Your Details'}</Text>
                <View style={{borderBottomColor:'Gray',borderBottomWidth:1}}/>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <View>
                      <Text style={{fontSize:20,color:'white',padding:5}}>Name:<Text style={{color:'#a6a6a6'}}>{" Nurse Joy"}</Text></Text>
                   </View>
                   
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:20,color:'white',padding:5,marginTop:0}}>ID:<Text style={{color:'#a6a6a6'}}>{4412}</Text></Text>
                    
                    </View>
                </View>
      </components.BlankCard>
      <components.BlankCard style={{height: styles.HEIGHT * 0.6, margin: 0, padding: 0 }}>
    
   <View style={[{margin:0,padding:3}]}>
   <Text style={[styles.blankCardTextStyle, { fontSize: 20 ,color:colors.second}]}>{'Patient Details'}</Text>

            <View>
              <ScrollView contentContainerStyle={{bottom:0}}>
        <FlatList
          style={{height:368}}
          data={this.props.patients}
          keyExtractor={this._keyExtractor}
          renderItem = {({ item,index })=>{
            return(
              <View style={{borderWidth:1,borderColor:'grey',borderRadius:10,margin:3}}>
                  <TouchableOpacity onPress={()=>{
                    Navigation.push(this.props.componentId, {
                      component:{
                        name:'Patient',
                        passProps:{
                          patient:{...item}
                        },
                        client
                      }
                    })
                }}>
                  <View>
                  <View>
                        <View style={{borderBottomColor:'black',borderBottomWidth:1}}/>
                        </View>
                        <View>
                        
                      <Text style={{...styles.headerTextStyle, fontSize: 15,padding:10 ,color: 'white', marginTop: 10,}}>Name:<Text style={{...styles.headerTextStyle,color:'#a6a6a6'}}>{"\t\t"+item.name}</Text></Text>
                      <Text style={{ ...styles.headerTextStyle, fontSize: 15, padding: 10, color: 'white', marginTop: 10, }}>Flow(ml/hr):<Text style={{ ...styles.headerTextStyle, color: '#a6a6a6' }}>{"\t\t" + item.flow}</Text></Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View>
                          <Text style={{...styles.headerTextStyle, fontSize: 15,padding:10 ,color: 'white', marginTop: 14,}}>Dose:<Text style={{...styles.headerTextStyle,color:'#a6a6a6'}}>{"\t\t"+item.dose}</Text></Text>
                        </View>
                        <View>
                        <components.IconButton name={'angle-right'} color={colors.black} size={14} />
                        </View>
                        </View>
                      <Text style={{...styles.headerTextStyle, fontSize: 15,padding:10 ,color: 'white',}}>Bed No:<Text style={{...styles.headerTextStyle,color:'#a6a6a6'}}>{"\t\t"+item.pid}</Text></Text>

                        </View>
                  </View>
                  </TouchableOpacity>
              </View>
          )}}
            />
            </ScrollView>
            </View>
        </View>


      </components.BlankCard>
      <components.BlankCard style={{ height: styles.HEIGHT * 0.09, margin: 0, padding: 0 }}>
      <TouchableOpacity onPress={() => {
        nav.push(this.props.componentId, 'Create', {
          title: 'Add Patient', client
        })
      }}>
        <View style={[styles.blankCardContentStyle,{flexDirection:'row'}]}>
          <Text style={[styles.blankCardTextStyle, { fontSize: 15,marginTop:12 }]}>{'Add Patients'}</Text>
          <components.IconButton name={'plus'} color={colors.black} size={14} />
        </View>
      </TouchableOpacity>
    </components.BlankCard>
  
    </components.MainLayer>
  </components.ImgBack>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    patients:[...state]
  }
}

export default connect(mapStateToProps,null)(App)



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
// <View style={{position:'absolute',marginTop:200,borderRadius:10,top:0,bottom:0,alignSelf:'center',width:styles.WIDTH*0.5,height:styles.WIDTH*0.5, borderWidth:1,borderColor:colors.textColor}}/>
