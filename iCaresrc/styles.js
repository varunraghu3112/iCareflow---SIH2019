
import { Dimensions } from 'react-native'
import  {colors} from './colors'

let WIDTH= Dimensions.get('window').width
let HEIGHT= Dimensions.get('window').height

export const styles = {
    WIDTH,
    HEIGHT,  
    buttonStyle: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingLeft:15,
        paddingRight:15,
        borderRadius: 20,
        top: 0, right: 0, bottom: 0, left: 0,
        shadowColor: '#fff',
        padding: 6,
        flexDirection: 'row'
    },
    buttonTextStyle: {
        fontSize: 16,
        fontFamily: 'Montserrat-Light',
        color: colors.black,
        alignSelf:'center'
    },
    cardStyle: {
        alignSelf:'stretch',
        borderRadius: 5,
        height:130
    },
    cardTitle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14.2,
        padding: 5
    },
    tabSelectedStyle: {
        elevation: 10,
        borderColor: colors.white,
        shadowColor: colors.white,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    tabButtonStyle: {
        padding: 6,
        borderRadius: 30,
        margin:3        
    },
    tabButtonTextStyle: {
        fontFamily: 'Montserrat-Light',
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10,
        color:colors.textColor
    },
    tabStyles: {
        backgroundColor: colors.blankCardBackgroundColor,
        alignItems: 'center',
        paddingHorizontal:10
    },
    headerStyles: {
        flexDirection: 'row', height: 150, margin: 0, borderRadius: 0,
        top: 0, right: 0, start: 0, left: 0,
        padding: 20,
        justifyContent: 'space-between',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation:0
    },
    headerTextStyle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        color: colors.black,
        paddingLeft: 10,
        maxWidth:WIDTH*0.8
    },
    headerIconStyle: {
        size: 20,
        infosize:13,
        color: colors.textColor,
        name: "angle-left",
        userIcon: 'user',
        userColor: colors.textColor,
        userSize: 18,
        refIcon: 'redo-alt',
        refColor: colors.textColor,
        refSize: 20,
        searchIcon: 'search',
        searchColor: colors.textColor,
        searchSize: 18,
        info:'info-circle',
        google:'google',
        googleSize:18,
        googleColor:colors.textColor,
        shop: 'shopping-cart'
        
    },
    loadingIconStyle: {
        borderRadius: 50,
        height: 30,
        width: 30,
        margin: 10,
        alignSelf: 'center'
    },
    inputContainerStyle: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        padding: 4,
        height:45,
        flexDirection:'row',
        alignItems:'center',
        borderColor: colors.grey,
        borderRadius:5,
        borderWidth:0.5
    },
    bulletStyle: {
        marginLeft: 5,
        flexDirection: 'row',
        padding: 5,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'flex-start'
    },
    styleIos: {
      
    } ,
    titletext: { flex: 1, padding: 4, alignItems: 'center', fontStyle: "italic", fontSize: 16, justifyContent: 'center', alignItems: 'center' },
    destext: { flex: 1, padding: 4, alignItems: 'center', fontStyle: "italic", fontSize: 14, justifyContent: 'center', alignItems: 'center' },
    lightboxContainer: {
        flex: 1,
        backgroundColor: "#000000dd",
        left: 0, right: 0,
        
        alignItems: 'center',
        justifyContent:'center',
        alignSelf:'stretch'
    },
    lightboxStyle: {
        padding:5,
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0, right: 0,
        width:WIDTH*0.8,
        height: WIDTH * 0.8
    },
    lightboxTextStyle: {
        alignSelf: 'center',
        fontFamily: 'Montserrat-Italic',
        fontSize: 15,
        padding: 5,
        color: colors.textColor
    },
    lightboxSubTextStyle: {
        alignSelf: 'center',
        fontFamily: 'Montserrat-Light',
        fontSize: 14,
        padding: 5,
        color: colors.subTextColor
    },
    lightboxSubTextStyl: {
        fontFamily: 'Montserrat-Light',
        fontSize: 14,
        padding: 5,
        color: colors.subTextColor
    },
    lightboxButtonStyle: {
        alignSelf: 'center',
        padding: 5,
        margin: 10,
        left:0,
        right:0,
        borderRadius: 10
    },
    imgBackStyle: {
        flex: 1,
        width: WIDTH,
        alignSelf: 'stretch'
    },
    blankCardStyle: {
        alignSelf: 'stretch',
        borderRadius: 6,
        backgroundColor: colors.blankCardBackgroundColor,
        top: 0, right: 0, start: 0, left: 0,
        borderWidth: 0,
        padding: 5,
        marginBottom: 9
    },
    blankCardHeaderStyle :{
        alignSelf: 'center',
        fontFamily: 'Montserrat-Light',
        padding: 5,
        color: colors.textColor,
        fontSize: 16, alignSelf: 'flex-start'
    },
    blankCardTextStyle: {
        fontFamily: 'Montserrat-Medium',
        padding: 5,
        color: colors.textColor,
        fontSize: 14
    },
    blankCardContentStyle :{

        justifyContent:'space-between',
        padding:3
    },
    headerButtonStyle:
        { 
        flexDirection: 'row',
         alignItems: 'center',
         alignSelf: 'flex-start' ,
         paddingLeft:5
        },
    mainLayerStyle : {
        flex: 1,
        marginBottom:10,
        marginLeft:10,
        marginRight:10,
        borderRadius:8,
        marginTop:-90,
        top:0,
        bottom:0,
        alignSelf:'stretch',
        zIndex:100,
        height: HEIGHT * 0.8,
    },
    dashStyle:{
        alignSelf:'stretch',
        backgroundColor:colors.backgroundColor,
        height:1,
        borderRadius:10,
        margin:2
    },
    zeroCardStyle:{
        height:130,
        width:WIDTH*0.8,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        alignSelf:'center',
        borderRadius:10
    },
    fonts:{
        MontserratItalic:'Montserrat-Italic',
        MontserratLight:'Montserrat-Light',
        MontserratLightItalic:'Montserrat-LightItalic',
        MontserratMedium:'Montserrat-Medium',
        MontserratMediumItalic:'Montserrat-MediumItalic',
        MontserratRegular:'Montserrat-Regular',
        MontserratThin:'Montserrat-Thin',
        MontserratThinItalic:'Montserrat-ThinItalic'
    },
    bottomModalStyle:{
        flex:1,
        height:HEIGHT*0.5,
        maxHeight: HEIGHT * 0.4,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'stretch',
        bottom:0,
        right:0,
        left:0
    },
    iconButtonStyle:{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        borderRadius: 20,
        top: 0, right: 0, start: 0, left: 0,
        shadowColor: '#fff',
        padding: 5,
        paddingLeft:5,
        paddingRight:5,
        flexDirection: 'row'
    },
    iconButtonStyle:{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 20,
        top: 0, right: 0, start: 0, left: 0,
        shadowColor: '#fff',
        padding: 10,
        paddingLeft:20,
        paddingRight:20,
        flexDirection: 'row'
    },
    icons:{
        color: colors.textColor,
        infosize:14,
        contact:'address-book',
        map:'map-marker-alt',
        date:'calendar',
        time:'clock',
        duration:'algolia',
        prize:'award',
        money:'money-check',
        incharge:'male',
        info:'info-circle',
        venue:'map-marker-alt',
        events:'calendar-alt',
        workshops:'wrench',
        shops:'warehouse',
        sponsers:'users',
        call:'phone',
        desktop:'desktop',
        eye:'eye-slash',
        eyeopen:'eye',
        facebook:'facebook-f',
        youtube:'youtube',
        instagram:'instagram',
        
    },
    loadingStyles:{
        size:100
    },
    dashHeight:0
}
