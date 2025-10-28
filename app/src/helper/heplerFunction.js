
import { showMessage } from "react-native-flash-message"
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';

   
export const getCurrentLocation = async () => {
    try {
      // Request permission for location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Location permission not granted');
      }
  
      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
  
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        heading: location.coords.heading,
      };
    } catch (err) {
      console.error('Error in getCurrentLocation:', err);
    }
  };
      
    export const locationPermission = () => new Promise(async (resolve, reject) => {
        if (Platform.OS === 'ios') {
            try {
                const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
                if (permissionStatus === 'granted') {
                    return resolve("granted");
                }
                reject('Permission not granted');
            } catch (error) {
                return reject(error);
            }
        } else {
            // Handle both fine and coarse location
            return PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then((granted) => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    resolve("granted");
                } else {
                    return PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
                    ).then((grantedCoarse) => {
                        if (grantedCoarse === PermissionsAndroid.RESULTS.GRANTED) {
                            resolve("granted");
                        } else {
                            reject('Location Permission denied');
                        }
                    });
                }
            }).catch((error) => {
                console.log('Ask Location permission error: ', error);
                return reject(error);
            });
        }
    });
    

const showError = (message) => {
    showMessage({
        message,
        type: 'danger',
        icon: 'danger'
    })
}

const showSuccess = (message) => {
    showMessage({
        message,
        type: 'success',
        icon: 'success'
    })
}

export {
    showError,
    showSuccess
}


// import { showMessage } from "react-native-flash-message";
// import { PermissionsAndroid, Platform } from "react-native";
// import * as Location from 'expo-location'; // If using Expo
// import Geolocation from 'react-native-geolocation-service'; // Uncomment if using React Native CLI

// // Helper function to get the user's current location
// export const getCurrentLocation = async () => {
//     try {
//         // Request location permission
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             showError('Location permission not granted');
//             throw new Error('Location permission not granted');
//         }

//         // Fetch the current location
//         const location = await Location.getCurrentPositionAsync({
//             accuracy: Location.Accuracy.High,
//         });

//         return {
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude,
//             heading: location.coords.heading,
//         };
//     } catch (err) {
//         console.error('Error in getCurrentLocation:', err);
//         showError('Failed to get current location');
//         throw err; // Propagate error for handling in calling function
//     }
// };

// // Permission request function, handles both iOS and Android
// export const locationPermission = async () => {
//     if (Platform.OS === 'ios') {
//         // For iOS, use Expo’s or Geolocation’s request authorization method based on your setup
//         try {
//             const { status } = await Location.requestForegroundPermissionsAsync();
//             if (status === 'granted') return 'granted';
//             throw new Error('Permission not granted');
//         } catch (error) {
//             showError('iOS location permission not granted');
//             console.error('iOS Location permission error:', error);
//             throw error;
//         }
//     } else {
//         // For Android, request fine and coarse location permissions
//         try {
//             const grantedFine = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//             );
//             if (grantedFine === PermissionsAndroid.RESULTS.GRANTED) return 'granted';

//             const grantedCoarse = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
//             );
//             if (grantedCoarse === PermissionsAndroid.RESULTS.GRANTED) return 'granted';

//             showError('Location permission denied');
//             throw new Error('Location permission denied');
//         } catch (error) {
//             console.log('Location permission error:', error);
//             showError('Error requesting location permission');
//             throw error;
//         }
//     }
// };

// // Helper functions for displaying messages
// const showError = (message) => {
//     showMessage({
//         message,
//         type: 'danger',
//         icon: 'danger',
//     });
// };

// const showSuccess = (message) => {
//     showMessage({
//         message,
//         type: 'success',
//         icon: 'success',
//     });
// };

// export {
//     showError,
//     showSuccess,
// };
