import React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';

import styles from './Post.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import colors from '../../utils/colors';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Post = ({details}) => {

    const {bookCategory,bookComment,bookID,bookImageURL,bookName,bookRating} = details;

  
    return (
      <View style={styles.container}>
        
        <View style={styles.postActionsContainer}>
            <TouchableOpacity onPress={() => console.log("Favorite process")}>
                <Icon name={"heart"} color={"red"} size={32}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Favorite process")}>
                <Icon name={"dots-horizontal"} color={"black"} size={32}/>
            </TouchableOpacity>
        </View>
        
        
        <View style={styles.infoContainer}>
          <View style={styles.detailsContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={
                  bookImageURL
                    ? {uri: bookImageURL}
                    : require('../../assets/icons/no_image.png')
                }
                style={styles.image}
              />
            </View> 
            <Text style={styles.bookTitle}>{bookName}</Text>
            <View style={styles.innerDetails}>
              <View style={styles.bookCategory}>
                <Text style={styles.propertyName}>Category:</Text>
                <Text>{bookCategory}</Text>
              </View>
              <View style={styles.bookRating}>
                <Text style={styles.propertyName}>Rating:</Text>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={bookRating}
                  halfStarEnabled={true}
                  starSize={18}
                  fullStarColor={colors.star}
                />
              </View>
            </View>
            <View style={styles.bookComment}>
              <Text style={styles.bookComment}>{bookComment}</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <View style={styles.action}>
            <Icon name={'heart'} color={'red'} size={24} />
            <Text style={styles.amount}>150 likes</Text>
          </View>
          <View style={styles.action}>
            <Icon name={'comment-outline'} color={'black'} size={24} />
            <Text style={styles.amount}>50 comments</Text>
          </View>
        </View>
      </View>
    );
};

export default Post;