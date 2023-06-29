import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
export default StyleSheet.create({
    inner: {
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 0,
        flexDirection: 'row',
        alignItems:'center',
    },
    input: {
        flex:1,
        textAlignVertical: 'top',
    },
    label: {
        marginBottom: 4,
        color: colors.black,
    },
    iconContainer: {
        paddingHorizontal: 4,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    }
});