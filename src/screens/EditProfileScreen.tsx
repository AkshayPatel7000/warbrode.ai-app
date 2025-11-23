import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import {
  ArrowLeft,
  Camera,
  User,
  Mail,
  MapPin,
  Phone,
  Check,
} from 'lucide-react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Container from '../components/Container';
import UploadOptionsSheet from '../components/upload/UploadOptionsSheet';

// Validation Schema
const profileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number is too long'),
  location: Yup.string().max(100, 'Location must be less than 100 characters'),
  bio: Yup.string().max(200, 'Bio must be less than 200 characters'),
  gender: Yup.string().oneOf([
    'Male',
    'Female',
    'Non-binary',
    'Prefer not to say',
    'Not specified',
  ]),
});

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(state => state.user);

  const [avatarUri, setAvatarUri] = useState<string | undefined>(
    (currentUser as any)?.avatar,
  );
  const [showUploadSheet, setShowUploadSheet] = useState(false);

  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  const initialValues = {
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: (currentUser as any)?.phone || '',
    location: (currentUser as any)?.location || '',
    bio: (currentUser as any)?.bio || '',
    gender: (currentUser as any)?.gender || 'Not specified',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      // TODO: Dispatch update user action with avatar
      // await dispatch(updateUser({ ...values, avatar: avatarUri }));

      Alert.alert('Success', 'Profile updated successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleTakePhoto = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
      });

      if (result.didCancel) {
        console.log('User cancelled camera');
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to open camera');
        return;
      }

      if (result.assets && result.assets[0]) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to access camera');
    }
  };

  const handleChooseFromLibrary = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Failed to open gallery');
        return;
      }

      if (result.assets && result.assets[0]) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to access gallery');
    }
  };

  const handleChangePhoto = () => {
    setShowUploadSheet(true);
  };

  return (
    <Container pt={60}>
      <View className="flex-1">
        <Formik
          initialValues={initialValues}
          validationSchema={profileValidationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
          }) => (
            <>
              {/* Header */}
              <View className="flex-row items-center justify-between px-6 pt-8 pb-6">
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  className="w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm"
                  activeOpacity={0.7}
                >
                  <ArrowLeft size={20} color="#0f172a" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-slate-900">
                  Edit Profile
                </Text>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  className="w-10 h-10 items-center justify-center rounded-full bg-lime-400 shadow-lg shadow-lime-400/30"
                  activeOpacity={0.7}
                  disabled={isSubmitting}
                >
                  <Check size={20} color="#0f172a" />
                </TouchableOpacity>
              </View>

              <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
              >
                {/* Profile Photo Section */}
                <View className="items-center mb-8">
                  <View className="relative">
                    {avatarUri ? (
                      <Image
                        source={{ uri: avatarUri }}
                        className="w-32 h-32 rounded-full"
                        style={{ width: 128, height: 128, borderRadius: 64 }}
                      />
                    ) : (
                      <View className="w-32 h-32 bg-gradient-to-br from-lime-400 to-lime-500 rounded-full items-center justify-center shadow-lg shadow-lime-400/30">
                        <User color="#0f172a" size={64} strokeWidth={2} />
                      </View>
                    )}
                    <TouchableOpacity
                      onPress={handleChangePhoto}
                      className="absolute bottom-0 right-0 w-12 h-12 bg-slate-900 rounded-full items-center justify-center shadow-lg"
                      activeOpacity={0.7}
                    >
                      <Camera size={20} color="#a3e635" />
                    </TouchableOpacity>
                  </View>
                  <Text className="text-sm text-slate-500 mt-3">
                    Tap to change photo
                  </Text>
                </View>

                {/* Form Fields */}
                <View className="px-6">
                  {/* Name Field */}
                  <View className="mb-6">
                    <Text className="text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </Text>
                    <View
                      className={`flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm shadow-slate-900/5 ${
                        touched.name && errors.name
                          ? 'border-2 border-red-400'
                          : ''
                      }`}
                    >
                      <User size={20} color="#94a3b8" />
                      <TextInput
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        placeholder="Enter your name"
                        placeholderTextColor="#cbd5e1"
                        className="flex-1 ml-3 text-slate-900 text-base"
                      />
                    </View>
                    {touched.name && errors.name && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {String(errors.name)}
                      </Text>
                    )}
                  </View>

                  {/* Email Field */}
                  <View className="mb-6">
                    <Text className="text-sm font-semibold text-slate-700 mb-2">
                      Email *
                    </Text>
                    <View
                      className={`flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm shadow-slate-900/5 ${
                        touched.email && errors.email
                          ? 'border-2 border-red-400'
                          : ''
                      }`}
                    >
                      <Mail size={20} color="#94a3b8" />
                      <TextInput
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        placeholder="Enter your email"
                        placeholderTextColor="#cbd5e1"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="flex-1 ml-3 text-slate-900 text-base"
                      />
                    </View>
                    {touched.email && errors.email && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {String(errors.email)}
                      </Text>
                    )}
                  </View>

                  {/* Phone Field */}
                  <View className="mb-6">
                    <Text className="text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </Text>
                    <View
                      className={`flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm shadow-slate-900/5 ${
                        touched.phone && errors.phone
                          ? 'border-2 border-red-400'
                          : ''
                      }`}
                    >
                      <Phone size={20} color="#94a3b8" />
                      <TextInput
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        placeholder="Enter your phone number"
                        placeholderTextColor="#cbd5e1"
                        keyboardType="phone-pad"
                        className="flex-1 ml-3 text-slate-900 text-base"
                      />
                    </View>
                    {touched.phone && errors.phone && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {String(errors.phone)}
                      </Text>
                    )}
                  </View>

                  {/* Location Field */}
                  <View className="mb-6">
                    <Text className="text-sm font-semibold text-slate-700 mb-2">
                      Location
                    </Text>
                    <View
                      className={`flex-row items-center bg-white rounded-2xl px-4 py-4 shadow-sm shadow-slate-900/5 ${
                        touched.location && errors.location
                          ? 'border-2 border-red-400'
                          : ''
                      }`}
                    >
                      <MapPin size={20} color="#94a3b8" />
                      <TextInput
                        value={values.location}
                        onChangeText={handleChange('location')}
                        onBlur={handleBlur('location')}
                        placeholder="City, Country"
                        placeholderTextColor="#cbd5e1"
                        className="flex-1 ml-3 text-slate-900 text-base"
                      />
                    </View>
                    {touched.location && errors.location && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {String(errors.location)}
                      </Text>
                    )}
                  </View>

                  {/* Gender Selection */}
                  <View className="mb-6">
                    <Text className="text-sm font-semibold text-slate-700 mb-2">
                      Gender
                    </Text>
                    <View className="flex-row flex-wrap gap-2">
                      {genderOptions.map(option => (
                        <TouchableOpacity
                          key={option}
                          onPress={() => setFieldValue('gender', option)}
                          className={`px-4 py-3 rounded-2xl border-2 ${
                            values.gender === option
                              ? 'bg-lime-400 border-lime-400'
                              : 'bg-white border-slate-200'
                          }`}
                          activeOpacity={0.7}
                        >
                          <Text
                            className={`font-medium ${
                              values.gender === option
                                ? 'text-slate-900'
                                : 'text-slate-600'
                            }`}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Bio Field */}
                  <View className="mb-6">
                    <Text className="text-sm font-semibold text-slate-700 mb-2">
                      Bio
                    </Text>
                    <View
                      className={`bg-white rounded-2xl px-4 py-4 shadow-sm shadow-slate-900/5 ${
                        touched.bio && errors.bio
                          ? 'border-2 border-red-400'
                          : ''
                      }`}
                    >
                      <TextInput
                        value={values.bio}
                        onChangeText={handleChange('bio')}
                        onBlur={handleBlur('bio')}
                        placeholder="Tell us about yourself..."
                        placeholderTextColor="#cbd5e1"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        maxLength={200}
                        className="text-slate-900 text-base min-h-[100px]"
                      />
                    </View>
                    <View className="flex-row justify-between items-center mt-1">
                      {touched.bio && errors.bio ? (
                        <Text className="text-red-500 text-xs ml-1">
                          {String(errors.bio)}
                        </Text>
                      ) : (
                        <View />
                      )}
                      <Text className="text-xs text-slate-400">
                        {values.bio.length}/200 characters
                      </Text>
                    </View>
                  </View>

                  {/* Save Button */}
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    className="bg-lime-400 rounded-2xl py-4 items-center shadow-lg shadow-lime-400/30 mb-6"
                    activeOpacity={0.7}
                    disabled={isSubmitting}
                  >
                    <Text className="text-slate-900 font-bold text-base">
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Text>
                  </TouchableOpacity>

                  {/* Cancel Button */}
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="bg-white border-2 border-slate-200 rounded-2xl py-4 items-center mb-6"
                    activeOpacity={0.7}
                  >
                    <Text className="text-slate-600 font-semibold text-base">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          )}
        </Formik>

        {/* Upload Options Sheet */}
        <UploadOptionsSheet
          visible={showUploadSheet}
          onClose={() => setShowUploadSheet(false)}
          onTakePhoto={handleTakePhoto}
          onUploadPhoto={handleChooseFromLibrary}
        />
      </View>
    </Container>
  );
};

export default EditProfileScreen;
