import React, { Component } from 'react';
import {View, Image,Modal,TouchableHighlight, BackHandler, Alert, ScrollView, TouchableOpacity,FlatList} from 'react-native'
import { Text, Input, Button, Header } from 'react-native-elements';
// import Icon from 'react-native-vector-icons'
import Headercolor from '../img/headerku4.jpg'
import {Table,Row,Rows} from 'react-native-table-component'
// import {IconButton} from 'react-native-paper'
import Axios from 'axios'
import Loader from './loader'
// import Splashscreen from './splashscreen'
// import * as Animatable from 'react-native-animatable'
// import AnimateLoadingButton from 'react-native-animate-loading-button';


// const API = 'http://sci.rotio.id:5558/webserv/webapi/';

class Halamanutama extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loading:false,
      product: [],
      quantity:[],
      rangequantity:[],
      valueoutlet:[],
      valueproduct:null,
      artikel:[],
      query:'',
      selectedOutlet:'',
      selectedOutlet2:'',
      selectedProduct: ''
     }
    }

     componentDidMount(){
        // ======================API_product================
    fetch(`http://sci.rotio.id:5558/webserv/webapi/products/`, )
      .then(res => res.json())
      .then(json => {
        const { data: product } = json;
        this.setState({ product })
        console.log(product[234].value)
      });

      // =====================API outlet===================
      Axios.get(`http://sci.rotio.id:5558/webserv/webapi/warehouses/`)
        .then((res)=>{
           this.setState({artikel:res.data})
        })
        Axios.get(`http://192.168.0.111:8080/webserv/webapi/storage/${this.state.selectedOutlet}/${this.state.selectedProduct}`)
        .then((res)=>{
          this.setState({quantity:res.data})
        })
        Axios.get(`http://192.168.0.111:8080/webserv/webapi/storage/${this.state.selectedOutlet}/${this.state.selectedOutlet2}/2002002000002`)
            .then((res)=>{
              this.setState({rangequantity:res.data})
        })
        this.backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          this.backAction
        );
  }


  componentWillUnmount() {
    this.backHandler.remove();
  }


      // ============================function loading button============================
      // loadingbutton=()=>{
      //   if(this.checkquantity){
      //     this.setState({loading:false})
      //   }else{
      //     this.setState({loading:false})
      //   }
      // }

      // ========================function menampilkan quantity=========================
  checkquantity = () =>{
    if(this.state.selectedOutlet&&this.state.selectedOutlet2 !== ''){
            Axios.get(`http://192.168.0.111:8080/webserv/webapi/storage/${this.state.selectedOutlet}/${this.state.selectedOutlet2}/2002002000002`)
            .then((res)=>{
              this.setState({rangequantity:res.data})
              this.setModalVisible(true)
              // console.log(rangequantity)
              return this.state.rangequantity.result.map((val)=>{
                alert('Outlet: '+val.loc_value+'\n'+'Lokasi: '+val.loc_name+'\n'+'Nama: '+val.name+'\n' + 'Stok tersedia: '+val.qty)
              })
            })
            .then()
            this.setState({loading:true})
            setTimeout(() => {
              this.setState({
                loading: false
              });
            }, 1800);
    // Axios.get(`http://192.168.0.111:8080/webserv/webapi/storage/${this.state.selectedOutlet}/2002002000002`)
    // .then((res)=>{
    //   this.setState({quantity:res.data})
    //     //  console.log(res.data.result)
    //     return this.state.quantity.result.map((val)=>{
    //       alert('Outlet: '+val.loc_value+'\n'+'Lokasi: '+val.loc_name+'\n'+'Nama: '+val.name+'\n' + 'Stok tersedia: '+val.qty)
    //   })
    //     })
    //     .then()
    //       this.setState({loading:true})
    //       setTimeout(() => {
    //         this.setState({
    //           loading: false
    //         });
    //       }, 500);
    //     }else if(this.state.selectedOutlet||this.state.selectedOutlet2 !== ''){
        }
    else{
      alert('Mohon diisi dulu inputannya')
    }
}

          // ========================function untuk exit aplikasi=========================
   
          backAction = () => {
            Alert.alert("Peringatan", "Anda yakin ingin keluar?", [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },
              { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };


      // ========================function mencari artikel=========================

  // findartikel(query){
  //   if (query === ''){
  //     return []
  //   }
  //   // const {artikel} = this.state
  //   const regex = new RegExp(`${query.trim()}`, 'i')

  //   return this.state.artikel.filter(val => val.value.search(regex) >= 0 )
    
  // }

      // ========================function mencari product=========================
  // findproduct(query) {
  //   if (query === '') {
  //     return []
  //   } 
  //   // const { product } = this.state;
  //   const regex = new RegExp(`${query.trim()}`, 'i');
  //   return this.state.product.filter(film => film.value.search(regex) >= 0);
  // }
  selectoutlet=()=>{
    Axios.get(`http://sci.rotio.id:5558/webserv/webapi/warehouses/`)
        .then((res)=>{
           this.setState({artikel:res.data})
           
          //  return artikel.map((val)=>{
          //  <Text>{val.value}</Text>
          //  })
        })
  }

  selectitem=(dataitem)=>{
    this.setState({valueoutlet:dataitem})
  }

  async showquantity() {
    this.setState({
      loading: true
    });

    let coords = await this.checkquantity();
    console.log('coords', coords)

    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 2500);
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

    renderstock=()=>{
      Axios.get(`http://192.168.0.111:8080/webserv/webapi/storage/${this.state.selectedOutlet}/${this.state.selectedOutlet2}/2002002000002`)
            .then((res)=>{
              this.setState({rangequantity:res.data})
        console.log(res.data.result)
        return (
          // return this.state.rangequantity.result.map((val,index)=>{
            <FlatList
            padding ={30}
            data={this.state.product}
            renderItem={({item}) => 
            <View style={{height: 50}}>
             <Text style={{height: 50}}>{item.name}</Text>
             <View style={{height: 1,backgroundColor:'gray'}}></View>
             </View>
            }
            />
            )
            // })
          })
    }
  
  render() {           
            return ( 
              <ScrollView>
          <View>
                {/* <ImageBackground source={require('../img/headerku4.jpg')} style={{width:"100%", height:"100%"}}> */}
                <Header
                backgroundImageStyle={{height:220}}
                backgroundImage={Headercolor}
                // placement='left'
                // leftComponent={<Image source={require('../img/logoheader.png')}/>}
                centerComponent={<Image source={require('../img/logoawal.png')} style={{height:100, width:100, marginTop:100}}/>}
                />
                <View style={{marginTop:110, marginLeft:20, alignItems:"center", marginRight:20}}>
                <Button
                buttonStyle={{width:250, alignItems:"center", borderColor:'white' ,justifyContent:"center", borderRadius:25, backgroundColor:'white'}}
                title='Quantity Check'
                type='outline'
                raised={true}
                />
              
                {/* <View style={{marginTop:40, flexDirection:"row"}}>                  
                <Image source={require('../img/41-1709-COOKIES-Nastar.png')} style={{width:200, height:200}}/>
                <Image source={require('../img/42-1709-COOKIES-LidahKucing.png')} style={{width:200, height:200}}/>
                </View>
              <Image source={require('../img/44-1709-COOKIES-ChocolateFinancier.png')} style={{width:200, height:200}}/> */}
                <Loader
                    loading={this.state.loading} />
                <View style={{marginTop:100}}>
                  </View>
                  <View style={{flexDirection:"row"}}>
                <Input
                    style={{justifyContent:'left'}}
                    label='From'
                    containerStyle={{width:200}}
                    onChangeText={(text)=>this.setState({selectedOutlet:text})}
                    placeholder='Input kode outlet'
                    ></Input>
                    <Input
                    containerStyle={{width:200}}
                    label='To'
                    onChangeText={(text)=>this.setState({selectedOutlet2:text})}
                    placeholder='Input kode outlet'
                    ></Input>
                    </View>
                <View style={{marginTop:40}}/>
                <Input
                    onChangeText={text => this.setState({ selectedProduct:text })}
                    label='Products'
                    defaultValue='2002002000002'
                    placeholder='Input kode'
                    keyboardType='number-pad'
                    ></Input>

                {/* <View style={{marginTop:80, flex:1}}/>     */}
                {/* <View style={{flex: 1, flexDirection: 'row'}}>
              </View> */}
                <View style={{marginTop:80}}/>
                {/* <AutoSuggest terms={suggestions}/> */}
                {/* <AnimateLoadingButton/> */}

                <Button
                title='Check'
                buttonStyle={{backgroundColor:'orange', width:120, borderRadius:25}}
                onPress={this.renderstock}
                // loading={this.isloading}
                // loading={this.loadingbutton}
                />
                <View style={{marginTop:50}}></View>
                {/* <Table borderStyle={{borderWidth: 2, borderColor:'black'}}>
                  <Row style={{height:40}}>
                  <Rows>
                  
                  </Rows>
                  </Row>
                </Table> */}
                <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View style={{justifyContent:"center", alignItems:"center"}}>
              <Text>Hello World!</Text>
              <Button
              title='oke'
              containerStyle={{width:200}}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible)}}
                ></Button>
            </View>
          </View>
        </Modal>
                <Button
                  title='check'
                  onPress={() => {
                    this.setModalVisible(true);
                  }}
                  />
                  <FlatList
      padding ={30}
         data={this.state.product}
         renderItem={({item}) => 
         <View style={{height: 50}}>
         <Text style={{height: 50}}>{item.name}</Text>
         <View style={{height: 1,backgroundColor:'gray'}}></View>
         </View>
        }
       />
                </View>
                <View>
                  {this.renderstock}
                </View>
              </View>              
            </View>
                </ScrollView>
         );
        }
      }
      
      export default Halamanutama;