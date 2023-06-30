import React,{useEffect,useState} from 'react';
import {View,Text,ScrollView,FlatList} from 'react-native';

import styles from './Home.style';
import Post from '../../components/Post/Post';

import firestore from '@react-native-firebase/firestore';

const Home = () => {

    const [posts,setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore().collection('Posts').onSnapshot((snapshot) => {
            const updatedPosts = snapshot.docs.map((doc) => doc.data());
            setPosts(updatedPosts);
        } );
        return () => unsubscribe();
    },[])




    return (
        <View style={{flex:1,}}>
            <FlatList
                data={posts}
                renderItem={({item}) => <Post details={item}/>}
            />
        </View>
    )
}

export default Home;