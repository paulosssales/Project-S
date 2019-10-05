/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';

import MapView, { AnimatedRegion, MAP_TYPES } from 'react-native-maps';

const {height, width} = Dimensions.get('window');

export default class App extends Component {
  state = {
    places: [
      {
        id: 1,
        title: 'São G. do Amarante',
        description: 'Cidade',
        latitude: -5.7852395,
        longitude: -35.3288126,
      },
      {
        id: 2,
        title: 'Outro',
        description: 'Cidade',
        latitude: -5.7892443,
        longitude: -35.3360807,
      },
      {
        id: 3,
        title: 'Outro 2',
        description: 'Cidade',
        latitude: -5.7899999,
        longitude: -35.3390907,
      },
    ],
  };

  render() {
    const {latitude, longitude} = this.state.places[1];

    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.mapView = map)}
          style={styles.mapView}
          mapType={MAP_TYPES.STANDARD}
          showsMyLocationButton={true}
          loadingEnabled={true}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          showsPointsOfInterest={false}
          showsBuildings={false}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0242,
            longitudeDelta: 0.0181,
          }}>
          {this.state.places.map(place => (
            <MapView.Marker
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
            />
          ))}
        </MapView>
        <ScrollView
          style={styles.placesContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={ e => {
            const scrolled = e.nativeEvent.contentOffset.x;

            const place = (scrolled > 0)
            ? scrolled / Dimensions.get('window').width
            : 0;

            
            const { latitude, longitude } = this.state.places[place.toFixed(0)];
            
            // Alert.alert(latitude.toFixed(7).toString())
            this.mapView.animateCamera
            ({
              zoom: 400
              ,
              center:{
                latitude,
                longitude
              }
            },
            { 
              duration: 2000
            });
          }}
        >
          {this.state.places.map(place => (
            <View key={ place.id } style={ styles.place }>
              <Text>{ place.title }</Text>
              <Text>{ place.description }</Text>
            </View>
          ))}

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  placesContainer: {
    width: '100%',
    maxHeight: 200,
  },
  place: {
    width: width - 40,
    maxHeight: 200,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
  },
});
