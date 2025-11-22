import React from 'react';
import { View, Text } from 'react-native';

interface AttributeItemProps {
  label: string;
  value: string;
  color?: string;
}

const AttributeItem: React.FC<AttributeItemProps> = ({ label, value, color }) => {
  return (
    <View className="flex-row items-center justify-between py-3 border-b border-slate-100">
      <Text className="text-sm font-medium text-slate-600">{label}</Text>
      <View className="flex-row items-center">
        {color && (
          <View
            className="w-5 h-5 rounded-full mr-2 border border-slate-200"
            style={{ backgroundColor: color }}
          />
        )}
        <Text className="text-sm font-semibold text-slate-900">{value}</Text>
      </View>
    </View>
  );
};

interface AttributeListProps {
  attributes: Array<{
    label: string;
    value: string;
    color?: string;
  }>;
}

const AttributeList: React.FC<AttributeListProps> = ({ attributes }) => {
  return (
    <View className="mx-5 mb-6 bg-white rounded-2xl p-4 shadow-sm shadow-slate-200/50">
      <Text className="text-base font-bold text-slate-900 mb-3">
        Attributes
      </Text>
      {attributes.map((attr, index) => (
        <AttributeItem
          key={index}
          label={attr.label}
          value={attr.value}
          color={attr.color}
        />
      ))}
    </View>
  );
};

export default AttributeList;
