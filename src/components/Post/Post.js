import React,{useEffect,useState} from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';

import styles from './Post.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import colors from '../../utils/colors';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Seperator from '../Seperator/Seperator';
import CustomButton from '../CustomButton/CustomButton';
import { showMessage } from 'react-native-flash-message';
import { getFirestoreErrorMessage } from '../../utils/firebaseErrors';


const Post = ({details}) => {

    const {bookCategory,bookComment,bookID,bookImageURL,bookName,bookRating,postOwner,postLikes} = details;
    const [postOwnerDetails,setPostOwnerDetails] = useState(null);    
    const [postLiked,setPostLiked] = useState(postLikes.includes(auth().currentUser.uid));

    useEffect(() => {
      const unsubscribe = firestore()
      .collection('Users')
      .where("email",'==',postOwner)
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs);
        setPostOwnerDetails(snapshot.docs.at(0).data())
      });
      return () => unsubscribe();
  },[postOwner])


  // Amaç: Like butonuna basıldığında, giriş yapan kullanıcı (auth olan kullanıcı) eğer bu postu beğenmediyse beğenecek, beğendiyse beğenisini geri çekecek.
  // Beğenip beğenmediğini postun beğeniler adlı dizi alanında id'sinin olup olmamasına göre karar verilecek.
  // Örneğin postu beğendik, postun beğeniler kısmına beğenen kişinin id'sini atıcaz. Postu sürekli takip etmemiz lazım bu takip zaten Home üzerinde yapılıyor tek yapmamız gereken postun detaylarını details içinden çekmek
  // Eğer beğendiyse beğeniler içinden kullanıcının id'si çıkarılacak beğenmediyse ise kullanıcı id'si postLikes içine eklenecek.

  const likePost = (postID) => {
    const uid = auth().currentUser.uid;
    firestore()
    .collection('Posts')
    .doc(postID)
    .update({
      postLikes: firestore.FieldValue.arrayUnion(uid)
    })
    .then(() => {
      setPostLiked(true);
    })
    .catch((error) => {
      showMessage({
        message: getFirestoreErrorMessage(error.code),
        type: "danger"
      })
    })
  }

  const dislikePost = (postID) => {
    const uid = auth().currentUser.uid;
    firestore()
    .collection('Posts')
    .doc(postID)
    .update({
      postLikes: firestore.FieldValue.arrayRemove(uid)
    })
    .then(() => {
      setPostLiked(false);
    })
    .catch((error) => {
      showMessage({
        message: getFirestoreErrorMessage(error.code),
        type: "danger"
      })
    })
  }

  
    
    

    const deletePost = async (postID) => {
      try {
        // Postun alt koleksiyonlarından "comments" koleksiyonunu sil
        const postRef = firestore().collection('Posts').doc(postID);
        await postRef.collection('likes').get().then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            await doc.ref.delete();
          })
        })
        await postRef.collection('comments').get().then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            await doc.ref.delete();
          })
        })
        await postRef.delete();
        console.log('Post successfully deleted.');
      } catch (error) {
        console.error('Error deleting post: ', error);
      }
    };


  
    return (
      <View style={styles.container}>
        
       {postOwnerDetails && (
        <View style={styles.postOwnerContainer}>
          <Image source={postOwnerDetails.imageURL ? {uri: postOwnerDetails.imageURL} : require('../../assets/icons/no_profile_image.png')} style={styles.postOwnerImage}/>
          <Seperator width={4}/>
          <Text style={styles.postOwnerNameSurname}>{postOwnerDetails.nameSurname}</Text>
          <Seperator width={12}/>
          <TouchableOpacity
            activeOpacity={.7}
            onPress={() => console.log("Takip etme")}
            style={styles.followButtonContainer}>
              <Text style={styles.followButtonLabel}>Takip Et</Text>
          </TouchableOpacity>
        </View>  
       )}




        {postOwner === auth().currentUser.email && (
          <View style={styles.postActionsContainer}>
          <Menu>
          <MenuTrigger>
          <Icon name={"dots-horizontal"} size={32}/>
        </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => deletePost(bookID)}>
                <Text>Delete</Text>
              </MenuOption>
              <MenuOption onSelect={() => console.log("Delete post")}>
                <Text>Edit</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        )}
        
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
          <TouchableOpacity style={styles.action} onPress={() => postLiked ? dislikePost(bookID) : likePost(bookID)}>
            <Icon name={postLiked ? "heart" : "heart-outline"} color={postLiked ? colors.red : colors.gray} size={24} />
            <Text style={styles.amount}>{postLikes?.length} likes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={() => console.log("Make comment")}>
            <Icon name={'comment-outline'} color={'black'} size={24} />
            <Text style={styles.amount}>50 comments</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

export default Post;