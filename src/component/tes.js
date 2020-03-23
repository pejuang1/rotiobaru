import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Modal, ScrollView,Alert} from 'react-native';
import {Button, Input, CheckBox} from 'react-native-elements'
import Axios from 'axios'
 
 
export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      inputoutlet:'',
      inputoutlet2:'',
      modalVisible:false,
      loading:false,
      checked:false
     };
   }
 
//   componentDidMount(){
//       var {inputoutlet} = this.state
//       var {inputoutlet2} = this.state
//           Axios.get(`http://sci.rotio.id:5558/webserv/webapi/storage/${inputoutlet}/${inputoutlet2}/2002002000002`)
//           // Axios.get(`http://sci.rotio.id:5558/webserv/webapi/storage/R010101/R010109/2002002000002`)
//         .then((res)=>{
//             this.setState({dataSource:res.data.result})
//               console.log(res.data.result)
//     })
//     .catch(error=>console.log(error)) //to catch the errors if any

// }

    renderquantity=()=>{
      if(this.state.inputoutlet&&this.state.inputoutlet2&&this.state.checked){
        console.log('masuk')
        var {inputoutlet} = this.state
      var {inputoutlet2} = this.state
          Axios.get(`http://sci.rotio.id:5558/webserv/webapi/storage/${inputoutlet}/${inputoutlet2}/2002002000002`)
          // Axios.get(`http://sci.rotio.id:5558/webserv/webapi/storage/R010101/R010109/2002002000002`)
        .then((res)=>{
            this.setState({dataSource:res.data.result})
              console.log(res.data.result)
        return this.state.dataSource.map((val,index)=>{
        // alert(val.name)
        return(
            <View key={index} style={{height:120, borderWidth:1}}>
            <Text style={{fontWeight:"bold", left:10}}>{index+1}</Text>
            <Text style={{fontWeight:"bold", left:10}}>{val.loc_name}</Text>
            <Text style={{fontWeight:"bold", left:10}}>{val.name}</Text>
            <Text style={{fontWeight:"bold", left:10}}>{val.loc_value}</Text>
            <Text style={{fontWeight:"bold", left:10}}>{val.qty}</Text>
        </View>
            )
          })
        })
        }
    }

    rendernama=()=>{
              return (
                  <FlatList
                  padding ={30}
                  data={this.state.dataSource}
                  renderItem={({item,index}) => 
                  <View key={index} style={{height: 120}}>
                <Text style={{fontWeight:"bold"}}>{index+1}</Text>
                <Text style={{fontWeight:"bold"}}>{item.loc_name}</Text>
                <Text style={{fontWeight:"bold"}}>{item.name}</Text>
                <Text style={{fontWeight:"bold"}}>{item.loc_value}</Text>
                <Text style={{fontWeight:"bold"}}>{item.qty}</Text>
                <View style={{height: 1,backgroundColor:'gray'}}></View>
                </View>
              }
              />
              )
            }

        renderan=(visible)=>{
            this.setState({modalVisible:visible})
        }

        valuechange=(text, field)=>{
          if(field==='name'){
            this.setState({inputoutlet:text})
          }
        }
        valuechange2=(text, field)=>{
          if(field==='name2'){
            this.setState({inputoutlet2:text})
          }
        }
 
    render(){
     return(
      <View style={{padding:10}}>
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.renderan(!this.state.modalVisible);
          }}>
          <View style={{marginTop: 22}}>
        <ScrollView>
            <View>
            {this.renderquantity()}
              <Button
              title='Kembali'
              onPress={() => {
                  this.renderan(!this.state.modalVisible);
                }}>
              </Button>
            </View>
                </ScrollView>
          </View>
        </Modal>
        <View style={{flexDirection:"row"}}>
                <Input
                    style={{justifyContent:'left'}}
                    label='From'
                    value={this.state.inputoutlet}
                    containerStyle={{width:200}}
                    onChangeText={(text)=>this.valuechange(text, 'name')}
                    placeholder='Input kode outlet'
                    ></Input>
                    <Input
                    containerStyle={{width:200}}
                    label='To'
                    value={this.state.inputoutlet2}
                    onChangeText={(text)=>this.valuechange2(text, 'name2')}
                    placeholder='Input kode outlet'
                    ></Input>
                    </View>
                    <View>
                    <CheckBox
                    checked={this.state.checked}
                    onPress={() => this.setState({checked: !this.state.checked})}
                    title='Check'
                    />
                    </View>

            <View style={{marginTop:50, alignItems:"center"}}>
            <Button
            title='Check'
          onPress={() => {
              this.renderan(true);
            }}>
        </Button>
            </View>
      {/* {this.renderan()} */}
     </View>
     )}
}