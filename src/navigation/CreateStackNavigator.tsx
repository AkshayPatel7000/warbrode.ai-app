import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CreateScreen from '../screens/CreateScreen';
import UploadStatusScreen from '../screens/UploadStatusScreen';
import { CreateStackParamList } from './types';

const Stack = createNativeStackNavigator<CreateStackParamList>();

const CreateStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="UploadStatus"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UploadStatus" component={UploadStatusScreen} />
      <Stack.Screen name="CreateMain" component={CreateScreen} />
      {/* <Stack.Screen name="ReviewClothing" component={ReviewClothingScreen} /> */}
    </Stack.Navigator>
  );
};

export default CreateStackNavigator;
