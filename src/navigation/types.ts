export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  ForgotPassword: undefined;
};

export type RootStackParamList = {
  AuthStack: undefined;
  MainTabs: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Explore: undefined;
  Create: undefined;
  Wardrobe: undefined;
  Profile: undefined;
};

export type WardrobeStackParamList = {
  WardrobeMain: undefined;
  ClothingDetails: {
    itemId: string;
  };
};

