import React, {useState} from 'react';
import {View,Text,Image,Pressable} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import StarRating from 'react-native-star-rating';
import styles from './AddBook.style';
import CustomInput from '../../components/CustomInput/CustomInput';



import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import PickImageModal from '../../components/PickImageModal/PickImageModal';
import CustomButton from '../../components/CustomButton/CustomButton';
import colors from '../../utils/colors'; 
import Seperator from '../../components/Seperator/Seperator';
import { postValidationSchema } from '../../utils/validations';
import LoadingModal from '../../components/LoadingModal/LoadingModal';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import { showMessage } from 'react-native-flash-message';
import { getFirestoreErrorMessage, getStorageTaskErrorMessage } from '../../utils/firebaseErrors';

const bookCategoryList = [
    "Fantasy",
    "Science Fiction",
    "Dystopian",
    "Action & Adventure",
    "Mystery",
    "Horror",
    "Thriller & Suspense",
    "Historical Fiction",
    "Romance",
    "Women's Fiction",
    "Contemporary Fiction",
    "Literary Fiction",
    "Magical Realism",
    "Graphic Novel",
    "Short Story",
    "Young Adult",
    "New Adult",
    "Children's",
    "Memoir & Autobiography",
    "Biography",
    "Food & Drink",
    "Art & Photography",
    "Self-help",
    "History",
    "Travel",
    "True Crime",
    "Humor",
    "Essay",
    "Gudie / How-to",
    "Religion & Spirituality",
    "Humanities & Social Sciences",
    "Science & Technology",
    "Classics",
    "Poetry"
];



const AddBook = ({navigation}) => {
    const [modalVisible,setModalVisible] = useState(false);
    const [imageURI,setImageURI] = useState(null);
    const [loading,setLoading] = useState(false);
    const [progress,setProgress] = useState(0);

    const uploadPost = async (values) => {
      let imageURL = null;
      let postId = uuidv4();
      let uploadImagePromise = Promise.resolve();
    
      if (imageURI) {
        // Resmi yükle ve imageURL ataması yap
        setLoading(true);
        const reference = storage().ref(`postImages/${postId}`);
        // Resmi referansa yüklemeden önce boyutunu değiştir, yüklenme süresini kısalt
        
        const task = reference.putFile(imageURI);
        uploadImagePromise = new Promise((resolve, reject) => {
          task.on('state_changed', taskSnapShot => {
            const progressByPercent = (taskSnapShot.bytesTransferred / taskSnapShot.totalBytes) * 100;
            setProgress(progressByPercent);
          });
    
          task.then(async () => {
            console.log("Post resmi yüklendi.");
            imageURL = await task.snapshot.ref.getDownloadURL();
            resolve();
          });
    
          task.catch(error => {
            showMessage({
              message: getStorageTaskErrorMessage(error.code),
              type: "danger",
            });
            reject(error);
          });
        });
      }
    
      uploadImagePromise
        .then(() => {
          // Resim yüklendikten sonra belge olarak detayları firestore'a kaydet
          return firestore()
            .collection('Posts')
            .doc(postId)
            .set({
              bookID: postId,
              bookName: values.bookName,
              bookCategory: values.bookCategory,
              bookComment: values.bookComment,
              bookRating: values.rating,
              bookImageURL: imageURL,
              postLikes: [],
              postOwner: auth().currentUser.email,
            });
        })
        .then(() => {
          // Post oluşturulduktan sonra comments koleksiyonunu oluşturmak için
          const commentsCollection = firestore()
            .collection('Posts')
            .doc(postId)
            .collection('comments');
    
          // comments koleksiyonuna bir dummy döküman eklemek için
          return commentsCollection.doc('dummy').set({});
        })
        .then(() => {
          setProgress(0);
          setLoading(false);
          navigation.navigate('Social');
        })
        .catch(error => {
          showMessage({
            message: getFirestoreErrorMessage(error.code),
            type: "danger",
          });
          setLoading(false);
          setProgress(0);
        });
    }
    




    return (
      <View style={styles.container}>
        <Formik
          initialValues={{
            bookName: '',
            bookCategory: 'default',
            bookComment: '',
            rating: 0,
          }}
          onSubmit={(values,{resetForm}) => {
            uploadPost(values);
            resetForm();
            setImageURI(null);
          }}
          validationSchema={postValidationSchema}  
        >
          {({handleChange, handleSubmit, values, setFieldValue, touched, errors}) => (
            <ScrollView>
              {imageURI && (
                <View style={styles.imageContainer}>
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Image source={{uri: imageURI}} style={styles.image} />
                  </Pressable>
                </View>
              )}
              <CustomInput
                label={'Book Name'}
                onChangeText={handleChange('bookName')}
                additionalStyles={styles.input}
                value={values.bookName}
              />
              {touched.bookName && errors.bookName && (<Text style={{color:colors.error}}>{errors.bookName}</Text>)}
              <Seperator />
              <View style={styles.picker.container}>
                <Text style={styles.label}>Book Category</Text>
                <Picker
                  selectedValue={values.bookCategory}
                  style={styles.picker.inner}
                  mode="dropdown"
                  onValueChange={handleChange('bookCategory')}>
                  <Picker.Item label="Please select a category" value={"default"}/>
                  {bookCategoryList.map(category => (
                    <Picker.Item
                      label={category}
                      key={category}
                      value={category}
                    />
                  ))}
                </Picker>
              </View>
              <Seperator />
              <CustomInput
                label={'Book Comment'}
                onChangeText={handleChange('bookComment')}
                additionalStyles={styles.input}
                multiline={true}
                minHeight={120}
                value={values.bookComment}
              />
              {touched.bookComment && errors.bookComment && (<Text style={{color:colors.error}}>{errors.bookComment}</Text>)}
              <Seperator />
              {!imageURI && (
                <>
                  <CustomButton
                    additionalStyles={{
                      container: {
                        backgroundColor: colors.secondary,
                      },
                    }}
                    label={'Pick Image'}
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                  <Seperator />
                </>
              )}
              <Seperator />
              <View style={styles.rating.container}>
                <Text style={styles.rating.label}>Rating</Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={values.rating}
                  selectedStar={(rating, _) => setFieldValue('rating', rating)}
                  fullStarColor={colors.star}
                  halfStarEnabled={true}
                  starSize={32}
                />
              </View>
              <Seperator />
              <CustomButton
                    additionalStyles={{
                      container: {
                        backgroundColor: colors.success,
                        marginTop: 24,
                      },
                    }}
                    label={'Send Post'}
                    onPress={handleSubmit}
              />
              <PickImageModal imageURI={imageURI} setImageURI={setImageURI} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
              <LoadingModal loading={loading} progress={progress}/>
            </ScrollView>
          )}
        </Formik>
      </View>
    );
};

export default AddBook;