import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import React from 'react';

const colors = {
  active: '#ff5733',
};

interface Props {
  onPress: () => void;
  isActive: boolean;
}

const Token: React.FC<Props> = ({ onPress, children, isActive }) => {
  const backgroundColor = isActive ? colors.active : 'white';
  const textColor = isActive ? 'white' : colors.active;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={[styles.text, { color: textColor }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    paddingHorizontal: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.active,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
  },
});

export default Token;
