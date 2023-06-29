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

const bookCategoryList = [
    "Fantasy",
    "Science Fiction",
    "Dystopian",
    "Action & Advanture",
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



const AddBook = () => {
    const [modalVisible,setModalVisible] = useState(false);
    const [imageURI,setImageURI] = useState(null);



    return (
      <View style={styles.container}>
        <Formik
          initialValues={{
            bookName: '',
            bookCategory: '',
            bookComment: '',
            rating: 0,
          }}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleSubmit, values, setFieldValue}) => (
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
              <Seperator />
              <View style={styles.picker.container}>
                <Text style={styles.label}>Book Category</Text>
                <Picker
                  selectedValue={values.bookCategory}
                  style={styles.picker.inner}
                  mode="dropdown"
                  onValueChange={handleChange('bookCategory')}>
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
                    onPress={() => setModalVisible(!modalVisible)}
              />
            </ScrollView>
          )}
        </Formik>
      </View>
    );
};

export default AddBook;