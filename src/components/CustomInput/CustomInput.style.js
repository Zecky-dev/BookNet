import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    inner: {
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 0,
        flexDirection: 'row',
        alignItems:'center',
    },
    input: {
        flex:1
    },
    label: {
        marginBottom: 4,
    },
    iconContainer: {
        paddingHorizontal: 4,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    }
});