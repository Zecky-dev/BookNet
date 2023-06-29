import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';

export default StyleSheet.create({
    input: {
        outer: {
            marginVertical: 12,
            marginHorizontal: 8,
        },
        input: {
            textAlignVertical: 'top',
        },
    },
    picker: {
        container: {
            marginHorizontal: 8,
            borderRadius: 4,
        },
        label: {
            marginBottom: 4,
        },
        inner: {
            backgroundColor: colors.white,
        }        
    }
});
