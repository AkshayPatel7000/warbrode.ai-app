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
  EditProfile: undefined;
  ReviewClothing: {
    itemId: string;
    data: {
      type: string;
      colorHex: string;
      pattern: string;
      tags: string[];
      gender: string | null;
    };
    imageUri: string;
  };
  ClothingDetails: {
    itemId: string;
  };
};

export type BottomTabParamList = {
  Home: undefined;
  OutfitGenerator: undefined;
  Create: undefined;
  Wardrobe: undefined;
  Profile: undefined;
};

export type WardrobeStackParamList = {
  WardrobeMain: undefined;
};

export type CreateStackParamList = {
  CreateMain: undefined;
  UploadStatus: {
    uploadId?: string;
  };
};
