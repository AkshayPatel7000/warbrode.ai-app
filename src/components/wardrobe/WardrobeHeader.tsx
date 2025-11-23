import React from 'react';
import { Plus } from 'lucide-react-native';
import ScreenHeader from '../common/ScreenHeader';

interface WardrobeHeaderProps {
  itemCount?: number;
  onAddPress?: () => void;
}

const WardrobeHeader: React.FC<WardrobeHeaderProps> = ({
  itemCount = 0,
  onAddPress,
}) => {
  return (
    <ScreenHeader
      title="My Wardrobe"
      subtitle={
        itemCount === 0
          ? 'No items yet'
          : `${itemCount} item${itemCount !== 1 ? 's' : ''} total`
      }
      ActionIcon={Plus}
      onActionPress={onAddPress}
      paddingTop={64}
      paddingBottom={24}
      paddingHorizontal={20}
    />
  );
};

export default WardrobeHeader;
