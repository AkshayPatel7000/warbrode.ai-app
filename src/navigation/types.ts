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
  ReviewClothing: {
    itemId: string;
    data: {
      name: string;
      type: string;
      color: string;
      pattern: string;
      tags: string[];
    };
    imageUri: string;
  };
  ClothingDetails: {
    itemId: string;
  };
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
};

export type CreateStackParamList = {
  CreateMain: undefined;
  UploadStatus: undefined;
};
