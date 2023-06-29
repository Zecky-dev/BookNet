import React,{useState} from 'react';
import {TextInput,Text,View} from 'react-native';
import styles from './CustomInput.style';

import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInput = ({placeholder,onChangeText,secureEntry,icon,label,minHeight,multiline,value,additionalStyles,keyboardType}) => {

    const [showSecureEntry,setShowSecureEntry] = useState(true); 

    
    return (
      <View style={[styles.outer,additionalStyles?.outer]}>
        {label && <Text style={[styles.label,additionalStyles?.label]}>{label}</Text>}
        <View style={styles.inner}>
          <View style={styles.iconContainer}>
            <Icon name={icon?.name} color={icon?.color} size={icon?.size} />
          </View>
          <TextInput
            style={[styles.input, additionalStyles?.input, multiline && {minHeight: minHeight}]}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={secureEntry ? true : false}
            keyboardType={keyboardType}
            value={value}
            multiline={multiline}
          />

          {secureEntry && (
            <Pressable onPress={() => setShowSecureEntry(!showSecureEntry)}>
              <Icon
                name={showSecureEntry ? "eye-off" : "eye"}
                size={24}
                style={{ margin: 6 }}
              />
            </Pressable>
          )}
        </View>
      </View>
    );
}

export default CustomInput;