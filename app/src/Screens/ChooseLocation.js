//import libraries
import { useNavigation } from '@react-navigation/native';
import  { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';

//reusable components
import AddressPickup from '../../../components/AddressPickup';
import CustomBtn from '../../../components/CustomBtn';
import { showError } from '../helper/heplerFunction';



// Extract fetchValue using route.params inside useEffect to make it serializable
const ChooseLocation = ({ route }) => {
    const navigation = useNavigation()
    const { onUpdateDestination } = route.params;
    
    const [destinationCords, setDestinationCords] = useState({});
    
    const checkValid = () => {
        if (Object.keys(destinationCords).length === 0) {
            showError('Please enter your destination location');
            return false;
        }
        return true;
    };
    
    const onDone = () => {
        if (checkValid()) {
            onUpdateDestination({ destinationCords });
            navigation.goBack();
        }
    };

    const fetchDestinationCords = (lat, lng) => {
        setDestinationCords({ latitude: lat, longitude: lng });
    };

    return (
        <View style={styles.container}>
            <AddressPickup placeholderText="Enter Destination Location" fetchAddress={fetchDestinationCords} />
            <CustomBtn btnText="Done" onPress={onDone} btnStyle={{ marginTop: 24 }} />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
export default ChooseLocation;





