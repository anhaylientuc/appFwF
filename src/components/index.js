import React from 'react';
import { Text, View } from 'react-native';

import AppStyle from '@common';

function Main() {

  return (
    <View style={AppStyle.StyleCommon.viewMain}>
      <Text style={AppStyle.StyleCommon.button1}>'Button 1!'</Text>
      <Text style={AppStyle.StyleMain.button2}>'Button 2!'</Text>
    </View>
  );
}


export default Main
