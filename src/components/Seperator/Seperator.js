import React from 'react';
import {View} from 'react-native';

const Seperator = ({height=12,width = 0,color="transparent"}) => (
    <View style={{height: height,width: width,backgroundColor: color}}/>
)

export default Seperator;