import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from './CustomButton.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomButton = ({onPress,icon,label,additionalStyles}) => {
    return (
       <TouchableOpacity activeOpacity={.8} onPress={onPress} style={[styles.container,additionalStyles?.container]}>
        {icon && <Icon name={icon.name} size={icon.size} color={icon.color}/>}
        {label && <Text style={[styles.label,additionalStyles?.label]}>{label}</Text>}
       </TouchableOpacity> 
    )
}

export default CustomButton;