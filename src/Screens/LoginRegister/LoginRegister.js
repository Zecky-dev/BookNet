import React, { useState } from 'react';
import { ImageBackground, View,ScrollView, StatusBar, Text, Pressable, Image } from 'react-native';
import styles from './LoginRegister.style';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import Seperator from '../../components/Seperator/Seperator';
import colors from '../../utils/colors';

import { Formik } from 'formik';
import { loginValidationSchema, registerValidationSchema } from '../../utils/validations';

import { launchCamera,launchImageLibrary } from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

import Modal from 'react-native-modal';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { getAuthErrorMessage } from '../../utils/firebaseErrors';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import PickImage from '../../components/PickImageModal/PickImageModal';


const LoginRegister = () => {
    const [type,setType] = useState('login');
    const [imageURI,setImageURI] = useState(null);
    const [modalVisible,setModalVisible] = useState(false);

    // Resim işlemleri
    const takePicture = async () => {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'front',
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

    // Login - Register sabit stiller
    const activePassiveStyles = {
        active: {
            container: {backgroundColor: 'white',width: '50%',},
            label:{color:'black'},
        },
        passive: {
            container:{backgroundColor: 'gray',width: '50%',},
            label: {color: 'white'},
            
        }
    }

    /* Login - Register fonksiyonları */

    const login = (values) => {
      const {email,password} = values;
      auth()
      .signInWithEmailAndPassword(email,password)
      .then(() => console.log("Successfully login."))
      .catch((err) => {
        showMessage({
          message: getAuthErrorMessage(err.code),
          type: "danger"
        })
      })
    }

    const register = async (values) => {
      /* Resim varsa resimi yükle url'sini al */
      /* Aldığın URL'yi imageURL değişkenine eşitle ve döküman olarak firestore'a geri kalan veriyle beraber ekle */
      let imageURL = null;
      if(imageURI) {
        try {
          const reference = storage().ref(`avatars/${uuidv4()}`);
          await reference.putFile(imageURI);
          imageURL = await reference.getDownloadURL();
        }
        catch(error) {
         showMessage({
          message: `Error: ${error}`,
          type: "danger",
         }) 
        } 
      }
      
      const username = values.email.split('@')[0];
      firestore().collection('Users').doc(username).set({
        nameSurname: values.nameSurname,
        email: values.email,
        imageURL,
      }).then(() => {
        /* Kayıt işlemi */
        auth()
        .createUserWithEmailAndPassword(values.email,values.password)
        .then(() => console.log("Kayıt başarılı"))
        .catch((error) => {
          showMessage({
            message: `Error: ${error}`,
            type: "danger",
          })
        })
      })
      .catch((error) => {
        showMessage({
          message: `Error: ${error}`,
          type: "danger"
        })
      })
    }


    return (
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        source={require('../../assets/images/loginRegisterBackground.jpg')}
        blurRadius={4}>
        
        
        <View style={styles.loginRegisterContainer}>
          {/* Login - Register Seçim */}
          <View style={styles.buttonsContainer}>
            <CustomButton
              label={'Login'}
              onPress={() => setType('login')}
              additionalStyles={
                type === 'login'
                  ? {
                      container: {
                        ...activePassiveStyles.active.container,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                      label: {...activePassiveStyles.active.label},
                    }
                  : {
                      container: {
                        ...activePassiveStyles.passive.container,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                      label: {...activePassiveStyles.passive.label},
                    }
              }
            />
            <CustomButton
              label={'Register'}
              onPress={() => setType('register')}
              additionalStyles={
                type === 'register'
                  ? {
                      container: {
                        ...activePassiveStyles.active.container,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      },
                      label: {...activePassiveStyles.active.label},
                    }
                  : {
                      container: {
                        ...activePassiveStyles.passive.container,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      },
                      label: {...activePassiveStyles.passive.label},
                    }
              }
            />
          </View>
          <Seperator />

          <ScrollView>
            {/* Kayıt ve giriş formları */}
            <Formik
              initialValues={{
                nameSurname: '',
                age: '',
                email: '',
                password: '',
                passwordAgain: '',
              }}
              onSubmit={values => type === "login" ? login(values) : register(values)}
              validationSchema={
                type === 'login'
                  ? loginValidationSchema
                  : registerValidationSchema
              }>
              {({handleChange, handleSubmit, values, touched, errors}) => {
                return (
                  <>
                    {type === 'register' && (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: 8,
                          }}>
                          <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Image
                              source={
                                imageURI
                                  ? {uri: imageURI}
                                  : require('../../assets/icons/select_image.png')
                              }
                              style={styles.profilePicture}
                            />
                          </Pressable>
                        </View>

                        <CustomInput
                          placeholder={'Name Surname'}
                          icon={{name: 'account', size: 24}}
                          value={values.nameSurname}
                          onChangeText={handleChange('nameSurname')}
                        />
                        {touched.nameSurname && errors.nameSurname && (
                          <Text style={{color: colors.red}}>
                            {errors.nameSurname}
                          </Text>
                        )}
                        <Seperator />
                        <CustomInput
                          placeholder={'Age'}
                          icon={{name: 'calendar-account', size: 24}}
                          value={values.age}
                          onChangeText={handleChange('age')}
                          keyboardType={'number-pad'}
                        />
                        {touched.age && errors.age && (
                          <Text style={{color: colors.red}}>{errors.age}</Text>
                        )}
                        <Seperator />
                      </>
                    )}

                    <CustomInput
                      placeholder={'Email Address'}
                      icon={{name: 'email', size: 24}}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      keyboardType={'email-address'}
                    />
                    {touched.email && errors.email && (
                      <Text style={{color: 'red'}}>{errors.email}</Text>
                    )}
                    <Seperator />
                    <CustomInput
                      placeholder={'Password'}
                      icon={{name: 'lock', size: 24}}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      secureEntry={true}
                    />
                    {touched.password && errors.password && (
                      <Text style={{color: 'red'}}>{errors.password}</Text>
                    )}
                    <Seperator />

                    {type === 'register' && (
                      <>
                        <CustomInput
                          placeholder={'Password Again'}
                          icon={{name: 'lock', size: 24}}
                          value={values.passwordAgain}
                          onChangeText={handleChange('passwordAgain')}
                          secureEntry={true}
                        />
                        {touched.passwordAgain && errors.passwordAgain && (
                          <Text style={{color: 'red'}}>
                            {errors.passwordAgain}
                          </Text>
                        )}
                        <Seperator />
                      </>
                    )}

                    <CustomButton
                      label={type === 'login' ? 'Login' : 'Register'}
                      onPress={handleSubmit}
                      additionalStyles={
                        type === 'login'
                          ? {container: {backgroundColor: colors.login}}
                          : {container: {backgroundColor: colors.register}}
                      }
                    />
                  </>
                );
              }}
            </Formik>
          </ScrollView>
        </View>
        <PickImage imageURI={imageURI} setImageURI={setImageURI} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        <StatusBar />
      </ImageBackground>
    );
}

export default LoginRegister;