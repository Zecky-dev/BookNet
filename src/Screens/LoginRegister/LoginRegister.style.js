import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    loginRegisterContainer: {
        padding: 12
    },
    selectImage: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
    },
    modalOuterContainer: {
        height: 200,
    },
    modalInnerContainer: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 4,
        justifyContent:'center',
    },
    profilePicture: {
        width: 120,
        height: 120,
    },
});