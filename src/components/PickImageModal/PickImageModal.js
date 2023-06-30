import React from 'react'
import { View, Text } from 'react-native'

import styles from './PickImageModal.style';

import Modal from 'react-native-modal';
import CustomButton from '../CustomButton/CustomButton';
import Seperator from '../Seperator/Seperator';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';

const PickImageModal = ({modalVisible,setModalVisible,imageURI,setImageURI}) => {
  
  const takePicture = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality:1 ,
    });
    if(!result.didCancel && !result.errorCode) {
      setModalVisible(!modalVisible);
      setImageURI(result.assets[0].uri);
    }
    else if(result.didCancel) {
      setModalVisible(!modalVisible);
      showMessage({
        message: "Picture taking canceled!",
        type: "info",
      })
    }
    else {
      let errorMessage;
      switch(result.errorCode) {
        case 'camera_unavailable':
          errorMessage = "Camera is unavailable!"; break;
        case 'permission':
          errorMessage = "Permission problem!"; break;
        case 'others':
          errorMessage = "An unknown error occured!"; break;
      }
      setModalVisible(!modalVisible);
      showMessage({
        message: errorMessage,
        type: "danger"
      });
    }
  }
  const selectPictureFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    if(!result.didCancel && !result.errorCode) {
      setImageURI(result.assets[0].uri);
    }
    else if(result.didCancel) {
      showMessage({
        message: "Picking image from gallery canceled.",
        type: "info",
      })
    }
    else {
      let errorMessage;
      switch(result.errorCode) {
        case 'camera_unavailable':
          errorMessage = "Gallery is unavailable!"; break;
        case 'permission':
          errorMessage = "Permission problem!"; break;
        case 'others':
          errorMessage = "An unknown error occured!"; break;
      }
      showMessage({
        message: errorMessage,
        type: "danger"
      });
    }
  }
  const removeSelectedPicture = () => {
    if(imageURI) {
      setModalVisible(!modalVisible)
      setImageURI(null);
    }
  }


  return (
    <Modal
          isVisible={modalVisible}
          style={styles.modalOuterContainer}
          onBackButtonPress={() => setModalVisible(!modalVisible)}
          onBackdropPress={() => setModalVisible(!modalVisible)}
          useNativeDriver={true}>
          <View style={styles.modalInnerContainer}>
            <View style={{flexDirection: 'row'}}>
              <CustomButton
                icon={{name: 'camera', size: 32, color: 'white'}}
                label={'Take Picture'}
                onPress={() => takePicture()}
                additionalStyles={{
                  container: {backgroundColor: 'red', padding: 4, flex: 1},
                }}
              />
              <Seperator height={0} width={8} />
              <CustomButton
                icon={{name: 'image-album', size: 32, color: 'white'}}
                label={'Select From Gallery'}
                onPress={() => selectPictureFromGallery()}
                additionalStyles={{
                  container: {backgroundColor: 'red', padding: 4, flex: 1},
                }}
              />
            </View>
            {imageURI && (
              <CustomButton 
                onPress={() => removeSelectedPicture()}
                icon={{name: "delete",color:"white",size:24}}
                label={"Remove Picture"}
                additionalStyles={{container: {backgroundColor:'red',marginTop: 8,}}}
              />
            )}
          </View>
        </Modal>
  )
}

export default PickImageModal;