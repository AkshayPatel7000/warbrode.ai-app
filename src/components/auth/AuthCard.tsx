import React from 'react';
import { View } from 'react-native';
import clsx from 'clsx';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, className = "bg-white" }) => {
  return (
    <View
      className={clsx(
        'bg-white rounded-3xl p-5 shadow-sm shadow-slate-200/50',
        className
      )}>
      {children}
    </View>
  );
};

export default AuthCard;
