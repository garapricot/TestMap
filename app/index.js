import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps'
const{width,height}=Dimensions.get('window')
export default class Index extends Component {
  constructor(){
    super()
    this.state={
      region:{
        latitude:null,
        longitude:null,
        latitudeDelta:null,
        longitudeDelta:null
        }
      }
    }
  
calcDelta(lat,lon,accuracy){
  const oneDegree0fLongitudInMeters=111.32;
  const circumference=(40075/360)
  const latDelta=accuracy*(1/(Math.cos(lat)*circumference))
  const lonDelta=(accuracy/oneDegree0fLongitudInMeters)
  this.setState({
    region:{
      latitude:lat,
      longitude:lon,
      latitudeDelta:latDelta,
      longitudeDelta:lonDelta
    }
  })
}
  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
    (position)=>{
      const lat=position.coords.latitude
      const lon=position.coords.longitude
      const accuracy=position.coords.accuracy
      this.calcDelta(lat,lon,accuracy)
    }
    )
  }
  render(){
    return(
    <View style={styles.container}>
        {
          this.state.region.lat? <MapView
          style={styles.map}
          initialRegion={this.state.region}
          />:null
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map:{
    flex:1,
    width:width
  }
});