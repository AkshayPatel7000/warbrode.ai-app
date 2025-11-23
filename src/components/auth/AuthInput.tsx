import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import clsx from 'clsx';

interface AuthInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  secure?: boolean;
  className?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  keyboardType = 'default',
  error,
  secure = false,
  className = 'w-full',
}) => {
  const [isSecureVisible, setIsSecureVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={clsx('w-full', className)}>
      {label && (
        <Text className="mb-1 text-xs font-medium text-slate-600">{label}</Text>
      )}
      <View
        className={clsx(
          'flex-row items-center px-3 py-2 rounded-2xl bg-white border shadow-sm',
          isFocused
            ? 'border-lime-400 shadow-lime-600'
            : 'border-slate-200 shadow-slate-200/50',
          error ? 'border-red-500' : 'flex-row',
        )}
      >
        <TextInput
          className="flex-1 text-sm text-slate-900 py-1"
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secure && !isSecureVisible}
          autoCapitalize="none"
          onFocus={() => setIsFocused(true)}
          onBlur={e => {
            setIsFocused(false);
            onBlur?.(e);
          }}
        />
        {secure && (
          <TouchableOpacity
            onPress={() => setIsSecureVisible(!isSecureVisible)}
            className="p-1"
          >
            {isSecureVisible ? (
              <EyeOff size={20} color="#64748b" />
            ) : (
              <Eye size={20} color="#64748b" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="mt-1 text-xs text-red-500">{error}</Text>}
    </View>
  );
};

export default AuthInput;
