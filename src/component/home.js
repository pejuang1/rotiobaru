import React, { Component } from 'react';
import {View, Image,Modal,TouchableHighlight, BackHandler, Alert, ScrollView, TouchableOpacity, TextInput} from 'react-native'
import { Header,Text } from 'react-native-elements';
import Backgroundheader from '../img/img.jpeg'


class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <View>
                <Header
                backgroundImage={Backgroundheader}
                backgroundImageStyle={{height:170}}
                rightComponent={<Image source={require('../img/logoawal.png')} style={{height:80, width:80}}/>}
                />
                <Text style={{fontSize:20, fontWeight:"bold", color:'white', textAlign:"right", marginTop:10, right:10}}>Dedikasi dalam Menyajikan</Text>
                <Text style={{fontSize:20, fontWeight:"bold", color:'white', textAlign:"right", right:10}}>Roti Berkualitas</Text>
                {/* <Image source={require('../img/img.jpeg')} style={{width:500, height:250, opacity:0.7}}/> */}
                <View style={{flexDirection:"row", marginTop:50, justifyContent:"center"}}>
                <View style={{alignItems:"center", marginRight:40}}>
                <Image source={require('../img/icon1.png')} style={{width:60, height:60}}/>
                <Text style={{textAlign:"justify"}}>Quantity</Text>
                <Text>Check</Text>
                </View>
                <View style={{alignItems:"center"}}>
                <Image source={require('../img/icon2.png')} style={{width:60, height:60}}/>
                <Text>Menu</Text>
                </View>
                </View>
                {/* <View style={{marginTop:40, flexDirection:"row"}}>                  
                <Image source={require('../img/41-1709-COOKIES-Nastar.png')} style={{width:200, height:200}}/>
                <Image source={require('../img/42-1709-COOKIES-LidahKucing.png')} style={{width:200, height:200}}/>
                </View> */}
            </View>
         );
    }
}
 
export default Home;