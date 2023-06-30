import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    animation: {
        height: 200
    },
    progress: {
        color: 'white',
        fontSize: 42,
        textAlign: 'center',
    }
});


const LoadingModal = ({loading,progress}) => {
    return (
        <Modal isVisible={loading}>
            <View style={styles.container}>
                <Lottie style={styles.animation} source={require('../../assets/animations/bookLoading.json')} autoPlay loop/>
                <Text style={styles.progress}>
                    %{progress}
                </Text>
            </View>
        </Modal>
    )
}

export default LoadingModal;