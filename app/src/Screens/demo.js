// import React, { Component, useState, useRef } from 'react'
// import { StyleSheet, Text, View } from 'react-native'
// import { MapView, Marker} from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';

// const App = () => {
//   const [state, setState] = useState({
//     pickupCords: {
//       latitude:30.7046,
//       longitude:76.7179,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     },
//     droplocationCords:{
//       latitude: 30.7333,
//       longitude:76.7794,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     }
//   })

//   const mapRef = useRef();
//   const { pickupCords,droplocationCords }=state
//   return (
//     <View style={styles.container}>
//      <MapView
//      ref={mapRef}
//      style={StyleSheet.absoluteFill}
//       initialRegion={{pickupCords}}
//       />

//       <Marker coordinate={pickupCords}
//       />

//       <Marker coordinate={droplocationCords}
//       />

//       <MapViewDirections
//       origin={pickupCords}
//       destination={droplocationCords}
//       apikey={"AIzaSyAEwQlPQFXRH4maOTA-8yzVh3ICzz_5UW0"}
//       strokeWidth={3}
//       strokeColor="hotpink"
//       optimizeWaypoints={true}
//       onReady={result =>{
//         mapRef.current.fitToCoordinates(result.coordinates, {
//           edgePadding: {
//             right: 30,
//             bottom: 300,
//             left:300,
//             left:30,
//             top:100
//           }
//         })
//       }}
//       />
//     </View>
//   )
// }


// const styles = StyleSheet.create({
//   container:{
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// })

// export default App;