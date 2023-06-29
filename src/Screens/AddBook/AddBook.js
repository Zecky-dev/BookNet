import React, {useState} from 'react';
import {View,Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import styles from './AddBook.style';
import CustomInput from '../../components/CustomInput/CustomInput';

import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import PickImageModal from '../../components/PickImageModal/PickImageModal';
import CustomButton from '../../components/CustomButton/CustomButton';
import colors from '../../utils/colors';

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
      <View>
        <Formik
          initialValues={{
            bookName: '',
            bookCategory: '',
            bookComment: '',
            rating: 0,
          }}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <ScrollView>
              <CustomInput
                label={'Book Name'}
                onChangeText={handleChange('bookName')}
                additionalStyles={styles.input}
                value={values.bookName}
              />
              <View style={styles.picker.container}>
                <Text style={styles.picker.label}>Book Category</Text>
                <Picker
                  selectedValue={values.bookCategory}
                  style={styles.picker.inner}
                  mode='dropdown'
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
              <CustomInput
                label={'Book Cooment'}
                onChangeText={handleChange('bookComment')}
                additionalStyles={styles.input}
                multiline={true}
                minHeight={120}
                value={values.bookComment}
              />

              <CustomButton
                additionalStyles={{container: {marginVertical:12,marginHorizontal: 8, backgroundColor: colors.secondary}}}
                label={"Pick Image"}
                onPress={() => setModalVisible(!modalVisible)}
              />      






              <PickImageModal imageURI={imageURI} setImageURI={setImageURI} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            </ScrollView>
          )}
        </Formik>
      </View>
    );
};

export default AddBook;