import React,{Component} from 'react'
import { Alert, Text, TouchableOpacity, StyleSheet,View,Slider,ScrollView } from 'react-native'
import { styles, components, nav, colors } from '../iCaresrc'
import Icon from 'react-native-vector-icons/FontAwesome5';
class sign extends Component {
   goBack = (comp) => {
      return (
        <TouchableOpacity style={styles.headerButtonStyle} onPress={() => nav.pop(this.props.componentId)}>
          {comp}
        </TouchableOpacity>
      )
    }
   render(){
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
      <ScrollView>
      <components.BlankCard style={{height: styles.HEIGHT * 0.24, margin: 0, padding: 0 }}>
      <View style={styles.blankCardContentStyle}>
    <Text style={{fontSize:30,color:'white',padding:4}}>{this.props.patients.name}</Text>
    <Text style={{fontSize:20,color:'#a6a6a6',margin:4}}>Bed no:{this.props.patients.pid}</Text>

    <Text style={{fontSize:20,color:'#a6a6a6',margin:4}}>Infusion Liquid:{this.props.patients.Drip}</Text>
    <Text style={{fontSize:20,color:'#a6a6a6',margin:4}}>Evaluated Time:{this.props.patients.Evaluatedtime}</Text>
</View>

</components.BlankCard>
<components.BlankCard>
<View style={styles.blankCardContentStyle}>
    <Text style={{margin:4,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
      <Text style={{fontSize:20,color:'#a6a6a6',margin:4}}>Previous Value:</Text>
      <Text style={{fontSize:20,color:'white',justifyContent:'center',alignContent:'center',alignSelf:'center'}}>{this.props.patients.Value}</Text>
    </Text>
 </View>   
</components.BlankCard>
<TouchableOpacity onPress={()=>{}}>
<components.BlankCard >
<Text style={[styles.blankCardTextStyle, { fontSize: 20 ,color:'green',marginLeft:125,marginTop:5}]}>{'Connect'}</Text>
</components.BlankCard>
</TouchableOpacity>
</ScrollView>
</components.MainLayer>

</components.ImgBack>
   )
      }
}

export default sign

