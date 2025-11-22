
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ShirtIconProps {
  size?: number;
  color?: string;
}

export const ShirtIcon: React.FC<ShirtIconProps> = ({ 
  size = 24, 
  color = '#000000' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 3L18.5 5.5L21 3V9L19 11H17V21H7V11H5L3 9V3L5.5 5.5L8 3C8 3 9 5 12 5C15 5 16 3 16 3Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const TShirtIcon: React.FC<ShirtIconProps> = ({ 
  size = 24, 
  color = '#000000' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 3L19 6L21 4V10L19 12H17V21H7V12H5L3 10V4L5 6L8 3C8 3 9.5 5 12 5C14.5 5 16 3 16 3Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const JeansIcon: React.FC<ShirtIconProps> = ({ 
  size = 24, 
  color = '#000000' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 3H15L16 12L15 21H13L12 15L11 21H9L8 12L9 3Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 3H15"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M11 8H13"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};